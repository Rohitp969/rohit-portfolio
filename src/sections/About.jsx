import { ArrowUpRight, Award, BriefcaseBusiness, GraduationCap, Languages, MapPin, Rocket } from 'lucide-react'
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
  const liveProjects = projects.filter((project) => project.liveUrl).length

  return (
    <Section
      id="about"
      eyebrow="About me"
      title="A developer who ships complete products"
      description="From the first wireframe to a deployed website, I like owning the whole stack."
    >
      <Reveal className="grid gap-4 lg:grid-cols-3">
        {/* Story */}
        <article className={`${cardStyles} p-7 sm:p-9 lg:col-span-2`}>
          <div className="max-w-[62ch] space-y-5 text-[1.0625rem] leading-relaxed">
            <p className="text-fg">{about.paragraphs[0]}</p>
            {about.paragraphs.slice(1).map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="text-muted">
                {paragraph}
              </p>
            ))}
          </div>
          <h3 className="sr-only">Soft skills</h3>
          <ul className="mt-7 flex flex-wrap gap-2">
            {about.softSkills.map((skill) => (
              <li
                key={skill}
                className="rounded-full border border-line bg-surface-2/70 px-3.5 py-1.5 text-sm text-fg"
              >
                {skill}
              </li>
            ))}
          </ul>
        </article>

        {/* Profile card */}
        <article className={`${cardStyles} relative flex flex-col overflow-hidden p-7`}>
          <div
            aria-hidden="true"
            className="absolute -top-20 -right-16 size-56 rounded-full bg-[radial-gradient(closest-side,var(--c-glow-1),transparent)]"
          />
          {profile.photo ? (
            <img
              src={profile.photo}
              alt={profile.name}
              className="relative size-24 rounded-2xl object-cover ring-1 ring-line"
            />
          ) : (
            <div
              aria-hidden="true"
              className="bg-brand-gradient relative flex size-24 items-center justify-center rounded-2xl text-3xl font-semibold text-white [font-stretch:112.5%]"
            >
              {initials}
            </div>
          )}
          <h3 className="relative mt-6 text-xl font-semibold">{profile.name}</h3>
          <p className="relative mt-1 text-muted">{profile.role}</p>

          <dl className="relative mt-auto space-y-3 pt-7 text-sm">
            <div className="flex items-center gap-3">
              <dt>
                <MapPin className="size-4 text-accent" aria-hidden="true" />
                <span className="sr-only">Location</span>
              </dt>
              <dd className="text-fg">{profile.location}</dd>
            </div>
            <div className="flex items-center gap-3">
              <dt>
                <Languages className="size-4 text-accent" aria-hidden="true" />
                <span className="sr-only">Languages</span>
              </dt>
              <dd className="text-fg">{about.languages.join(' and ')}</dd>
            </div>
          </dl>
        </article>

        {/* Highlights */}
        <Highlight icon={BriefcaseBusiness} title={internship.role} href="#experience">
          {internship.company}, {internship.period}
        </Highlight>
        <Highlight icon={Rocket} title={`${liveProjects} live websites`} href="#projects">
          Full-stack MERN websites deployed on Vercel
        </Highlight>
        <Highlight icon={GraduationCap} title={degree.qualification} href="#education">
          {degree.period}, CGPA {degree.score}
        </Highlight>
      </Reveal>

      <Reveal className="mt-4">
        <p className="flex items-start gap-3 rounded-2xl border border-accent/25 bg-accent/[0.06] px-5 py-4 text-[0.9375rem] text-fg">
          <Award className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden="true" />
          Recognized during my internship at Unified Mentor for consistency and hands-on delivery.
        </p>
      </Reveal>
    </Section>
  )
}

function Highlight({ icon: Icon, title, href, children }) {
  return (
    <a
      href={href}
      className={`${cardStyles} group flex items-start gap-4 p-6 transition-colors hover:border-accent/40 hover:bg-surface-2/40`}
    >
      <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-surface-2 text-accent">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-semibold text-fg [font-stretch:106%]">{title}</span>
        <span className="mt-1 block text-sm leading-relaxed text-muted">{children}</span>
      </span>
      <ArrowUpRight
        className="size-4 shrink-0 text-subtle transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent motion-reduce:transition-none"
        aria-hidden="true"
      />
    </a>
  )
}
