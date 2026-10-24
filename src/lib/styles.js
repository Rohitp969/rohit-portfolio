const buttonBase =
  'inline-flex h-12 items-center justify-center gap-2 rounded-xl px-6 text-[0.9375rem] font-medium whitespace-nowrap transition-[background-color,border-color,color,box-shadow,filter,translate] duration-200 ease-out disabled:cursor-not-allowed disabled:opacity-60'

export const buttonStyles = {
  primary: `${buttonBase} bg-brand-gradient text-white shadow-[0_12px_32px_-12px_rgb(109_74_232/0.85)] hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_18px_40px_-12px_rgb(109_74_232/0.95)] motion-reduce:hover:translate-y-0`,
  secondary: `${buttonBase} border border-line-strong bg-surface/80 text-fg backdrop-blur hover:-translate-y-0.5 hover:border-accent/50 hover:bg-surface-2 motion-reduce:hover:translate-y-0`,
}

export const iconButtonStyles =
  'inline-flex size-11 items-center justify-center rounded-xl border border-line bg-surface/70 text-muted transition-colors hover:border-accent/50 hover:text-fg'

const tagBase = 'inline-flex items-center rounded-lg border border-line px-2.5 py-1 leading-5'

// Technology badges on projects and experience.
export const tagStyles = `${tagBase} bg-surface-2/60 text-[0.8125rem] text-muted`

export const cardStyles = 'rounded-3xl border border-line bg-surface'
