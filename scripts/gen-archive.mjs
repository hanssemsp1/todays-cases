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

const SITE = 'https://todays-cases.vercel.app'

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

console.log(
  `[gen-archive] ${dates.length}개 날짜, 현재 ${CASES.length}건, RSS ${feedItems.length}건`,
)
