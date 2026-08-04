import { useEffect } from 'react'
import { AD_CLIENT } from '../../lib/ads'
import './AdSlot.css'

declare global {
  interface Window {
    adsbygoogle?: unknown[]
  }
}

// 애드센스 디스플레이 광고 자리. slot(광고 단위 번호)이 비어 있으면 아무것도 렌더링하지 않음.
// 승인 후 src/lib/ads.ts 의 AD_SLOTS 에 번호를 채우면 광고가 표시됩니다.
export default function AdSlot({ slot, className = '' }: { slot?: string; className?: string }) {
  useEffect(() => {
    if (!slot) return
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch {
      /* 스크립트 미로드 등은 무시 */
    }
  }, [slot])

  if (!slot) return null

  return (
    <div className={'ad-slot ' + className}>
      <span className="ad-slot__label">광고</span>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={AD_CLIENT}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}
