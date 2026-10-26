import Reveal from './Reveal'

// tabIndex lets the command palette move focus to a section after jumping to it.
export default function Section({ id, title, description, children, className = '' }) {
  const titleId = `${id}-title`

  return (
    <section
      id={id}
      aria-labelledby={titleId}
      tabIndex={-1}
      className={`relative -scroll-mt-8 py-12 focus:outline-none sm:py-14 lg:py-16 ${className}`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-8 max-w-2xl sm:mb-10">
          <h2 id={titleId} className="font-display text-[clamp(2rem,1.5rem+2.1vw,3.125rem)] leading-[1.05]">
            {title}
          </h2>
          {description && <p className="mt-4 text-lg leading-relaxed text-muted">{description}</p>}
        </Reveal>
        {children}
      </div>
    </section>
  )
}
