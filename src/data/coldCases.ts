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

// ── 미제사건 파일 (실제 공개 기록 기반) ───────────────────────────
// ※ 공개된 언론 보도·기록을 바탕으로 정리한 실제 장기 미제/미해결 사건입니다.
//    피해자와 유족의 아픔을 존중하며, 사실 관계 위주로만 간략히 정리했습니다.
export const COLD_CASES: ColdCaseItem[] = [
  {
    id: 'cc-frogboys',
    caseNo: '1991 · 대구',
    title: '개구리소년 실종 사건',
    occurredDate: '1991-03-26',
    region: '대구 달서구 와룡산',
    status: 'cold',
    summary:
      '도롱뇽 알을 주우러 와룡산에 오른 초등학생 5명이 한꺼번에 사라졌다. 11년 뒤 유골로 발견됐으나 범인은 밝혀지지 않았다.',
    details:
      '1991년 3월 26일, 대구 성서초등학교에 다니던 어린이 5명이 도롱뇽 알을 주우러 와룡산에 갔다가 실종됐다. 대대적인 수색에도 행방이 확인되지 않다가 2002년 9월 와룡산에서 유골로 발견됐다. 타살 정황이 제기됐으나 범인은 특정되지 못했고, 살인죄 공소시효(당시 15년)가 2006년 만료되며 대한민국 3대 미제사건 중 하나로 남았다.',
    tags: ['실종', '3대 미제', '어린이'],
    sourceUrl: 'https://n.news.naver.com/mnews/article/082/0000742118?sid=102',
  },
  {
    id: 'cc-leehyungho',
    caseNo: '1991 · 서울',
    title: '이형호 군 유괴·살인 사건',
    occurredDate: '1991-01-29',
    region: '서울 강남',
    status: 'cold',
    summary:
      '9세 이형호 군이 유괴된 뒤 44일간 협박 전화가 이어졌다. 아이는 끝내 숨진 채 발견됐고 범인의 목소리만 남았다.',
    details:
      '1991년 1월 29일 9세 이형호 군이 유괴됐다. 범인은 44일간 부모에게 수십 차례 협박 전화를 걸어 돈을 요구했으나, 이 군은 결국 숨진 채 발견됐다. 남겨진 것은 범인의 목소리 녹음뿐이었다. 영화 "그놈 목소리"의 소재가 됐으며, 2006년 공소시효가 만료되며 3대 미제사건으로 남았다.',
    tags: ['유괴', '3대 미제', '그놈 목소리'],
    sourceUrl: 'https://n.news.naver.com/mnews/article/417/0001054666?sid=102',
  },
  {
    id: 'cc-kimtaewan',
    caseNo: '1999 · 대구',
    title: '대구 어린이 황산 테러 사건 (김태완 군)',
    occurredDate: '1999-05-20',
    region: '대구 동구',
    status: 'cold',
    summary:
      '골목에서 6세 김태완 군이 누군가 뿌린 황산에 피습돼 49일 만에 숨졌다. 범인은 끝내 밝혀지지 않았다.',
    details:
      '1999년 5월 20일 대구의 한 골목에서 6세 김태완 군이 정체불명의 인물이 뿌린 황산을 뒤집어써 온몸에 중화상을 입고 49일 만에 숨졌다. 범인은 특정되지 않았고 사건은 미제로 남았다. 이 사건은 살인죄 공소시효 폐지를 이끈 이른바 "태완이법"(2015년 시행)의 계기가 됐다.',
    tags: ['어린이', '태완이법', '미해결'],
    sourceUrl: 'https://n.news.naver.com/mnews/article/009/0005713700?sid=102',
  },
  {
    id: 'cc-jeju-teacher',
    caseNo: '2009 · 제주',
    title: '제주 보육교사 살인 사건',
    occurredDate: '2009-02-01',
    region: '제주시',
    status: 'reopened',
    summary:
      '새벽 귀갓길 택시에 탄 뒤 사라진 보육교사가 하천에서 숨진 채 발견됐다. 유력 용의자는 무죄가 확정됐다.',
    details:
      '2009년 새벽, 귀갓길에 택시를 탄 20대 보육교사가 실종된 뒤 하천에서 숨진 채 발견됐다. 2015년 살인죄 공소시효가 폐지되자 경찰은 이듬해 전담팀을 꾸려 재수사에 나섰고, 국내 최초로 동물 사체를 이용한 실험까지 진행했다. 그러나 유력 용의자로 지목된 택시기사는 1·2심 모두 무죄를 받아 사건은 17년째 미궁에 남아 있다.',
    tags: ['귀갓길', '재수사', '무죄'],
    sourceUrl: 'https://n.news.naver.com/mnews/article/011/0004639180?sid=102',
  },
  {
    id: 'cc-tongyeong',
    caseNo: '2026 · 통영',
    title: '통영 여성 살인 사건',
    occurredDate: '2026-06',
    region: '경남 통영시',
    status: 'unsolved',
    summary:
      '통영에서 발생한 여성 살인사건의 범인이 50일이 넘도록 특정되지 않고 있다. 태완이법으로 공소시효 없이 수사가 이어진다.',
    details:
      '2026년 경남 통영에서 발생한 여성 살인사건이 50일이 지나도록 범인을 검거하지 못하고 있다. 경찰이 폭넓게 수사를 이어가고 있으나 결정적 단서를 확보하지 못한 상태다. 2015년 시행된 태완이법으로 살인죄 공소시효가 폐지돼, 장기 미제로 남더라도 범인을 특정하는 즉시 처벌이 가능하다.',
    tags: ['최근', '미해결', '수사 중'],
    sourceUrl: 'https://n.news.naver.com/mnews/article/009/0005713700?sid=102',
  },
  {
    id: 'cc-suncheon',
    caseNo: '2009 · 순천',
    title: '순천 청산가리 막걸리 살인 사건',
    occurredDate: '2009-07',
    region: '전남 순천시',
    status: 'reopened',
    summary:
      '막걸리에 청산가리가 들어가 주민이 숨진 사건. 억울하게 지목됐던 부녀가 재심에서 무죄를 받으며 진범 재수사가 시작됐다.',
    details:
      '2009년 전남 순천에서 청산가리가 든 막걸리를 마신 주민이 숨졌다. 이 사건으로 유죄 판결을 받았던 부녀는 오랜 시간이 흐른 뒤 재심에서 무죄가 확정됐다. 이에 전남경찰청 장기미제사건팀이 진범을 찾기 위한 재수사에 착수했으며, 관련 증거와 수사 기록이 재검토되고 있다.',
    tags: ['재심 무죄', '재수사', '독극물'],
    sourceUrl: 'https://n.news.naver.com/mnews/article/421/0008584668?sid=102',
  },
  {
    id: 'cc-busan-taeyang',
    caseNo: '2002 · 부산',
    title: '부산 태양다방 여대생 살인 사건',
    occurredDate: '2002',
    region: '부산',
    status: 'cold',
    summary:
      '여대생이 숨진 채 발견된 사건. 유력 용의자가 한때 무기징역을 선고받았으나 대법원에서 무죄가 확정돼 장기 미제로 남았다.',
    details:
      '2002년 부산에서 여대생이 숨진 채 발견됐다. 유력 용의자는 한때 무기징역까지 선고받았지만 결국 대법원에서 무죄가 확정되면서 사건은 대표적인 장기 미제로 남았다. 이른바 태완이법 시행 이후 부산경찰청 미제사건 수사팀이 재수사를 이어가고 있으나 24년째 진범을 특정하지 못하고 있다.',
    tags: ['여대생', '무죄 확정', '장기'],
    sourceUrl: 'https://n.news.naver.com/mnews/article/011/0004626089?sid=102',
  },
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
      '2000년 6월 15일 전남 강진읍 동초등학교 2학년이던 김성주(당시 8세) 양이 하교 후 오빠를 기다리다 자취를 감췄다. 이듬해인 2001년 6월 1일에는 같은 지역에서 김하은(당시 6세) 양이 실종되며 1년 간격의 연쇄 실종 사건으로 불리게 됐다. 수사 과정에서 동종 전과가 있는 인물이 유력 용의자로 지목돼 한때 범행을 자백했으나 이후 진술을 번복했고, 결정적 증거를 확보하지 못한 채 사건은 미궁에 빠졌다. 2026년 전남경찰청은 장기 실종 어린이 전담수사팀을 꾸려 원점에서 재수사에 착수했다.',
    tags: ['어린이', '실종', '재수사'],
    sourceUrl: 'https://www.wikitree.co.kr/articles/1142766',
  },
]

// ── "오늘의 미제사건" — 날짜 기준으로 매일 자동으로 1건 선정 ──────
// 서버 없이도 날짜만 바뀌면 매일 다른 사건이 노출됩니다 (목록 길이로 순환).
export function getColdCaseOfDay(date: Date = new Date()): ColdCaseItem {
  // 로컬 자정 기준 "에포크 이후 일수"로 인덱스 계산 → 하루 단위로 고정
  const dayNumber = Math.floor(
    new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() /
      86_400_000,
  )
  const idx = ((dayNumber % COLD_CASES.length) + COLD_CASES.length) % COLD_CASES.length
  return COLD_CASES[idx]
}
