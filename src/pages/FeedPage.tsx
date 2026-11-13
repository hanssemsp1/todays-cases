import { Fragment, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import type { CaseCategory, CaseItem } from '../types'
import { CASES, CATEGORY_META, ISSUE_CATEGORIES } from '../data/cases'
import { parseYouTubeId, youTubeThumb } from '../lib/youtube'
import SearchBar from '../components/ui/SearchBar'
import Icon from '../components/ui/Icon'
import AdSlot from '../components/ui/AdSlot'
import { AD_SLOTS } from '../lib/ads'
import './FeedPage.css'

type SortKey = 'latest' | 'popular'
type FilterCat = 'all' | CaseCategory

// 연예·스포츠(showbiz)와 미스터리·괴담(mystery)은 「이슈·미스터리」 탭으로 분리됐다
const CATS: FilterCat[] = [
  'all',
  'crime',
  'traffic',
  'fire',
  'disaster',
  'world',
  'etc',
]

function FeedStory({ item, featured = false }: { item: CaseItem; featured?: boolean }) {
  const videoId = parseYouTubeId(item.videoUrl)
  const image = videoId ? youTubeThumb(videoId) : item.image
  const category = CATEGORY_META[item.category].label
  const date = new Date(item.date + 'T00:00:00+09:00')
  const dateLabel = date.toLocaleDateString('ko-KR', {
    timeZone: 'Asia/Seoul',
    ...(featured ? { year: 'numeric', weekday: 'long' } : {}),
    month: 'long',
    day: 'numeric',
  })
  const title = featured ? <h1>{item.title}</h1> : <h3>{item.title}</h3>

  return (
    <Link to={`/case/${item.id}`} className={featured ? 'feed__lead' : 'feed__story'}>
      <div className="feed__story-copy">
        <div className="feed__meta">
          <span className="feed__category">{category}</span>
          {item.isBreaking && <span className="feed__category">속보</span>}
          {!featured && <span>{item.region}</span>}
        </div>
        {title}
        {featured && <p className="feed__summary">{item.summary}</p>}
        <div className="feed__meta">
          {featured && <><span>{item.source}</span><span>{item.region}</span></>}
          <time dateTime={item.date}>{dateLabel}</time>
          {item.time && <span>{item.time}</span>}
          {!featured && videoId && <span>영상</span>}
        </div>
        {featured && <span className="feed__read">{videoId ? '기사와 영상 보기' : '기사 보기'} <span aria-hidden="true">↗</span></span>}
      </div>
      {image && (
        <div className="feed__media">
          <img src={image} alt="" loading={featured ? 'eager' : 'lazy'} />
          {featured && videoId && <span className="feed__play" aria-hidden="true"><Icon name="play_arrow" size={27} /></span>}
        </div>
      )}
    </Link>
  )
}

// 🏠 오늘의 사건사고 피드 — 검색 + 카테고리 필터 + 정렬 (소규모라 클라이언트 필터)
export default function FeedPage() {
  const [query, setQuery] = useState('')
  const [cat, setCat] = useState<FilterCat>('all')
  const [sort, setSort] = useState<SortKey>('latest')

  const list = useMemo(() => {
    const q = query.trim().toLowerCase()
    let result = CASES.filter((c) => {
      // 이슈·미스터리 탭 소관 카테고리는 메인 피드에서 제외
      if (ISSUE_CATEGORIES.includes(c.category)) return false
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

  const showLead = !query.trim() && cat === 'all' && list.length > 0
  const stories = showLead ? list.slice(1) : list

  return (
    <div className="feed">
      {showLead && (
        <section className="feed__hero container" aria-label="대표 기사">
          <p className="feed__edition">{sort === 'latest' ? '오늘의 주요 뉴스' : '인기 뉴스'}</p>
          <FeedStory item={list[0]} featured />
        </section>
      )}

      <section className="feed__list container" aria-labelledby="feed-list-title">
        <div className="feed__controls">
          {showLead
            ? <h2 id="feed-list-title">{sort === 'latest' ? '최신 사건' : '인기 사건'}</h2>
            : <h1 id="feed-list-title">{query.trim() ? '검색 결과' : cat === 'all' ? '최신 사건' : CATEGORY_META[cat].label}</h1>}
          <SearchBar
            value={query}
            onChange={setQuery}
            placeholder="키워드 · 지역으로 검색 (예: 화재, 강남)"
          />
          <div className="feed__sort" role="group" aria-label="기사 정렬">
            <button
              className={'feed__sort-btn' + (sort === 'latest' ? ' is-active' : '')}
              onClick={() => setSort('latest')}
              aria-pressed={sort === 'latest'}
            >
              <Icon name="schedule" size={18} /> 최신순
            </button>
            <button
              className={'feed__sort-btn' + (sort === 'popular' ? ' is-active' : '')}
              onClick={() => setSort('popular')}
              aria-pressed={sort === 'popular'}
            >
              <Icon name="trending_up" size={18} /> 인기순
            </button>
          </div>
        </div>

        {/* 카테고리 필터 칩 */}
        <div className="feed__chips" role="group" aria-label="카테고리 필터">
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
        </div>

        <p className="feed__count" role="status">{list.length}건</p>
        {stories.map((item, i) => (
          <Fragment key={item.id}>
            <FeedStory item={item} />
            {showLead && (i + 1) % 6 === 0 && <AdSlot slot={AD_SLOTS.feed} />}
          </Fragment>
        ))}
        {list.length === 0 && (
          <div className="feed__empty">
            <Icon name="search_off" size={48} />
            <p>검색 결과가 없어요.</p>
          </div>
        )}
      </section>
      <aside className="feed__archive container">
        <div>
          <h2>미제사건</h2>
          <p>아직 풀리지 않은 사건의 기록</p>
        </div>
        <Link to="/cold-cases">미제사건 보기 ↗</Link>
      </aside>
    </div>
  )
}
