import { Routes, Route } from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import BottomNav from './components/layout/BottomNav'
import FeedPage from './pages/FeedPage'
import CaseDetailPage from './pages/CaseDetailPage'
import ColdCasePage from './pages/ColdCasePage'
import ArchivePage from './pages/ArchivePage'
import AboutPage from './pages/AboutPage'
import PrivacyPage from './pages/PrivacyPage'
import ContactPage from './pages/ContactPage'
import CookieConsent from './components/layout/CookieConsent'

// 앱 셸: 헤더 + 라우팅 본문 + 푸터 + 모바일 하단 탭
export default function App() {
  return (
    <div className="app-shell">
      <Header />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<FeedPage />} />
          <Route path="/case/:id" element={<CaseDetailPage />} />
          <Route path="/cold-cases" element={<ColdCasePage />} />
          <Route path="/archive" element={<ArchivePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
      <BottomNav />
      <CookieConsent />
    </div>
  )
}
