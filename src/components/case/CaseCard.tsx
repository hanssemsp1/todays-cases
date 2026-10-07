import { Link } from 'react-router-dom'
import type { CaseItem } from '../../types'
import { catMeta } from '../../data/cases'
import { parseYouTubeId, youTubeThumb } from '../../lib/youtube'
import { occurredLabel, fullDate, isOldCase } from '../../lib/caseDate'
import Icon from '../ui/Icon'
import { CategoryBadge, BreakingBadge } from '../ui/Badge'
import './CaseCard.css'

// 사건 카드 — 카드 전체가 상세로 연결.
// ⭐ 보여주는 날짜는 「올린 날」이 아니라 「사건이 일어난 날」이다.
// 지난 사건이면 발생일을 그대로 적고, 왜 지금 올리는지를 카드에서 바로 말한다.
export default function CaseCard({
  item,
  featured = false,
}: {
  item: CaseItem
  featured?: boolean
}) {
  const meta = catMeta(item.category)
  const ytId = parseYouTubeId(item.videoUrl)
  const occurred = item.occurredDate ?? item.date
  const old = isOldCase(occurred)

  return (
    <Link
      to={`/case/${item.id}`}
      className={'case-card card' + (featured ? ' case-card--featured' : '')}
    >
      {featured && <span className="case-card__topnews">🔴 오늘의 톱뉴스</span>}

      {/* ── 헤더: 분류 아바타 + 출처/지역/발생일 ── */}
      <header className="case-card__head">
        <span className="case-card__avatar" style={{ background: meta.color }}>
          <Icon name={meta.icon} size={16} />
        </span>
        <div className="case-card__meta">
          <span className="case-card__source">{item.source}</span>
          <span className="case-card__loc">
            <Icon name="location_on" size={12} />
            {item.region}
          </span>
        </div>
        {item.isBreaking && <BreakingBadge />}
      </header>

      {/* ── 미디어: 영상 썸네일 → 사진 → 분류 커버 ── */}
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

      {/* ── 본문 ── */}
      <div className="case-card__body">
        {/* 언제 일어난 사건인가 — 제목보다 먼저 온다 */}
        <span
          className={'case-card__when' + (old ? ' is-old' : '')}
          title={fullDate(occurred)}
        >
          <Icon name="event" size={13} />
          {old ? `${fullDate(occurred)} 발생` : `${occurredLabel(occurred)} 발생`}
          {item.time ? ` · ${item.time}` : ''}
        </span>

        <h3 className="case-card__title">{item.title}</h3>

        {/* 지난 사건을 지금 올리는 이유 */}
        {item.whyNow && (
          <p className="case-card__why">
            <Icon name="campaign" size={14} />
            <span>{item.whyNow}</span>
          </p>
        )}

        <p className="case-card__summary">{item.summary}</p>
        <span className="case-card__more">
          자세히 보기 <Icon name="arrow_forward" size={16} />
        </span>
      </div>
    </Link>
  )
}
