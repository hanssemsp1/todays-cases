// 매일 갱신 후 사용자 카카오톡('나와의 채팅')으로 오늘 요약을 전송.
// 비밀값은 저장소에 없고, 실행 시 인자로 전달받는다:
//   node scripts/notify-kakao.mjs <REST_API_KEY> <CLIENT_SECRET> <REFRESH_TOKEN>
import { build } from 'esbuild'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const SITE = 'https://www.todaycase.com'

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

// 카카오 텍스트 템플릿은 text 길이 제한(약 200자)이 있어 상위 3~4건 + 미제 + 링크로 구성.
// 본문에 URL을 직접 넣으면 카톡이 자동 링크로 만들어 PC·모바일 모두 눌러서 이동 가능.
const clip = (s, n) => (s.length > n ? s.slice(0, n) + '…' : s)
const briefLines = top
  .slice(0, 3)
  .map((c) => `• ${clip(c.title, 22)}`)
  .join('\n')
// 오늘의 대표 영상(방송 뉴스). 카톡이 유튜브 링크를 썸네일 미리보기로 변환 → 눌러서 재생.
const topVideo = top.find((c) => c.videoUrl)?.videoUrl
let text = `📰 오늘의 사건사고 (${today})\n\n${briefLines}`
if (topVideo) text += `\n\n🎬 오늘의 영상\n${topVideo}`
text += `\n\n👉 전체보기 ${SITE}`

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

// 2) 텍스트 템플릿 전송 — 본문 URL이 자동 링크되어 PC·모바일 모두 눌러서 이동 가능
const res = await send({
  object_type: 'text',
  text,
  link: { web_url: SITE, mobile_web_url: SITE },
  button_title: '사이트 보기',
})
if (res.result_code === 0) console.log('[notify-kakao] 카카오톡 전송 성공')
else console.error('[notify-kakao] 카카오톡 전송 실패:', JSON.stringify(res))
