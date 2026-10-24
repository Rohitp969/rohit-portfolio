import { Code, Gauge, KeyRound, LayoutTemplate, Network, Rows3, Server, Wrench } from 'lucide-react'
import Reveal from '../components/Reveal'
import Section from '../components/Section'
import TechIcon from '../components/TechIcon'
import { coreExpertise, skillGroups, tech } from '../data/portfolioData'
import { cardStyles } from '../lib/styles'

const expertiseIcons = { api: Network, crud: Rows3, auth: KeyRound, performance: Gauge }
const groupIcons = { frontend: LayoutTemplate, backend: Server, languages: Code, tools: Wrench }

export default function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="My tech stack"
      description="The languages, frameworks and tools I use to design, build and ship full-stack websites."
    >
      <Reveal>
        <h3 className="sr-only">Core expertise</h3>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {coreExpertise.map((area) => {
            const Icon = expertiseIcons[area.id]
            return (
              <li
                key={area.id}
                className="gradient-border flex gap-4 rounded-3xl bg-surface p-5 transition-colors hover:bg-surface-2/40 sm:block sm:p-6"
              >
                <span className="bg-brand-gradient inline-flex size-11 shrink-0 items-center justify-center rounded-xl text-white shadow-[0_10px_24px_-10px_rgb(109_74_232/0.9)]">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-semibold [font-stretch:106%] sm:mt-5">{area.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted sm:mt-2">{area.description}</p>
                </div>
              </li>
            )
          })}
        </ul>
      </Reveal>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        {skillGroups.map((group, index) => {
          const Icon = groupIcons[group.id]
          return (
            <Reveal key={group.id} delay={(index % 2) * 0.06}>
              <article className={`${cardStyles} h-full p-6 sm:p-7`}>
                <header className="flex items-center gap-3">
                  <span className="inline-flex size-10 items-center justify-center rounded-xl bg-surface-2 text-accent">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-semibold [font-stretch:106%]">{group.title}</h3>
                    <p className="text-sm text-subtle">{group.description}</p>
                  </div>
                </header>
                <ul className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                  {group.items.map((id) => (
                    <li
                      key={id}
                      className="flex items-center gap-3 rounded-xl border border-line bg-bg/60 px-3 py-2.5 text-sm font-medium text-fg transition-colors hover:border-accent/40"
                    >
                      <TechIcon id={id} className="size-6 shrink-0" />
                      <span className="min-w-0 leading-tight">{tech[id].name}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
