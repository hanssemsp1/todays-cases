import { Link } from 'react-router-dom'
import type { CaseItem } from '../../types'
import { CATEGORY_META } from '../../data/cases'
import { parseYouTubeId, youTubeThumb } from '../../lib/youtube'
import Icon from '../ui/Icon'
import { CategoryBadge, BreakingBadge } from '../ui/Badge'
import './CaseCard.css'

// 뉴스형 사건 카드 — 카드 전체가 상세로 연결.
// 미디어 우선순위: 방송 영상(썸네일+▶) → 실제 사진 → 카테고리 커버
export default function CaseCard({
  item,
  featured = false,
}: {
  item: CaseItem
  featured?: boolean
}) {
  const meta = CATEGORY_META[item.category]
  const ytId = parseYouTubeId(item.videoUrl)

  return (
    <Link
      to={`/case/${item.id}`}
      className={'case-card card' + (featured ? ' case-card--featured' : '')}
    >
      {featured && (
        <span className="case-card__topnews">🔴 오늘의 톱뉴스</span>
      )}
      {/* ── 헤더: 카테고리 아바타 + 출처/지역/시간 ── */}
      <header className="case-card__head">
        <span className="case-card__avatar" style={{ background: meta.color }}>
          <Icon name={meta.icon} size={16} />
        </span>
        <div className="case-card__meta">
          <span className="case-card__source">{item.source}</span>
          <span className="case-card__loc">
            <Icon name="location_on" size={12} />
            {item.region} · {item.date}
            {item.time ? ` ${item.time}` : ''}
          </span>
        </div>
        {item.isBreaking && <BreakingBadge />}
      </header>

      {/* ── 미디어: 영상 썸네일 → 사진 → 카테고리 커버 ── */}
      <div className="case-card__media">
        {ytId ? (
          <>
            <img src={youTubeThumb(ytId)} alt="" loading="lazy" />
            <span className="case-card__play" aria-hidden="true">
              <Icon name="play_arrow" size={30} />
            </span>
            <span className="case-card__video-tag">
              <Icon name="smart_display" size={13} /> 영상
            </span>
          </>
        ) : item.image ? (
          <img src={item.image} alt="" loading="lazy" />
        ) : (
          <span
            className="case-card__cover"
            style={{ background: `linear-gradient(135deg, ${meta.color}, #262626)` }}
          >
            <Icon name={meta.icon} size={30} />
            <span className="case-card__cover-label">{meta.label}</span>
          </span>
        )}
        <span className="case-card__cat">
          <CategoryBadge category={item.category} />
        </span>
      </div>

      {/* ── 본문: 제목 + 요약 + CTA ── */}
      <div className="case-card__body">
        <h3 className="case-card__title">{item.title}</h3>
        <p className="case-card__summary">{item.summary}</p>
        <span className="case-card__more">
          자세히 보기 <Icon name="arrow_forward" size={16} />
        </span>
      </div>
    </Link>
  )
}
