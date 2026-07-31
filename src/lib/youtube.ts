// 유튜브 URL/ID 파싱 유틸 — 방송 뉴스 영상 임베드용

// 다양한 형태(youtu.be, watch?v=, embed/, 원본 ID)에서 11자리 영상 ID 추출
export function parseYouTubeId(input?: string): string | null {
  if (!input) return null
  const s = input.trim()
  // 이미 순수 11자리 ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(s)) return s
  try {
    const url = new URL(s)
    if (url.hostname.includes('youtu.be')) {
      const id = url.pathname.slice(1)
      return /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : null
    }
    if (url.hostname.includes('youtube.com')) {
      const v = url.searchParams.get('v')
      if (v && /^[a-zA-Z0-9_-]{11}$/.test(v)) return v
      const m = url.pathname.match(/\/(embed|shorts)\/([a-zA-Z0-9_-]{11})/)
      if (m) return m[2]
    }
  } catch {
    /* URL 파싱 실패 */
  }
  return null
}

// 썸네일 (핫링크 잘 되는 유튜브 CDN)
export function youTubeThumb(id: string): string {
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`
}

// 임베드 URL
export function youTubeEmbed(id: string): string {
  return `https://www.youtube.com/embed/${id}?rel=0`
}
