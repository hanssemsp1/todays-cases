import { useMemo, useState } from 'react'
import type { CaseCategory } from '../types'
import { WORLD_CASES, CATEGORY_META } from '../data/cases'
import CaseCard from '../components/case/CaseCard'
import SearchBar from '../components/ui/SearchBar'
import Icon from '../components/ui/Icon'
import { byRecent } from '../lib/caseDate'
import './FeedPage.css'

type FilterCat = 'all' | CaseCategory

// 🌐 해외토픽 — 해외 연쇄살인범, 외국에서 일어나는 범죄.
// 국내 사건과 섞이지 않게 탭을 따로 둔다.
const CATS: FilterCat[] = [
  'all',
  'murder',
  'missing',
  'mystery',
  'traffic',
  'fire',
  'disaster',
  'drug',
  'sexcrime',
  'abuse',
  'fraud',
  'etc',
]

export default function WorldPage() {
  const [query, setQuery] = useState('')
  const [cat, setCat] = useState<FilterCat>('all')

  const list = useMemo(() => {
    const q = query.trim().toLowerCase()
    return WORLD_CASES.filter((c) => {
      const matchCat = cat === 'all' || c.category === cat
      const matchQuery =
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.summary.toLowerCase().includes(q) ||
        c.region.toLowerCase().includes(q)
      return matchCat && matchQuery
    }).sort(byRecent)
  }, [query, cat])

  // 칩은 실제로 사건이 있는 분류만 보여준다 (빈 칩을 누르는 헛걸음 방지)
  const usable = CATS.filter(
    (c) => c === 'all' || WORLD_CASES.some((x) => x.category === c),
  )

  return (
    <div className="feed">
      <section className="feed__hero container">
        <h1 className="feed__title">
          해외 <span className="grad-text">토픽</span>
        </h1>
        <p className="feed__subtitle">
          바다 건너에서 일어난 사건. 연쇄살인범, 미스터리, 대형 참사.
        </p>
      </section>

      <section className="feed__controls container">
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="나라 · 키워드로 검색 (예: 미국, 연쇄)"
        />
      </section>

      <section className="feed__chips container" aria-label="분류 거르기">
        {usable.map((c) => {
          const label = c === 'all' ? '전체' : CATEGORY_META[c].label
          return (
            <button
              key={c}
              className={'feed__chip' + (cat === c ? ' is-active' : '')}
              onClick={() => setCat(c)}
            >
              {c !== 'all' && <Icon name={CATEGORY_META[c].icon} size={16} />}
              {label}
            </button>
          )
        })}
      </section>

      <section className="feed__list container">
        <p className="feed__count">{list.length}건</p>
        {list.length > 0 ? (
          list.map((item) => <CaseCard key={item.id} item={item} />)
        ) : (
          <div className="feed__empty">
            <Icon name="public_off" size={48} />
            <p>아직 올라온 해외 사건이 없어요.</p>
          </div>
        )}
      </section>
    </div>
  )
}
