import { NavLink } from 'react-router-dom'
import Icon from '../ui/Icon'
import './BottomNav.css'

// 모바일 하단 탭 바 — 피드 / 미제사건 분리 탭
const tabs = [
  { to: '/', label: '사건사고', icon: 'newspaper', end: true },
  { to: '/cold-cases', label: '미제사건', icon: 'folder_special', end: false },
  { to: '/archive', label: '지난기록', icon: 'inventory_2', end: false },
]

export default function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="하단 탭">
      {tabs.map((t) => (
        <NavLink
          key={t.to}
          to={t.to}
          end={t.end}
          className={({ isActive }) =>
            'bottom-nav__tab' + (isActive ? ' is-active' : '')
          }
        >
          <Icon name={t.icon} size={26} />
          <span>{t.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
