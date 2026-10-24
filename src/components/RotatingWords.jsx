import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

const INTERVAL = 2400

// Cycles through `words` once and settles back on the first, so the motion ends
// on its own. Screen readers get the full sentence instead.
export default function RotatingWords({ words }) {
  const reduceMotion = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (reduceMotion || done) return undefined
    const timer = setTimeout(() => {
      const next = (index + 1) % words.length
      setIndex(next)
      if (next === 0) setDone(true)
    }, INTERVAL)
    return () => clearTimeout(timer)
  }, [index, done, reduceMotion, words.length])

  const list = `${words.slice(0, -1).join(', ')} and ${words.at(-1)}`

  return (
    <>
      <span className="sr-only">{list}</span>
      <span aria-hidden="true" className="relative inline-grid align-bottom">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={words[index]}
            initial={{ opacity: 0, y: '0.4em' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-0.4em' }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="bg-brand-gradient-soft bg-clip-text whitespace-nowrap text-transparent"
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </>
  )
}
