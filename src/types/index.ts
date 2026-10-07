// ─────────────────────────────────────────────────────────────
// 오늘의 사건사고 — 정체성
//
// 일반 뉴스 사이트가 아니다. 정치·경제는 다루지 않는다.
// 사람들이 관심을 갖는 「큰 사건사고」를 다룬다.
//   · 종류는 가리지 않는다 — 살인이든 교통사고든 화재든 음주운전이든
//   · 크기로 가린다 — 흔하고 작은 사건은 올리지 않는다
//   · 특히 살인·죽음·실종·미제·미스터리는 관심이 크다
//
// 첫 화면 = 우리나라 사건 / 해외토픽은 따로 / 미제는 따로.
// ─────────────────────────────────────────────────────────────

// 국내냐 해외냐 — 탭을 가르는 축
export type CaseScope = 'kr' | 'world'

// 사건 성격 (종류를 가리지 않으므로 넓게 둔다)
export type CaseCategory =
  | 'murder' // 살인·강력 (살인, 살인미수, 강도, 상해치사)
  | 'missing' // 실종·변사·의문사
  | 'mystery' // 미스터리·이해할 수 없는 사건
  | 'traffic' // 교통사고
  | 'dui' // 음주운전·뺑소니
  | 'fire' // 화재·폭발
  | 'disaster' // 재난·참사 (산업재해·붕괴·자연재해)
  | 'medical' // 의료사고
  | 'drug' // 마약
  | 'sexcrime' // 성범죄
  | 'abuse' // 학대 (아동·노인·장애인)
  | 'fraud' // 사기·금융범죄
  | 'etc' // 그 외

// 오늘의 사건사고 한 건
export interface CaseItem {
  id: string
  title: string
  summary: string // 카드/피드용 요약
  content: string // 상세 본문
  scope: CaseScope // 국내 / 해외
  category: CaseCategory
  region: string // 지역 (국내: '제주 · 한림읍' / 해외: '미국 · 플로리다')

  // ⭐ 날짜가 둘이다 — 이걸 나누는 게 핵심
  occurredDate: string // 사건이 실제로 일어난 날 (YYYY-MM-DD). 독자가 궁금한 건 이것
  date: string // 사이트에 올린 날 (YYYY-MM-DD)

  // ⭐ 지난 사건을 올릴 땐 "왜 지금"을 반드시 말한다
  whyNow?: string // 예: '어제 1심 선고가 나왔다' / '유족이 재수사를 요청했다'

  time?: string // HH:mm
  source: string // 출처(언론사 등)
  sourceUrl?: string // 원문 링크 (실제 보도)
  videoUrl?: string // 방송 뉴스 영상(유튜브) — 있으면 최우선 표시
  image?: string // 대표 이미지 URL (영상 없을 때)
  likes: number
  comments: number
  isBreaking?: boolean // 속보 여부

  // ── 큰 사건을 여러 갈래로 채울 때 쓰는 선택 필드 ──
  status?: string // 지금 어디까지 왔나 (예: '국과수 감정 중 · 결과 미정')
  timeline?: TimelineStep[] // 시간순 전개
  angles?: CaseAngle[] // 각도: 현장 / 인물 / 배경 / 쟁점
  videos?: CaseVideo[] // 방송사별 영상
  links?: CaseLink[] // 언론사별 원문
  watch?: string // 앞으로 볼 것
}

// 시간순 전개 한 칸
export interface TimelineStep {
  at: string // '2026년 5월 12일' / '어제 오후'
  text: string
  key?: boolean // 결정적 분기점
}

// 한 사건을 보는 각도
export interface CaseAngle {
  label: string // '현장' '인물' '배경' '쟁점'
  title: string
  text: string
}

export interface CaseVideo {
  source: string // 'YTN' '그것이 알고싶다'
  title: string
  url: string
}

export interface CaseLink {
  source: string
  title: string
  url: string
}

// 미제사건(콜드케이스) 파일
export type ColdCaseStatus = 'unsolved' | 'cold' | 'reopened' // 미해결 / 장기미제 / 재수사

export interface ColdCaseItem {
  id: string
  caseNo: string // 파일 표식 (예: 1991 · 대구)
  title: string
  occurredDate: string // 발생일
  region: string
  status: ColdCaseStatus
  summary: string
  details: string
  reward?: number // 현상금(원)
  tags: string[]
  image?: string
  sourceUrl?: string // 참고 보도/자료 링크
  videoUrl?: string // 이 사건을 다룬 시사프로그램(그것이 알고싶다·궁금한 이야기 Y 등) 유튜브
}
