import './Footer.css'

// 하단 푸터 — 정보성 안내 (데스크탑 위주 노출)
export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="container">
        <p className="app-footer__brand grad-text">오늘의 사건사고</p>
        <p className="app-footer__desc">
          그날그날의 사건·사고를 한 곳에서. 본 서비스의 사건 정보는 공개 언론 보도를
          요약·재구성한 것으로, 정확한 내용은 각 원문 출처를 확인해 주세요.
        </p>
        <p className="app-footer__copy">© 2026 오늘의 사건사고 · 데모</p>
      </div>
    </footer>
  )
}
