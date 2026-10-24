import { BadgeCheck, GraduationCap, School } from 'lucide-react'
import Reveal from '../components/Reveal'
import Section from '../components/Section'
import { certifications, education } from '../data/portfolioData'
import { cardStyles } from '../lib/styles'

export default function Education() {
  return (
    <Section id="education" eyebrow="Education" title="Education and certifications">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-8">
        <Reveal>
          <h3 className="mb-5 flex items-center gap-2.5 text-lg font-semibold">
            <GraduationCap className="size-5 text-accent" aria-hidden="true" />
            Academic background
          </h3>
          <ol className="space-y-4">
            {education.map((entry, index) => {
              const isDegree = index === 0
              const Icon = isDegree ? GraduationCap : School
              return (
                <li
                  key={entry.id}
                  className={`${isDegree ? 'gradient-border rounded-3xl bg-surface' : cardStyles} flex items-start gap-4 p-6`}
                >
                  <span
                    className={`inline-flex size-11 shrink-0 items-center justify-center rounded-xl ${
                      isDegree ? 'bg-brand-gradient text-white' : 'bg-surface-2 text-accent'
                    }`}
                  >
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-subtle">{entry.period}</p>
                    <h4 className={`mt-0.5 leading-snug font-semibold ${isDegree ? 'text-lg' : ''}`}>{entry.qualification}</h4>
                    <p className="mt-1 text-sm text-muted">{entry.institution}</p>
                  </div>
                  <p className="shrink-0 text-right">
                    <span className="block text-xs text-subtle">{entry.scoreLabel}</span>
                    <span className="block text-xl font-semibold tabular-nums [font-stretch:112.5%]">{entry.score}</span>
                  </p>
                </li>
              )
            })}
          </ol>
        </Reveal>

        <Reveal delay={0.06}>
          <h3 id="certifications" className="mb-5 flex scroll-mt-28 items-center gap-2.5 text-lg font-semibold">
            <BadgeCheck className="size-5 text-accent" aria-hidden="true" />
            Certifications
          </h3>
          <ul className={`${cardStyles} divide-y divide-line`}>
            {certifications.map((cert) => (
              <li key={cert.id} className="flex items-start gap-4 p-6">
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-surface-2 text-accent">
                  <BadgeCheck className="size-5" aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <h4 className="leading-snug font-semibold">{cert.title}</h4>
                  {cert.detail && <p className="mt-0.5 text-sm text-fg/80">{cert.detail}</p>}
                  <p className="mt-1 text-sm text-muted">{cert.issuer}</p>
                </div>
                <p className="shrink-0 rounded-full border border-line bg-surface-2/70 px-2.5 py-0.5 text-xs text-muted tabular-nums">
                  {cert.date}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  )
}
