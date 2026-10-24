import { marqueeTech, tech } from '../data/portfolioData'
import TechIcon from './TechIcon'

// A slow, endless strip of the stack. Pauses on hover; with reduced motion it
// becomes a static, wrapped row.
export default function TechMarquee() {
  const items = [...marqueeTech, ...marqueeTech]

  return (
    <section aria-label="Technologies I work with" className="border-y border-line bg-surface/40 py-7">
      <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)] motion-reduce:[mask-image:none]">
        <ul className="animate-marquee flex w-max items-center gap-3 group-hover:[animation-play-state:paused] motion-reduce:mx-auto motion-reduce:w-full motion-reduce:max-w-6xl motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:px-4">
          {items.map((id, index) => {
            const duplicate = index >= marqueeTech.length
            return (
              <li
                key={`${id}-${index}`}
                aria-hidden={duplicate || undefined}
                className={`flex items-center gap-2.5 rounded-xl border border-line bg-surface px-4 py-2.5 text-sm font-medium whitespace-nowrap text-fg ${
                  duplicate ? 'motion-reduce:hidden' : ''
                }`}
              >
                <TechIcon id={id} className="size-5" />
                {tech[id].name}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
