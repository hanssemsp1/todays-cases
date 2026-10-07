// 세 개의 방 데이터 — 시안 app.js 의 rooms 객체를 그대로 옮김(글자 변경 없음).
export type RoomKey = 'work' | 'gather' | 'space'

export interface Room {
  number: string
  english: string
  art: string
  title: string
  /** 시안 원문 그대로 '<br>' 로 줄을 나눈다. 화면에서는 renderBr 로 바꿔 그린다. */
  statement: string
  description: string
  alt: string
}

export const ROOM_KEYS: RoomKey[] = ['work', 'gather', 'space']

export const rooms: Record<RoomKey, Room> = {
  work: { number: '01', english: 'THE STUDY', art: 'The Study', title: '오늘의 근로 케이스', statement: '일의 기준을,<br>차분하게.', description: '급여와 휴가, 일터의 크고 작은 궁금증을 살피는 방.', alt: '짙은 네이비 서재 안의 나무 책상과 황동 조명, 책과 나무 책장' },
  gather: { number: '02', english: 'THE SALON', art: 'The Salon', title: '모임 한 판', statement: '함께하는 시간을,<br>조금 더 즐겁게.', description: '처음 만나는 순간부터 오래 기억할 자리까지, 모임의 시작을 준비하는 방.', alt: '테라코타빛 살롱의 타원형 나무 테이블과 버건디 소파, 대화를 위한 카드' },
  space: { number: '03', english: 'THE ATELIER', art: 'The Atelier', title: '1cm 차이 연구소', statement: '작은 차이로,<br>달라지는 공간.', description: '가구를 놓기 전의 고민부터 일상의 동선까지, 공간의 가능성을 살피는 방.', alt: '넓은 입구 너머로 햇빛이 들어오는 아이보리 침실의 나무 침대와 의자' },
}

export function isRoomKey(v: string | undefined): v is RoomKey {
  return v === 'work' || v === 'gather' || v === 'space'
}

/** 방 이미지 경로. 유비서 자산이 오면 public/rooms/ 에 같은 이름으로 덮어쓴다. */
export const roomImage = (key: RoomKey) => `/rooms/${key}.webp`

export const HOME_TITLE = '오늘의 케이스 · 세 개의 방'
export const roomDocumentTitle = (key: RoomKey) => `${rooms[key].title} · 오늘의 케이스`

/** 머리줄 메뉴 — 시안 masthead 의 「01 일터」「02 모임」「03 공간」 */
export const NAV_LABELS: Record<RoomKey, string> = { work: '일터', gather: '모임', space: '공간' }
