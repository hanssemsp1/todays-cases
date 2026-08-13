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
    `<article><nav><a href="/">오늘의 사건사고</a> › ${esc(catLabel)}</nav>` +
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

// 홈: 최신 헤드라인 목록을 #root 에 심어 크롤러가 콘텐츠를 읽게 함
const recent = [...CASES]
  .sort((a, b) => (b.date + (b.time || '')).localeCompare(a.date + (a.time || '')))
  .slice(0, 20)
const homeBody =
  `<main><h1>오늘의 사건사고</h1>` +
  `<p>매일 국내외 사건·사고와 장기 미제사건을 요약·방송영상·출처와 함께 전합니다.</p><ul>` +
  recent
    .map((c) => `<li><a href="/case/${c.id}">${esc(c.title)}</a> <small>${esc(c.date)}</small></li>`)
    .join('') +
  `</ul></main>`
const home = tpl.replace('<div id="root"></div>', `<div id="root">${homeBody}</div>`)
writeFileSync(join(dist, 'index.html'), home)

console.log(`[prerender] 기사 ${CASES.length}개 HTML + 홈 생성 완료`)
