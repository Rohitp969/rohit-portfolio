import { Check, CircleAlert, CircleCheckBig, Copy, LoaderCircle, Mail, MapPin, Phone, Send } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { GithubIcon, LinkedinIcon } from '../components/BrandIcons'
import Reveal from '../components/Reveal'
import Section from '../components/Section'
import { profile, socials } from '../data/portfolioData'
import { buttonStyles } from '../lib/styles'

// Optional: set VITE_CONTACT_ENDPOINT (e.g. a Formspree form URL) to send messages
// from the page. Without it, the form opens the visitor's email app instead.
const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT

const MESSAGE_MAX = 2000
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const fields = ['name', 'email', 'message']
const emptyForm = { name: '', email: '', message: '', company: '' }

function validateField(field, rawValue) {
  const value = rawValue.trim()
  if (field === 'name') {
    if (!value) return 'Enter your name.'
    if (value.length < 2) return 'Enter at least 2 characters for your name.'
  }
  if (field === 'email') {
    if (!value) return 'Enter your email address.'
    if (!emailPattern.test(value)) return 'Enter an email address in the format name@example.com.'
  }
  if (field === 'message') {
    if (!value) return 'Enter a message.'
    if (value.length < 10) return 'Add a little more detail. Messages need at least 10 characters.'
    if (value.length > MESSAGE_MAX) return `Shorten your message to ${MESSAGE_MAX.toLocaleString()} characters or fewer.`
  }
  return ''
}

const socialIcons = { github: GithubIcon, linkedin: LinkedinIcon }

export default function Contact() {
  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's build something together"
      description="Hiring for a full-stack or MERN role, or have a project in mind? I'd love to hear from you. Email is the quickest way to reach me."
    >
      <div className="relative">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-24 -left-16 size-[30rem] rounded-full bg-[radial-gradient(closest-side,var(--c-glow-1),transparent)] blur-2xl" />
          <div className="absolute -right-16 -bottom-24 size-[28rem] rounded-full bg-[radial-gradient(closest-side,var(--c-glow-2),transparent)] blur-2xl" />
        </div>
        <div className="grid gap-4 lg:grid-cols-[1fr_1.3fr]">
          <Reveal>
            <ContactDetails />
          </Reveal>
          <Reveal delay={0.08}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </Section>
  )
}

function ContactDetails() {
  const [copyState, setCopyState] = useState('idle')
  const resetTimer = useRef(null)

  useEffect(() => () => clearTimeout(resetTimer.current), [])

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopyState('copied')
    } catch {
      setCopyState('failed')
    }
    clearTimeout(resetTimer.current)
    resetTimer.current = setTimeout(() => setCopyState('idle'), 2500)
  }

  const rowClass = 'flex items-center gap-4 px-5 py-4 sm:px-6'
  const iconClass = 'inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-surface-2 text-accent'
  const linkClass = 'block truncate rounded font-medium text-fg underline-offset-4 hover:text-accent hover:underline'

  return (
    <div className="gradient-border flex h-full flex-col rounded-3xl bg-surface/90 backdrop-blur">
      <div className="px-5 pt-6 pb-4 sm:px-6">
        <h3 className="text-xl font-semibold">Contact details</h3>
        <p className="mt-1.5 text-sm text-muted">Reach out directly, or use the form.</p>
      </div>

      <ul className="divide-y divide-line border-t border-line">
        <li className={rowClass}>
          <span className={iconClass}>
            <Mail className="size-5" aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm text-subtle">Email</p>
            <a href={`mailto:${profile.email}`} className={linkClass}>
              {profile.email}
            </a>
          </div>
          <button
            type="button"
            onClick={copyEmail}
            aria-label="Copy email address"
            title="Copy email address"
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-2 hover:text-fg"
          >
            {copyState === 'copied' ? (
              <Check className="size-[18px] text-success" aria-hidden="true" />
            ) : (
              <Copy className="size-[18px]" aria-hidden="true" />
            )}
          </button>
          <span className="sr-only" role="status">
            {copyState === 'copied' && 'Email address copied.'}
            {copyState === 'failed' && 'Copying is blocked in this browser. Select the address to copy it.'}
          </span>
        </li>

        {profile.phone && (
          <li className={rowClass}>
            <span className={iconClass}>
              <Phone className="size-5" aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm text-subtle">Phone</p>
              <a href={`tel:${profile.phone.replace(/\s/g, '')}`} className={linkClass}>
                {profile.phone}
              </a>
            </div>
          </li>
        )}

        {socials.map((social) => {
          const Icon = socialIcons[social.id]
          return (
            <li key={social.id} className={rowClass}>
              <span className={iconClass}>
                <Icon className="size-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-subtle">{social.label}</p>
                <a href={social.url} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  {social.handle}
                  <span className="sr-only"> on {social.label} (opens in a new tab)</span>
                </a>
              </div>
            </li>
          )
        })}

        <li className={rowClass}>
          <span className={iconClass}>
            <MapPin className="size-5" aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm text-subtle">Location</p>
            <p className="font-medium text-fg">{profile.location}</p>
          </div>
        </li>
      </ul>
    </div>
  )
}

function ContactForm() {
  const [values, setValues] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState('idle')
  const fieldRefs = useRef({})

  function updateError(field, value) {
    setErrors((current) => ({ ...current, [field]: validateField(field, value) }))
  }

  function handleChange(event) {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    // Once a field has been visited, re-check as the user types so errors clear immediately.
    if (touched[name] || errors[name]) updateError(name, value)
    if (status !== 'idle' && status !== 'sending') setStatus('idle')
  }

  function handleBlur(event) {
    const { name, value } = event.target
    // Don't flag an untouched empty field just because focus passed through it.
    if (!value.trim() && !touched[name]) return
    setTouched((current) => ({ ...current, [name]: true }))
    updateError(name, value)
  }

  async function handleSubmit(event) {
    event.preventDefault()

    const nextErrors = Object.fromEntries(fields.map((field) => [field, validateField(field, values[field])]))
    setErrors(nextErrors)
    setTouched({ name: true, email: true, message: true })

    const firstInvalid = fields.find((field) => nextErrors[field])
    if (firstInvalid) {
      fieldRefs.current[firstInvalid]?.focus()
      return
    }

    const name = values.name.trim()
    const email = values.email.trim()
    const message = values.message.trim()

    if (!endpoint) {
      const subject = `Portfolio enquiry from ${name}`
      const body = `${message}\n\n${name}\n${email}`
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      setStatus('drafted')
      return
    }

    // Bots fill the hidden field; skip the request but don't tell them.
    if (values.company) {
      setStatus('sent')
      return
    }

    setStatus('sending')
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })
      if (!response.ok) throw new Error(`Request failed with status ${response.status}`)
      setStatus('sent')
      setValues(emptyForm)
      setTouched({})
      setErrors({})
    } catch {
      setStatus('error')
    }
  }

  const sending = status === 'sending'

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-labelledby="contact-form-title"
      className="gradient-border h-full rounded-3xl bg-surface/90 p-6 backdrop-blur sm:p-8"
    >
      <h3 id="contact-form-title" className="text-xl font-semibold">
        Send a message
      </h3>
      <p className="mt-1.5 text-sm text-muted">All fields are required.</p>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <Field
          id="contact-name"
          name="name"
          label="Your name"
          autoComplete="name"
          value={values.name}
          error={errors.name}
          onChange={handleChange}
          onBlur={handleBlur}
          inputRef={(node) => {
            fieldRefs.current.name = node
          }}
        />
        <Field
          id="contact-email"
          name="email"
          type="email"
          label="Your email"
          autoComplete="email"
          inputMode="email"
          value={values.email}
          error={errors.email}
          onChange={handleChange}
          onBlur={handleBlur}
          inputRef={(node) => {
            fieldRefs.current.email = node
          }}
        />
        <Field
          id="contact-message"
          name="message"
          label="Message"
          multiline
          className="sm:col-span-2"
          value={values.message}
          error={errors.message}
          hint={`${values.message.trim().length.toLocaleString()} / ${MESSAGE_MAX.toLocaleString()} characters`}
          onChange={handleChange}
          onBlur={handleBlur}
          inputRef={(node) => {
            fieldRefs.current.message = node
          }}
        />
      </div>

      {/* Honeypot: hidden from people and assistive tech, tempting to bots. */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor="contact-company">Company</label>
        <input
          id="contact-company"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          value={values.company}
          onChange={handleChange}
        />
      </div>

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button type="submit" disabled={sending} className={buttonStyles.primary}>
          {sending ? (
            <LoaderCircle className="size-4 animate-spin motion-reduce:animate-none" aria-hidden="true" />
          ) : endpoint ? (
            <Send className="size-4" aria-hidden="true" />
          ) : (
            <Mail className="size-4" aria-hidden="true" />
          )}
          {sending ? 'Sending…' : endpoint ? 'Send message' : 'Open in email app'}
        </button>
        {!endpoint && (
          <p className="text-sm text-subtle">
            Opens your email app with this message filled in. Nothing is sent until you press send there.
          </p>
        )}
      </div>

      <div role="status" aria-live="polite" className={status === 'idle' || status === 'sending' ? '' : 'mt-5'}>
        {status === 'drafted' && (
          <StatusMessage tone="success">
            Your email app should now be open with the message ready to send. If nothing opened, email me at{' '}
            <a href={`mailto:${profile.email}`} className="font-medium underline underline-offset-4">
              {profile.email}
            </a>
            .
          </StatusMessage>
        )}
        {status === 'sent' && (
          <StatusMessage tone="success">Message sent. I’ll reply to the email address you gave.</StatusMessage>
        )}
        {status === 'error' && (
          <StatusMessage tone="error">
            The message couldn’t be sent. Check your connection and try again, or email me at{' '}
            <a href={`mailto:${profile.email}`} className="font-medium underline underline-offset-4">
              {profile.email}
            </a>
            .
          </StatusMessage>
        )}
      </div>
    </form>
  )
}

function Field({ id, label, error, hint, multiline = false, className = '', inputRef, ...inputProps }) {
  const errorId = `${id}-error`
  const hintId = `${id}-hint`
  const describedBy = error ? errorId : hint ? hintId : undefined
  const inputClass = `block w-full rounded-xl border bg-bg/70 px-4 text-[0.9375rem] text-fg transition-[border-color,box-shadow] focus-visible:border-accent focus-visible:ring-4 focus-visible:ring-accent/20 focus-visible:outline-none ${
    error ? 'border-danger' : 'border-field'
  } ${multiline ? 'min-h-36 resize-y py-3 leading-relaxed' : 'h-12'}`

  const sharedProps = {
    id,
    ref: inputRef,
    'aria-invalid': error ? 'true' : undefined,
    'aria-describedby': describedBy,
    required: true,
    className: inputClass,
    ...inputProps,
  }

  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-fg">
        {label}
      </label>
      {multiline ? <textarea rows={5} {...sharedProps} /> : <input type="text" {...sharedProps} />}
      {error && (
        <p id={errorId} className="mt-2 flex items-start gap-1.5 text-sm text-danger">
          <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
      {hint && !error && (
        <p id={hintId} className="mt-2 text-xs text-subtle tabular-nums">
          {hint}
        </p>
      )}
    </div>
  )
}

function StatusMessage({ tone, children }) {
  const success = tone === 'success'
  const Icon = success ? CircleCheckBig : CircleAlert
  return (
    <p
      className={`flex items-start gap-2.5 rounded-xl border px-4 py-3 text-sm leading-relaxed ${
        success ? 'border-success/40 bg-success/10 text-fg' : 'border-danger/40 bg-danger/10 text-fg'
      }`}
    >
      <Icon className={`mt-0.5 size-4 shrink-0 ${success ? 'text-success' : 'text-danger'}`} aria-hidden="true" />
      <span>{children}</span>
    </p>
  )
}
