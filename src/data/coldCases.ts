import type { ColdCaseItem, ColdCaseStatus } from '../types'

// ── 미제사건 상태 메타 (라벨 · 아이콘 · 색) ───────────────────────
export const COLD_STATUS_META: Record<
  ColdCaseStatus,
  { label: string; icon: string; color: string }
> = {
  unsolved: { label: '미해결', icon: 'help', color: '#dd2a7b' },
  cold: { label: '장기미제', icon: 'ac_unit', color: '#515bd4' },
  reopened: { label: '재수사', icon: 'restart_alt', color: '#0095f6' },
}

// ── 미제사건 파일 (2026-08-01부터 매일 1건씩 쌓임) ─────────────────
// ※ 매일 예약작업이 실제 공개 기록 기반 장기미제/미해결 사건을 배열 끝에 1건씩 추가합니다.
//    배열 순서 = 올라온 순서(오래된 것 → 최신). 피해자·유족을 존중해 사실 위주로만 정리합니다.
export const COLD_CASES: ColdCaseItem[] = [
  {
    id: 'cc-gangjin-girls',
    caseNo: '2000 · 전남 강진',
    title: '강진 여아 연쇄 실종 사건',
    occurredDate: '2000-06-15',
    region: '전남 강진군',
    status: 'reopened',
    summary:
      '전남 강진에서 1년 간격으로 어린 여자아이 두 명이 잇따라 실종됐다. 유력 용의자가 있었으나 자백을 번복해 사건은 장기 미제로 남았다.',
    details:
      '2000년 6월 15일 전남 강진읍에서 초등학교 2학년이던 8세 여아가 하교 후 자취를 감췄다. 이듬해인 2001년에는 같은 지역에서 6세 여아가 실종되며 1년 간격의 연쇄 실종 사건으로 불리게 됐다. 수사 과정에서 동종 전과가 있는 인물이 유력 용의자로 지목돼 한때 범행을 자백했으나 이후 진술을 번복했고, 결정적 증거를 확보하지 못한 채 사건은 미궁에 빠졌다. 최근 전남경찰청은 장기 실종 어린이 전담수사팀을 꾸려 원점에서 재수사에 착수했다.',
    tags: ['어린이', '실종', '재수사'],
    sourceUrl: 'https://www.wikitree.co.kr/articles/1142766',
    videoUrl: 'https://www.youtube.com/watch?v=Fd7vHrgrQ40',
  },
]

// ── "오늘의 미제사건" — 가장 최근에 올라온(배열의 마지막) 사건 ──────
// 매일 예약작업이 배열 끝에 1건 추가하므로, 마지막 항목이 "오늘의 미제사건"이 됩니다.
export function getColdCaseOfDay(): ColdCaseItem {
  return COLD_CASES[COLD_CASES.length - 1]
}
