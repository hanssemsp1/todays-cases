import { useLayoutEffect, useRef } from 'react'
import { Link, NavLink, Navigate, useParams } from 'react-router-dom'
import RoomsFrame, { renderBr } from './RoomsFrame'
import { rooms, ROOM_KEYS, NAV_LABELS, isRoomKey, roomImage, roomDocumentTitle } from './roomsData'
import { consumeInitialLoad } from './returnState'

// 방 화면 — 시안 index.html 의 #room-view 를 그대로 옮김. /work /gather /space.

export default function RoomView() {
  const { room } = useParams<{ room: string }>()
  if (!isRoomKey(room)) return <Navigate to="/" replace />
  return <RoomBody roomKey={room} />
}

function RoomBody({ roomKey }: { roomKey: keyof typeof rooms }) {
  const r = rooms[roomKey]
  // 첫 로드(직접 진입)로 뜬 방의 키를 기억한다. 마운트당 한 번만 판정하므로
  // 개발 모드 StrictMode 의 효과 두 번 실행에도 같은 값이다.
  const initialKeyRef = useRef<string>()

  useLayoutEffect(() => {
    document.title = roomDocumentTitle(roomKey)
    if (initialKeyRef.current === undefined) initialKeyRef.current = consumeInitialLoad() ? roomKey : ''
    window.scrollTo({ top: 0, behavior: 'instant' })
    // 첫 로드에는 포커스를 옮기지 않고, 방 사이 이동·메인에서 진입 때는 방 제목으로.
    if (initialKeyRef.current !== roomKey) document.getElementById('room-title')?.focus({ preventScroll: true })
  }, [roomKey])

  return (
    <RoomsFrame room={roomKey}>
      <section id="room-view" className="room-view" aria-labelledby="room-title">
        <div className="room-art">
          <img id="room-image" src={roomImage(roomKey)} alt={r.alt} width={1536} height={1024} />
          <span id="room-art-label" className="room-art-label" aria-hidden="true">{r.art}</span>
          <span id="room-art-number" className="room-art-number" aria-hidden="true">{r.number}</span>
        </div>
        <div className="room-copy">
          <Link className="back-link" to="/">세 개의 방으로</Link>
          <div className="room-copy-inner">
            <p className="eyebrow" id="room-eyebrow">ROOM {r.number} · {r.english}</p>
            <h1 id="room-title" tabIndex={-1}>{r.title}</h1>
            <p className="room-statement" id="room-statement">{renderBr(r.statement)}</p>
            <p className="room-description" id="room-description">{r.description}</p>
            <div className="room-preview-note">
              <span>이 방은 준비 중입니다</span>
              <p>지금은 방의 분위기와 이동 흐름을 살펴보세요. <br />안의 내용은 메인 화면 검토 후 채웁니다.</p>
            </div>
            <Link className="return-button" to="/">메인으로 돌아가기</Link>
          </div>
          <nav className="other-rooms" aria-label="다른 방 살펴보기">
            <span>다른 방</span>
            {ROOM_KEYS.map((key) => (
              <NavLink key={key} to={`/${key}`} end data-room={key}>
                {NAV_LABELS[key]}
              </NavLink>
            ))}
          </nav>
        </div>
      </section>
    </RoomsFrame>
  )
}
