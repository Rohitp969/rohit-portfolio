import { motion } from 'framer-motion'
import { ArrowDown, Mail, MapPin } from 'lucide-react'
import ApiConsole from '../components/ApiConsole'
import { GithubIcon, LinkedinIcon } from '../components/BrandIcons'
import ResumeButton from '../components/ResumeButton'
import { experience, profile, projects, socials } from '../data/portfolioData'
import { buttonStyles, iconButtonStyles } from '../lib/styles'

const socialIcons = { github: GithubIcon, linkedin: LinkedinIcon }
const internship = experience[0]
const liveCount = projects.filter((project) => project.liveUrl).length
const countWords = ['No', 'One', 'Two', 'Three', 'Four', 'Five']

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
}
const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero() {
  const [firstName, ...rest] = profile.name.split(' ')

  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 pt-28 pb-12 sm:px-6 sm:pt-32 sm:pb-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14 lg:px-8 lg:pt-32 lg:pb-16">
        <motion.div variants={container} initial="hidden" animate="show" className="min-w-0">
          <motion.p
            variants={item}
            className="inline-flex items-center gap-2.5 rounded-full border border-success/30 bg-success/10 py-1.5 pr-3.5 pl-3 text-sm font-medium text-fg"
          >
            <span className="relative flex size-2">
              <span className="animate-ping-slow absolute inline-flex size-full rounded-full bg-success opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex size-2 rounded-full bg-success" />
            </span>
            {profile.availability}
          </motion.p>

          <motion.h1
            variants={item}
            id="hero-title"
            className="font-display mt-7 text-[clamp(3rem,1.9rem+4.6vw,5.25rem)] leading-[0.95]"
          >
            <span className="block">{firstName}</span>
            <span className="block">{rest.join(' ')}</span>
            <span className="sr-only">, {profile.role}</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-7 max-w-[30ch] text-[clamp(1.25rem,1.05rem+0.85vw,1.625rem)] leading-snug font-medium text-fg [font-stretch:105%]"
          >
            {profile.headline}
          </motion.p>

          <motion.p variants={item} className="mt-4 max-w-[52ch] leading-relaxed text-muted">
            Recently a {internship.role} at {internship.company.replace(' Pvt. Ltd.', '')}. {countWords[liveCount] ?? liveCount} live
            projects with online payments, sign-in and admin dashboards.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#projects" className={`${buttonStyles.primary} max-sm:w-full`}>
              View projects
              <ArrowDown className="size-4" aria-hidden="true" />
            </a>
            <ResumeButton className="max-sm:w-full" />
            <div className="flex items-center gap-2">
              {socials.map((social) => {
                const Icon = socialIcons[social.id]
                return (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${social.label} (opens in a new tab)`}
                    title={social.label}
                    className={iconButtonStyles}
                  >
                    <Icon className="size-[18px]" />
                  </a>
                )
              })}
              <a href={`mailto:${profile.email}`} aria-label={`Email ${profile.email}`} title="Email" className={iconButtonStyles}>
                <Mail className="size-[18px]" aria-hidden="true" />
              </a>
            </div>
          </motion.div>

          <motion.p variants={item} className="mt-8 flex items-center gap-2 text-sm text-subtle">
            <MapPin className="size-4" aria-hidden="true" />
            {profile.location}
          </motion.p>
        </motion.div>

        <motion.div
          className="min-w-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <ApiConsole />
        </motion.div>
      </div>
    </section>
  )
}
