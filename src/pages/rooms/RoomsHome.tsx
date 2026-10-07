import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import type { MouseEvent } from 'react'
import RoomsFrame from './RoomsFrame'
import { roomImage, HOME_TITLE } from './roomsData'
import { rememberHomeReturn, takeHomeReturn, consumeInitialLoad } from './returnState'
import type { HomeReturn } from './returnState'

// 메인 「오늘의 케이스 · 세 개의 방」 — 시안 index.html 의 #home-view 를 그대로 옮김.

// React 18 은 fetchPriority 를 모르므로 소문자 속성으로 그대로 넘긴다.
const highPriority = { fetchpriority: 'high' } as Record<string, string>

export default function RoomsHome() {
  // 첫 로드 여부와 복귀 기록은 마운트당 한 번만 꺼낸다(개발 모드 StrictMode 의 효과 두 번 실행에도 같은 값).
  const initialRef = useRef<boolean>()
  const backRef = useRef<HomeReturn | null>()

  useLayoutEffect(() => {
    document.title = HOME_TITLE
    if (initialRef.current === undefined) initialRef.current = consumeInitialLoad()
    if (backRef.current === undefined) backRef.current = takeHomeReturn()
    const back = backRef.current
    if (initialRef.current) return
    // 메인에서 출발한 링크가 있으면 그 링크로, 직접 들어왔다 돌아온 경우면 메인 제목으로.
    const target =
      (back && document.getElementById(back.id)) || document.getElementById('home-title')
    target?.focus({ preventScroll: true })
    window.scrollTo({ top: back?.scroll || 0, behavior: 'instant' })
  }, [])

  // 포털·머리줄 메뉴를 누르는 순간 「어디서 눌렀나」를 적어 둔다(B3: 누를 때의 위치를 기록).
  const remember = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    rememberHomeReturn(id)
  }

  return (
    <RoomsFrame onNavClick={remember}>
      <div id="home-view">
        <section className="intro" aria-labelledby="home-title">
          <div className="intro-title">
            <p className="eyebrow">THREE ROOMS, ONE EVERYDAY</p>
            <h1 id="home-title" tabIndex={-1}>일상을 살피는 <br /><span>세 개의 방.</span></h1>
          </div>
          <div className="intro-side">
            <p>일과 사람, 그리고 공간. <br />오늘 필요한 방으로 들어오세요.</p>
            <span className="tiny-mark" aria-hidden="true">문을 여는 작은 발견</span>
          </div>
        </section>
        <section className="rooms" aria-label="카테고리 입구">
          <Link
            className="portal portal-work"
            id="portal-work"
            to="/work"
            aria-labelledby="work-title work-action"
            onClick={(e) => remember(e, 'portal-work')}
          >
            <div className="portal-heading"><span className="portal-number">01</span><span className="portal-kind">THE STUDY · 일터</span></div>
            <div className="portal-picture">
              <img src={roomImage('work')} alt="짙은 네이비 서재 안의 나무 책상과 황동 조명, 책과 나무 책장" width={1536} height={1024} {...highPriority} />
              <div className="portal-shade"></div>
              <span className="portal-type" aria-hidden="true">Work.</span>
              <div className="portal-label">
                <span className="label-caption">일하는 날의 기준</span>
                <h2 id="work-title">오늘의<br />근로 케이스</h2>
                <span className="enter" id="work-action">방 살펴보기</span>
              </div>
            </div>
            <p className="portal-note">일터의 궁금증을 차분히 풀어 보는 곳.</p>
          </Link>
          <Link
            className="portal portal-gather"
            id="portal-gather"
            to="/gather"
            aria-labelledby="gather-title gather-action"
            onClick={(e) => remember(e, 'portal-gather')}
          >
            <div className="portal-heading"><span className="portal-number">02</span><span className="portal-kind">THE SALON · 모임</span></div>
            <div className="portal-picture">
              <img src={roomImage('gather')} alt="테라코타빛 살롱의 타원형 나무 테이블과 버건디 소파, 대화를 위한 카드" width={1536} height={1024} loading="lazy" decoding="async" />
              <div className="portal-shade"></div>
              <span className="portal-type" aria-hidden="true">Together.</span>
              <div className="portal-label">
                <span className="label-caption">마주 앉는 시간</span>
                <h2 id="gather-title">모임 한 판</h2>
                <span className="enter" id="gather-action">방 살펴보기</span>
              </div>
            </div>
            <p className="portal-note">사람과 사람 사이, 즐거운 시작을 만드는 곳.</p>
          </Link>
          <Link
            className="portal portal-space"
            id="portal-space"
            to="/space"
            aria-labelledby="space-title space-action"
            onClick={(e) => remember(e, 'portal-space')}
          >
            <div className="portal-heading"><span className="portal-number">03</span><span className="portal-kind">THE ATELIER · 공간</span></div>
            <div className="portal-picture">
              <img src={roomImage('space')} alt="넓은 입구 너머로 햇빛이 들어오는 아이보리 침실의 나무 침대와 의자" width={1536} height={1024} loading="lazy" decoding="async" />
              <div className="portal-shade"></div>
              <span className="portal-type" aria-hidden="true">A little<br />difference.</span>
              <div className="portal-label">
                <span className="label-caption">공간을 바꾸는 작은 차이</span>
                <h2 id="space-title">1cm 차이<br />연구소</h2>
                <span className="enter" id="space-action">방 살펴보기</span>
              </div>
            </div>
            <p className="portal-note">가구와 공간 사이, 꼭 맞는 자리를 찾는 곳.</p>
          </Link>
        </section>
        <div className="threshold"><span className="threshold-line"></span><span>하나의 일상, 서로 다른 세 가지 시선.</span><span className="threshold-line"></span></div>
      </div>
    </RoomsFrame>
  )
}
