import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './CookieConsent.css'

const KEY = 'tc-cookie-consent'

// 쿠키 동의 배너 — 애드센스/개인정보 정책 대응. 동의 시 localStorage에 저장.
export default function CookieConsent() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setShow(true)
    } catch {
      /* localStorage 불가 환경 무시 */
    }
  }, [])

  const accept = () => {
    try {
      localStorage.setItem(KEY, '1')
    } catch {
      /* 무시 */
    }
    setShow(false)
    // 같은 자리를 쓰는 설치 안내에 "이제 떠도 된다"고 알림 (배너 겹침 방지)
    window.dispatchEvent(new Event('tc-cookie-accepted'))
  }

  if (!show) return null

  return (
    <div className="cookie-consent" role="dialog" aria-label="쿠키 사용 안내">
      <p className="cookie-consent__text">
        본 사이트는 이용자 경험 개선과 광고 제공을 위해 쿠키를 사용합니다. 자세한 내용은{' '}
        <Link to="/privacy">개인정보처리방침</Link>을 확인해 주세요.
      </p>
      <button className="btn cookie-consent__btn" onClick={accept}>
        확인
      </button>
    </div>
  )
}
