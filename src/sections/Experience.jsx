import { Award, BriefcaseBusiness, Check } from 'lucide-react'
import Reveal from '../components/Reveal'
import Section from '../components/Section'
import TimelineItem from '../components/TimelineItem'
import { experience } from '../data/portfolioData'
import { cardStyles, tagStyles } from '../lib/styles'

export default function Experience() {
  return (
    <Section id="experience" title="Where I've worked">
      <Reveal>
        <ol className="max-w-4xl">
          {experience.map((job, index) => (
            <TimelineItem key={job.id} period={job.period} aside={job.duration} isLast={index === experience.length - 1}>
              <article className={`${cardStyles} p-6 sm:p-8`}>
                <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-4">
                  <div className="flex items-center gap-4">
                    <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-surface-2 text-accent">
                      <BriefcaseBusiness className="size-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-xl leading-snug font-semibold">{job.role}</h3>
                      <p className="text-[0.9375rem] text-muted">{job.company}</p>
                    </div>
                  </div>
                  <span className="rounded-full border border-line px-3 py-1 text-xs font-medium text-muted">{job.type}</span>
                </div>

                <p className="mt-6 flex items-start gap-3 border-l-2 border-accent-fill pl-4 text-[0.9375rem] text-fg">
                  <Award className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden="true" />
                  {job.summary}
                </p>

                <ul className="mt-6 space-y-3">
                  {job.highlights.map((point) => (
                    <li key={point} className="flex gap-3 leading-relaxed text-muted">
                      <Check className="mt-1 size-4 shrink-0 text-success" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>

                <ul className="mt-7 flex flex-wrap gap-1.5" aria-label="Technologies used">
                  {job.stack.map((item) => (
                    <li key={item} className={tagStyles}>
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </TimelineItem>
          ))}
        </ol>
      </Reveal>
    </Section>
  )
}
