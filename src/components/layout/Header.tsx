import { Link } from 'react-router-dom'
import Icon from '../ui/Icon'
import './Header.css'

// 상단 헤더 — 인스타풍 얇은 바 + 그라데이션 로고
export default function Header() {
  return (
    <header className="app-header">
      <div className="container app-header__inner">
        <Link to="/" className="app-header__logo">
          <span className="grad-text">오늘의 사건사고</span>
        </Link>
        <nav className="app-header__actions" aria-label="상단 메뉴">
          <Link to="/" className="app-header__icon-btn" aria-label="홈">
            <Icon name="home" />
          </Link>
          <Link to="/cold-cases" className="app-header__icon-btn" aria-label="미제사건 파일">
            <Icon name="folder_special" />
          </Link>
        </nav>
      </div>
    </header>
  )
}
