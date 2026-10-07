# 메인 「오늘의 케이스 · 세 개의 방」

유비서 정적 시안 v2(`팜데이-책상/결과/todaycase/유비서_메인시안_v2/`)를 React 로 옮긴 것.

| 파일 | 역할 |
|---|---|
| `rooms.css` | 시안 style.css 를 `.rooms-root` 안으로 가둔 것(선택자·수치는 그대로). 끝에 재검토서 B1(밑줄 거리) 수정이 붙어 있다. |
| `roomsData.ts` | 시안 app.js 의 rooms 객체(글자 그대로). |
| `RoomsFrame.tsx` | skip 링크 · 머리줄(masthead) · 꼬리줄(footer). 메인과 방이 같이 쓴다. |
| `RoomsHome.tsx` | 메인(`/`). |
| `RoomView.tsx` | 방(`/work` `/gather` `/space`). |
| `returnState.ts` | 메인 → 방 → 메인 복귀 때 포커스·스크롤 되돌리기 기록. |

## 자산 교체

지금 `public/rooms/` 에 있는 `work.webp` `gather.webp` `space.webp` 는 ffmpeg 로 만든 단색 그라데이션 자리표시이고, 글꼴 `display.woff` `body.woff` 는 아직 없다(없어도 대체 글꼴로 뜬다).

**유비서 자산이 오면 `public/rooms/` 에 같은 이름으로 덮어쓰면 끝.** 코드는 바꿀 것이 없다.

- `public/rooms/work.webp` — 1536×1024
- `public/rooms/gather.webp` — 1536×1024
- `public/rooms/space.webp` — 1536×1024
- `public/rooms/display.woff` — 제목 글꼴(RoomSerif)
- `public/rooms/body.woff` — 본문 글꼴(RoomSans)

글꼴 파일이 들어오면 `index.html` 에 `<link rel="preload" as="font">` 두 줄을 넣는 것을 검토한다(지금은 404 를 피하려고 넣지 않았다).
