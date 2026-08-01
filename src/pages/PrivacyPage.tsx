import Icon from '../components/ui/Icon'
import './StaticPage.css'

// 개인정보처리방침 — 구글 애드센스 심사 필수 (쿠키·제3자 광고 고지 포함)
export default function PrivacyPage() {
  return (
    <div className="static-page container">
      <header className="static-page__hero">
        <h1 className="static-page__title">개인정보처리방침</h1>
        <p className="static-page__updated">최종 개정일: 2026년 8월 1일</p>
      </header>

      <div className="static-page__body">
        <p>
          「오늘의 사건사고」(이하 “본 사이트”)는 이용자의 개인정보를 중요하게 생각하며, 관련
          법령을 준수합니다. 본 방침은 본 사이트가 어떤 정보를 수집하고 어떻게 이용하는지 안내합니다.
        </p>

        <h2>1. 수집하는 정보</h2>
        <p>
          본 사이트는 회원가입 기능이 없으며, 이름·연락처 등 개인을 직접 식별하는 정보를 수집하지
          않습니다. 다만 서비스 개선과 광고 제공을 위해 다음과 같은 정보가 자동으로 수집될 수
          있습니다.
        </p>
        <ul>
          <li>쿠키(cookie), 접속 IP, 브라우저 종류, 방문 페이지, 방문 일시 등 접속 기록</li>
          <li>기기 및 사용 환경 정보(운영체제, 화면 크기 등)</li>
        </ul>

        <h2>2. 쿠키(Cookie)의 사용</h2>
        <p>
          본 사이트는 이용자 경험 개선과 광고 제공을 위해 쿠키를 사용합니다. 이용자는 웹브라우저
          설정을 통해 쿠키 저장을 거부하거나 삭제할 수 있으며, 이 경우 일부 기능 이용에 제한이 있을
          수 있습니다.
        </p>

        <h2>3. 제3자 광고 및 구글 애드센스</h2>
        <p>
          본 사이트는 제3자 광고 사업자인 <strong>구글(Google AdSense)</strong>을 통해 광고를 게재할
          수 있습니다. 구글을 포함한 제3자 광고 사업자는 쿠키(DoubleClick 쿠키 등)를 사용하여
          이용자의 이전 방문 기록을 바탕으로 맞춤형 광고를 제공할 수 있습니다.
        </p>
        <ul>
          <li>
            구글의 광고 쿠키 사용에 대한 자세한 내용은{' '}
            <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">
              구글 광고 정책
            </a>
            에서 확인할 수 있습니다.
          </li>
          <li>
            이용자는{' '}
            <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
              구글 광고 설정
            </a>
            에서 맞춤 광고를 해제할 수 있으며,{' '}
            <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer">
              www.aboutads.info
            </a>
            를 통해 제3자 광고 쿠키를 비활성화할 수 있습니다.
          </li>
        </ul>

        <h2>4. 개인정보의 이용 목적</h2>
        <ul>
          <li>서비스 제공 및 콘텐츠 개선</li>
          <li>접속 통계 분석 및 맞춤형 광고 제공</li>
        </ul>

        <h2>5. 개인정보의 보관 및 파기</h2>
        <p>
          자동 수집된 접속 기록은 서비스 운영 및 통계 목적에 한해 이용되며, 목적이 달성되면 지체 없이
          파기합니다.
        </p>

        <h2>6. 이용자의 권리</h2>
        <p>
          이용자는 언제든지 자신의 개인정보 관련 사항에 대해 문의할 수 있으며, 쿠키 삭제·광고 개인화
          해제 등을 통해 스스로 정보를 관리할 수 있습니다.
        </p>

        <h2>7. 문의처</h2>
        <p>
          본 방침에 관한 문의는 아래 이메일로 연락 주시기 바랍니다.
        </p>
        <div className="static-page__contact-card">
          <Icon name="mail" size={18} /> hanssemsp1@gmail.com
        </div>

        <p className="static-page__note">
          본 개인정보처리방침은 관련 법령 및 서비스 정책 변경에 따라 개정될 수 있으며, 개정 시 본
          페이지를 통해 공지합니다.
        </p>
      </div>
    </div>
  )
}
