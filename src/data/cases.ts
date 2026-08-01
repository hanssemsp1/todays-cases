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

// ── 오늘의 사건사고 ────────────────────────────────────────────────
// ※ 2026-08-01부터 매일 예약작업이 "클릭하고 싶은" 실제 사건을 한 배치씩 쌓습니다.
//    date = 게시일(사이트에 올라온 날). 각 항목은 공개 보도 기반이며 원문 출처를 표기합니다.
export const CASES: CaseItem[] = [
  {
    id: 'c-20260802-kuwait-drone-strike',
    title: '이란, 쿠웨이트에 또 드론 공습…"美 방패막이 나라는 불탈 것"',
    summary:
      '쿠웨이트 국방부는 1일 새벽 자국 영공에서 이란의 무인기 공습을 포착해 요격했다고 밝혔다. 정부 시설과 부비얀섬 일대가 표적이 됐으며 다행히 인명 피해는 없었다.',
    content:
      '쿠웨이트 국방부 사우드 압둘아지즈 알아트완 대변인은 1일(현지시간) "오늘 새벽 쿠웨이트 영공 내에서 적 드론을 탐지해 요격했다"고 밝혔다. 이란은 쿠웨이트 북부의 정부 시설과 부비얀섬의 차량 등을 표적으로 삼은 것으로 알려졌으며, 이로 인해 일부 시설이 파손됐지만 인명 피해는 없었다. 이란군을 통합 지휘하는 하탐알안비야 중앙사령부의 알리 압돌라히 사령관은 "범죄적이고 침략적인 미국의 방패막이가 되는 나라는 전쟁의 불길 속에서 타오르게 될 것"이라며 미국의 군사 지원국들을 겨냥해 경고했다. 앞서 지난 6월에도 이란의 드론·미사일 공격으로 쿠웨이트국제공항에서 1명이 숨지고 63명이 다친 바 있어, 중동 지역의 긴장은 좀처럼 가라앉지 않고 있다.',
    category: 'disaster',
    region: '해외 · 쿠웨이트',
    date: '2026-08-02',
    source: '경향신문',
    sourceUrl: 'https://www.khan.co.kr/article/202608012113001/',
    likes: 480,
    comments: 76,
    isBreaking: true,
  },
  {
    id: 'c-20260802-daechidong-drunk-hitrun',
    title: '강남 대치동서 술 취해 도로 나온 40대, 차에 치여 숨져',
    summary:
      '서울 강남구 대치동에서 술에 취해 도로로 나온 40대 남성이 지나가던 차량에 치여 숨졌다. 경찰은 30대 운전자를 사고 후 미조치 혐의로 입건해 정확한 경위를 조사하고 있다.',
    content:
      '1일 새벽 서울 강남구 대치동 도로에서 술에 취한 40대 남성 A씨가 차도로 나왔다가 지나가던 차량에 치여 숨지는 사고가 발생했다. 신고를 받고 출동한 구급대가 현장에 도착했을 때 A씨는 이미 숨진 상태였다. 30대 운전자 B씨는 경찰 조사에서 "피해자를 미처 보지 못했다"고 진술했으며, 음주나 약물 반응은 나타나지 않은 것으로 확인됐다. 서울강남경찰서는 B씨를 사고 후 미조치 치사 혐의로 입건하고 정확한 사고 경위를 조사하고 있다.',
    category: 'traffic',
    region: '서울 강남구',
    date: '2026-08-02',
    source: '서울신문',
    sourceUrl: 'https://www.seoul.co.kr/news/society/accident/2026/08/01/20260801500018',
    likes: 210,
    comments: 34,
  },
  {
    id: 'c-20260802-heatwave-livestock',
    title: '역대급 폭염에 가축 36만5000마리 떼죽음',
    summary:
      '연일 이어지는 폭염으로 전국에서 가축 폐사 피해가 눈덩이처럼 불어나고 있다. 정부 집계 결과 폐사한 가축은 36만5000여 마리에 달하며, 이 중 93%가 닭·오리 등 가금류였다.',
    content:
      '기록적인 폭염이 이어지면서 전국 축산 농가의 피해가 속출하고 있다. 정부 집계에 따르면 폭염으로 폐사한 가축은 돼지 2만2838마리, 가금류 34만2333마리 등 총 36만5171마리에 달한다. 전체 폐사 가축의 93.7%가 닭·오리 등 가금류에 집중된 것으로 나타났다. 좁은 축사에 밀집 사육되고 깃털로 덮여 체열을 밖으로 내보내기 어려운 가금류 특성상 축사 내부 온도가 오르면 짧은 시간에 집단 폐사로 이어지기 쉽다는 게 전문가들의 설명이다. 경북에서는 돼지 7243마리와 닭 7만4318마리가, 경기에서는 8만6000여 마리가 폐사 신고된 것으로 집계됐다.',
    category: 'disaster',
    region: '전국',
    date: '2026-08-02',
    source: '파이낸셜뉴스',
    sourceUrl: 'https://www.fnnews.com/news/202608010931483780',
    likes: 150,
    comments: 28,
  },
  {
    id: 'c-20260801-heatwave',
    title: '살인적 폭염…온열질환자 1701명·사망 13명, 양산 41.4도 신기록',
    summary:
      '전국 대부분에 폭염특보가 내려진 가운데 경남 양산이 41.4도로 역대 최고기온을 새로 썼다. 온열질환 추정 사망자는 13명으로 늘었다.',
    content:
      '북태평양고기압의 영향으로 전국이 찜통더위에 휩싸이며 경남 양산의 기온이 41.4도까지 올라 역대 최고기온 기록을 갈아치웠다. 질병관리청에 따르면 온열질환 감시체계 가동 이후 전국 온열질환자는 1701명, 추정 사망자는 13명으로 집계됐다. 양산·창원·김해·부산 등 경남권에는 폭염중대경보가 발령됐고, 폭염에 따른 가축 폐사 등 피해도 이어지고 있다.',
    category: 'disaster',
    region: '전국',
    date: '2026-08-01',
    time: '01:44',
    source: 'JTBC News',
    sourceUrl: 'https://n.news.naver.com/mnews/article/020/0003738130?sid=102',
    videoUrl: 'https://www.youtube.com/watch?v=ewPYLepGPLo',
    likes: 640,
    comments: 98,
    isBreaking: true,
  },
  {
    id: 'c-20260801-koupang-fire',
    title: '인천 쿠팡 물류센터 대형 화재…109시간 만에 진화, 경찰 압수수색',
    summary:
      '석남동 쿠팡 물류센터에서 난 대형 화재가 109시간여 만에 꺼졌다. 경찰이 화재 원인 규명을 위해 쿠팡 사무실을 압수수색했다.',
    content:
      '인천 서구 석남동 쿠팡 물류센터에서 발생한 대형 화재가 109시간여 만에 진화됐다. 경찰은 화재 원인을 규명하기 위해 수사관 30여 명을 동원해 인근 쿠팡 사무실과 방재실 등을 압수수색하고, 설계도와 화재 당시 장면이 담긴 CCTV 원본 등을 확보했다. 인근 도로는 안전 문제로 한때 양방향이 통제됐다.',
    category: 'fire',
    region: '인천 서구',
    date: '2026-08-01',
    time: '11:29',
    source: '연합뉴스TV',
    sourceUrl: 'https://n.news.naver.com/mnews/article/052/0002386567?sid=102',
    videoUrl: 'https://www.youtube.com/watch?v=lspbZczcxjw',
    likes: 892,
    comments: 143,
    isBreaking: true,
  },
  {
    id: 'c-20260801-kumamoto-quake',
    title: '日 구마모토 강진 나흘째…사망 36명, 이온몰 실종자 수색 계속',
    summary:
      '일본 구마모토를 덮친 강진 발생 나흘째, 사망자가 36명으로 늘었다. 폭발이 있었던 이온몰에서는 골든타임이 지난 뒤에도 수색이 이어지고 있다.',
    content:
      '일본 구마모토 강진 발생 나흘째, 사망자가 36명으로 늘었다. 폭발과 화재로 큰 피해를 낸 이온 쇼핑몰에서는 골든타임인 72시간이 지났지만 매몰자가 남아 있을 가능성에 이른 새벽부터 구조대가 투입돼 수색이 재개됐다. 폭발 원인은 아직 확인되지 않았으나 가스 누출에 무게가 실리고 있으며, 정전과 단수까지 겹치며 이재민 1만여 명이 삼중고를 겪고 있다.',
    category: 'disaster',
    region: '해외 · 일본 구마모토',
    date: '2026-08-01',
    time: '08:00',
    source: '연합뉴스TV',
    sourceUrl: 'https://n.news.naver.com/mnews/article/422/0000891148?sid=104',
    videoUrl: 'https://www.youtube.com/watch?v=gl2TwqhQ8OY',
    likes: 512,
    comments: 88,
    isBreaking: true,
  },
  {
    id: 'c-20260801-daegu-loan-shark',
    title: "연 1만3000% '살인 이자' 뜯은 불법 대부업 조직 16명 검거",
    summary:
      '대구경찰청이 최고 연 1만3000%의 이자를 받아 챙긴 불법 사금융 조직원 16명을 검거해 2명을 구속했다. 피해자는 952명에 달한다.',
    content:
      '대구경찰청은 비대면 소액대출 방식으로 취약계층 952명에게 최고 연 1만3000%에 이르는 이자를 받아 챙긴 혐의로 불법 사금융업체 총책 30대 A씨 등 16명을 검거해 검찰에 송치했다고 밝혔다. 이 중 총책과 관리책 등 2명은 구속됐으며, 해외로 도피한 피의자 3명에 대해서는 인터폴 적색수배를 요청했다. 이들은 약 1년간 대구를 거점으로 활동하며 9억 원이 넘는 부당이득을 챙긴 것으로 조사됐다.',
    category: 'crime',
    region: '대구',
    date: '2026-08-01',
    time: '17:00',
    source: '매일신문',
    sourceUrl: 'https://n.news.naver.com/mnews/article/088/0001021595?sid=102',
    likes: 234,
    comments: 41,
  },
  {
    id: 'c-20260801-ganghwa-body',
    title: '강화 주문도 앞바다서 아동 추정 시신…실종아동·북한 유입 가능성 조사',
    summary:
      '북한 접경지역인 인천 강화군 주문도 인근 해상에서 남자아이로 추정되는 시신이 발견됐다. 해경이 실종아동 여부와 유입 경로를 조사 중이다.',
    content:
      '인천해양경찰서에 따르면 인천 강화군 주문도 인근 해상에서 신장 110cm가량의 남자아이로 추정되는 시신이 발견됐다. 주문도는 북방한계선(NLL)과 인접해 북한 연안까지 최단 거리가 약 7km에 불과한 접경지역이다. 해경은 부검 결과와 국내 실종아동 신고 내역을 대조하는 한편, 북한에서 해류를 타고 떠내려왔을 가능성 등 모든 상황을 열어두고 군·정부와 합동으로 공조 수사를 벌이고 있다.',
    category: 'etc',
    region: '인천 강화군',
    date: '2026-08-01',
    time: '09:30',
    source: '위키트리',
    sourceUrl: 'https://www.wikitree.co.kr/articles/1149718',
    likes: 298,
    comments: 56,
    isBreaking: true,
  },
  {
    id: 'c-20260801-tongyeong-murder',
    title: '통영 여성 살인사건 50일째 미검거…범인 여전히 오리무중',
    summary:
      '경남 통영에서 발생한 여성 살인사건이 50일이 지나도록 범인을 특정하지 못하고 있다. 태완이법으로 공소시효 없이 수사가 계속된다.',
    content:
      '경남 통영에서 발생한 여성 살인사건이 50일째 범인을 검거하지 못한 채 미궁에 빠져 있다. 경찰은 폭넓게 수사를 이어가고 있으나 결정적 단서를 확보하지 못한 상태다. 다만 2015년 시행된 이른바 태완이법으로 살인죄 공소시효가 폐지돼, 사건이 장기 미제로 남더라도 범인을 특정하는 즉시 언제든 형사처벌이 가능하다.',
    category: 'crime',
    region: '경남 통영시',
    date: '2026-08-01',
    time: '10:57',
    source: 'YTN',
    sourceUrl: 'https://n.news.naver.com/mnews/article/009/0005713700?sid=102',
    videoUrl: 'https://www.youtube.com/watch?v=kazKm2KO2b0',
    likes: 421,
    comments: 77,
  },
  {
    id: 'c-20260801-pakistan-mine',
    title: '파키스탄 탄광 가스폭발…광부 34명 사망·2명 매몰',
    summary:
      '파키스탄 발루치스탄주 탄광에서 가스폭발로 갱도가 붕괴해 광부 34명이 숨지고 2명이 매몰됐다. 동료를 구하러 뛰어든 광부들까지 참변을 당했다.',
    content:
      '파키스탄 발루치스탄주의 한 탄광에서 가스폭발로 갱도가 붕괴해 광부 34명이 숨지고 2명이 매몰됐다. 사고 당시 붕괴 구역에 36명이 있었으며, 폭발음이 들리자 다른 광부들이 갇힌 동료를 구하러 갱도로 뛰어들었다가 추가 붕괴에 휘말리며 피해가 커졌다. 당국은 지하 깊은 곳에 남은 매몰자 수색을 이어가고 있다.',
    category: 'disaster',
    region: '해외 · 파키스탄',
    date: '2026-08-01',
    time: '19:33',
    source: '파이낸셜뉴스',
    sourceUrl: 'https://n.news.naver.com/mnews/article/014/0005555771?sid=104',
    likes: 176,
    comments: 22,
    isBreaking: true,
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
    id: 'c-20260801-osan-stabbing',
    title: "'거래처 칼부림' 60대, 음독 치료 마치고 구속 갈림길",
    summary:
      '경기 오산의 거래처를 찾아가 흉기를 휘둘러 2명의 사상자를 낸 60대 남성이 음독 치료를 마치고 구속 전 심문을 받았다.',
    content:
      '경기 오산에서 거래처를 찾아가 무차별적으로 흉기를 휘둘러 2명의 사상자를 낸 60대 남성 A씨에 대한 구속 전 피의자 심문이 진행됐다. A씨는 범행 뒤 농약 성분이 포함된 약물을 마셔 음독을 시도했으며 9일간 치료를 받은 끝에 체포됐다. 경찰 조사에서는 "돈을 받고도 물품을 주지 않았다"는 이유로 범행한 것으로 파악됐다.',
    category: 'crime',
    region: '경기 오산시',
    date: '2026-08-01',
    time: '13:12',
    source: 'KBS',
    sourceUrl: 'https://n.news.naver.com/mnews/article/056/0012229024?sid=102',
    likes: 187,
    comments: 34,
  },
  {
    id: 'c-20260801-goyang-fire',
    title: '고양 화정동 아파트 한밤 화재…30대 심정지·60대 화상',
    summary:
      '경기 고양시 화정동의 한 아파트 7층에서 불이 나 주민 2명이 다쳤다. 소방당국이 약 1시간 50분 만에 진화했다.',
    content:
      '경기 고양시 덕양구 화정동의 한 아파트 7층에서 화재가 발생했다. 해당 세대에 있던 30대 남성이 심정지 상태로 발견돼 병원으로 옮겨진 뒤 의식을 회복했고, 60대 여성도 화상을 입어 치료를 받았다. 소방당국은 장비 32대와 인력 71명을 동원해 약 1시간 50분 만에 불을 껐다. 경찰과 소방당국이 정확한 화재 원인을 조사하고 있다.',
    category: 'fire',
    region: '경기 고양시',
    date: '2026-08-01',
    time: '00:05',
    source: '문화일보',
    sourceUrl: 'https://n.news.naver.com/mnews/article/021/0002808426?sid=102',
    likes: 143,
    comments: 19,
  },
  {
    id: 'c-20260801-gangnam-fall',
    title: '강남 주차장 철거 추락사…원청 대표, 서울권 중대재해 첫 구속',
    summary:
      '2024년 서울 강남 기계식 주차장 철거 현장에서 외국인 노동자가 추락해 숨진 사고와 관련해 원청 대표이사가 중대재해처벌법 위반으로 구속됐다.',
    content:
      '2024년 서울 강남구의 기계식 주차 철거공사 현장에서 외국인 노동자가 설비를 해체하던 중 약 15.7m 아래로 추락해 숨졌다. 노동당국은 하청업체에 안전관리 책임을 떠넘긴 원청업체 대표이사와 현장소장을 중대재해처벌법 위반 혐의로 구속했다. 이는 서울권역에서 중대재해처벌법 위반으로 사업주가 구속된 첫 사례다.',
    category: 'etc',
    region: '서울 강남구',
    date: '2026-08-01',
    time: '16:12',
    source: '뉴시스',
    sourceUrl: 'https://www.newsis.com/view/NISX20260731_0003731882',
    likes: 92,
    comments: 15,
  },
]
