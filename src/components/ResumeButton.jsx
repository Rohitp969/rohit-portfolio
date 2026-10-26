import { Download } from 'lucide-react'
import { profile } from '../data/portfolioData'
import { buttonStyles } from '../lib/styles'

// Downloads public/resume.pdf. Replace that file to update the resume.
export default function ResumeButton({ variant = 'secondary', className = '' }) {
  return (
    <a href={profile.resume.url} download={profile.resume.downloadName} className={`${buttonStyles[variant]} ${className}`}>
      <Download className="size-4" aria-hidden="true" />
      Download resume
    </a>
  )
}
