import type { CaseItem, CaseCategory } from '../types'

// ── 카테고리 메타 (라벨 · 아이콘 · 색) ─────────────────────────────
export const CATEGORY_META: Record<
  CaseCategory,
  { label: string; icon: string; color: string }
> = {
  crime: { label: '강력범죄', icon: 'gavel', color: 'var(--cat-crime)' },
  traffic: { label: '교통사고', icon: 'directions_car', color: 'var(--cat-traffic)' },
  fire: { label: '화재/산불', icon: 'local_fire_department', color: 'var(--cat-fire)' },
  disaster: { label: '재난/사고', icon: 'crisis_alert', color: 'var(--cat-disaster)' },
  etc: { label: '기타', icon: 'more_horiz', color: 'var(--cat-etc)' },
}

// ── 오늘의 사건사고 (2026년 8월 1일 전후 실제 보도 기반) ──────────
// ※ 공개 언론 보도를 요약·재구성했으며, 각 항목에 원문 출처 링크를 표기했습니다.
export const CASES: CaseItem[] = [
  {
    id: 'c-20260801-koupang-fire',
    title: '인천 쿠팡 물류센터 대형 화재…109시간 만에 진화, 경찰 압수수색',
    summary:
      '석남동 쿠팡 물류센터에서 난 대형 화재가 109시간여 만에 꺼졌다. 경찰이 화재 원인 규명을 위해 쿠팡 사무실을 압수수색했다.',
    content:
      '인천 서구 석남동 쿠팡 물류센터에서 발생한 대형 화재가 109시간여 만에 진화됐다. 경찰은 화재 원인을 규명하기 위해 수사관 30여 명을 동원해 인근 쿠팡 사무실과 방재실 등을 압수수색하고, 설계도와 화재 당시 장면이 담긴 CCTV 원본 등을 확보했다. 인근 도로는 안전 문제로 한때 양방향이 통제됐다.',
    category: 'fire',
    region: '인천 서구',
    date: '2026-07-30',
    time: '11:29',
    source: 'YTN',
    sourceUrl: 'https://n.news.naver.com/mnews/article/052/0002386567?sid=102',
    likes: 892,
    comments: 143,
    isBreaking: true,
  },
  {
    id: 'c-20260801-heatwave',
    title: '살인적 폭염…온열질환자 1701명·사망 13명, 양산 41.4도 신기록',
    summary:
      '전국 대부분에 폭염특보가 내려진 가운데 경남 양산이 41.4도로 최고기온 기록을 새로 썼다. 온열질환 추정 사망자는 13명으로 늘었다.',
    content:
      '북태평양고기압의 영향으로 전국이 찜통더위에 휩싸이며 경남 양산의 기온이 41.4도까지 올라 역대 최고기온 기록을 갈아치웠다. 질병관리청에 따르면 온열질환 감시체계 가동 이후 전국 온열질환자는 1701명, 추정 사망자는 13명으로 집계됐다. 양산·창원·김해·부산 등 경남권에는 폭염중대경보가 발령됐고, 폭염에 따른 가축 폐사 등 피해도 이어지고 있다.',
    category: 'disaster',
    region: '전국',
    date: '2026-08-01',
    time: '01:44',
    source: '동아일보',
    sourceUrl: 'https://n.news.naver.com/mnews/article/020/0003738130?sid=102',
    likes: 640,
    comments: 98,
    isBreaking: true,
  },
  {
    id: 'c-20260801-chilgok-fire',
    title: '경북 칠곡 가산면 공장 화재…"차량 우회 바람"',
    summary:
      '칠곡 가산면 다부리 일원 공장에서 불이 나 소방당국이 진화에 나섰다. 지자체는 안전 안내문자로 차량 우회를 당부했다.',
    content:
      '경북 칠곡군은 안전 안내문자를 통해 "오후 6시 4분경 가산면 다부리 일원 공장에서 화재가 발생했다"고 알리고, 인근을 지나는 차량에 우회를 당부했다. 소방당국은 인력과 장비를 투입해 진화 작업을 벌였다. 구체적인 피해 규모와 화재 원인은 조사 중이다.',
    category: 'fire',
    region: '경북 칠곡군',
    date: '2026-07-31',
    time: '18:04',
    source: '국제뉴스',
    sourceUrl: 'https://www.gukjenews.com/news/articleView.html?idxno=3652603',
    likes: 121,
    comments: 14,
  },
  {
    id: 'c-20260801-chungju-truck-fire',
    title: '중부내륙고속도로 충주분기점 부근 화물차 화재…2차로 통제',
    summary:
      '창원 방향 충주분기점 부근에서 대형 화물차에 불이 나 후미 정체가 빚어졌다. 사고 처리를 위해 2차로가 통제됐다.',
    content:
      '오후 2시 29분께 중부내륙고속도로 창원 방향 충주분기점 부근에서 대형 화물차에 불이 났다. 한국도로공사 교통정보에 따르면 화재 사고 처리를 위해 2차로가 통제되면서 후미에 정체가 발생했다. 인명 피해는 확인되지 않았으며 당국이 정확한 화재 원인을 조사하고 있다.',
    category: 'traffic',
    region: '충북 충주시',
    date: '2026-07-31',
    time: '14:29',
    source: '이투데이',
    sourceUrl: 'https://www.etoday.co.kr/news/view/2609787',
    likes: 88,
    comments: 7,
  },
  {
    id: 'c-20260801-gangbuk-murder',
    title: "'강북 오피스텔 살인' 구속된 50대…파주 주거지 압수수색",
    summary:
      '서울 강북 오피스텔 살인사건으로 구속된 50대 피의자의 파주 주거지를 경찰이 압수수색했다. 검거 당시 현장에서 마약 관련 물품도 발견됐다.',
    content:
      '서울 강북경찰서는 오피스텔 살인사건으로 구속된 50대 피의자 A씨의 경기 파주 주거지를 압수수색했다. A씨는 앞서 구속됐으며, 검거 당시 현장에서는 마약 관련 물품이 발견됐고 간이시약 검사에서 필로폰 양성 반응이 나온 것으로 전해졌다. 경찰은 범행 경위와 마약 투약 여부 등을 함께 수사하고 있다.',
    category: 'crime',
    region: '서울 강북구',
    date: '2026-07-31',
    time: '22:02',
    source: '세계일보',
    sourceUrl: 'https://n.news.naver.com/mnews/article/022/0004147507?sid=102',
    likes: 305,
    comments: 62,
  },
  {
    id: 'c-20260801-tongyeong-murder',
    title: '통영 여성 살인사건 50일째 미검거…범인 여전히 오리무중',
    summary:
      '경남 통영에서 발생한 여성 살인사건이 50일이 지나도록 범인을 특정하지 못하고 있다. 태완이법으로 공소시효가 없어 수사는 계속된다.',
    content:
      '경남 통영에서 발생한 여성 살인사건이 50일째 범인을 검거하지 못한 채 미궁에 빠져 있다. 경찰은 폭넓게 수사를 이어가고 있으나 결정적 단서를 확보하지 못한 상태다. 다만 2015년 시행된 이른바 태완이법으로 살인죄 공소시효가 폐지돼, 사건이 장기 미제로 남더라도 범인을 특정하는 즉시 언제든 형사처벌이 가능하다.',
    category: 'crime',
    region: '경남 통영시',
    date: '2026-07-29',
    time: '10:57',
    source: '매일경제',
    sourceUrl: 'https://n.news.naver.com/mnews/article/009/0005713700?sid=102',
    likes: 421,
    comments: 77,
  },
  {
    id: 'c-20260801-algeria-bus',
    title: '알제리서 버스 계곡으로 추락…최소 25명 사망',
    summary:
      '북아프리카 알제리에서 버스가 계곡으로 추락해 최소 25명이 숨졌다. 알제리에서는 교통사고 사망이 끊이지 않고 있다.',
    content:
      '북아프리카 알제리에서 버스가 계곡으로 추락해 최소 25명이 사망했다. 알제리에서는 지난 한 해 교통사고로 3800여 명이 숨지고 3만7000여 명이 다친 것으로 집계됐으며, 지난해 8월에도 알제 인근에서 버스가 계곡으로 추락해 18명이 숨지는 사고가 있었다.',
    category: 'disaster',
    region: '해외 · 알제리',
    date: '2026-08-01',
    time: '01:21',
    source: '연합뉴스',
    sourceUrl: 'https://n.news.naver.com/mnews/article/001/0016227891?sid=104',
    likes: 156,
    comments: 20,
  },
  {
    id: 'c-20260801-elderly-driving',
    title: '고령운전 사고 44% 늘 때 면허 반납은 2.5%뿐',
    summary:
      '서울 시청역 인근 고령 운전자 페달 오조작 참사 2년이 지났지만 고령 운전자 교통사고는 좀처럼 줄지 않고 있다.',
    content:
      '2024년 7월 서울 시청역 인근에서 고령 운전자의 페달 오조작으로 9명이 숨진 지 2년이 지났지만, 국내 고령 운전자 교통사고는 좀처럼 줄지 않고 있다. 초고령 사회 진입으로 고령 운전자 수가 갈수록 늘고 있으나 자발적 면허 반납률은 2.5%에 그치는 것으로 나타났다. 전문가들은 조건부 면허 등 실효성 있는 대책이 필요하다고 지적한다.',
    category: 'traffic',
    region: '전국',
    date: '2026-08-01',
    time: '00:46',
    source: '조선일보',
    sourceUrl: 'https://n.news.naver.com/mnews/article/023/0003990807?sid=102',
    likes: 233,
    comments: 51,
  },
  {
    id: 'c-20260801-anseong',
    title: '형집행 피하려 빌라서 추락한 60대…현장서 수배 아들도 검거',
    summary:
      '경기 안성의 한 빌라에서 형집행을 피하려던 60대가 추락해 다쳤고, 함께 있던 수배 중인 아들도 현장에서 붙잡혔다.',
    content:
      '경기 안성의 한 빌라에서 60대 남성 A씨가 형집행을 피하려다 추락해 부상을 입었다. 경찰에 따르면 이 과정에서 현장에 있던 수배 중인 아들 B씨도 함께 검거됐다. B씨 역시 다른 사건으로 부과된 벌금을 내지 않아 수배된 상태였던 것으로 확인됐다.',
    category: 'etc',
    region: '경기 안성시',
    date: '2026-07-31',
    time: '19:18',
    source: '경기일보',
    sourceUrl: 'https://n.news.naver.com/mnews/article/666/0000117393?sid=102',
    likes: 74,
    comments: 11,
  },
]
