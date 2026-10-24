import { motion } from 'framer-motion'
import { Check, GitBranch } from 'lucide-react'
import TechIcon from './TechIcon'

// Token helpers keep the code listing readable below.
const K = ({ children }) => <span className="text-code-keyword">{children}</span>
const N = ({ children }) => <span className="text-code-name">{children}</span>
const P = ({ children }) => <span className="text-code-prop">{children}</span>
const S = ({ children }) => <span className="text-code-string">&apos;{children}&apos;</span>
const B = ({ children }) => <span className="text-code-bool">{children}</span>
const Pu = ({ children }) => <span className="text-code-punct">{children}</span>

function List({ items }) {
  return (
    <>
      <Pu>[</Pu>
      {items.map((item, i) => (
        <span key={item}>
          <S>{item}</S>
          {i < items.length - 1 && <Pu>, </Pu>}
        </span>
      ))}
      <Pu>]</Pu>
    </>
  )
}

const lines = [
  <>
    <K>const</K> <N>developer</N> <Pu>= {'{'}</Pu>
  </>,
  <>
    {'  '}<P>name</P><Pu>: </Pu><S>Rohit Prajapati</S><Pu>,</Pu>
  </>,
  <>
    {'  '}<P>role</P><Pu>: </Pu><S>MERN Stack Developer</S><Pu>,</Pu>
  </>,
  <>
    {'  '}<P>frontend</P><Pu>: </Pu><List items={['React', 'Redux', 'Tailwind']} /><Pu>,</Pu>
  </>,
  <>
    {'  '}<P>backend</P><Pu>: </Pu><List items={['Node', 'Express', 'MongoDB']} /><Pu>,</Pu>
  </>,
  <>
    {'  '}<P>auth</P><Pu>: </Pu><S>JWT</S><Pu>,</Pu>
  </>,
  <>
    {'  '}<P>location</P><Pu>: </Pu><S>Noida, India</S><Pu>,</Pu>
  </>,
  <>
    {'  '}<P>openToWork</P><Pu>: </Pu><B>true</B><Pu>,</Pu>
  </>,
  <>
    <Pu>{'};'}</Pu>
  </>,
]

const floating = [
  { id: 'react', className: '-top-7 -left-3 sm:-left-7', delay: 0 },
  { id: 'express', className: '-top-7 right-8 sm:right-14', delay: 1.8 },
  { id: 'nodejs', className: 'top-[42%] -right-3 sm:-right-7', delay: 1.2 },
  { id: 'mongodb', className: '-bottom-7 left-[40%]', delay: 0.6 },
]

export default function CodeWindow() {
  return (
    <div className="relative mx-auto w-full max-w-[34rem]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-12 -z-10 bg-[radial-gradient(closest-side_at_35%_40%,var(--c-glow-1),transparent),radial-gradient(closest-side_at_70%_70%,var(--c-glow-2),transparent)] blur-2xl"
      />

      <figure
        aria-label="A JavaScript object describing Rohit: MERN stack developer in Noida, open to work"
        className="gradient-border overflow-hidden rounded-2xl bg-surface/90 shadow-[0_40px_90px_-40px_var(--c-shadow)] backdrop-blur"
      >
        <div className="flex items-center gap-3 border-b border-line bg-surface-2/60 px-4 py-3">
          <div aria-hidden="true" className="flex gap-1.5">
            <span className="size-3 rounded-full bg-[#ff5f57]/85" />
            <span className="size-3 rounded-full bg-[#febc2e]/85" />
            <span className="size-3 rounded-full bg-[#28c840]/85" />
          </div>
          <div className="flex items-center gap-2 rounded-md border border-line bg-surface px-2.5 py-1 font-mono text-xs text-muted">
            <TechIcon id="javascript" className="size-3.5" />
            developer.js
          </div>
        </div>

        <pre className="overflow-x-auto px-4 py-5 font-mono text-[12px] leading-[1.9] sm:px-5 sm:text-[13.5px]">
          <code className="grid">
            {lines.map((line, i) => (
              <span key={i} className="grid grid-cols-[1.5rem_1fr] sm:grid-cols-[2rem_1fr]">
                <span aria-hidden="true" className="text-code-punct/60 select-none">
                  {i + 1}
                </span>
                <span className="whitespace-pre">
                  {line}
                  {i === lines.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="animate-blink ml-1 inline-block h-[1.1em] w-[2px] translate-y-[3px] bg-accent motion-reduce:animate-none"
                    />
                  )}
                </span>
              </span>
            ))}
          </code>
        </pre>

        <div className="flex items-center justify-between border-t border-line bg-surface-2/60 px-4 py-2 font-mono text-[11px] text-subtle">
          <span className="inline-flex items-center gap-1.5">
            <GitBranch className="size-3.5" aria-hidden="true" />
            main
          </span>
          <span className="inline-flex items-center gap-1.5 text-success">
            <Check className="size-3.5" aria-hidden="true" />
            Deployed on Vercel
          </span>
        </div>
      </figure>

      {floating.map((item) => (
        <motion.div
          key={item.id}
          aria-hidden="true"
          className={`absolute ${item.className} hidden size-14 items-center justify-center rounded-2xl border border-line bg-surface/90 shadow-[0_16px_40px_-16px_var(--c-shadow)] backdrop-blur min-[420px]:flex`}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, delay: item.delay, repeat: Infinity, ease: 'easeInOut' }}
        >
          <TechIcon id={item.id} className="size-7" />
        </motion.div>
      ))}
    </div>
  )
}
