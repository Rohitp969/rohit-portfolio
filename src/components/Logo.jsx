// Three offset bars: lines of code, and the three layers of the stack.
export default function Logo({ className = 'size-8' }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <rect width="32" height="32" rx="8" className="fill-surface-2" />
      <rect x="7" y="8" width="13" height="4" rx="2" className="fill-accent-fill" />
      <rect x="11" y="14" width="14" height="4" rx="2" className="fill-fg" opacity="0.85" />
      <rect x="7" y="20" width="9" height="4" rx="2" className="fill-accent-fill" />
    </svg>
  )
}
