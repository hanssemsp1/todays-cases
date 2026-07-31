// 솔리드 아이콘 (Material Symbols filled) 래퍼
// 사용: <Icon name="local_fire_department" />
interface IconProps {
  name: string
  size?: number
  className?: string
  style?: React.CSSProperties
}

export default function Icon({ name, size = 24, className = '', style }: IconProps) {
  return (
    <span
      className={`icon ${className}`}
      aria-hidden="true"
      style={{ fontSize: size, ...style }}
    >
      {name}
    </span>
  )
}
