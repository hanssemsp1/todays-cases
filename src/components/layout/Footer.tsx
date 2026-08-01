import { Link } from 'react-router-dom'
import './Footer.css'

// 하단 푸터 — 정보성 안내 + 정책/소개 링크 (애드센스 심사 대응)
export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="container">
        <p className="app-footer__brand grad-text">오늘의 사건사고</p>
        <p className="app-footer__desc">
          그날그날의 사건·사고를 한 곳에서. 본 서비스의 사건 정보는 공개 언론 보도를
          요약·재구성한 것으로, 정확한 내용은 각 원문 출처를 확인해 주세요.
        </p>

        {/* 정책·소개 링크 (심사 신뢰도) */}
        <nav className="app-footer__nav" aria-label="사이트 정보">
          <Link to="/about">소개</Link>
          <span aria-hidden="true">·</span>
          <Link to="/privacy">개인정보처리방침</Link>
          <span aria-hidden="true">·</span>
          <Link to="/contact">문의</Link>
        </nav>

        <div className="app-footer__links">
          <a className="app-footer__link" href="/rss.xml" target="_blank" rel="noopener">
            <span className="icon">rss_feed</span> RSS 구독
          </a>
        </div>
        <p className="app-footer__copy">© 2026 오늘의 사건사고</p>
      </div>
    </footer>
  )
}
