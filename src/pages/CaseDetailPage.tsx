import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { CASES, CATEGORY_META } from '../data/cases'
import { downloadShareCard } from '../lib/shareCard'
import { parseYouTubeId, youTubeEmbed } from '../lib/youtube'
import AdSlot from '../components/ui/AdSlot'
import { AD_SLOTS } from '../lib/ads'
import Icon from '../components/ui/Icon'
import { CategoryBadge, BreakingBadge } from '../components/ui/Badge'
import './CaseDetailPage.css'

// 사건 상세 + 공유 카드 다운로드 / 링크 복사 (A안: 프론트만)
export default function CaseDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const item = CASES.find((c) => c.id === id)

  const [downloading, setDownloading] = useState(false)
  const [copied, setCopied] = useState(false)

  if (!item) {
    return (
      <div className="container detail__notfound">
        <Icon name="search_off" size={48} />
        <p>존재하지 않는 사건이에요.</p>
        <Link to="/" className="btn">
          피드로 돌아가기
        </Link>
      </div>
    )
  }

  const meta = CATEGORY_META[item.category]

  // 공유 카드 이미지 다운로드 → 카카오톡 등에 첨부
  const handleDownload = async () => {
    try {
      setDownloading(true)
      await downloadShareCard(item)
    } catch (e) {
      alert('이미지 생성에 실패했어요. 다시 시도해 주세요.')
      console.error(e)
    } finally {
      setDownloading(false)
    }
  }

  // 링크 복사
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      alert('링크 복사에 실패했어요.')
    }
  }

  // 기기 기본 공유 시트 (모바일에서 카카오톡 선택 가능)
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: item.title,
          text: item.summary,
          url: window.location.href,
        })
      } catch {
        /* 사용자가 취소 */
      }
    } else {
      handleCopy()
    }
  }

  return (
    <div className="detail">
      {/* 상단 바 */}
      <div className="detail__topbar container">
        <button className="detail__back" onClick={() => navigate(-1)} aria-label="뒤로">
          <Icon name="arrow_back" />
        </button>
        <span className="detail__topbar-title">사건 상세</span>
      </div>

      <article className="container detail__article">
        {/* 헤더 */}
        <div className="detail__head">
          <span className="detail__avatar" style={{ background: meta.color }}>
            <Icon name={meta.icon} size={22} />
          </span>
          <div className="detail__headmeta">
            <span className="detail__source">{item.source}</span>
            <span className="detail__loc">
              <Icon name="location_on" size={14} />
              {item.region} · {item.date}
              {item.time ? ` ${item.time}` : ''}
            </span>
          </div>
        </div>

        {/* 미디어: 방송 영상 → 사진 → 그라데이션 */}
        {(() => {
          const ytId = parseYouTubeId(item.videoUrl)
          if (ytId) {
            return (
              <div className="detail__video">
                <iframe
                  src={youTubeEmbed(ytId)}
                  title={item.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )
          }
          return (
            <div className="detail__media">
              {item.image ? (
                <img src={item.image} alt={item.title} />
              ) : (
                <span
                  className="detail__thumb"
                  style={{ background: `linear-gradient(135deg, ${meta.color}, #262626)` }}
                >
                  <Icon name={meta.icon} size={88} />
                </span>
              )}
            </div>
          )
        })()}

        {/* 배지 */}
        <div className="detail__badges">
          <CategoryBadge category={item.category} />
          {item.isBreaking && <BreakingBadge />}
        </div>

        {/* 제목 · 본문 */}
        <h1 className="detail__title">{item.title}</h1>
        <p className="detail__summary">{item.summary}</p>
        <p className="detail__content">{item.content}</p>

        {/* 본문 아래 광고 자리 (승인·slot 설정 시 노출) */}
        <AdSlot slot={AD_SLOTS.detail} />

        {/* ── 공유 액션 (A안) ── */}
        <div className="detail__share card">
          <p className="detail__share-title">
            <Icon name="ios_share" size={18} /> 이 사건 공유하기
          </p>
          <p className="detail__share-desc">
            공유 카드 이미지를 저장한 뒤 카카오톡에 첨부하거나, 링크를 복사해 보내세요.
          </p>
          <div className="detail__share-btns">
            <button className="btn btn--grad" onClick={handleDownload} disabled={downloading}>
              <Icon name="download" size={18} />
              {downloading ? '카드 만드는 중…' : '공유 카드 저장'}
            </button>
            <button className="btn btn--ghost" onClick={handleCopy}>
              <Icon name={copied ? 'check' : 'link'} size={18} />
              {copied ? '복사됨!' : '링크 복사'}
            </button>
            <button className="btn btn--ghost" onClick={handleNativeShare}>
              <Icon name="send" size={18} />
              공유
            </button>
          </div>
          <p className="detail__share-hint">
            💡 저장한 이미지를 카카오톡 채팅방에 그대로 올리면 사건 카드가 공유돼요.
          </p>
        </div>

        {/* 출처 */}
        {item.sourceUrl && (
          <a
            className="detail__source-link"
            href={item.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="open_in_new" size={16} />
            원문 보기 · {item.source}
          </a>
        )}

        {/* 면책 */}
        <p className="detail__disclaimer">
          ※ 공개 언론 보도를 요약·재구성한 정보입니다. 정확한 내용은 원문 출처를 확인해 주세요.
        </p>
      </article>
    </div>
  )
}
