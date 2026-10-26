import { ArrowUpRight, Award } from 'lucide-react'
import Reveal from '../components/Reveal'
import Section from '../components/Section'
import { about, education, experience, profile, projects } from '../data/portfolioData'
import { cardStyles } from '../lib/styles'

const initials = profile.name
  .split(' ')
  .map((part) => part[0])
  .join('')

export default function About() {
  const internship = experience[0]
  const degree = education[0]
  const liveProjects = projects.filter((project) => project.liveUrl)

  const facts = [
    { label: 'Based in', value: profile.location },
    {
      label: 'Experience',
      value: `${internship.role}, ${internship.company.replace(' Pvt. Ltd.', '')}`,
      detail: internship.period,
      href: '#experience',
    },
    {
      label: 'Live projects',
      value: liveProjects.map((project) => project.name).join(' and '),
      detail: 'Deployed on Vercel',
      href: '#projects',
    },
    { label: 'Education', value: degree.qualification, detail: `${degree.period}, CGPA ${degree.score}`, href: '#education' },
    { label: 'Languages', value: about.languages.join(' and ') },
  ]

  return (
    <Section
      id="about"
      title="A developer who ships complete products"
      description="From the first screen to a deployed website, I like owning the whole stack."
    >
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-14">
        <Reveal className="min-w-0">
          <div className="max-w-[62ch] space-y-5 text-[1.0625rem] leading-relaxed">
            <p className="text-lg text-fg">{about.paragraphs[0]}</p>
            {about.paragraphs.slice(1).map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="text-muted">
                {paragraph}
              </p>
            ))}
          </div>

          <h3 className="mt-9 text-sm font-semibold text-fg [font-stretch:100%]">How I work</h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {about.softSkills.map((skill) => (
              <li key={skill} className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm text-muted">
                {skill}
              </li>
            ))}
          </ul>

          <p className="mt-9 flex max-w-[62ch] items-start gap-3 border-l-2 border-accent-fill pl-4 text-[0.9375rem] text-fg">
            <Award className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden="true" />
            Recognized during my internship at Unified Mentor for consistency and hands-on delivery.
          </p>
        </Reveal>

        <Reveal delay={0.06} className="min-w-0">
          <article className={`${cardStyles} overflow-hidden`}>
            <header className="flex items-center gap-4 border-b border-line p-5 sm:p-6">
              {profile.photo ? (
                <img src={profile.photo} alt={profile.name} className="size-16 rounded-xl object-cover ring-1 ring-line" />
              ) : (
                <div
                  aria-hidden="true"
                  className="flex size-16 shrink-0 items-center justify-center rounded-xl bg-accent-fill text-2xl font-bold text-on-accent [font-stretch:118%]"
                >
                  {initials}
                </div>
              )}
              <div className="min-w-0">
                <h3 className="text-lg leading-tight font-semibold">{profile.name}</h3>
                <p className="mt-1 text-sm text-muted">{profile.shortRole}</p>
              </div>
            </header>

            <dl className="divide-y divide-line">
              {facts.map((fact) => (
                // Linked rows are clickable end to end: the link inside <dd> stretches over the
                // whole row, which is the nearest positioned ancestor.
                <div
                  key={fact.label}
                  className={`grid grid-cols-[6.5rem_minmax(0,1fr)] items-start gap-3 px-5 py-4 sm:px-6 ${
                    fact.href ? 'group relative transition-colors hover:bg-surface-2/60' : ''
                  }`}
                >
                  <dt className="text-sm leading-6 text-subtle">{fact.label}</dt>
                  <dd className="flex min-w-0 items-start justify-between gap-3">
                    <span className="min-w-0">
                      <span className="block font-medium text-fg">{fact.value}</span>
                      {fact.detail && <span className="block text-sm text-muted">{fact.detail}</span>}
                    </span>
                    {fact.href && (
                      <>
                        <a href={fact.href} className="absolute inset-0 rounded-none focus-visible:outline-offset-[-2px]">
                          <span className="sr-only">Go to the {fact.label.toLowerCase()} section</span>
                        </a>
                        <ArrowUpRight
                          className="mt-1 size-4 shrink-0 text-subtle transition-[color,translate] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                          aria-hidden="true"
                        />
                      </>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </article>
        </Reveal>
      </div>
    </Section>
  )
}
