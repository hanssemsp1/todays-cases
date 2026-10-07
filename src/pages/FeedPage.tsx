import { Fragment, useMemo, useState } from 'react'
import type { CaseCategory } from '../types'
import { KR_CASES, CATEGORY_META } from '../data/cases'
import CaseCard from '../components/case/CaseCard'
import SearchBar from '../components/ui/SearchBar'
import Icon from '../components/ui/Icon'
import AdSlot from '../components/ui/AdSlot'
import { AD_SLOTS } from '../lib/ads'
import { byRecent, daysAgo, shortDate } from '../lib/caseDate'
import './FeedPage.css'

type SortKey = 'latest' | 'popular'
type FilterCat = 'all' | CaseCategory

// 첫 화면은 우리나라 사건. 종류를 가리지 않으므로 칩도 전부 둔다.
const CATS: FilterCat[] = [
  'all',
  'murder',
  'missing',
  'mystery',
  'traffic',
  'dui',
  'fire',
  'disaster',
  'medical',
  'drug',
  'sexcrime',
  'abuse',
  'fraud',
  'etc',
]

export default function FeedPage() {
  const [query, setQuery] = useState('')
  const [cat, setCat] = useState<FilterCat>('all')
  const [sort, setSort] = useState<SortKey>('latest')

  const list = useMemo(() => {
    const q = query.trim().toLowerCase()
    const result = KR_CASES.filter((c) => {
      const matchCat = cat === 'all' || c.category === cat
      const matchQuery =
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.summary.toLowerCase().includes(q) ||
        c.region.toLowerCase().includes(q)
      return matchCat && matchQuery
    })
    return [...result].sort((a, b) =>
      sort === 'popular' ? b.likes - a.likes : byRecent(a, b),
    )
  }, [query, cat, sort])

  const plain = !query.trim() && cat === 'all'

  // 최근(일주일 이내) 사건과 지난 사건을 갈라 놓는다.
  // 첫 화면은 「가까운 날짜의 우리나라 사건」이 먼저 보여야 한다.
  const recent = useMemo(
    () => (plain ? list.filter((c) => daysAgo(c.occurredDate) <= 7) : list),
    [list, plain],
  )
  const older = useMemo(
    () => (plain ? list.filter((c) => daysAgo(c.occurredDate) > 7) : []),
    [list, plain],
  )

  const todayLabel = shortDate(new Date().toISOString().slice(0, 10))

  return (
    <div className="feed">
      {/* 히어로 */}
      <section className="feed__hero container">
        <h1 className="feed__title">
          오늘의 <span className="grad-text">사건사고</span>
        </h1>
        <p className="feed__subtitle">
          {todayLabel} · 우리나라에서 일어난 사건을 한 곳에서.
        </p>
        <p className="feed__creed">
          살인·실종·미제부터 큰 교통사고·화재·음주운전·마약·의료사고·재난까지.
          <br />
          사실만, 빠짐없이.
        </p>
      </section>

      {/* 검색 + 정렬 */}
      <section className="feed__controls container">
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="키워드 · 지역으로 검색 (예: 화재, 강남)"
        />
        <div className="feed__sort">
          <button
            className={'feed__sort-btn' + (sort === 'latest' ? ' is-active' : '')}
            onClick={() => setSort('latest')}
          >
            <Icon name="schedule" size={18} /> 최신순
          </button>
          <button
            className={'feed__sort-btn' + (sort === 'popular' ? ' is-active' : '')}
            onClick={() => setSort('popular')}
          >
            <Icon name="trending_up" size={18} /> 관심순
          </button>
        </div>
      </section>

      {/* 카테고리 필터 칩 */}
      <section className="feed__chips container" aria-label="분류 거르기">
        {CATS.map((c) => {
          const label = c === 'all' ? '전체' : CATEGORY_META[c].label
          const active = cat === c
          return (
            <button
              key={c}
              className={'feed__chip' + (active ? ' is-active' : '')}
              onClick={() => setCat(c)}
            >
              {c !== 'all' && <Icon name={CATEGORY_META[c].icon} size={16} />}
              {label}
            </button>
          )
        })}
      </section>

      {/* 피드 목록 */}
      <section className="feed__list container">
        {plain ? (
          <>
            {recent.length > 0 ? (
              <>
                <p className="feed__count">최근 일주일 · {recent.length}건</p>
                <CaseCard key={recent[0].id} item={recent[0]} featured />
                {recent.slice(1).map((item, i) => (
                  <Fragment key={item.id}>
                    <CaseCard item={item} />
                    {(i + 1) % 6 === 0 && <AdSlot slot={AD_SLOTS.feed} />}
                  </Fragment>
                ))}
              </>
            ) : (
              <div className="feed__empty">
                <Icon name="schedule" size={48} />
                <p>최근 일주일 사이 올라온 사건이 없어요.</p>
              </div>
            )}

            {older.length > 0 && (
              <>
                <div className="feed__divider">
                  <span>다시 보는 사건</span>
                </div>
                <p className="feed__note">
                  날짜는 지났지만 지금 다시 봐야 할 이유가 있는 사건들.
                </p>
                {older.map((item) => (
                  <CaseCard key={item.id} item={item} />
                ))}
              </>
            )}
          </>
        ) : list.length > 0 ? (
          <>
            <p className="feed__count">{list.length}건</p>
            {list.map((item) => (
              <CaseCard key={item.id} item={item} />
            ))}
          </>
        ) : (
          <div className="feed__empty">
            <Icon name="search_off" size={48} />
            <p>검색 결과가 없어요.</p>
          </div>
        )}
      </section>
    </div>
  )
}
