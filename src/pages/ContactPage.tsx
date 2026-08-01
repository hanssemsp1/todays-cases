import Icon from '../components/ui/Icon'
import './StaticPage.css'

// 문의(Contact) — 연락 수단 안내 (애드센스 심사 시 연락처 필요)
export default function ContactPage() {
  return (
    <div className="static-page container">
      <header className="static-page__hero">
        <h1 className="static-page__title">문의하기</h1>
      </header>

      <div className="static-page__body">
        <p>
          「오늘의 사건사고」에 대한 문의·제휴·정정 요청은 아래 이메일로 보내주세요. 확인 후 최대한
          빠르게 답변드리겠습니다.
        </p>

        <a className="static-page__contact-card" href="mailto:hanssemsp1@gmail.com">
          <Icon name="mail" size={18} /> hanssemsp1@gmail.com
        </a>

        <h2>이런 문의를 받습니다</h2>
        <ul>
          <li>게재된 사건 정보의 정정·삭제 요청</li>
          <li>콘텐츠 및 출처 관련 문의</li>
          <li>광고·제휴 문의</li>
          <li>개인정보 처리 관련 문의</li>
        </ul>

        <p className="static-page__note">
          정정·삭제 요청 시 해당 게시물의 주소(URL)와 사유를 함께 보내주시면 더 빠르게 처리할 수
          있습니다.
        </p>
      </div>
    </div>
  )
}
