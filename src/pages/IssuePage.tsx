import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import type { CaseCategory, CaseItem } from '../types'
import { CASES, CATEGORY_META, ISSUE_CATEGORIES } from '../data/cases'
import { ISSUES } from '../data/issues'
import { parseYouTubeId, youTubeThumb } from '../lib/youtube'
import Icon from '../components/ui/Icon'
import './FeedPage.css'
import './IssuePage.css'

type FilterCat = 'all' | CaseCategory
const CATS: FilterCat[] = ['all', ...ISSUE_CATEGORIES]

// 이슈 한 편 — 영상(썸네일) 하나, 그 아래 제목과 설명. 홈처럼 대표 기사 · 작은 그림 목록으로 나누지 않는다
// (대표님 2026-11-14: 「이슈 채널은 좀 더 단순하게 · 영상이 있고 설명이 있게」)
function IssueCard({ item }: { item: CaseItem }) {
  const videoId = parseYouTubeId(item.videoUrl)
  const image = videoId ? youTubeThumb(videoId) : item.image
  const dateLabel = new Date(item.date + 'T00:00:00+09:00').toLocaleDateString('ko-KR', {
    timeZone: 'Asia/Seoul',
    month: 'long',
    day: 'numeric',
  })
  return (
    <Link to={`/case/${item.id}`} className="issue-card">
      {image && (
        <div className="issue-card__media">
          <img src={image} alt="" loading="lazy" />
          {videoId && <span className="issue-card__play" aria-hidden="true"><Icon name="play_arrow" size={30} /></span>}
        </div>
      )}
      <div className="issue-card__meta">
        <span className="feed__category">{CATEGORY_META[item.category].label}</span>
        <time dateTime={item.date}>{dateLabel}</time>
      </div>
      <h2>{item.title}</h2>
      <p>{item.summary}</p>
    </Link>
  )
}

// ✨ 이슈·미스터리 — 연예·스포츠 + 미스터리·괴담 별도 탭
export default function IssuePage() {
  const [cat, setCat] = useState<FilterCat>('all')

  const list = useMemo(() => {
    return [...ISSUES, ...CASES.filter((c) => ISSUE_CATEGORIES.includes(c.category))]
      .filter((c) => cat === 'all' || c.category === cat)
      .sort((a, b) =>
        (b.date + (b.time ?? '')).localeCompare(a.date + (a.time ?? '')),
      )
  }, [cat])

  return (
    <div className="feed issue">
      <section className="issue__head container">
        <h1>이슈·미스터리</h1>
        <p>연예·스포츠 소식과 설명되지 않은 이야기들.</p>
        <div className="feed__chips issue__chips" role="group" aria-label="카테고리 필터">
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
      </section>

      <section className="issue__list container">
        {list.length > 0 ? (
          list.map((item) => <IssueCard key={item.id} item={item} />)
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
