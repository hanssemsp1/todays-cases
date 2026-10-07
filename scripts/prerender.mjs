// 빌드 후 실행: 각 사건 상세를 검색엔진이 읽을 수 있는 정적 HTML로 프리렌더.
// dist/index.html(빌드 산출물)을 템플릿으로, 기사별 고유 title/description/OG/JSON-LD +
// 본문 텍스트를 #root 안에 심어 dist/case/<id>.html 로 저장한다.
// 네이버(JS 렌더 취약)도 각 기사를 읽게 되어 노출·클릭 전환에 결정적.
import { build } from 'esbuild'
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const SITE = 'https://www.todaycase.com'

// cases.ts 번들 → CASES 로드 (gen-archive 와 동일 방식)
const tmp = join(root, 'node_modules', '.cache', 'prerender.data.mjs')
await build({
  entryPoints: [join(root, 'src/data/cases.ts')],
  bundle: true,
  format: 'esm',
  platform: 'node',
  outfile: tmp,
  logLevel: 'silent',
})
const { CASES, CATEGORY_META } = await import(
  pathToFileURL(tmp).href + '?t=' + Date.now()
)
// 세 방의 제목·설명(src/pages/rooms/roomsData.ts) — React 없는 순수 데이터라 그대로 번들 가능
const tmpRooms = join(root, 'node_modules', '.cache', 'prerender.rooms.mjs')
await build({
  entryPoints: [join(root, 'src/pages/rooms/roomsData.ts')],
  bundle: true,
  format: 'esm',
  platform: 'node',
  outfile: tmpRooms,
  logLevel: 'silent',
})
const { rooms, ROOM_KEYS, roomDocumentTitle } = await import(
  pathToFileURL(tmpRooms).href + '?t=' + Date.now()
)

const tpl = readFileSync(join(dist, 'index.html'), 'utf8')

const esc = (s = '') =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

const ytId = (url = '') => {
  const m = String(url).match(/[?&]v=([\w-]{11})|youtu\.be\/([\w-]{11})/)
  return m ? m[1] || m[2] : null
}

function renderCase(item) {
  const url = `${SITE}/case/${item.id}`
  const pageTitle = `${item.title} — 오늘의 사건사고`
  const desc = (item.summary || item.title).replace(/\s+/g, ' ').trim().slice(0, 155)
  const id = ytId(item.videoUrl)
  const image = id
    ? `https://img.youtube.com/vi/${id}/hqdefault.jpg`
    : `${SITE}/og-image.png`
  const catLabel = CATEGORY_META?.[item.category]?.label ?? '사건사고'
  const pub = `${item.date}T${item.time || '09:00'}:00+09:00`

  let html = tpl
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(pageTitle)}</title>`)
  html = html.replace(
    /(<meta\s+name="description"\s+content=")[\s\S]*?(")/,
    `$1${esc(desc)}$2`,
  )
  html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
  html = html.replace(/(<meta property="og:type" content=")[^"]*(")/, `$1article$2`)
  html = html.replace(
    /(<meta property="og:title" content=")[^"]*(")/,
    `$1${esc(item.title)}$2`,
  )
  html = html.replace(
    /(<meta\s+property="og:description"\s+content=")[\s\S]*?(")/,
    `$1${esc(desc)}$2`,
  )
  html = html.replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`)
  html = html.replace(/(<meta property="og:image" content=")[^"]*(")/g, `$1${image}$2`)
  html = html.replace(
    /(<meta name="twitter:image" content=")[^"]*(")/,
    `$1${image}$2`,
  )

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: item.title,
    description: desc,
    datePublished: pub,
    dateModified: pub,
    image: [image],
    articleSection: catLabel,
    author: { '@type': 'Organization', name: item.source || '오늘의 사건사고' },
    publisher: {
      '@type': 'Organization',
      name: '오늘의 사건사고',
      logo: { '@type': 'ImageObject', url: `${SITE}/icon-192.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  }
  html = html.replace(
    '</head>',
    `    <script type="application/ld+json">${JSON.stringify(ld)}</script>\n  </head>`,
  )

  // 크롤러용 본문(React 로드 시 대체됨)
  const videoBlock = id
    ? `<p><a href="https://www.youtube.com/watch?v=${id}" rel="nofollow">▶ 관련 방송 영상</a></p>`
    : ''
  const srcBlock = item.sourceUrl
    ? `<p><a href="${esc(item.sourceUrl)}" rel="nofollow noopener">원문 · ${esc(item.source)}</a></p>`
    : ''
  const article =
    `<article><nav><a href="/news">오늘의 사건사고</a> › ${esc(catLabel)}</nav>` +
    `<h1>${esc(item.title)}</h1>` +
    `<p>${esc(item.source)} · ${esc(item.region)} · ${esc(item.date)}${item.time ? ' ' + esc(item.time) : ''}</p>` +
    `<p>${esc(item.summary)}</p>` +
    `<p>${esc(item.content)}</p>` +
    videoBlock +
    srcBlock +
    `</article>`
  html = html.replace('<div id="root"></div>', `<div id="root">${article}</div>`)

  return html
}

mkdirSync(join(dist, 'case'), { recursive: true })
for (const item of CASES) {
  writeFileSync(join(dist, 'case', `${item.id}.html`), renderCase(item))
}

// 홈("/")은 「오늘의 케이스 · 세 개의 방」. 세 방 입구와 사건사고(/news) 최신 헤드라인을
// #root 에 심어 크롤러가 콘텐츠를 읽게 함 (React 로드 시 대체됨).
// .rooms-root 로 감싸는 이유: 번들 CSS 는 head 의 <link> 라 JS 보다 먼저 적용되므로
// React 가 뜨기 전 첫 프레임도 어두운 배경(min-height:100svh)으로 덮여 흰 화면 번쩍임이 없다.
const byRecent = (a, b) => (b.date + (b.time || '')).localeCompare(a.date + (a.time || ''))
const recent = [...CASES].sort(byRecent).slice(0, 20)
const caseList = (items) =>
  `<ul>` +
  items
    .map((c) => `<li><a href="/case/${c.id}">${esc(c.title)}</a> <small>${esc(c.date)}</small></li>`)
    .join('') +
  `</ul>`
const homeBody =
  `<div class="rooms-root"><main><h1>일상을 살피는 세 개의 방.</h1>` +
  `<p>일과 사람, 그리고 공간. 오늘 필요한 방으로 들어오세요.</p><ul>` +
  `<li><a href="/work">01 일터 · 오늘의 근로 케이스</a></li>` +
  `<li><a href="/gather">02 모임 · 모임 한 판</a></li>` +
  `<li><a href="/space">03 공간 · 1cm 차이 연구소</a></li>` +
  `</ul><h2><a href="/news">오늘의 사건사고</a></h2>` +
  caseList(recent) +
  `</main></div>`
const home = tpl.replace('<div id="root"></div>', `<div id="root">${homeBody}</div>`)
writeFileSync(join(dist, 'index.html'), home)

// /news /work /gather /space 는 cleanUrls 가 dist/<name>.html 을 서빙한다(dist/case/<id>.html 과 같은 방식).
// 홈 index.html 을 그대로 받으면 canonical·og:url·<title> 이 전부 홈을 가리켜 크롤러가 네 URL 을 홈으로 합치므로
// 페이지마다 제목·설명·canonical·본문을 바꿔 따로 쓴다.
function renderPage({ path, title, desc, ogTitle, body }) {
  const url = `${SITE}${path}`
  let html = tpl
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`)
  html = html.replace(/(<meta\s+name="description"\s+content=")[\s\S]*?(")/, `$1${esc(desc)}$2`)
  html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
  html = html.replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(ogTitle)}$2`)
  html = html.replace(/(<meta\s+property="og:description"\s+content=")[\s\S]*?(")/, `$1${esc(desc)}$2`)
  html = html.replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`)
  html = html.replace('<div id="root"></div>', `<div id="root">${body}</div>`)
  return html
}

// /news — 옛 첫 화면(사건사고 피드). 제목·설명은 src/App.tsx 의 OLD_TITLE 과 옛 index.html 값.
const NEWS_TITLE = '오늘의 사건사고 — 오늘의 사건·사고와 미제사건을 한 곳에서'
const NEWS_DESC =
  '그날그날 국내외 사건·사고와 장기 미제사건을 매일 정리해 요약·방송 영상·출처와 함께 제공합니다. 화재, 교통사고, 강력범죄, 재난 소식을 한 곳에서.'
writeFileSync(
  join(dist, 'news.html'),
  renderPage({
    path: '/news',
    title: NEWS_TITLE,
    desc: NEWS_DESC,
    ogTitle: '오늘의 사건사고',
    body:
      `<main><nav><a href="/">오늘의 케이스</a> › 오늘의 사건사고</nav><h1>오늘의 사건사고</h1>` +
      `<p>${esc(NEWS_DESC)}</p>` +
      caseList([...CASES].sort(byRecent)) +
      `</main>`,
  }),
)

// /work /gather /space — 방 제목·설명(roomsData)을 그대로. 본문은 .rooms-root 로 감싸 첫 프레임도 어둡게.
for (const key of ROOM_KEYS) {
  const r = rooms[key]
  const statement = r.statement.replace(/<br>/g, ' ')
  writeFileSync(
    join(dist, `${key}.html`),
    renderPage({
      path: `/${key}`,
      title: roomDocumentTitle(key),
      desc: r.description,
      ogTitle: roomDocumentTitle(key),
      body:
        `<div class="rooms-root" data-room="${key}"><main><nav><a href="/">세 개의 방으로</a></nav>` +
        `<p>ROOM ${esc(r.number)} · ${esc(r.english)}</p>` +
        `<h1>${esc(r.title)}</h1><p>${esc(statement)}</p><p>${esc(r.description)}</p>` +
        `</main></div>`,
    }),
  )
}

console.log(`[prerender] 기사 ${CASES.length}개 HTML + 홈 + /news + 방 ${ROOM_KEYS.length}개 생성 완료`)
