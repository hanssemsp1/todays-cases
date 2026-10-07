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

### 반영됨 (2026-10-07)

`public/rooms/` 의 세 방 이미지와 글꼴은 실자산이 들어와 있다. 코드는 바꿀 것이 없고, 다시 받으면 같은 이름으로 덮어쓰면 된다.

- `public/rooms/work.webp` `gather.webp` `space.webp` — 1536×1024
- `public/rooms/display.woff` — 제목 글꼴(RoomSerif, Noto Serif CJK KR 부분집합)
- `public/rooms/body.woff` — 본문 글꼴(RoomSans, Noto Sans CJK KR 부분집합)
- `public/rooms/FONT-LICENSE.txt` — 글꼴 라이선스(OFL 1.1)

글꼴이 들어왔으므로 `index.html` 에 `<link rel="preload" as="font">` 두 줄을 넣는 것을 검토한다(아직 넣지 않았다).

### 자리표시 (브랜드 색으로 임시 제작, 유비서 자산이 오면 교체)

아래 파일은 시안 파비콘(`public/favicon.svg`, ink #142129 바탕에 세 막대)을 기준으로 코드(System.Drawing)로 만든 임시본이다. 유비서가 정식 그림을 주면 같은 이름으로 덮어쓴다.

- `public/og-home.png` — 1200×630, 메인 공유 카드(index.html og:image·twitter:image). 사건 상세는 옛 `og-image.png` 를 그대로 쓴다(prerender.mjs 유튜브 썸네일 없을 때 대체).
- `public/icon-192.png` `icon-512.png` `icon-maskable-512.png` — PWA 아이콘(manifest.webmanifest)
- `public/apple-touch-icon.png` — 180×180
- `public/favicon-32.png` — SVG 파비콘을 못 읽는 브라우저용

## 프리렌더

`scripts/prerender.mjs` 가 홈(`dist/index.html`)과 `dist/news.html` `work.html` `gather.html` `space.html` 을 따로 쓴다(cleanUrls 가 `/news` 등에 서빙). 페이지마다 `<title>`·description·canonical·og:url 이 자기 주소를 가리키고, 홈과 방의 크롤러용 본문은 `.rooms-root` 로 감싸 React 가 뜨기 전에도 어두운 배경이 먼저 보인다.
