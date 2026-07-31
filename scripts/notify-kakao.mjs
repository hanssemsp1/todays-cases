// 매일 갱신 후 사용자 카카오톡('나와의 채팅')으로 오늘 요약을 전송.
// 비밀값은 저장소에 없고, 실행 시 인자로 전달받는다:
//   node scripts/notify-kakao.mjs <REST_API_KEY> <CLIENT_SECRET> <REFRESH_TOKEN>
import { build } from 'esbuild'
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const SITE = 'https://todays-cases.vercel.app'

const [, , CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN] = process.argv
if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
  console.error('[notify-kakao] 인자 부족: <client_id> <client_secret> <refresh_token>')
  process.exit(1)
}

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

// cases.ts / coldCases.ts 를 번들해 데이터 로드
async function load(entry, names) {
  const tmp = join(root, 'node_modules', '.cache', `notify-${names}.mjs`)
  await build({
    entryPoints: [join(root, entry)],
    bundle: true,
    format: 'esm',
    platform: 'node',
    outfile: tmp,
    logLevel: 'silent',
  })
  return import(pathToFileURL(tmp).href + '?t=' + Date.now())
}

const { CASES } = await load('src/data/cases.ts', 'cases')
const { getColdCaseOfDay } = await load('src/data/coldCases.ts', 'cold')

// 최신 5건 + 오늘의 미제사건
const top = [...CASES]
  .sort((a, b) => (b.date + (b.time ?? '')).localeCompare(a.date + (a.time ?? '')))
  .slice(0, 5)
const cold = getColdCaseOfDay()

const today = new Date().toLocaleDateString('ko-KR', {
  timeZone: 'Asia/Seoul',
  month: 'long',
  day: 'numeric',
})

const allLines = top.map((c) => `• ${c.title}`).join('\n')
const briefLines = top.slice(0, 3).map((c) => `• ${c.title}`).join('\n')
// 텍스트(폴백)용 본문 — URL을 직접 넣어 자동 링크
const text = `📰 오늘의 사건사고 (${today})\n\n${allLines}\n\n🔒 오늘의 미제사건: ${cold.title}\n\n👉 전체 보기: ${SITE}`
// 카드(피드)용 설명 — 길이 제한이 있어 상위 3건만
const feedDesc = `${briefLines}\n🔒 미제사건: ${cold.title}\n\n👉 ${SITE}`

// 1) 액세스 토큰 갱신
const tokenRes = await fetch('https://kauth.kakao.com/oauth/token', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
  body: new URLSearchParams({
    grant_type: 'refresh_token',
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    refresh_token: REFRESH_TOKEN,
  }),
})
const tokenJson = await tokenRes.json()
if (!tokenJson.access_token) {
  console.error('[notify-kakao] 토큰 갱신 실패:', JSON.stringify(tokenJson))
  process.exit(1)
}
const ACCESS = tokenJson.access_token

const SEND_URL = 'https://kapi.kakao.com/v2/api/talk/memo/default/send'
const send = async (templateObject) => {
  const res = await fetch(SEND_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${ACCESS}`,
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
    body: new URLSearchParams({ template_object: JSON.stringify(templateObject) }),
  })
  return res.json()
}

// 2) 그라데이션 배너 이미지를 카카오에 업로드 (성공 시 카드/피드 템플릿 사용)
let imageUrl = null
try {
  const buf = readFileSync(join(root, 'public', 'kakao-banner.png'))
  const fd = new FormData()
  fd.append('file', new Blob([buf], { type: 'image/png' }), 'kakao-banner.png')
  const up = await fetch('https://kapi.kakao.com/v2/api/talk/message/image/upload', {
    method: 'POST',
    headers: { Authorization: `Bearer ${ACCESS}` },
    body: fd,
  })
  const upJson = await up.json()
  imageUrl = upJson?.infos?.original?.url ?? null
  if (!imageUrl) console.error('[notify-kakao] 이미지 업로드 응답:', JSON.stringify(upJson))
} catch (e) {
  console.error('[notify-kakao] 이미지 업로드 예외:', String(e))
}

// 3) 카드(피드) 템플릿 전송 시도 → 실패하면 텍스트로 폴백
let sent = false
if (imageUrl) {
  const feed = await send({
    object_type: 'feed',
    content: {
      title: `📰 오늘의 사건사고 (${today})`,
      description: feedDesc,
      image_url: imageUrl,
      image_width: 900,
      image_height: 360,
      link: { web_url: SITE, mobile_web_url: SITE },
    },
    buttons: [{ title: '사이트 보기', link: { web_url: SITE, mobile_web_url: SITE } }],
  })
  if (feed.result_code === 0) {
    console.log('[notify-kakao] 카드(피드) 전송 성공')
    sent = true
  } else {
    console.error('[notify-kakao] 카드 전송 실패 → 텍스트로 폴백:', JSON.stringify(feed))
  }
}

if (!sent) {
  const t = await send({
    object_type: 'text',
    text,
    link: { web_url: SITE, mobile_web_url: SITE },
    button_title: '사이트 보기',
  })
  if (t.result_code === 0) console.log('[notify-kakao] 텍스트 전송 성공')
  else console.error('[notify-kakao] 텍스트 전송도 실패:', JSON.stringify(t))
}
