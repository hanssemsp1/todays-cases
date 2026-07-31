import type { CaseCategory } from '../../types'
import { CATEGORY_META } from '../../data/cases'
import Icon from './Icon'
import './Badge.css'

// 카테고리 배지 (단색). 그라데이션은 강조 요소에만 쓰므로 배지는 카테고리 단색 사용.
export function CategoryBadge({ category }: { category: CaseCategory }) {
  const meta = CATEGORY_META[category]
  return (
    <span className="badge" style={{ background: meta.color }}>
      <Icon name={meta.icon} size={15} />
      {meta.label}
    </span>
  )
}

// 속보 배지 — 강조 요소이므로 그라데이션 허용
export function BreakingBadge() {
  return (
    <span className="badge badge--breaking">
      <Icon name="bolt" size={15} />
      속보
    </span>
  )
}
