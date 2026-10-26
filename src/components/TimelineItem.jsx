// One entry on a vertical rail. The period sits in its own column from `sm` up
// and moves above the entry on small screens.
export default function TimelineItem({ period, aside, isLast = false, children }) {
  return (
    <li className="grid sm:grid-cols-[9.5rem_minmax(0,1fr)] sm:gap-x-8">
      <div className="hidden pt-0.5 text-right sm:block">
        <p className="text-sm font-medium text-fg">{period}</p>
        {aside && <p className="mt-0.5 text-sm text-subtle">{aside}</p>}
      </div>

      <div className={`relative min-w-0 pl-9 ${isLast ? '' : 'pb-12'}`}>
        {!isLast && <span aria-hidden="true" className="absolute top-6 bottom-1 left-[7px] w-px bg-line" />}
        <span
          aria-hidden="true"
          className="absolute top-1 left-0 size-[15px] rounded-full border-[3px] border-accent-fill bg-bg shadow-[0_0_0_4px_color-mix(in_srgb,var(--c-accent-fill)_18%,transparent)]"
        />

        <p className="mb-2 flex flex-wrap gap-x-3 text-sm sm:hidden">
          <span className="font-medium text-fg">{period}</span>
          {aside && <span className="text-subtle">{aside}</span>}
        </p>
        {children}
      </div>
    </li>
  )
}
