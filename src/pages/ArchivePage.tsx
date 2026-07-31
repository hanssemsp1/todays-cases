import { useEffect, useMemo, useState } from 'react'
import type { CaseItem } from '../types'
import { CASES } from '../data/cases'
import CaseCard from '../components/case/CaseCard'
import Icon from '../components/ui/Icon'
import './ArchivePage.css'

// 🗂 지난 기록(아카이브) — 날짜별 영구 보관 + 언제든 다시 보기
// 우선 앱에 로드된 CASES를 날짜별로 묶어 보여주고,
// 40건 상한으로 밀려난 과거 데이터는 예약작업이 저장한 /archive/<date>.json 에서 불러옵니다.

// 날짜별 그룹핑 (이벤트 발생일 기준)
function groupByDate(items: CaseItem[]): Record<string, CaseItem[]> {
  const map: Record<string, CaseItem[]> = {}
  for (const c of items) {
    ;(map[c.date] ??= []).push(c)
  }
  return map
}

export default function ArchivePage() {
  const localGroups = useMemo(() => groupByDate(CASES), [])
  const localDates = useMemo(
    () => Object.keys(localGroups).sort((a, b) => b.localeCompare(a)),
    [localGroups],
  )

  const [allDates, setAllDates] = useState<string[]>(localDates)
  const [selected, setSelected] = useState<string>(localDates[0] ?? '')
  const [dayCases, setDayCases] = useState<CaseItem[]>(
    localDates[0] ? localGroups[localDates[0]] : [],
  )
  const [loading, setLoading] = useState(false)

  // 아카이브 인덱스(있으면)에서 과거 날짜 병합
  useEffect(() => {
    let alive = true
    fetch('/archive/index.json')
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((idx: { date: string }[]) => {
        if (!alive || !Array.isArray(idx)) return
        const merged = Array.from(
          new Set([...localDates, ...idx.map((d) => d.date)]),
        ).sort((a, b) => b.localeCompare(a))
        setAllDates(merged)
      })
      .catch(() => {
        /* 아카이브 파일 아직 없음 → 로컬 날짜만 사용 */
      })
    return () => {
      alive = false
    }
  }, [localDates])

  // 선택 날짜의 사건 로드 (로컬에 있으면 로컬, 없으면 아카이브 파일)
  useEffect(() => {
    if (!selected) return
    if (localGroups[selected]) {
      setDayCases(localGroups[selected])
      return
    }
    let alive = true
    setLoading(true)
    fetch(`/archive/${selected}.json`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((items: CaseItem[]) => {
        if (alive) setDayCases(Array.isArray(items) ? items : [])
      })
      .catch(() => {
        if (alive) setDayCases([])
      })
      .finally(() => {
        if (alive) setLoading(false)
      })
    return () => {
      alive = false
    }
  }, [selected, localGroups])

  const fmt = (d: string) =>
    new Date(d + 'T00:00:00').toLocaleDateString('ko-KR', {
      month: 'long',
      day: 'numeric',
      weekday: 'short',
    })

  return (
    <div className="archive">
      <section className="archive__hero">
        <div className="container">
          <span className="archive__badge">
            <Icon name="inventory_2" size={16} /> ARCHIVE
          </span>
          <h1 className="archive__title">지난 기록</h1>
          <p className="archive__subtitle">
            2026년 8월 1일부터 쌓인 사건사고를 날짜별로 다시 볼 수 있어요.
          </p>
        </div>
      </section>

      {/* 날짜 선택 (가로 스크롤) */}
      <section className="container archive__dates" aria-label="날짜 선택">
        {allDates.map((d) => (
          <button
            key={d}
            className={'archive__date' + (selected === d ? ' is-active' : '')}
            onClick={() => setSelected(d)}
          >
            {fmt(d)}
          </button>
        ))}
      </section>

      {/* 선택 날짜의 사건 목록 */}
      <section className="container archive__list">
        {selected && <p className="archive__count">{fmt(selected)} · {dayCases.length}건</p>}
        {loading ? (
          <p className="archive__empty">불러오는 중…</p>
        ) : dayCases.length > 0 ? (
          dayCases.map((item) => <CaseCard key={item.id} item={item} />)
        ) : (
          <div className="archive__empty">
            <Icon name="folder_open" size={48} />
            <p>이 날짜의 기록이 아직 없어요.</p>
          </div>
        )}
      </section>
    </div>
  )
}
