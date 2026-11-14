import { Link } from 'react-router-dom'
import type { CaseItem } from '../../types'
import { CATEGORY_META } from '../../data/cases'
import { parseYouTubeId, youTubeThumb } from '../../lib/youtube'
import Icon from '../ui/Icon'
import '../../pages/FeedPage.css'

export default function FeedStory({
  item,
  featured = false,
  showBreaking = item.isBreaking,
}: {
  item: CaseItem
  featured?: boolean
  showBreaking?: boolean
}) {
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
          {showBreaking && <span className="feed__category">속보</span>}
          {!featured && <span>{item.region}</span>}
        </div>
        {title}
        {featured && <p className="feed__summary">{item.summary}</p>}
        <div className="feed__meta">
          {featured && <><span>{item.source}</span><span>{item.region}</span></>}
          <time dateTime={item.date}>{dateLabel}</time>
          {item.time && <span>{item.time}</span>}
          {!featured && (videoId || item.insight) && <span>{[videoId && '영상', item.insight && '해설'].filter(Boolean).join(' · ')}</span>}
        </div>
        {featured && <span className="feed__read">{['기사', videoId && '영상', item.insight && '해설'].filter(Boolean).join(' · ') + ' 보기'} <span aria-hidden="true">↗</span></span>}
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

