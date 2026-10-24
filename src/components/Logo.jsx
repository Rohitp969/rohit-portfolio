import { useId } from 'react'

// Three offset bars: lines of code, and the three layers of the stack.
export default function Logo({ className = 'size-8' }) {
  const gradientId = useId()

  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#a88bff" />
          <stop offset="1" stopColor="#4fa8ff" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="8" className="fill-surface-2" />
      <rect x="7" y="8" width="13" height="4" rx="2" fill={`url(#${gradientId})`} />
      <rect x="11" y="14" width="14" height="4" rx="2" fill={`url(#${gradientId})`} />
      <rect x="7" y="20" width="9" height="4" rx="2" fill={`url(#${gradientId})`} />
    </svg>
  )
}
