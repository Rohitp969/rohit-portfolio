import Reveal from './Reveal'

export default function Section({ id, eyebrow, title, description, children, className = '' }) {
  const titleId = `${id}-title`

  return (
    <section id={id} aria-labelledby={titleId} className={`relative py-20 sm:py-24 ${className}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-10 max-w-2xl sm:mb-14">
          {eyebrow && (
            <p className="mb-3 inline-flex items-center gap-2.5 text-sm font-medium text-accent">
              <span aria-hidden="true" className="bg-brand-gradient-soft h-px w-8 rounded-full" />
              {eyebrow}
            </p>
          )}
          <h2
            id={titleId}
            className="text-[clamp(2rem,1.45rem+2vw,2.875rem)] leading-[1.1] font-semibold tracking-[-0.025em]"
          >
            {title}
          </h2>
          {description && <p className="mt-4 text-lg leading-relaxed text-muted">{description}</p>}
        </Reveal>
        {children}
      </div>
    </section>
  )
}
