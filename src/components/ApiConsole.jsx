import { ArrowDown, Braces, CornerDownLeft, LoaderCircle } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { about, certifications, education, experience, profile, projects, skillGroups, socials, tech } from '../data/portfolioData'
import { methodStyles } from '../lib/styles'

// A pretend REST API for the portfolio. Every response is built from portfolioData,
// so it always matches the rest of the page. Nothing leaves the browser.
const degree = education[0]
const linkedin = socials.find((social) => social.id === 'linkedin')

const endpoints = [
  {
    id: 'about',
    method: 'GET',
    path: '/about',
    section: { id: 'about', label: 'About' },
    body: {
      name: profile.name,
      role: profile.role,
      location: profile.location,
      education: `${degree.qualification}, ${degree.period}`,
      languages: about.languages,
      openToWork: true,
    },
  },
  {
    id: 'skills',
    method: 'GET',
    path: '/skills',
    section: { id: 'skills', label: 'Skills' },
    body: Object.fromEntries(skillGroups.map((group) => [group.id, group.items.map((id) => tech[id].name)])),
  },
  {
    id: 'projects',
    method: 'GET',
    path: '/projects',
    section: { id: 'projects', label: 'Projects' },
    body: {
      count: projects.length,
      projects: projects.map((project) => ({
        name: project.name,
        summary: project.tagline,
        stack: project.stack,
        live: project.liveUrl,
        code: project.repoUrl,
      })),
    },
  },
  {
    id: 'experience',
    method: 'GET',
    path: '/experience',
    section: { id: 'experience', label: 'Experience' },
    body: {
      experience: experience.map((job) => ({
        role: job.role,
        company: job.company,
        period: job.period,
        stack: job.stack,
      })),
      certifications: certifications.map((cert) => cert.title),
    },
  },
  {
    id: 'contact',
    method: 'POST',
    path: '/contact',
    status: '201 Created',
    section: { id: 'contact', label: 'Contact' },
    body: {
      received: true,
      message: 'Thanks for reaching out. Email is the quickest way to reach me.',
      email: profile.email,
      ...(profile.phone ? { phone: profile.phone } : {}),
      linkedin: linkedin?.url,
    },
  },
].map((endpoint) => {
  const json = formatJson(endpoint.body)
  return { status: '200 OK', ...endpoint, lines: json.split('\n'), size: new Blob([json]).size }
})

// Like JSON.stringify(value, null, 2), but short lists of plain values stay on one line,
// the way API clients print them, so a project's stack doesn't fill the whole pane.
function formatJson(value, depth = 0) {
  const pad = '  '.repeat(depth + 1)
  const end = '  '.repeat(depth)
  if (Array.isArray(value)) {
    if (value.every((item) => item === null || typeof item !== 'object')) {
      return `[${value.map((item) => JSON.stringify(item)).join(', ')}]`
    }
    return `[\n${value.map((item) => pad + formatJson(item, depth + 1)).join(',\n')}\n${end}]`
  }
  if (value && typeof value === 'object') {
    const entries = Object.entries(value).filter(([, item]) => item !== undefined)
    return `{\n${entries.map(([key, item]) => `${pad}${JSON.stringify(key)}: ${formatJson(item, depth + 1)}`).join(',\n')}\n${end}}`
  }
  return JSON.stringify(value)
}

const FIRST_DELAY = 900
const tokenPattern = /("(?:\\.|[^"\\])*")(\s*:)?|\b(true|false|null)\b|(-?\d+(?:\.\d+)?)/g
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Small random spread so repeated requests don't all report the same timing.
function jitter(min, spread) {
  return min + Math.round(Math.random() * spread)
}

function formatSize(bytes) {
  return bytes < 1000 ? `${bytes} B` : `${(bytes / 1000).toFixed(1)} kB`
}

function StringValue({ raw }) {
  const value = JSON.parse(raw)
  const linkClass = 'text-code-string underline decoration-code-string/40 underline-offset-2 hover:decoration-code-string'
  if (value.startsWith('https://')) {
    return (
      <a href={value} target="_blank" rel="noopener noreferrer" className={linkClass}>
        {raw}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    )
  }
  if (emailPattern.test(value)) {
    return (
      <a href={`mailto:${value}`} className={linkClass}>
        {raw}
      </a>
    )
  }
  return <span className="text-code-string">{raw}</span>
}

function JsonLine({ line }) {
  const indent = line.length - line.trimStart().length
  const text = line.trimStart()
  const parts = []
  let last = 0

  for (const match of text.matchAll(tokenPattern)) {
    if (match.index > last) parts.push(<span key={`p${last}`} className="text-code-punct">{text.slice(last, match.index)}</span>)
    const [, string, colon, keyword, number] = match
    if (string && colon) {
      parts.push(
        <span key={match.index} className="text-code-key">
          {string}
        </span>,
        <span key={`c${match.index}`} className="text-code-punct">
          {colon}
        </span>,
      )
    } else if (string) {
      parts.push(<StringValue key={match.index} raw={string} />)
    } else {
      parts.push(
        <span key={match.index} className={keyword ? 'text-code-bool' : 'text-code-number'}>
          {keyword ?? number}
        </span>,
      )
    }
    last = match.index + match[0].length
  }
  if (last < text.length) parts.push(<span key={`p${last}`} className="text-code-punct">{text.slice(last)}</span>)

  return (
    <span className="block break-words" style={{ paddingLeft: `${indent}ch` }}>
      {parts}
    </span>
  )
}

export default function ApiConsole() {
  const [activeId, setActiveId] = useState('about')
  const [phase, setPhase] = useState(() => (prefersReducedMotion() ? 'streaming' : 'sending'))
  const [shown, setShown] = useState(() => (prefersReducedMotion() ? endpoints[0].lines.length : 0))
  const [requestId, setRequestId] = useState(0)
  const [elapsed, setElapsed] = useState(42)
  const delay = useRef(FIRST_DELAY)
  const responseRef = useRef(null)

  const endpoint = endpoints.find((item) => item.id === activeId)
  const total = endpoint.lines.length
  // Long responses reveal a few lines per frame so every request finishes in about a third of a second.
  const step = Math.max(1, Math.ceil(total / 18))

  // "Network" wait, then stream the body in.
  useEffect(() => {
    if (phase !== 'sending') return undefined
    const timer = setTimeout(() => setPhase('streaming'), delay.current)
    return () => clearTimeout(timer)
  }, [phase, requestId])

  useEffect(() => {
    if (phase !== 'streaming' || shown >= total) return undefined
    const timer = setTimeout(() => setShown((count) => Math.min(total, count + step)), 16)
    return () => clearTimeout(timer)
  }, [phase, shown, total, step])

  function send(id) {
    const next = endpoints.find((item) => item.id === id)
    const instant = prefersReducedMotion()
    delay.current = jitter(220, 180)
    setActiveId(id)
    setElapsed(jitter(24, 46))
    setShown(instant ? next.lines.length : 0)
    setPhase(instant ? 'streaming' : 'sending')
    setRequestId((count) => count + 1)
    responseRef.current?.scrollTo({ top: 0 })
  }

  const sending = phase === 'sending'
  const complete = phase === 'streaming' && shown >= total

  return (
    <section
      aria-labelledby="api-console-title"
      className="overflow-hidden rounded-2xl border border-line-strong bg-surface shadow-[0_30px_80px_-40px_var(--c-shadow)]"
    >
      <header className="flex items-center justify-between gap-3 border-b border-line px-4 py-3 sm:px-5">
        <h2 id="api-console-title" className="flex items-center gap-2 text-sm font-semibold [font-stretch:100%]">
          <Braces className="size-4 text-accent" aria-hidden="true" />
          Try my portfolio API
        </h2>
        <p className="hidden text-xs text-subtle sm:block">Pick an endpoint to send a request</p>
      </header>

      <div role="group" aria-label="Endpoints" className="flex flex-wrap gap-1 border-b border-line px-3 py-3 sm:px-4">
        {endpoints.map((item) => {
          const active = item.id === activeId
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => send(item.id)}
              aria-pressed={active}
              className={`inline-flex h-9 items-center gap-1.5 rounded-lg border px-2 font-mono text-[12px] transition-colors ${
                active
                  ? 'border-line-strong bg-surface-2 text-fg'
                  : 'border-transparent text-muted hover:border-line hover:bg-surface-2/60 hover:text-fg'
              }`}
            >
              <span className={`text-[10px] font-semibold ${methodStyles[item.method]}`}>{item.method}</span>
              {item.path}
            </button>
          )
        })}
      </div>

      {/* Request line */}
      <div className="flex items-center gap-2 px-3 pt-3 sm:px-4">
        <p className="flex h-10 min-w-0 flex-1 items-center gap-2.5 rounded-lg border border-line bg-bg px-3 font-mono text-[13px]">
          <span className={`font-semibold ${methodStyles[endpoint.method]}`}>{endpoint.method}</span>
          <span className="truncate text-fg">
            <span className="text-subtle">/api/v1</span>
            {endpoint.path}
          </span>
        </p>
        <button
          type="button"
          onClick={() => send(activeId)}
          disabled={sending}
          className="inline-flex h-10 shrink-0 items-center gap-2 rounded-lg bg-accent-fill px-3.5 text-sm font-semibold text-on-accent transition-[background-color] hover:bg-[color-mix(in_srgb,var(--c-accent-fill)_88%,white)] disabled:opacity-70"
        >
          Send
          <CornerDownLeft className="size-3.5" aria-hidden="true" />
        </button>
      </div>

      {/* Status line */}
      <div className="flex h-11 items-center gap-3 px-4 font-mono text-xs sm:px-5" role="status" aria-live="polite">
        {sending ? (
          <span className="inline-flex items-center gap-2 text-subtle">
            <LoaderCircle className="size-3.5 animate-spin motion-reduce:animate-none" aria-hidden="true" />
            Sending request…
          </span>
        ) : (
          <>
            <span className="rounded-md bg-get/12 px-2 py-0.5 font-semibold text-get">{endpoint.status}</span>
            <span className="text-subtle">{elapsed} ms</span>
            <span className="text-subtle">{formatSize(endpoint.size)}</span>
            <span className="sr-only">
              Response for {endpoint.method} {endpoint.path}
            </span>
          </>
        )}
      </div>

      {/* Response body */}
      <pre
        ref={responseRef}
        tabIndex={0}
        aria-label={`JSON response for ${endpoint.method} ${endpoint.path}`}
        className="h-[17rem] overflow-y-auto border-t border-line bg-bg/60 px-4 py-4 font-mono text-[12.5px] leading-[1.75] whitespace-pre-wrap focus-visible:outline-offset-[-2px] sm:h-[19rem] sm:px-5 sm:text-[13px]"
      >
        <code>
          {endpoint.lines.slice(0, sending ? 0 : shown).map((line, index) => (
            <JsonLine key={`${requestId}-${index}`} line={line} />
          ))}
          {!complete && !sending && (
            <span aria-hidden="true" className="animate-blink inline-block h-[1.1em] w-[2px] translate-y-[3px] bg-accent" />
          )}
        </code>
      </pre>

      <footer className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-line px-4 py-3 text-xs text-subtle sm:px-5">
        <p>Responses are built from this page’s content.</p>
        <a
          href={`#${endpoint.section.id}`}
          className="inline-flex items-center gap-1.5 rounded font-medium text-fg underline-offset-4 hover:text-accent hover:underline"
        >
          <ArrowDown className="size-3.5" aria-hidden="true" />
          Go to {endpoint.section.label}
        </a>
      </footer>
    </section>
  )
}
