import { ArrowUp, Mail } from 'lucide-react'
import { navLinks, profile, socials } from '../data/portfolioData'
import { iconButtonStyles } from '../lib/styles'
import { GithubIcon, LinkedinIcon } from './BrandIcons'
import Logo from './Logo'

const socialIcons = { github: GithubIcon, linkedin: LinkedinIcon }
const year = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface/40">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-sm">
            <a href="#top" className="inline-flex items-center gap-3 rounded-lg">
              <Logo className="size-9" />
              <span className="text-lg font-semibold tracking-tight [font-stretch:112.5%]">{profile.name}</span>
            </a>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {profile.role}, based in Noida, India. {profile.availability}.
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a href={`#${link.id}`} className="rounded text-muted transition-colors hover:text-fg">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <ul className="flex items-center gap-2">
            {socials.map((social) => {
              const Icon = socialIcons[social.id]
              return (
                <li key={social.id}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${social.label} (opens in a new tab)`}
                    title={social.label}
                    className={iconButtonStyles}
                  >
                    <Icon className="size-[18px]" />
                  </a>
                </li>
              )
            })}
            <li>
              <a href={`mailto:${profile.email}`} aria-label={`Email ${profile.email}`} title="Email" className={iconButtonStyles}>
                <Mail className="size-[18px]" aria-hidden="true" />
              </a>
            </li>
          </ul>
        </div>

        <div className="mt-10 flex flex-col-reverse gap-4 border-t border-line pt-6 text-sm text-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {profile.name}. Built with React, Tailwind CSS and Framer Motion.
          </p>
          <a
            href="#top"
            className="inline-flex items-center gap-1.5 self-start rounded text-muted transition-colors hover:text-fg sm:self-auto"
          >
            <ArrowUp className="size-4" aria-hidden="true" />
            Back to top
          </a>
        </div>
      </div>
    </footer>
  )
}
