import { motion } from 'framer-motion'

// A single, quiet entrance for a block of content as it scrolls into view.
// MotionConfig reducedMotion="user" (in App) drops the movement and keeps a plain fade.
export default function Reveal({ children, className, delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  )
}
