import Icon from './Icon'
import './SearchBar.css'

interface SearchBarProps {
  value: string
  onChange: (v: string) => void
  placeholder?: string
}

// 검색 입력 (알약형)
export default function SearchBar({ value, onChange, placeholder }: SearchBarProps) {
  return (
    <div className="searchbar">
      <Icon name="search" size={20} className="searchbar__icon" />
      <input
        className="searchbar__input"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? '검색'}
        aria-label="검색"
      />
      {value && (
        <button
          className="searchbar__clear"
          onClick={() => onChange('')}
          aria-label="검색어 지우기"
        >
          <Icon name="cancel" size={18} />
        </button>
      )}
    </div>
  )
}
