import { Atom, Cloud, Database, KeyRound, MonitorSmartphone, Network } from 'lucide-react'
import { tech } from '../data/portfolioData'

// Technologies without a usable logo get a Lucide icon instead.
const fallbackIcons = {
  context: Atom,
  responsive: MonitorSmartphone,
  database: Database,
  api: Network,
  key: KeyRound,
  cloud: Cloud,
}

export default function TechIcon({ id, className = 'size-6' }) {
  const item = tech[id]
  if (!item) return null

  if (item.logo) {
    return (
      <img
        src={item.logo}
        alt=""
        aria-hidden="true"
        decoding="async"
        className={`${className} object-contain ${item.mono ? 'dark:invert' : ''}`}
      />
    )
  }

  const Icon = fallbackIcons[item.icon] ?? Network
  return <Icon className={`${className} text-accent`} aria-hidden="true" />
}
