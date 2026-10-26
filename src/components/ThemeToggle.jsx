import { AnimatePresence, motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'
import { toggleTheme } from '../lib/theme'

export default function ThemeToggle() {
  const theme = useTheme()
  const label = `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`
  const Icon = theme === 'dark' ? Sun : Moon

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className="inline-flex size-10 items-center justify-center overflow-hidden rounded-lg text-muted transition-colors hover:bg-surface-2 hover:text-fg"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ opacity: 0, rotate: -60, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 60, scale: 0.6 }}
          transition={{ duration: 0.2 }}
          className="inline-flex"
        >
          <Icon className="size-[18px]" aria-hidden="true" />
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
