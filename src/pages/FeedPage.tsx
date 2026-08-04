import { useMemo, useState } from 'react'
import type { CaseCategory } from '../types'
import { CASES, CATEGORY_META } from '../data/cases'
import CaseCard from '../components/case/CaseCard'
import SearchBar from '../components/ui/SearchBar'
import Icon from '../components/ui/Icon'
import './FeedPage.css'

type SortKey = 'latest' | 'popular'
type FilterCat = 'all' | CaseCategory

const CATS: FilterCat[] = [
  'all',
  'crime',
  'traffic',
  'fire',
  'disaster',
  'showbiz',
  'world',
  'mystery',
  'etc',
]

// 🏠 오늘의 사건사고 피드 — 검색 + 카테고리 필터 + 정렬 (소규모라 클라이언트 필터)
export default function FeedPage() {
  const [query, setQuery] = useState('')
  const [cat, setCat] = useState<FilterCat>('all')
  const [sort, setSort] = useState<SortKey>('latest')

  const list = useMemo(() => {
    const q = query.trim().toLowerCase()
    let result = CASES.filter((c) => {
      const matchCat = cat === 'all' || c.category === cat
      const matchQuery =
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.summary.toLowerCase().includes(q) ||
        c.region.toLowerCase().includes(q)
      return matchCat && matchQuery
    })
    result = [...result].sort((a, b) => {
      if (sort === 'popular') return b.likes - a.likes
      // latest: 날짜 + 시간 내림차순
      return (b.date + (b.time ?? '')).localeCompare(a.date + (a.time ?? ''))
    })
    return result
  }, [query, cat, sort])

  return (
    <div className="feed">
      {/* 히어로 */}
      <section className="feed__hero container">
        <h1 className="feed__title">
          오늘의 <span className="grad-text">사건사고</span>
        </h1>
        <p className="feed__subtitle">그날그날의 사건·사고를 한 곳에서.</p>
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
            <Icon name="trending_up" size={18} /> 인기순
          </button>
        </div>
      </section>

      {/* 카테고리 필터 칩 */}
      <section className="feed__chips container" aria-label="카테고리 필터">
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
        <p className="feed__count">{list.length}건</p>
        {list.length > 0 ? (
          !query.trim() && cat === 'all' ? (
            <>
              {/* 맨 위 사건을 '오늘의 톱뉴스'로 크게 강조 */}
              <CaseCard key={list[0].id} item={list[0]} featured />
              {list.slice(1).map((item) => (
                <CaseCard key={item.id} item={item} />
              ))}
            </>
          ) : (
            list.map((item) => <CaseCard key={item.id} item={item} />)
          )
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
