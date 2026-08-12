import { useEffect, useState } from 'react'
import Icon from '../ui/Icon'
import './InstallPrompt.css'

const KEY = 'tc-install-dismissed'
const SNOOZE_DAYS = 7

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

// 이미 앱으로 실행 중인지 (홈 화면에서 열었으면 배너 필요 없음)
function isStandalone() {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    // iOS Safari
    (window.navigator as unknown as { standalone?: boolean }).standalone === true
  )
}

function isIOS() {
  return /iphone|ipad|ipod/i.test(navigator.userAgent)
}

function snoozed() {
  try {
    const t = localStorage.getItem(KEY)
    if (!t) return false
    return Date.now() - Number(t) < SNOOZE_DAYS * 864e5
  } catch {
    return false
  }
}


/**
 * 홈 화면 추가(앱 설치) 안내 배너.
 * - 안드로이드/크롬: beforeinstallprompt를 잡아 "설치" 버튼으로 바로 설치
 * - iOS 사파리: 설치 API가 없어 공유 → 홈 화면에 추가 방법을 안내
 * - 이미 앱으로 실행 중이거나 최근에 닫았으면 표시하지 않음
 */
export default function InstallPrompt() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null)
  const [show, setShow] = useState(false)
  const [howTo, setHowTo] = useState(false)

  useEffect(() => {
    if (isStandalone() || snoozed()) return

    // 설치 이벤트는 미리 잡아둔다 (표시 시점은 아래 스크롤 조건으로)
    const onBIP = (e: Event) => {
      e.preventDefault()
      setDeferred(e as BeforeInstallPromptEvent)
    }
    window.addEventListener('beforeinstallprompt', onBIP)

    // 쿠키 배너와 같은 자리를 쓰므로, 그게 떠 있으면 사라질 때까지 기다렸다 띄운다
    let retry: number | undefined
    const tryShow = () => {
      if (document.querySelector('.cookie-consent')) {
        retry = window.setTimeout(tryShow, 1000)
        return
      }
      setShow(true)
    }

    // 기사를 좀 읽은 뒤(스크롤 400px) 띄운다 — 첫 화면을 가리지 않게
    const onScroll = () => {
      if (window.scrollY > 400) {
        tryShow()
        window.removeEventListener('scroll', onScroll)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    // 스크롤을 안 하더라도 12초 뒤에는 한 번 안내
    const timer = window.setTimeout(tryShow, 12000)

    // 설치 완료되면 배너 제거
    const onInstalled = () => setShow(false)
    window.addEventListener('appinstalled', onInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', onBIP)
      window.removeEventListener('appinstalled', onInstalled)
      window.removeEventListener('scroll', onScroll)
      clearTimeout(timer)
      if (retry) clearTimeout(retry)
    }
  }, [])

  // 푸터 "앱으로 추가" 버튼 → 배너를 다시 열고 방법도 펼친다 (닫았던 사람용 통로)
  useEffect(() => {
    const reopen = () => {
      if (isStandalone()) return
      setShow(true)
      setHowTo(true)
    }
    window.addEventListener('tc-show-install', reopen)
    return () => window.removeEventListener('tc-show-install', reopen)
  }, [])

  const close = () => {
    try {
      localStorage.setItem(KEY, String(Date.now()))
    } catch {
      /* 무시 */
    }
    setShow(false)
  }

  const install = async () => {
    if (deferred) {
      await deferred.prompt()
      const { outcome } = await deferred.userChoice
      if (outcome === 'accepted') setShow(false)
      else close()
      setDeferred(null)
    } else {
      setHowTo((v) => !v)
    }
  }

  if (!show) return null

  return (
    <div className="install-prompt" role="dialog" aria-label="앱으로 추가 안내">
      <div className="install-prompt__row">
        <img className="install-prompt__icon" src="/icon-192.png" alt="" width={44} height={44} />
        <div className="install-prompt__text">
          <strong>앱으로 추가하기</strong>
          <span>홈 화면에서 바로 열어보세요</span>
        </div>
        <button className="install-prompt__cta" onClick={install}>
          {deferred ? '설치' : '방법'}
        </button>
        <button className="install-prompt__close" onClick={close} aria-label="닫기">
          <Icon name="close" />
        </button>
      </div>

      {howTo && (
        <ol className="install-prompt__howto">
          {isIOS() ? (
            <>
              <li>
                아래 <Icon name="ios_share" /> <b>공유</b> 버튼을 누르세요
              </li>
              <li>
                메뉴를 내려 <b>&ldquo;홈 화면에 추가&rdquo;</b>를 선택
              </li>
              <li>
                오른쪽 위 <b>추가</b>를 누르면 끝!
              </li>
            </>
          ) : (
            <>
              <li>
                오른쪽 위 <b>⋮</b> 버튼을 누르세요
              </li>
              <li>
                <b>&ldquo;앱 설치&rdquo;</b> 또는 <b>&ldquo;홈 화면에 추가&rdquo;</b> 선택
              </li>
              <li>
                <b>추가</b>를 누르면 끝!
              </li>
            </>
          )}
        </ol>
      )}
    </div>
  )
}
