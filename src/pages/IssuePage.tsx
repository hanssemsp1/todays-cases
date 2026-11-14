import { useMemo, useState } from 'react'
import type { CaseCategory } from '../types'
import { CASES, CATEGORY_META, ISSUE_CATEGORIES } from '../data/cases'
import { ISSUES } from '../data/issues'
import FeedStory from '../components/case/FeedStory'
import SearchBar from '../components/ui/SearchBar'
import Icon from '../components/ui/Icon'
import './FeedPage.css'

type FilterCat = 'all' | CaseCategory
const CATS: FilterCat[] = ['all', ...ISSUE_CATEGORIES]

// ✨ 이슈·미스터리 — 연예·스포츠 + 미스터리·괴담 별도 탭
export default function IssuePage() {
  const [query, setQuery] = useState('')
  const [cat, setCat] = useState<FilterCat>('all')

  const list = useMemo(() => {
    const q = query.trim().toLowerCase()
    return [...ISSUES, ...CASES.filter((c) => ISSUE_CATEGORIES.includes(c.category))]
      .filter((c) => {
        const matchCat = cat === 'all' || c.category === cat
        const matchQuery =
          !q ||
          c.title.toLowerCase().includes(q) ||
          c.summary.toLowerCase().includes(q) ||
          c.region.toLowerCase().includes(q)
        return matchCat && matchQuery
      })
      .sort((a, b) =>
        (b.date + (b.time ?? '')).localeCompare(a.date + (a.time ?? '')),
      )
  }, [query, cat])

  const showLead = !query.trim() && cat === 'all' && list.length > 0
  const stories = showLead ? list.slice(1) : list

  return (
    <div className="feed">
      {/* 히어로 */}
      <section className="feed__hero container">
        <h1 className="feed__title">
          이슈·미스터리
        </h1>
        <p className="feed__subtitle">
          연예·스포츠 소식과 설명되지 않은 이야기들.
        </p>
      </section>

      {showLead && (
        <section className="feed__hero container" aria-label="대표 이슈">
          <FeedStory item={list[0]} featured />
        </section>
      )}

      <section className="container">
        <div className="feed__controls">
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="키워드 · 지역으로 검색"
        />
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
              aria-pressed={active}
            >
              {label}
            </button>
          )
        })}
      </section>

      <section className="feed__list container">
        <p className="feed__count">{list.length}건</p>
        {list.length > 0 ? (
          stories.map((item) => <FeedStory key={item.id} item={item} />)
        ) : (
          <div className="feed__empty">
            <Icon name="search_off" size={48} />
            <p>아직 올라온 이슈가 없어요.</p>
            <p style={{ fontSize: 13 }}>
              사건사고 탭에서 오늘의 소식을 확인해 보세요.
            </p>
          </div>
        )}
      </section>
    </div>
  )
}
