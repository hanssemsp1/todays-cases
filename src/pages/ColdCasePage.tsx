import { useMemo, useState } from 'react'
import type { ColdCaseStatus } from '../types'
import { COLD_CASES, COLD_STATUS_META, getColdCaseOfDay } from '../data/coldCases'
import ColdCaseCard from '../components/case/ColdCaseCard'
import SearchBar from '../components/ui/SearchBar'
import Icon from '../components/ui/Icon'
import './ColdCasePage.css'

type FilterStatus = 'all' | ColdCaseStatus
const STATUSES: FilterStatus[] = ['all', 'unsolved', 'cold', 'reopened']

// 🔒 미제사건 파일 — 별도 탭. 검색 + 상태 필터 (클라이언트)
export default function ColdCasePage() {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<FilterStatus>('all')

  // 오늘 날짜 기준 자동 선정된 "오늘의 미제사건" (매일 1건)
  const today = useMemo(() => getColdCaseOfDay(), [])
  const todayStr = useMemo(
    () =>
      new Date().toLocaleDateString('ko-KR', {
        month: 'long',
        day: 'numeric',
        weekday: 'short',
      }),
    [],
  )

  const list = useMemo(() => {
    const q = query.trim().toLowerCase()
    return COLD_CASES.filter((c) => {
      const matchStatus = status === 'all' || c.status === status
      const matchQuery =
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.summary.toLowerCase().includes(q) ||
        c.region.toLowerCase().includes(q) ||
        c.caseNo.toLowerCase().includes(q) ||
        c.tags.some((t) => t.toLowerCase().includes(q))
      return matchStatus && matchQuery
    })
  }, [query, status])

  return (
    <div className="cold">
      {/* 히어로 (다크 파일 헤더) */}
      <section className="cold__hero">
        <div className="container">
          <span className="cold__badge">
            <Icon name="folder_special" size={16} /> COLD CASE FILES
          </span>
          <h1 className="cold__title">미제사건 파일</h1>
          <p className="cold__subtitle">
            아직 풀리지 않은 장기 미제사건 기록. 작은 제보가 실마리가 됩니다.
          </p>
        </div>
      </section>

      {/* 오늘의 미제사건 (매일 자동 선정) */}
      <section className="container cold__today">
        <div className="cold__today-label">
          <Icon name="push_pin" size={16} />
          오늘의 미제사건
          <span className="cold__today-date">{todayStr}</span>
        </div>
        <ColdCaseCard item={today} />
        <p className="cold__today-note">
          매일 한 건씩 자동으로 다른 미제사건이 올라와요. 아래에서 전체 파일도 볼 수 있어요.
        </p>
      </section>

      <section className="container cold__controls">
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="사건번호 · 지역 · 태그로 검색"
        />
        <div className="cold__chips" aria-label="상태 필터">
          {STATUSES.map((s) => {
            const active = status === s
            const label = s === 'all' ? '전체' : COLD_STATUS_META[s].label
            return (
              <button
                key={s}
                className={'cold__chip' + (active ? ' is-active' : '')}
                onClick={() => setStatus(s)}
              >
                {s !== 'all' && <Icon name={COLD_STATUS_META[s].icon} size={15} />}
                {label}
              </button>
            )
          })}
        </div>
      </section>

      <section className="container cold__list">
        <p className="cold__divider">
          <Icon name="inventory_2" size={18} /> 전체 미제사건 파일
        </p>
        <p className="cold__count">파일 {list.length}건</p>
        {list.length > 0 ? (
          list.map((item) => <ColdCaseCard key={item.id} item={item} />)
        ) : (
          <div className="cold__empty">
            <Icon name="search_off" size={48} />
            <p>해당하는 미제사건 파일이 없어요.</p>
          </div>
        )}
      </section>
    </div>
  )
}
