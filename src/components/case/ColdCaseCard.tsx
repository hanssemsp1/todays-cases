import type { ColdCaseItem } from '../../types'
import { COLD_STATUS_META } from '../../data/coldCases'
import Icon from '../ui/Icon'
import VideoEmbed from '../ui/VideoEmbed'
import './ColdCaseCard.css'

// 미제사건 파일 카드 — 수사 파일(도시에) 느낌
export default function ColdCaseCard({ item }: { item: ColdCaseItem }) {
  const status = COLD_STATUS_META[item.status]

  return (
    <article className="cold-card card">
      {/* 파일 상단 탭 (폴더 느낌) */}
      <div className="cold-card__filetab">
        <Icon name="folder_special" size={16} />
        <span className="cold-card__no">{item.caseNo}</span>
        <span className="cold-card__status" style={{ color: status.color }}>
          <Icon name={status.icon} size={14} />
          {status.label}
        </span>
      </div>

      <div className="cold-card__inner">
        {/* 좌측 미제 인장 */}
        <div className="cold-card__stamp" style={{ borderColor: status.color, color: status.color }}>
          <Icon name="fingerprint" size={30} />
          <span>미제</span>
        </div>

        {/* 우측 내용 */}
        <div className="cold-card__content">
          <h3 className="cold-card__title">{item.title}</h3>
          <div className="cold-card__facts">
            <span>
              <Icon name="event" size={14} /> 발생 {item.occurredDate}
            </span>
            <span>
              <Icon name="location_on" size={14} /> {item.region}
            </span>
          </div>
          <p className="cold-card__summary">{item.summary}</p>

          <div className="cold-card__tags">
            {item.tags.map((t) => (
              <span key={t} className="cold-card__tag">
                #{t}
              </span>
            ))}
          </div>

          {item.reward ? (
            <div className="cold-card__reward">
              <Icon name="paid" size={16} />
              현상금 {item.reward.toLocaleString()}원
            </div>
          ) : null}
        </div>
      </div>

      {/* 이 사건을 다룬 시사프로그램 영상 (있을 때) */}
      {item.videoUrl && (
        <div className="cold-card__video">
          <VideoEmbed url={item.videoUrl} label="관련 방송 다시보기" />
        </div>
      )}
    </article>
  )
}
