// 메인 → 방 → 메인 복귀 때 포커스·스크롤을 되돌리기 위한 기록(시안 app.js 의 A6·B3 동작을 라우터 방식으로 재현).
// 메인에서 링크를 누르는 순간 「누른 링크 id + 그때의 scrollY」를 적어 두고,
// 메인이 다시 뜰 때 한 번 꺼내 쓴다. 직접 진입한 뒤 돌아오면 기록이 없으므로 메인 제목에 포커스한다.

export interface HomeReturn {
  /** 메인에서 누른 링크 요소의 id (portal-work, nav-gather …) */
  id: string
  scroll: number
}

let homeReturn: HomeReturn | null = null
let anyViewMounted = false

export function rememberHomeReturn(id: string) {
  homeReturn = { id, scroll: window.scrollY }
}

/** 기록을 꺼내면서 비운다. */
export function takeHomeReturn(): HomeReturn | null {
  const v = homeReturn
  homeReturn = null
  return v
}

/**
 * 첫 화면 로드인지(= 시안의 render(true)) 알려준다. 첫 호출만 true.
 * 첫 로드에는 포커스를 옮기지 않는다.
 */
export function consumeInitialLoad(): boolean {
  if (anyViewMounted) return false
  anyViewMounted = true
  return true
}
