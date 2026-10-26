import { AnimatePresence, motion } from 'framer-motion'
import {
  BookUser,
  BriefcaseBusiness,
  Check,
  CircleAlert,
  Copy,
  CornerDownLeft,
  Download,
  ExternalLink,
  FolderGit2,
  GraduationCap,
  Layers,
  Mail,
  Moon,
  Search,
  Sun,
} from 'lucide-react'
import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { useTheme } from '../hooks/useTheme'
import { navLinks, profile, projects, socials } from '../data/portfolioData'
import { OPEN_PALETTE_EVENT, shortcutLabel } from '../lib/commandPalette'
import { toggleTheme } from '../lib/theme'
import { GithubIcon, LinkedinIcon } from './BrandIcons'

const sectionIcons = {
  about: BookUser,
  skills: Layers,
  projects: FolderGit2,
  experience: BriefcaseBusiness,
  education: GraduationCap,
  contact: Mail,
}
const socialIcons = { github: GithubIcon, linkedin: LinkedinIcon }

function goToSection(id) {
  const section = document.getElementById(id)
  if (!section) return
  history.replaceState(null, '', `#${id}`)
  section.focus({ preventScroll: true })
  section.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
}

function downloadResume() {
  const link = document.createElement('a')
  link.href = profile.resume.url
  link.download = profile.resume.downloadName
  document.body.append(link)
  link.click()
  link.remove()
}

function buildCommands(theme) {
  return [
    ...navLinks.map((link) => ({
      id: `go-${link.id}`,
      group: 'Go to',
      label: link.label,
      icon: sectionIcons[link.id],
      // Navigation moves focus to the section, so focus is not returned to the trigger.
      keepFocus: true,
      run: () => goToSection(link.id),
    })),
    ...projects
      .filter((project) => project.liveUrl)
      .map((project) => ({
        id: `live-${project.id}`,
        group: 'Projects',
        label: `Open ${project.name} live site`,
        keywords: project.title,
        icon: ExternalLink,
        run: () => window.open(project.liveUrl, '_blank', 'noopener,noreferrer'),
      })),
    {
      id: 'copy-email',
      group: 'Actions',
      label: 'Copy email address',
      keywords: profile.email,
      icon: Copy,
      run: async () => {
        await navigator.clipboard.writeText(profile.email)
        return `Copied ${profile.email}`
      },
    },
    { id: 'resume', group: 'Actions', label: 'Download resume', keywords: 'cv pdf', icon: Download, run: downloadResume },
    {
      id: 'theme',
      group: 'Actions',
      label: theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme',
      keywords: 'theme dark light mode',
      icon: theme === 'dark' ? Sun : Moon,
      run: toggleTheme,
    },
    ...socials.map((social) => ({
      id: `social-${social.id}`,
      group: 'Actions',
      label: `Open ${social.label} profile`,
      keywords: social.handle,
      icon: socialIcons[social.id],
      run: () => window.open(social.url, '_blank', 'noopener,noreferrer'),
    })),
  ]
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const [toast, setToast] = useState(null)
  const theme = useTheme()
  const dialogRef = useRef(null)
  const inputRef = useRef(null)
  const listRef = useRef(null)
  const returnFocusRef = useRef(null)
  const toastTimer = useRef(null)
  const baseId = useId()

  const commands = useMemo(() => buildCommands(theme), [theme])
  const results = useMemo(() => {
    const needle = query.trim().toLowerCase()
    if (!needle) return commands
    return commands.filter((command) =>
      `${command.label} ${command.group} ${command.keywords ?? ''}`.toLowerCase().includes(needle),
    )
  }, [commands, query])

  // Open with Ctrl+K / Cmd+K from anywhere, or from the navbar button.
  useEffect(() => {
    const reset = () => {
      setQuery('')
      setActiveIndex(0)
    }
    const onKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        reset()
        setOpen((current) => !current)
      }
    }
    const onOpen = () => {
      reset()
      setOpen(true)
    }
    document.addEventListener('keydown', onKeyDown)
    window.addEventListener(OPEN_PALETTE_EVENT, onOpen)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      window.removeEventListener(OPEN_PALETTE_EVENT, onOpen)
    }
  }, [])

  // Sync the native <dialog> with state. showModal() traps focus and makes the page inert.
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) {
      returnFocusRef.current = document.activeElement
      dialog.showModal()
      inputRef.current?.focus()
    } else if (!open && dialog.open) {
      dialog.close()
    }
  }, [open])

  useEffect(() => () => clearTimeout(toastTimer.current), [])

  // Keep the highlighted option in view while moving with the arrow keys.
  useEffect(() => {
    listRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' })
  }, [activeIndex])

  function close({ restoreFocus = true } = {}) {
    setOpen(false)
    if (restoreFocus) requestAnimationFrame(() => returnFocusRef.current?.focus?.({ preventScroll: true }))
  }

  function showToast(text, ok = true) {
    setToast({ text, ok })
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(null), 2600)
  }

  async function runCommand(command) {
    close({ restoreFocus: !command.keepFocus })
    try {
      const message = await command.run()
      if (message) showToast(message)
    } catch {
      showToast('Copying is blocked in this browser. The email address is in the Contact section.', false)
    }
  }

  function onInputKeyDown(event) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      if (results.length === 0) return
      const direction = event.key === 'ArrowDown' ? 1 : -1
      setActiveIndex((index) => (index + direction + results.length) % results.length)
    } else if (event.key === 'Enter') {
      event.preventDefault()
      const command = results[activeIndex]
      if (command) runCommand(command)
    } else if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault()
      setActiveIndex(event.key === 'Home' ? 0 : Math.max(0, results.length - 1))
    }
  }

  const listId = `${baseId}-list`
  const optionId = (index) => `${baseId}-option-${index}`
  const groups = results.reduce((acc, command, index) => {
    const last = acc.at(-1)
    if (last?.name === command.group) last.items.push({ command, index })
    else acc.push({ name: command.group, items: [{ command, index }] })
    return acc
  }, [])

  return (
    <>
      <dialog
        ref={dialogRef}
        aria-label="Quick actions"
        onClose={() => open && close()}
        onClick={(event) => {
          // Clicks on the backdrop land on the <dialog> element itself.
          if (event.target === dialogRef.current) close()
        }}
        className="mx-auto mt-[min(14vh,8rem)] w-[min(38rem,calc(100%-2rem))] max-w-none overflow-hidden rounded-2xl border border-line-strong bg-surface p-0 text-fg shadow-[0_40px_120px_-30px_rgb(0_0_0/0.6)]"
      >
        <div className="flex items-center gap-3 border-b border-line px-4">
          <Search className="size-[18px] shrink-0 text-subtle" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded="true"
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={results[activeIndex] ? optionId(activeIndex) : undefined}
            aria-label="Search sections and actions"
            placeholder="Jump to a section, copy my email…"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setActiveIndex(0)
            }}
            onKeyDown={onInputKeyDown}
            className="h-14 min-w-0 flex-1 bg-transparent text-base text-fg placeholder:text-subtle focus:outline-none"
          />
          <kbd className="hidden rounded-md border border-line px-1.5 py-0.5 font-mono text-[11px] text-subtle sm:inline-block">
            Esc
          </kbd>
        </div>

        <div ref={listRef} id={listId} role="listbox" aria-label="Results" className="max-h-[min(60vh,24rem)] overflow-y-auto p-2">
          {groups.length === 0 && (
            <p className="px-3 py-8 text-center text-sm text-muted">
              Nothing matches “{query}”. Try a section name such as Projects or Contact.
            </p>
          )}
          {groups.map((group) => (
            <div key={group.name} role="group" aria-labelledby={`${baseId}-${group.name}`} className="pb-1">
              <p id={`${baseId}-${group.name}`} className="px-3 pt-2 pb-1.5 text-xs font-medium text-subtle">
                {group.name}
              </p>
              {group.items.map(({ command, index }) => {
                const Icon = command.icon
                const active = index === activeIndex
                return (
                  <div
                    key={command.id}
                    id={optionId(index)}
                    role="option"
                    aria-selected={active}
                    onPointerMove={() => setActiveIndex(index)}
                    onClick={() => runCommand(command)}
                    className={`flex h-11 cursor-pointer items-center gap-3 rounded-lg px-3 text-[0.9375rem] ${
                      active ? 'bg-surface-2 text-fg' : 'text-muted'
                    }`}
                  >
                    <Icon className={`size-4 shrink-0 ${active ? 'text-accent' : ''}`} aria-hidden="true" />
                    <span className="min-w-0 flex-1 truncate">{command.label}</span>
                    {active && <CornerDownLeft className="size-3.5 text-subtle" aria-hidden="true" />}
                  </div>
                )
              })}
            </div>
          ))}
        </div>

        <p className="hidden items-center gap-4 border-t border-line px-4 py-2.5 text-xs text-subtle sm:flex">
          <span>
            <kbd className="font-mono">↑</kbd> <kbd className="font-mono">↓</kbd> to move
          </span>
          <span>
            <kbd className="font-mono">Enter</kbd> to select
          </span>
          <span className="ml-auto">
            Open anytime with <kbd className="font-mono">{shortcutLabel}</kbd>
          </span>
        </p>
      </dialog>

      <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-5 z-[80] flex justify-center px-4">
        <AnimatePresence>
          {toast && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2 rounded-xl border border-line-strong bg-surface px-4 py-3 text-sm text-fg shadow-[0_20px_50px_-20px_var(--c-shadow)]"
            >
              {toast.ok ? (
                <Check className="size-4 shrink-0 text-success" aria-hidden="true" />
              ) : (
                <CircleAlert className="size-4 shrink-0 text-danger" aria-hidden="true" />
              )}
              {toast.text}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
