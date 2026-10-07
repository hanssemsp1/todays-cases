import { useEffect } from 'react'
import { Routes, Route, Outlet, useLocation } from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import BottomNav from './components/layout/BottomNav'
import RoomsHome from './pages/rooms/RoomsHome'
import RoomView from './pages/rooms/RoomView'
import FeedPage from './pages/FeedPage'
import CaseDetailPage from './pages/CaseDetailPage'
import ColdCasePage from './pages/ColdCasePage'
import WorldPage from './pages/WorldPage'
import ArchivePage from './pages/ArchivePage'
import AboutPage from './pages/AboutPage'
import PrivacyPage from './pages/PrivacyPage'
import ContactPage from './pages/ContactPage'
import CookieConsent from './components/layout/CookieConsent'
import InstallPrompt from './components/layout/InstallPrompt'
import { Analytics } from '@vercel/analytics/react'

// 옛 사건사고 셸: 헤더 + 본문 + 푸터 + 모바일 하단 탭 (/news 와 사건·미제·기록 화면)
// index.html 의 <title> 이 새 메인 기준으로 바뀌었으므로 옛 화면은 여기서 옛 제목을 되돌린다.
// 사건 상세(/case/…)는 프리렌더된 고유 제목을 그대로 둔다.
const OLD_TITLE = '오늘의 사건사고 — 오늘의 사건·사고와 미제사건을 한 곳에서'
function OldShell() {
  const { pathname } = useLocation()
  useEffect(() => {
    if (!pathname.startsWith('/case/')) document.title = OLD_TITLE
  }, [pathname])
  return (
    <div className="app-shell">
      <Header />
      <main className="app-main">
        <Outlet />
      </main>
      <Footer />
      <BottomNav />
    </div>
  )
}

// "/" 와 세 방(/work /gather /space)은 「오늘의 케이스 · 세 개의 방」 화면(자체 머리줄·꼬리줄).
// 옛 첫 화면(사건사고 피드)은 /news 로 옮겼고 나머지 옛 경로는 그대로 둔다.
export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RoomsHome />} />
        <Route path="/:room" element={<RoomView />} />
        <Route element={<OldShell />}>
          <Route path="/news" element={<FeedPage />} />
          <Route path="/case/:id" element={<CaseDetailPage />} />
          <Route path="/cold-cases" element={<ColdCasePage />} />
          <Route path="/world" element={<WorldPage />} />
          <Route path="/archive" element={<ArchivePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>
      </Routes>
      <CookieConsent />
      <InstallPrompt />
      {/* 방문자 유입 경로 측정 (스레드·카톡·검색 중 어디서 왔는지) */}
      <Analytics />
    </>
  )
}
