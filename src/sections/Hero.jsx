import { motion } from 'framer-motion'
import { ArrowDown, Mail, MapPin } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../components/BrandIcons'
import CodeWindow from '../components/CodeWindow'
import ResumeButton from '../components/ResumeButton'
import RotatingWords from '../components/RotatingWords'
import { profile, socials, stats } from '../data/portfolioData'
import { buttonStyles, iconButtonStyles } from '../lib/styles'

const socialIcons = { github: GithubIcon, linkedin: LinkedinIcon }

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      {/* Background: soft grid fading out, two colour glows */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_0%,#000_30%,transparent_100%)]" />
        <div className="absolute -top-40 left-[8%] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(closest-side,var(--c-glow-1),transparent)] blur-2xl" />
        <div className="absolute -top-24 right-[4%] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(closest-side,var(--c-glow-2),transparent)] blur-2xl" />
      </div>

      <div className="mx-auto grid min-h-[min(100svh,58rem)] max-w-6xl items-center gap-16 px-4 pt-32 pb-20 sm:px-6 sm:pt-36 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12 lg:px-8 lg:pt-32">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p
            variants={item}
            className="inline-flex items-center gap-2.5 rounded-full border border-success/30 bg-success/10 py-1.5 pr-4 pl-3 text-sm font-medium text-fg"
          >
            <span className="relative flex size-2.5">
              <span className="animate-ping-slow absolute inline-flex size-full rounded-full bg-success opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex size-2.5 rounded-full bg-success" />
            </span>
            {profile.availability}
          </motion.p>

          <motion.h1 variants={item} id="hero-title" className="mt-7">
            <span className="block text-xl font-medium tracking-normal text-muted [font-stretch:100%] sm:text-2xl">
              Hi, I&apos;m
            </span>
            <span className="text-gradient mt-1 block pb-1 text-[clamp(2.75rem,1.5rem+5.2vw,5rem)] leading-[1.02] font-semibold tracking-[-0.035em]">
              {profile.name}
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-5 text-[clamp(1.25rem,1.05rem+0.8vw,1.625rem)] leading-snug font-medium [font-stretch:106%]"
          >
            I build <RotatingWords words={profile.buildWords} />
          </motion.p>

          <motion.p variants={item} className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
            {profile.intro}
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#projects" className={buttonStyles.primary}>
              View my work
              <ArrowDown className="size-4" aria-hidden="true" />
            </a>
            <ResumeButton />
            <div className="flex items-center gap-2 sm:ml-1">
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

          <motion.dl variants={item} className="mt-12 grid max-w-xl grid-cols-3 gap-4 border-t border-line pt-7">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block text-[clamp(1.5rem,1.2rem+1.2vw,2rem)] leading-none font-semibold tracking-tight [font-stretch:112.5%]">
                    {stat.value}
                  </span>
                  <span aria-hidden="true" className="mt-2 block text-sm leading-snug text-muted">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </motion.dl>

          <motion.p variants={item} className="mt-8 flex items-center gap-2 text-sm text-subtle">
            <MapPin className="size-4 text-accent" aria-hidden="true" />
            {profile.location}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <CodeWindow />
        </motion.div>
      </div>
    </section>
  )
}
