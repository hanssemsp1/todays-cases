// 빌드 시 날짜별 아카이브(public/archive/<date>.json) + index.json 생성.
// 기존 파일과 id 기준으로 병합(append-only) → 40건 상한으로 밀려난 과거 데이터도 보존.
import { build } from 'esbuild'
import {
  readFileSync,
  writeFileSync,
  mkdirSync,
  existsSync,
  readdirSync,
} from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const archiveDir = join(root, 'public', 'archive')
const tmp = join(root, 'node_modules', '.cache', 'gen-archive.data.mjs')

// cases.ts 를 번들해 CASES 데이터를 실제로 불러온다 (타입 import는 esbuild가 제거)
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

const SITE = 'https://www.todaycase.com'

mkdirSync(archiveDir, { recursive: true })

// 이벤트 발생일(date) 기준 그룹핑
const groups = {}
for (const c of CASES) (groups[c.date] ??= []).push(c)

// 날짜별 파일 병합 저장 (기존 + 신규, id 중복 제거)
for (const [date, items] of Object.entries(groups)) {
  const file = join(archiveDir, `${date}.json`)
  let existing = []
  if (existsSync(file)) {
    try {
      existing = JSON.parse(readFileSync(file, 'utf8'))
    } catch {
      existing = []
    }
  }
  const byId = new Map()
  for (const it of existing) byId.set(it.id, it)
  for (const it of items) byId.set(it.id, it)
  writeFileSync(file, JSON.stringify([...byId.values()], null, 2))
}

// 전체 날짜 파일로부터 index.json 재생성 (최신순)
const dates = readdirSync(archiveDir)
  .filter((f) => /^\d{4}-\d{2}-\d{2}\.json$/.test(f))
  .map((f) => f.replace('.json', ''))
  .sort((a, b) => b.localeCompare(a))

const index = dates.map((date) => {
  const items = JSON.parse(readFileSync(join(archiveDir, `${date}.json`), 'utf8'))
  return { date, count: items.length }
})
writeFileSync(join(archiveDir, 'index.json'), JSON.stringify(index, null, 2))

// ── RSS 2.0 피드 생성 (public/rss.xml) ──────────────────────────
const xmlEscape = (s = '') =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

// 최신순 정렬 후 최근 30건
const sorted = [...CASES].sort((a, b) =>
  (b.date + (b.time ?? '')).localeCompare(a.date + (a.time ?? '')),
)
const feedItems = sorted.slice(0, 30)

const toPubDate = (c) => {
  const dt = new Date(`${c.date}T${c.time ?? '09:00'}:00+09:00`)
  return isNaN(dt) ? new Date().toUTCString() : dt.toUTCString()
}

const items = feedItems
  .map((c) => {
    const cat = CATEGORY_META?.[c.category]?.label ?? '사건사고'
    return `    <item>
      <title>${xmlEscape(c.title)}</title>
      <link>${SITE}/case/${c.id}</link>
      <guid isPermaLink="false">${c.id}</guid>
      <category>${xmlEscape(cat)}</category>
      <pubDate>${toPubDate(c)}</pubDate>
      <description><![CDATA[${c.summary}]]></description>
    </item>`
  })
  .join('\n')

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>오늘의 사건사고</title>
    <link>${SITE}</link>
    <description>그날그날의 사건·사고를 한 곳에서. 매일 자동 업데이트됩니다.</description>
    <language>ko</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`
writeFileSync(join(root, 'public', 'rss.xml'), rss)

// ── sitemap.xml 생성 (SEO) ──────────────────────────────────────
const today = new Date().toISOString().slice(0, 10)
const staticUrls = [
  { loc: `${SITE}/`, pri: '1.0', freq: 'daily' },
  { loc: `${SITE}/cold-cases`, pri: '0.8', freq: 'daily' },
  { loc: `${SITE}/issues`, pri: '0.8', freq: 'daily' },
  { loc: `${SITE}/archive`, pri: '0.6', freq: 'daily' },
  { loc: `${SITE}/about`, pri: '0.3', freq: 'monthly' },
  { loc: `${SITE}/privacy`, pri: '0.3', freq: 'yearly' },
  { loc: `${SITE}/contact`, pri: '0.3', freq: 'yearly' },
]
const caseUrls = CASES.map((c) => ({
  loc: `${SITE}/case/${c.id}`,
  pri: '0.7',
  freq: 'weekly',
}))
const urlXml = [...staticUrls, ...caseUrls]
  .map(
    (u) =>
      `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${u.freq}</changefreq>\n    <priority>${u.pri}</priority>\n  </url>`,
  )
  .join('\n')
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlXml}
</urlset>
`
writeFileSync(join(root, 'public', 'sitemap.xml'), sitemap)

// ── promo.xml 생성 (SNS 자동 게시용 후킹 피드) ─────────────────────
// Make.com 등이 이 RSS를 읽어 매일 새 항목(날짜별)을 스레드·인스타에 자동 게시.
// 각 항목: 후킹 문구(description) + 대표 이미지(enclosure=방송영상 썸네일).
const ytId = (url = '') => {
  const m = String(url).match(/[?&]v=([a-zA-Z0-9_-]{11})|youtu\.be\/([a-zA-Z0-9_-]{11})/)
  return m ? m[1] || m[2] : null
}
const mmdd = (d) => `${Number(d.slice(5, 7))}/${Number(d.slice(8, 10))}`
const promoDates = dates.slice(0, 14) // 최근 14일
const promoItems = promoDates
  .map((date) => {
    const dayCases = JSON.parse(readFileSync(join(archiveDir, `${date}.json`), 'utf8'))
    if (!dayCases.length) return ''
    const top = dayCases.slice(0, 3)
    const id = ytId(top[0]?.videoUrl)
    const image = id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : `${SITE}/kakao-banner.png`
    const lines = top.map((c) => `• ${c.title}`).join('\n')
    const hook = `🚨 오늘의 사건사고 (${mmdd(date)})\n\n${lines}\n\n👉 전체 영상으로 보기\n${SITE}\n\n#사건사고 #미제사건 #오늘의뉴스 #todaycase`
    const pub = new Date(`${date}T09:00:00+09:00`).toUTCString()
    return `    <item>
      <title>${xmlEscape(`오늘의 사건사고 (${mmdd(date)})`)}</title>
      <link>${SITE}</link>
      <guid isPermaLink="false">promo-${date}</guid>
      <pubDate>${pub}</pubDate>
      <enclosure url="${image}" type="image/jpeg" />
      <description><![CDATA[${hook}]]></description>
    </item>`
  })
  .filter(Boolean)
  .join('\n')

const promo = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>오늘의 사건사고 · 홍보 피드</title>
    <link>${SITE}</link>
    <description>SNS 자동 게시용 후킹 피드</description>
    <language>ko</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${promoItems}
  </channel>
</rss>
`
writeFileSync(join(root, 'public', 'promo.xml'), promo)

console.log(
  `[gen-archive] ${dates.length}개 날짜, 현재 ${CASES.length}건, RSS ${feedItems.length}건, sitemap ${staticUrls.length + caseUrls.length} URL, promo ${promoDates.length}일`,
)
