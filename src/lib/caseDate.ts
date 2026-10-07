// 사건이 「언제 일어났나」를 사람 말로 바꾼다.
// 사이트에 올린 날(date)이 아니라 사건 발생일(occurredDate)이 독자가 궁금한 것이다.

const DAY = 86400000

function toDate(d: string) {
  return new Date(d + 'T00:00:00')
}

// 오늘 기준 며칠 전인가
export function daysAgo(occurredDate: string, today = new Date()): number {
  const t = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  return Math.round((t.getTime() - toDate(occurredDate).getTime()) / DAY)
}

// '오늘' '어제' '3일 전' '2026년 3월 14일' — 오래될수록 날짜를 그대로 말한다
export function occurredLabel(occurredDate: string, today = new Date()): string {
  const n = daysAgo(occurredDate, today)
  if (n < 0) return fullDate(occurredDate)
  if (n === 0) return '오늘'
  if (n === 1) return '어제'
  if (n === 2) return '그저께'
  if (n <= 7) return `${n}일 전`
  if (n <= 30) return `${Math.floor(n / 7)}주 전`
  return fullDate(occurredDate)
}

// 2026년 3월 14일 (토)
export function fullDate(d: string): string {
  return toDate(d).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  })
}

// 3월 14일
export function shortDate(d: string): string {
  return toDate(d).toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })
}

// 8일 넘게 지난 사건 = 「지난 사건」. 이 경우 왜 지금 올리는지를 반드시 말해야 한다
export function isOldCase(occurredDate: string, today = new Date()): boolean {
  return daysAgo(occurredDate, today) > 7
}

// 최신순 정렬 기준 — 발생일이 먼저, 같으면 게시일
export function byRecent(a: { occurredDate: string; date: string; time?: string },
                        b: { occurredDate: string; date: string; time?: string }) {
  const k = (x: typeof a) => x.occurredDate + x.date + (x.time ?? '')
  return k(b).localeCompare(k(a))
}
