import { NavLink } from 'react-router-dom'
import Icon from '../ui/Icon'
import './BottomNav.css'

// 모바일 하단 탭 바
// 첫 탭은 우리나라 사건. 해외는 따로, 미제도 따로 — 섞지 않는다.
const tabs = [
  { to: '/', label: '우리나라', icon: 'newspaper', end: true },
  { to: '/world', label: '해외토픽', icon: 'public', end: false },
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
