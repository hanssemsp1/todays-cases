import { Link, useNavigate } from 'react-router-dom'
import type { CaseItem } from '../../types'
import { CATEGORY_META } from '../../data/cases'
import Icon from '../ui/Icon'
import { CategoryBadge, BreakingBadge } from '../ui/Badge'
import './CaseCard.css'

// 인스타 피드형 사건 카드 (큰 이미지)
export default function CaseCard({ item }: { item: CaseItem }) {
  const meta = CATEGORY_META[item.category]
  const navigate = useNavigate()

  return (
    <article className="case-card card">
      {/* ── 헤더: 카테고리 아바타 + 출처/지역/시간 ── */}
      <header className="case-card__head">
        <span className="case-card__avatar" style={{ background: meta.color }}>
          <Icon name={meta.icon} size={18} />
        </span>
        <div className="case-card__meta">
          <span className="case-card__source">{item.source}</span>
          <span className="case-card__loc">
            <Icon name="location_on" size={13} />
            {item.region} · {item.date}
            {item.time ? ` ${item.time}` : ''}
          </span>
        </div>
        {item.isBreaking && <BreakingBadge />}
      </header>

      {/* ── 대표 이미지 (없으면 카테고리 그라데이션 썸네일) ── */}
      <Link to={`/case/${item.id}`} className="case-card__media" aria-label={item.title}>
        {item.image ? (
          <img src={item.image} alt={item.title} loading="lazy" />
        ) : (
          <span
            className="case-card__thumb"
            style={{
              background: `linear-gradient(135deg, ${meta.color}, #262626)`,
            }}
          >
            <Icon name={meta.icon} size={64} />
          </span>
        )}
        <span className="case-card__cat">
          <CategoryBadge category={item.category} />
        </span>
      </Link>

      {/* ── 액션 바 (좋아요 / 댓글 / 공유) ── */}
      <div className="case-card__actions">
        <button className="case-card__act" aria-label="좋아요">
          <Icon name="favorite" />
        </button>
        <button
          className="case-card__act"
          aria-label="댓글"
          onClick={() => navigate(`/case/${item.id}`)}
        >
          <Icon name="mode_comment" />
        </button>
        <button
          className="case-card__act"
          aria-label="공유"
          onClick={() => navigate(`/case/${item.id}`)}
        >
          <Icon name="send" />
        </button>
        <button className="case-card__act case-card__act--right" aria-label="저장">
          <Icon name="bookmark" />
        </button>
      </div>

      {/* ── 본문 요약 ── */}
      <div className="case-card__body">
        <span className="case-card__likes">좋아요 {item.likes.toLocaleString()}개</span>
        <Link to={`/case/${item.id}`} className="case-card__title">
          {item.title}
        </Link>
        <p className="case-card__summary">{item.summary}</p>
        <Link to={`/case/${item.id}`} className="case-card__more">
          자세히 보기
        </Link>
        <span className="case-card__comments">댓글 {item.comments}개 모두 보기</span>
      </div>
    </article>
  )
}
