// 카카오톡 카드용 그라데이션 배너 PNG 생성 (인스타 그라데이션, 순수 JS)
// 한 번 생성해 public/kakao-banner.png 로 커밋 → notify-kakao.mjs 가 업로드해 사용.
import { PNG } from 'pngjs'
import { writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const W = 900
const H = 360

// 45deg: #F58529 → #DD2A7B → #8134AF → #515BD4
const stops = [
  { p: 0.0, c: [245, 133, 41] },
  { p: 0.33, c: [221, 42, 123] },
  { p: 0.66, c: [129, 52, 175] },
  { p: 1.0, c: [81, 91, 212] },
]

function colorAt(t) {
  for (let i = 0; i < stops.length - 1; i++) {
    const a = stops[i]
    const b = stops[i + 1]
    if (t >= a.p && t <= b.p) {
      const f = (t - a.p) / (b.p - a.p)
      return [
        Math.round(a.c[0] + (b.c[0] - a.c[0]) * f),
        Math.round(a.c[1] + (b.c[1] - a.c[1]) * f),
        Math.round(a.c[2] + (b.c[2] - a.c[2]) * f),
      ]
    }
  }
  return stops[stops.length - 1].c
}

const png = new PNG({ width: W, height: H })
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const t = (x + y) / (W + H)
    const [r, g, b] = colorAt(t)
    const idx = (W * y + x) << 2
    png.data[idx] = r
    png.data[idx + 1] = g
    png.data[idx + 2] = b
    png.data[idx + 3] = 255
  }
}

const out = join(root, 'public', 'kakao-banner.png')
writeFileSync(out, PNG.sync.write(png))
console.log('[gen-banner] 생성:', out, `${W}x${H}`)
