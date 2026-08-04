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
  {
    id: 'cc-daegu-frogboys',
    caseNo: '1991 · 대구 달서구',
    title: '개구리 소년(대구 성서초 학생) 실종 사건',
    occurredDate: '1991-03-26',
    region: '대구광역시 달서구',
    status: 'cold',
    summary:
      '도롱뇽 알을 주우러 와룡산에 오른 초등학생 5명이 한꺼번에 사라졌다. 11년 만인 2002년 유해가 발견됐지만 가해자와 범행 동기는 끝내 밝혀지지 않았다.',
    details:
      '1991년 3월 26일 대구 달서구 성서초등학교에 다니던 9~13세 남자아이 5명이 "도롱뇽 알을 주우러 간다"며 집 근처 와룡산에 올라간 뒤 저녁이 되어도 돌아오지 않았다. 경찰과 군, 주민 수만 명이 동원돼 대대적인 수색을 벌였지만 아이들의 흔적을 찾지 못했고, 사건은 미궁에 빠진 채 세간의 관심에서 잊혀 갔다. 그러다 11년이 지난 2002년 9월 26일, 인근 야산에서 등산객이 우연히 유골 5구를 발견하면서 사건은 다시 세상에 알려졌다. 감식 결과 아이들은 둔기에 의한 외상으로 사망한 것으로 추정됐으나, 오랜 시간이 지나 결정적 증거가 남아 있지 않았고 목격자도 나타나지 않아 범인은 끝내 특정되지 못했다. 2006년 공소시효가 만료되며 수사는 사실상 종결됐지만, 이춘재 연쇄살인 사건·이형호 유괴살해 사건과 함께 한국의 3대 미제 사건으로 꼽히며 지금도 방송·다큐멘터리를 통해 재조명되고 있다.',
    tags: ['어린이', '실종', '3대 미제'],
    sourceUrl: 'https://ko.wikipedia.org/wiki/%EA%B0%9C%EA%B5%AC%EB%A6%AC_%EC%86%8C%EB%85%84_%EC%82%AC%EA%B1%B4',
    videoUrl: 'https://www.youtube.com/watch?v=GtyiUsoX3Kw',
  },
  {
    id: 'cc-apgujeong-leehyungho',
    caseNo: '1991 · 서울 강남',
    title: '이형호 군 유괴 살해 사건',
    occurredDate: '1991-01-29',
    region: '서울특별시 강남구',
    status: 'cold',
    summary:
      '서울 압구정동에서 9살 이형호 군이 유괴된 뒤 44일간 몸값을 요구하는 협박 전화가 이어졌지만 아이는 끝내 싸늘한 주검으로 발견됐다. 2006년 공소시효가 만료되며 범인을 검거하지 못한 채 영구 미제로 남았다.',
    details:
      "1991년 1월 29일 오후 서울 강남구 압구정동 현대아파트에 살던 초등학교 3학년 이형호 군이 집 근처에서 사라졌다. 범인은 가족 사정을 잘 아는 듯한 태도로 부모에게 전화를 걸어 7천만원의 몸값을 요구했고, 44일 동안 전화와 메모로 경찰과 가족을 농락했다. 이형호 군은 실종 43일 만인 3월 13일 잠실대교 인근 배수로에서 숨진 채 발견됐다. 범인의 목소리를 확보하고도 신원을 특정하지 못한 채 2006년 1월 공소시효가 만료돼 영구 미제 사건으로 남았으며, 이 사건은 영화 '그놈 목소리'의 모티브가 됐다.",
    tags: ['어린이', '유괴', '3대 미제'],
    sourceUrl: 'https://ko.wikipedia.org/wiki/%EC%9D%B4%ED%98%95%ED%98%B8_%EC%9C%A0%EA%B4%B4_%EC%82%B4%ED%95%B4_%EC%82%AC%EA%B1%B4',
    videoUrl: 'https://www.youtube.com/watch?v=nuv8blez5CU',
  },
  {
    id: 'cc-chuncheon-1972',
    caseNo: '1972 · 강원 춘천',
    title: '춘천 강간살인 조작 사건',
    occurredDate: '1972-09-27',
    region: '강원 춘천시',
    status: 'unsolved',
    summary:
      '1972년 강원 춘천에서 파출소장의 9세 딸이 성폭행당한 뒤 살해됐다. 경찰은 무고한 만화방 주인을 고문해 허위자백을 받아냈고, 그는 15년을 복역한 뒤 2011년 재심에서야 무죄를 선고받았지만 진범은 끝내 밝혀지지 않았다.',
    details:
      "1972년 9월 27일 강원 춘천시 우두동에서 춘천경찰서 역전파출소장의 9세 딸이 성폭행당한 뒤 살해된 채 발견됐다. 조속한 범인 검거 지시가 떨어지자 경찰은 피해 아동이 다녀간 만화방 주인 정원섭씨를 유력 용의자로 지목했다. 경찰은 정원섭씨를 거꾸로 매달고 물고문을 하는 등 가혹행위를 가해 허위자백을 받아냈고, 정씨는 무기징역을 선고받아 15년간 복역했다. 이후 진실·화해를위한과거사정리위원회의 재심 권고로 2011년 재심에서 뒤늦게 무죄가 확정됐지만 정씨는 이미 억울한 옥살이로 삶이 무너진 뒤였다. 사건 발생 50년이 지나도록 진범은 밝혀지지 않아 미제로 남아 있다.",
    tags: ['조작수사', '재심무죄', '진범미제'],
    sourceUrl: 'https://ko.wikipedia.org/wiki/%EC%B6%98%EC%B2%9C_%EA%B0%95%EA%B0%84%EC%82%B4%EC%9D%B8_%EC%A1%B0%EC%9E%91_%EC%82%AC%EA%B1%B4',
    videoUrl: 'https://www.youtube.com/watch?v=BuEzOIAdloA',
  },
]

// ── "오늘의 미제사건" — 가장 최근에 올라온(배열의 마지막) 사건 ──────
// 매일 예약작업이 배열 끝에 1건 추가하므로, 마지막 항목이 "오늘의 미제사건"이 됩니다.
export function getColdCaseOfDay(): ColdCaseItem {
  return COLD_CASES[COLD_CASES.length - 1]
}
