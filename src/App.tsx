import { useEffect } from 'react'
import { Routes, Route, useLocation, useNavigationType } from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import BottomNav from './components/layout/BottomNav'
import FeedPage from './pages/FeedPage'
import CaseDetailPage from './pages/CaseDetailPage'
import ColdCasePage from './pages/ColdCasePage'
import IssuePage from './pages/IssuePage'
import ArchivePage from './pages/ArchivePage'
import AboutPage from './pages/AboutPage'
import PrivacyPage from './pages/PrivacyPage'
import ContactPage from './pages/ContactPage'
import CookieConsent from './components/layout/CookieConsent'
import InstallPrompt from './components/layout/InstallPrompt'
import { Analytics } from '@vercel/analytics/react'

// 새 화면으로 갈 때는 맨 위부터 보여 준다(사건을 누르면 영상이 바로 보이게 — 대표님 26.11.12).
// 「뒤로」(POP)는 그 화면에서 보던 자리로 돌려놓는다(목록 중간에서 눌렀으면 그 자리로).
const scrollByKey = new Map<string, number>()
function ScrollToTop() {
  const { key } = useLocation()
  const navType = useNavigationType()
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
  }, [])
  useEffect(() => {
    const y = navType === 'POP' ? scrollByKey.get(key) ?? 0 : 0
    window.scrollTo(0, y)
    // 이 화면에서 보던 자리를 스크롤할 때마다 기억한다
    // (떠날 때 재면 이미 짧은 새 화면으로 바뀐 뒤라 자리가 줄어든다)
    const save = () => { scrollByKey.set(key, window.scrollY) }
    window.addEventListener('scroll', save, { passive: true })
    return () => window.removeEventListener('scroll', save)
  }, [key, navType])
  return null
}

// 앱 셸: 헤더 + 라우팅 본문 + 푸터 + 모바일 하단 탭
export default function App() {
  return (
    <div className="app-shell">
      <ScrollToTop />
      <Header />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<FeedPage />} />
          <Route path="/case/:id" element={<CaseDetailPage />} />
          <Route path="/cold-cases" element={<ColdCasePage />} />
          <Route path="/issues" element={<IssuePage />} />
          <Route path="/archive" element={<ArchivePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
      <BottomNav />
      <CookieConsent />
      <InstallPrompt />
      {/* 방문자 유입 경로 측정 (스레드·카톡·검색 중 어디서 왔는지) */}
      <Analytics />
    </div>
  )
}
