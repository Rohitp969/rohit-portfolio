import { useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Check, ExternalLink, Lock, MousePointer2, Pointer } from 'lucide-react'
import { useState } from 'react'
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
      title="Websites I've built and shipped"
      description="Two full-stack MERN websites with online payments, authentication and admin dashboards. Both are live, so you can try them."
    >
      <div className="space-y-16 sm:space-y-20">
        {projects.map((project, index) => (
          <Reveal key={project.id}>
            <FeaturedProject project={project} reversed={index % 2 === 1} />
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-16">
        <a
          href={github.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`${cardStyles} group flex flex-col gap-5 p-6 transition-colors hover:border-line-strong hover:bg-surface-2/50 sm:flex-row sm:items-center sm:p-7`}
        >
          <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-surface-2 text-fg">
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
            className="hidden size-6 shrink-0 text-subtle transition-[color,translate] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent sm:block"
            aria-hidden="true"
          />
        </a>
      </Reveal>
    </Section>
  )
}

// A browser frame around a full-page screenshot of the live site. Hovering with a mouse
// scrolls through the page; on touch screens a tap starts and stops it. With reduced
// motion the frame simply scrolls like a normal box instead.
function ProjectPreview({ project }) {
  const [scrolling, setScrolling] = useState(false)
  const reduceMotion = useReducedMotion()
  const [width, height] = project.previewSize
  const host = new URL(project.liveUrl).host
  // Roughly 300px of page per second at the frame's 16:10 shape, never under two seconds.
  const duration = Math.max(2, (height / width - 0.625) * 1.8)
  const onMouse = (handler) => (event) => {
    if (event.pointerType === 'mouse') handler()
  }

  return (
    <div className="overflow-hidden rounded-xl border border-line-strong bg-surface shadow-[0_30px_80px_-45px_var(--c-shadow)]">
      <div className="flex items-center gap-2 border-b border-line bg-surface-2/60 px-3 py-2">
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-8 min-w-0 flex-1 items-center gap-2 rounded-md bg-bg/70 px-3 font-mono text-[12px] text-muted transition-colors hover:text-fg"
        >
          <Lock className="size-3 shrink-0 text-success" aria-hidden="true" />
          <span className="truncate">{host}</span>
          <span className="sr-only"> (opens the live {project.name} site in a new tab)</span>
          <ExternalLink className="ml-auto size-3.5 shrink-0" aria-hidden="true" />
        </a>
      </div>

      {reduceMotion ? (
        <div tabIndex={0} aria-label={`${project.name} home page screenshot, scrollable`} className="aspect-[16/10] overflow-y-auto">
          <img src={project.preview} alt={project.imageAlt} width={width} height={height} loading="lazy" decoding="async" className="block w-full" />
        </div>
      ) : (
        <button
          type="button"
          aria-pressed={scrolling}
          aria-label={`${scrolling ? 'Stop scrolling' : 'Scroll through'} the ${project.name} home page screenshot`}
          onClick={() => setScrolling((current) => !current)}
          onPointerEnter={onMouse(() => setScrolling(true))}
          onPointerLeave={onMouse(() => setScrolling(false))}
          onBlur={() => setScrolling(false)}
          className="group/preview relative block aspect-[16/10] w-full cursor-ns-resize overflow-hidden bg-bg text-left [container-type:size] focus-visible:outline-offset-[-3px]"
        >
          <img
            src={project.preview}
            alt={project.imageAlt}
            width={width}
            height={height}
            loading="lazy"
            decoding="async"
            style={{
              transform: scrolling ? 'translateY(calc(-100% + 100cqh))' : 'translateY(0)',
              transitionDuration: scrolling ? `${duration}s` : '0.7s',
            }}
            className="absolute inset-x-0 top-0 block w-full transition-transform ease-in-out"
          />

          {/* Scroll position, mirroring the image's movement */}
          <span aria-hidden="true" className="absolute top-2 right-1.5 bottom-2 w-1 rounded-full bg-black/10">
            <span
              style={{
                height: `${Math.max(8, (0.625 / (height / width)) * 100)}%`,
                top: scrolling ? `${100 - Math.max(8, (0.625 / (height / width)) * 100)}%` : '0%',
                transitionDuration: scrolling ? `${duration}s` : '0.7s',
              }}
              className="absolute inset-x-0 rounded-full bg-black/35 transition-[top] ease-in-out"
            />
          </span>

          <span
            aria-hidden="true"
            className={`absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-lg bg-[#0f131a]/85 px-2.5 py-1.5 text-xs font-medium text-white backdrop-blur transition-opacity duration-300 ${
              scrolling ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <MousePointer2 className="size-3.5 pointer-coarse:hidden" />
            <Pointer className="hidden size-3.5 pointer-coarse:block" />
            <span className="pointer-coarse:hidden">Hover to scroll the page</span>
            <span className="hidden pointer-coarse:inline">Tap to scroll the page</span>
          </span>
        </button>
      )}
    </div>
  )
}

function FeaturedProject({ project, reversed }) {
  const titleId = `project-${project.id}-title`
  // "Ekart: E-Commerce Website" → a large name with the kind of site underneath.
  const kind = project.title.split(': ').slice(1).join(': ')

  return (
    <article aria-labelledby={titleId} className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,1fr)] lg:gap-12">
      <div className={`min-w-0 lg:sticky lg:top-24 ${reversed ? 'lg:order-2' : ''}`}>
        <ProjectPreview project={project} />
      </div>

      <div className="min-w-0">
        <h3 id={titleId}>
          <span className="font-display block text-[clamp(2.25rem,1.8rem+1.6vw,3rem)] leading-none">{project.name}</span>
          {kind && (
            <span className="mt-2 block text-base font-medium text-muted [font-stretch:100%]">
              <span className="sr-only">: </span>
              {kind}
            </span>
          )}
        </h3>
        <p className="mt-3 text-lg leading-snug font-medium text-fg">{project.tagline}</p>
        <p className="mt-4 leading-relaxed text-muted">{project.description}</p>

        <h4 className="mt-7 text-sm font-semibold text-fg [font-stretch:100%]">Key features</h4>
        <ul className="mt-3 space-y-2.5">
          {project.features.map((feature) => (
            <li key={feature} className="flex gap-3 text-[0.9375rem] leading-relaxed text-fg/90">
              <Check className="mt-1 size-4 shrink-0 text-success" aria-hidden="true" />
              {feature}
            </li>
          ))}
        </ul>

        <ul className="mt-7 flex flex-wrap gap-1.5" aria-label="Technologies used">
          {project.stack.map((item) => (
            <li key={item} className={tagStyles}>
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap gap-3">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={buttonStyles.primary}>
              <ExternalLink className="size-4" aria-hidden="true" />
              Open live site
              <span className="sr-only">of {project.title} (opens in a new tab)</span>
            </a>
          )}
          {project.repoUrl && (
            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className={buttonStyles.secondary}>
              <GithubIcon className="size-4" />
              View source code
              <span className="sr-only">for {project.title} (opens in a new tab)</span>
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
