import { Fragment, useEffect } from 'react'
import type { ReactNode, MouseEvent } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ROOM_KEYS, NAV_LABELS, rooms } from './roomsData'
import type { RoomKey } from './roomsData'
import './rooms.css'

// 시안 index.html 의 skip 링크 · masthead · main#content · footer.
// 메인(RoomsHome)과 방(RoomView)이 같이 쓴다. 「디자인 검토본」 꼬리표는 실제 메인이므로 뺐다.

interface Props {
  room?: RoomKey
  /** 메인에서 머리줄 메뉴를 눌렀을 때 복귀 기록용 */
  onNavClick?: (e: MouseEvent<HTMLAnchorElement>, id: string) => void
  children: ReactNode
}

export default function RoomsFrame({ room, onNavClick, children }: Props) {
  // 전역 배너(쿠키 동의·설치 안내)가 어두운 이 화면에 맞는 옷을 입도록 몸통에 표시를 남긴다.
  useEffect(() => {
    document.body.dataset.shell = 'rooms'
    return () => {
      delete document.body.dataset.shell
    }
  }, [])
  return (
    <div className="rooms-root" data-room={room ?? ''}>
      <a className="skip" href="#content">본문으로 건너뛰기</a>
      <header className="masthead">
        <Link to="/" className="brand" aria-label="오늘의 케이스 메인으로">
          <span className="brand-symbol" aria-hidden="true"><i></i><i></i><i></i></span>
          <span className="wordmark">todaycase<span className="brand-korean">오늘의 케이스</span></span>
        </Link>
        <nav className="room-nav" aria-label="세 개의 방">
          {ROOM_KEYS.map((key) => (
            <NavLink
              key={key}
              id={`nav-${key}`}
              to={`/${key}`}
              end
              onClick={onNavClick ? (e) => onNavClick(e, `nav-${key}`) : undefined}
            >
              <span>{rooms[key].number}</span> {NAV_LABELS[key]}
            </NavLink>
          ))}
        </nav>
      </header>
      <main id="content">{children}</main>
      <footer className="footer">
        <span>오늘의 케이스 <span className="footer-separator">/</span> 일상에 필요한 작은 발견</span>
        <span>이미지는 AI로 제작한 공간 연출입니다.</span>
      </footer>
    </div>
  )
}

/** 시안 데이터의 '<br>' 를 실제 줄바꿈으로 그린다(글자는 그대로). */
export function renderBr(text: string): ReactNode {
  return text.split('<br>').map((p, i) => (
    <Fragment key={i}>
      {i > 0 && <br />}
      {p}
    </Fragment>
  ))
}
