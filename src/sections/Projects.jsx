import { ArrowUpRight, Check, ExternalLink } from 'lucide-react'
import { GithubIcon } from '../components/BrandIcons'
import Reveal from '../components/Reveal'
import Section from '../components/Section'
import { projects, socials } from '../data/portfolioData'
import { buttonStyles, cardStyles, tagStyles } from '../lib/styles'

const github = socials.find((social) => social.id === 'github')

export default function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Featured work"
      title="Websites I've built and shipped"
      description="Two full-stack MERN websites with online payments, authentication and admin dashboards. Both are live, so you can try them."
    >
      <div className="space-y-8">
        {projects.map((project, index) => (
          <Reveal key={project.id}>
            <FeaturedProject project={project} reversed={index % 2 === 1} />
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-8">
        <a
          href={github.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`${cardStyles} group flex flex-col gap-5 p-6 transition-colors hover:border-accent/40 hover:bg-surface-2/40 sm:flex-row sm:items-center sm:p-7`}
        >
          <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl bg-surface-2 text-fg">
            <GithubIcon className="size-6" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-lg font-semibold [font-stretch:106%]">See the code on GitHub</span>
            <span className="mt-1 block text-sm leading-relaxed text-muted">
              Source code for both websites is public at github.com/{github.handle}.
            </span>
            <span className="sr-only">(opens in a new tab)</span>
          </span>
          <ArrowUpRight
            className="hidden size-6 shrink-0 text-subtle transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent motion-reduce:transition-none sm:block"
            aria-hidden="true"
          />
        </a>
      </Reveal>
    </Section>
  )
}

function ProjectLinks({ project }) {
  return (
    <div className="flex flex-wrap gap-3">
      {project.liveUrl && (
        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={buttonStyles.primary}>
          <ExternalLink className="size-4" aria-hidden="true" />
          Live demo
          <span className="sr-only">of {project.title} (opens in a new tab)</span>
        </a>
      )}
      {project.repoUrl && (
        <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className={buttonStyles.secondary}>
          <GithubIcon className="size-4" />
          Source code
          <span className="sr-only">for {project.title} (opens in a new tab)</span>
        </a>
      )}
    </div>
  )
}

function StackTags({ stack }) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Technologies used">
      {stack.map((item) => (
        <li key={item} className={tagStyles}>
          {item}
        </li>
      ))}
    </ul>
  )
}

function FeaturedProject({ project, reversed }) {
  const titleId = `project-${project.id}-title`
  const host = project.liveUrl ? new URL(project.liveUrl).host : ''

  return (
    <article
      aria-labelledby={titleId}
      className={`${cardStyles} group relative overflow-hidden transition-[border-color,box-shadow] duration-300 hover:border-accent/40 hover:shadow-[0_40px_90px_-50px_var(--c-glow-1)]`}
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${
          reversed
            ? 'bg-[radial-gradient(50rem_circle_at_100%_0%,var(--c-glow-1),transparent_55%)]'
            : 'bg-[radial-gradient(50rem_circle_at_0%_0%,var(--c-glow-1),transparent_55%)]'
        }`}
      />

      <div className="relative grid lg:grid-cols-[1.1fr_1fr]">
        {/* Screenshot in a browser frame */}
        <div className={`p-3 sm:p-5 ${reversed ? 'lg:order-2' : ''}`}>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={-1}
            aria-hidden="true"
            className="block overflow-hidden rounded-2xl border border-line bg-bg shadow-[0_24px_60px_-30px_var(--c-shadow)]"
          >
            <div className="flex items-center gap-2 border-b border-line bg-surface-2/70 px-4 py-2.5">
              <span className="size-2.5 rounded-full bg-[#ff5f57]/80" />
              <span className="size-2.5 rounded-full bg-[#febc2e]/80" />
              <span className="size-2.5 rounded-full bg-[#28c840]/80" />
              <span className="ml-2 flex-1 truncate rounded-md bg-surface px-3 py-1 text-center font-mono text-[11px] text-subtle">
                {host}
              </span>
            </div>
            <div className="aspect-[16/10] overflow-hidden">
              <img
                src={project.image}
                alt={project.imageAlt}
                width="1440"
                height="900"
                loading="lazy"
                decoding="async"
                className="size-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />
            </div>
          </a>
        </div>

        <div className="flex flex-col px-6 pt-3 pb-8 sm:px-8 sm:pb-10 lg:py-10 lg:pr-10 lg:pl-6">
          <h3 id={titleId} className="text-2xl leading-tight font-semibold tracking-[-0.02em] sm:text-[1.75rem]">
            {project.title}
          </h3>
          <p className="mt-2 font-medium text-accent">{project.tagline}</p>
          <p className="mt-4 leading-relaxed text-muted">{project.description}</p>

          <h4 className="sr-only">Key features</h4>
          <ul className="mt-6 space-y-2.5">
            {project.features.map((feature) => (
              <li key={feature} className="flex gap-3 text-[0.9375rem] leading-relaxed text-fg/90">
                <span className="mt-[3px] inline-flex size-[18px] shrink-0 items-center justify-center rounded-full bg-success/15">
                  <Check className="size-3 text-success" aria-hidden="true" />
                </span>
                {feature}
              </li>
            ))}
          </ul>

          <div className="mt-7">
            <StackTags stack={project.stack} />
          </div>
          <div className="mt-8 lg:mt-auto lg:pt-8">
            <ProjectLinks project={project} />
          </div>
        </div>
      </div>
    </article>
  )
}
