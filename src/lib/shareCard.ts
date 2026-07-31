import type { CaseItem } from '../types'
import { CATEGORY_META } from '../data/cases'

// ── 공유 카드 이미지 생성 (외부 라이브러리 없이 Canvas 2D로 직접 렌더) ──
// 카카오톡 등에 첨부할 수 있도록 사건을 1080x1080 PNG 카드로 그려서 반환/다운로드.

const SIZE = 1080
const PAD = 72

// 인스타 그라데이션 (45deg,#F58529,#DD2A7B,#8134AF,#515BD4)
function instaGradient(ctx: CanvasRenderingContext2D, x0: number, y0: number, x1: number, y1: number) {
  const g = ctx.createLinearGradient(x0, y0, x1, y1)
  g.addColorStop(0, '#F58529')
  g.addColorStop(0.33, '#DD2A7B')
  g.addColorStop(0.66, '#8134AF')
  g.addColorStop(1, '#515BD4')
  return g
}

// 텍스트 줄바꿈 (한글 포함 — 공백 우선, 안 되면 글자 단위)
function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  maxLines: number,
): string[] {
  const lines: string[] = []
  let line = ''
  for (const ch of text) {
    const test = line + ch
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line)
      line = ch
      if (lines.length === maxLines - 1) break
    } else {
      line = test
    }
  }
  if (lines.length < maxLines && line) lines.push(line)
  // 넘치면 마지막 줄 말줄임
  const rest = text.slice(lines.join('').length)
  if (rest && lines.length) {
    let last = lines[lines.length - 1]
    while (ctx.measureText(last + '…').width > maxWidth && last.length > 1) {
      last = last.slice(0, -1)
    }
    lines[lines.length - 1] = last + '…'
  }
  return lines
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}

// 폰트가 준비될 때까지 대기 (Poppins / Noto Sans KR)
async function ensureFonts() {
  if (!('fonts' in document)) return
  try {
    await Promise.all([
      document.fonts.load('700 64px "Poppins"'),
      document.fonts.load('700 48px "Noto Sans KR"'),
      document.fonts.load('500 30px "Noto Sans KR"'),
    ])
    await document.fonts.ready
  } catch {
    /* 폰트 로드 실패해도 기본 폰트로 진행 */
  }
}

export async function renderShareCard(item: CaseItem): Promise<HTMLCanvasElement> {
  await ensureFonts()
  const meta = CATEGORY_META[item.category]
  const canvas = document.createElement('canvas')
  canvas.width = SIZE
  canvas.height = SIZE
  const ctx = canvas.getContext('2d')!

  // 배경
  ctx.fillStyle = '#FFFFFF'
  ctx.fillRect(0, 0, SIZE, SIZE)

  // 상단 그라데이션 헤더
  const headerH = 150
  ctx.fillStyle = instaGradient(ctx, 0, 0, SIZE, headerH)
  ctx.fillRect(0, 0, SIZE, headerH)
  ctx.fillStyle = '#FFFFFF'
  ctx.font = '700 44px "Poppins", "Noto Sans KR", sans-serif'
  ctx.textBaseline = 'middle'
  ctx.fillText('오늘의 사건사고', PAD, headerH / 2)
  // 헤더 우측 날짜
  ctx.font = '500 30px "Poppins", "Noto Sans KR", sans-serif'
  ctx.textAlign = 'right'
  ctx.fillText(item.date, SIZE - PAD, headerH / 2)
  ctx.textAlign = 'left'

  let y = headerH + 70

  // 카테고리 + 속보 배지
  ctx.textBaseline = 'middle'
  ctx.font = '700 30px "Poppins", "Noto Sans KR", sans-serif'
  const catLabel = meta.label
  const catW = ctx.measureText(catLabel).width + 48
  ctx.fillStyle = meta.color
  roundRect(ctx, PAD, y - 26, catW, 52, 26)
  ctx.fill()
  ctx.fillStyle = '#FFFFFF'
  ctx.fillText(catLabel, PAD + 24, y + 1)

  if (item.isBreaking) {
    const bx = PAD + catW + 16
    const bLabel = '속보'
    const bW = ctx.measureText(bLabel).width + 48
    ctx.fillStyle = instaGradient(ctx, bx, y, bx + bW, y)
    roundRect(ctx, bx, y - 26, bW, 52, 26)
    ctx.fill()
    ctx.fillStyle = '#FFFFFF'
    ctx.fillText(bLabel, bx + 24, y + 1)
  }

  y += 90

  // 제목
  ctx.fillStyle = '#262626'
  ctx.textBaseline = 'top'
  ctx.font = '700 58px "Poppins", "Noto Sans KR", sans-serif'
  const titleLines = wrapText(ctx, item.title, SIZE - PAD * 2, 4)
  for (const l of titleLines) {
    ctx.fillText(l, PAD, y)
    y += 74
  }

  y += 20
  // 구분선
  ctx.strokeStyle = '#DBDBDB'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(PAD, y)
  ctx.lineTo(SIZE - PAD, y)
  ctx.stroke()
  y += 40

  // 요약
  ctx.fillStyle = '#262626'
  ctx.font = '400 34px "Noto Sans KR", "Poppins", sans-serif'
  const sumLines = wrapText(ctx, item.summary, SIZE - PAD * 2, 6)
  for (const l of sumLines) {
    ctx.fillText(l, PAD, y)
    y += 50
  }

  // 하단 정보 (지역 · 출처)
  const footY = SIZE - 120
  ctx.strokeStyle = '#DBDBDB'
  ctx.beginPath()
  ctx.moveTo(PAD, footY)
  ctx.lineTo(SIZE - PAD, footY)
  ctx.stroke()

  ctx.fillStyle = '#8E8E8E'
  ctx.font = '500 30px "Noto Sans KR", "Poppins", sans-serif'
  ctx.textBaseline = 'middle'
  const locText = `📍 ${item.region}${item.time ? ` · ${item.time}` : ''}  ·  ${item.source}`
  ctx.fillText(locText, PAD, footY + 45)

  // 하단 그라데이션 강조 라인
  ctx.fillStyle = instaGradient(ctx, 0, 0, SIZE, 0)
  ctx.fillRect(0, SIZE - 12, SIZE, 12)

  return canvas
}

// PNG Blob 생성
export async function shareCardBlob(item: CaseItem): Promise<Blob> {
  const canvas = await renderShareCard(item)
  return await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('이미지 생성 실패'))), 'image/png')
  })
}

// 파일로 다운로드
export async function downloadShareCard(item: CaseItem) {
  const blob = await shareCardBlob(item)
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `사건_${item.id}.png`
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}
