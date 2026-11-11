import { useState } from 'react'
import { parseYouTubeId, youTubeThumb, youTubeEmbed } from '../../lib/youtube'
import Icon from './Icon'
import './VideoEmbed.css'

// 유튜브 영상 임베드 (파사드) — 썸네일을 누르면 그 자리에서 재생.
// 목록에 iframe을 미리 여러 개 띄우지 않아 가볍습니다.
export default function VideoEmbed({ url, label }: { url?: string; label?: string }) {
  const id = parseYouTubeId(url)
  const [play, setPlay] = useState(false)
  if (!id) return null

  return (
    <div className="video-embed">
      {play ? (
        <iframe
          src={youTubeEmbed(id) + '&autoplay=1'}
          title={label ?? '영상'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          className="video-embed__thumb"
          onClick={() => setPlay(true)}
          aria-label="영상 재생"
        >
          <img
            src={youTubeThumb(id)}
            alt=""
            decoding="async"
            onError={(e) => {
              // 큰 썸네일이 없으면 작은 썸네일로
              const el = e.currentTarget
              if (!el.dataset.fb) {
                el.dataset.fb = "1"
                el.src = `https://img.youtube.com/vi/${id}/mqdefault.jpg`
              }
            }}
          />
          <span className="video-embed__play">
            <Icon name="play_arrow" size={32} />
          </span>
          {label && (
            <span className="video-embed__label">
              <Icon name="smart_display" size={14} /> {label}
            </span>
          )}
        </button>
      )}
    </div>
  )
}
