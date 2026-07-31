// 매일 갱신 후 사용자 카카오톡('나와의 채팅')으로 오늘 요약을 전송.
// 비밀값은 저장소에 없고, 실행 시 인자로 전달받는다:
//   node scripts/notify-kakao.mjs <REST_API_KEY> <CLIENT_SECRET> <REFRESH_TOKEN>
import { build } from 'esbuild'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

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

const lines = top.map((c) => `• ${c.title}`).join('\n')
// 본문에 URL을 직접 넣어 카톡이 자동 링크로 만들게 함 (버튼은 도메인 등록이 필요하므로 텍스트 링크가 더 확실)
const text = `📰 오늘의 사건사고 (${today})\n\n${lines}\n\n🔒 오늘의 미제사건: ${cold.title}\n\n👉 전체 보기: https://todays-cases.vercel.app`

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

// 2) 나에게 메시지 보내기 (기본 텍스트 템플릿)
const sendRes = await fetch('https://kapi.kakao.com/v2/api/talk/memo/default/send', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${tokenJson.access_token}`,
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
  },
  body: new URLSearchParams({
    template_object: JSON.stringify({
      object_type: 'text',
      text,
      link: {
        web_url: 'https://todays-cases.vercel.app',
        mobile_web_url: 'https://todays-cases.vercel.app',
      },
      button_title: '사이트 보기',
    }),
  }),
})
const sendJson = await sendRes.json()
if (sendJson.result_code === 0) {
  console.log('[notify-kakao] 카카오톡 전송 성공')
} else {
  console.error('[notify-kakao] 카카오톡 전송 실패:', JSON.stringify(sendJson))
  // 알림 실패는 전체 작업 실패로 보지 않음
}
