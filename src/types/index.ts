// 사건 카테고리
export type CaseCategory = 'crime' | 'traffic' | 'fire' | 'disaster' | 'etc'

// 오늘의 사건사고 한 건
export interface CaseItem {
  id: string
  title: string
  summary: string        // 카드/피드용 요약
  content: string        // 상세 본문
  category: CaseCategory
  region: string         // 지역 (예: 서울 강남구)
  date: string           // ISO (YYYY-MM-DD)
  time?: string          // HH:mm
  source: string         // 출처(언론사 등)
  sourceUrl?: string     // 원문 링크 (실제 보도)
  videoUrl?: string      // 방송 뉴스 영상(유튜브) — 있으면 최우선 표시
  image?: string         // 대표 이미지 URL (영상 없을 때)
  likes: number
  comments: number
  isBreaking?: boolean   // 속보 여부
}

// 미제사건(콜드케이스) 파일
export type ColdCaseStatus = 'unsolved' | 'cold' | 'reopened' // 미해결 / 장기미제 / 재수사

export interface ColdCaseItem {
  id: string
  caseNo: string         // 파일 표식 (예: 1991 · 대구)
  title: string
  occurredDate: string   // 발생일
  region: string
  status: ColdCaseStatus
  summary: string
  details: string
  reward?: number        // 현상금(원)
  tags: string[]
  image?: string
  sourceUrl?: string     // 참고 보도/자료 링크
  videoUrl?: string      // 이 사건을 다룬 시사프로그램(그것이 알고싶다·궁금한 이야기 Y 등) 유튜브
}
