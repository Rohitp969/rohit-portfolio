import { motion } from 'framer-motion'
import { Check, Gauge, KeyRound, Network, Rows3 } from 'lucide-react'
import { useState } from 'react'
import Reveal from '../components/Reveal'
import Section from '../components/Section'
import TechIcon from '../components/TechIcon'
import { coreExpertise, experience, projects, skillGroups, tech } from '../data/portfolioData'
import { cardStyles } from '../lib/styles'

const expertiseIcons = { api: Network, crud: Rows3, auth: KeyRound, performance: Gauge }

// "Where was this used?" filters: every project, plus each job that lists its stack.
const filters = [
  { id: 'all', label: 'All' },
  ...projects.filter((project) => project.uses).map((project) => ({ id: project.id, label: project.name, uses: project.uses })),
  ...experience.filter((job) => job.uses).map((job) => ({ id: job.id, label: job.type, uses: job.uses })),
]
const allTech = new Set(skillGroups.flatMap((group) => group.items))

export default function Skills() {
  const [filterId, setFilterId] = useState('all')
  const filter = filters.find((item) => item.id === filterId)
  const used = filter.uses ? new Set(filter.uses) : null
  const usedCount = used ? [...allTech].filter((id) => used.has(id)).length : allTech.size

  return (
    <Section
      id="skills"
      title="My tech stack"
      description="The languages, frameworks and tools I use to design, build and ship full-stack websites. Pick a project to see what it was built with."
    >
      <Reveal>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div role="group" aria-label="Show technologies used in" className="flex flex-wrap gap-1 rounded-xl border border-line bg-surface p-1">
            {filters.map((item) => {
              const active = item.id === filterId
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilterId(item.id)}
                  className={`relative h-9 rounded-lg px-3.5 text-sm font-medium transition-colors ${
                    active ? 'text-on-accent' : 'text-muted hover:text-fg'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="skills-filter"
                      aria-hidden="true"
                      className="absolute inset-0 rounded-lg bg-accent-fill"
                      transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </button>
              )
            })}
          </div>
          <p className="text-sm text-subtle tabular-nums" aria-live="polite">
            {used ? `${usedCount} of ${allTech.size} used in ${filter.label === 'Internship' ? 'my internship' : filter.label}` : `${allTech.size} technologies`}
          </p>
        </div>

        <div className={`${cardStyles} mt-5 divide-y divide-line`}>
          {skillGroups.map((group) => (
            <div key={group.id} className="grid grid-cols-1 gap-4 p-5 sm:p-6 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-8">
              <div>
                <h3 className="font-semibold">{group.title}</h3>
                <p className="mt-0.5 text-sm text-subtle">{group.description}</p>
              </div>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((id) => {
                  const highlighted = used?.has(id)
                  const dimmed = used && !highlighted
                  return (
                    <li
                      key={id}
                      className={`flex h-10 items-center gap-2.5 rounded-lg border px-3 text-sm font-medium transition-[opacity,border-color,background-color,filter] duration-300 ${
                        highlighted
                          ? 'border-accent-fill/60 bg-accent-fill/10 text-fg'
                          : dimmed
                            ? 'border-line text-subtle opacity-45 grayscale'
                            : 'border-line bg-bg/50 text-fg'
                      }`}
                    >
                      <TechIcon id={id} className="size-5 shrink-0" />
                      {tech[id].name}
                      {highlighted && <Check className="size-3.5 text-accent" aria-hidden="true" />}
                      {used && <span className="sr-only">{highlighted ? `(used in ${filter.label})` : '(not used)'}</span>}
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal className="mt-12">
        <h3 className="text-lg font-semibold">What I focus on</h3>
        <ul className="mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {coreExpertise.map((area) => {
            const Icon = expertiseIcons[area.id]
            return (
              <li key={area.id} className="border-t border-line-strong pt-5">
                <Icon className="size-5 text-accent" aria-hidden="true" />
                <p className="mt-4 font-semibold [font-stretch:106%]">{area.title}</p>
                <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted">{area.description}</p>
              </li>
            )
          })}
        </ul>
      </Reveal>
    </Section>
  )
}
