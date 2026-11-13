import { Link, NavLink, useLocation } from 'react-router-dom'
import Icon from '../ui/Icon'
import './Header.css'

// 상단 메뉴 — 아이콘 아래 글자를 붙여 무엇인지 바로 알 수 있게 (미제 = 지문)
const items = [
  { to: '/', label: '홈', icon: 'home', end: true },
  { to: '/issues', label: '이슈', icon: 'auto_awesome', end: false },
  { to: '/cold-cases', label: '미제', icon: 'fingerprint', end: false },
  { to: '/records', label: '기록', icon: 'inventory_2', end: false },
]

// 상단 헤더 — 인스타풍 얇은 바 + 그라데이션 로고
export default function Header() {
  const isHome = useLocation().pathname === '/'
  return (
    <header className={isHome ? 'app-header app-header--home' : 'app-header'}>
      <div className="container app-header__inner">
        <Link to="/" className="app-header__logo">
          <span className={isHome ? undefined : 'grad-text'}>오늘의 사건 뉴스</span>
        </Link>
        <nav className="app-header__actions" aria-label="상단 메뉴">
          {items.map((t) => (
            <NavLink
              key={t.to}
              to={t.to}
              end={t.end}
              className={({ isActive }) =>
                'app-header__icon-btn' + (isActive ? ' is-active' : '')
              }
              aria-label={isHome && t.to === '/cold-cases' ? '미제사건' : t.label}
            >
              <Icon name={t.icon} size={22} />
              <span className="app-header__icon-label">{isHome && t.to === '/cold-cases' ? '미제사건' : t.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
