import { AnimatePresence, motion } from 'framer-motion'
import { Download, Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { navLinks, profile } from '../data/portfolioData'
import { useActiveSection } from '../hooks/useActiveSection'
import Logo from './Logo'
import ThemeToggle from './ThemeToggle'

// 'top' (the hero) is tracked too, so no link is highlighted above the first section.
const sectionIds = ['top', ...navLinks.map((link) => link.id)]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(() => window.scrollY > 16)
  const activeId = useActiveSection(sectionIds)
  const toggleRef = useRef(null)
  const menuRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu on Escape, outside click, or when the viewport reaches desktop width.
  useEffect(() => {
    if (!menuOpen) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        toggleRef.current?.focus()
      }
    }
    const onPointerDown = (event) => {
      if (!menuRef.current?.contains(event.target) && !toggleRef.current?.contains(event.target)) {
        setMenuOpen(false)
      }
    }
    const desktop = window.matchMedia('(min-width: 64rem)')
    const onViewportChange = (event) => {
      if (event.matches) setMenuOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    desktop.addEventListener('change', onViewportChange)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
      desktop.removeEventListener('change', onViewportChange)
    }
  }, [menuOpen])

  const solid = scrolled || menuOpen

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
      <nav
        aria-label="Primary"
        className={`mx-auto flex h-14 max-w-6xl items-center gap-2 rounded-2xl border pr-2 pl-3 transition-[background-color,border-color,box-shadow] duration-300 ${
          solid
            ? 'border-line bg-surface/80 shadow-[0_12px_40px_-16px_var(--c-shadow)] backdrop-blur-xl'
            : 'border-transparent bg-transparent'
        }`}
      >
        <a href="#top" className="flex items-center gap-2.5 rounded-lg p-1" aria-label={`${profile.name}, back to top`}>
          <Logo className="size-8" />
          <span className="font-semibold tracking-tight [font-stretch:112.5%]">{profile.name}</span>
        </a>

        <ul className="mx-auto hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const active = activeId === link.id
            return (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  aria-current={active ? 'true' : undefined}
                  className={`block rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                    active ? 'bg-surface-2 text-fg' : 'text-muted hover:text-fg'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            )
          })}
        </ul>

        <div className="ml-auto flex items-center gap-1.5 lg:ml-0">
          <ThemeToggle />
          <a
            href={profile.resume.url}
            download={profile.resume.downloadName}
            className="bg-brand-gradient hidden h-10 items-center gap-2 rounded-xl px-4 text-sm font-medium text-white shadow-[0_8px_24px_-10px_rgb(109_74_232/0.9)] transition-[filter] hover:brightness-110 sm:inline-flex"
          >
            <Download className="size-4" aria-hidden="true" />
            Resume
          </a>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="inline-flex size-10 items-center justify-center rounded-xl text-fg transition-colors hover:bg-surface-2 lg:hidden"
          >
            {menuOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={menuRef}
            id="mobile-menu"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-2 max-w-6xl origin-top rounded-2xl border border-line bg-surface p-2 shadow-[0_24px_60px_-20px_var(--c-shadow)] lg:hidden"
          >
            <ul>
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={() => setMenuOpen(false)}
                    aria-current={activeId === link.id ? 'true' : undefined}
                    className={`flex h-12 items-center rounded-xl px-4 text-base font-medium transition-colors hover:bg-surface-2 ${
                      activeId === link.id ? 'bg-surface-2 text-fg' : 'text-muted'
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={profile.resume.url}
              download={profile.resume.downloadName}
              onClick={() => setMenuOpen(false)}
              className="bg-brand-gradient mt-2 flex h-12 items-center justify-center gap-2 rounded-xl text-base font-medium text-white sm:hidden"
            >
              <Download className="size-4" aria-hidden="true" />
              Download Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
