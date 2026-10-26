import { BadgeCheck, GraduationCap } from 'lucide-react'
import Reveal from '../components/Reveal'
import Section from '../components/Section'
import { certifications, education } from '../data/portfolioData'
import { cardStyles } from '../lib/styles'

export default function Education() {
  return (
    <Section id="education" title="Education and certifications">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8">
        <Reveal className="min-w-0">
          <h3 className="mb-4 flex items-center gap-2.5 text-lg font-semibold">
            <GraduationCap className="size-5 text-accent" aria-hidden="true" />
            Academic background
          </h3>
          <ol className={`${cardStyles} divide-y divide-line`}>
            {education.map((entry, index) => {
              const isDegree = index === 0
              return (
                <li key={entry.id} className="flex items-start gap-4 p-5 sm:p-6">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-subtle tabular-nums">{entry.period}</p>
                    <h4 className={`mt-0.5 leading-snug font-semibold ${isDegree ? 'text-lg' : ''}`}>{entry.qualification}</h4>
                    <p className="mt-1 text-sm text-muted">{entry.institution}</p>
                  </div>
                  <p className="shrink-0 text-right">
                    <span className="block text-xs text-subtle">{entry.scoreLabel}</span>
                    <span
                      className={`block font-semibold tabular-nums [font-stretch:112%] ${isDegree ? 'text-2xl text-accent' : 'text-xl'}`}
                    >
                      {entry.score}
                    </span>
                  </p>
                </li>
              )
            })}
          </ol>
        </Reveal>

        <Reveal delay={0.06} className="min-w-0">
          <h3 id="certifications" className="mb-4 flex scroll-mt-28 items-center gap-2.5 text-lg font-semibold">
            <BadgeCheck className="size-5 text-accent" aria-hidden="true" />
            Certifications
          </h3>
          <ul className={`${cardStyles} divide-y divide-line`}>
            {certifications.map((cert) => (
              <li key={cert.id} className="flex items-start gap-4 p-5 sm:p-6">
                <div className="min-w-0 flex-1">
                  <h4 className="leading-snug font-semibold">{cert.title}</h4>
                  {cert.detail && <p className="mt-0.5 text-sm text-fg/80">{cert.detail}</p>}
                  <p className="mt-1 text-sm text-muted">{cert.issuer}</p>
                </div>
                <p className="shrink-0 rounded-full border border-line px-2.5 py-0.5 text-xs text-muted tabular-nums">{cert.date}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  )
}
