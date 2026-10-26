const buttonBase =
  'inline-flex h-12 items-center justify-center gap-2 rounded-[10px] px-5 text-[0.9375rem] font-semibold whitespace-nowrap transition-[background-color,border-color,color,box-shadow,translate] duration-200 ease-out-soft active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60'

export const buttonStyles = {
  primary: `${buttonBase} bg-accent-fill text-on-accent shadow-[0_10px_30px_-14px_var(--c-accent-fill)] hover:bg-[color-mix(in_srgb,var(--c-accent-fill)_88%,white)]`,
  secondary: `${buttonBase} border border-line-strong bg-surface text-fg hover:border-fg/30 hover:bg-surface-2`,
}

export const iconButtonStyles =
  'inline-flex size-11 items-center justify-center rounded-[10px] border border-line bg-surface text-muted transition-colors hover:border-line-strong hover:text-fg'

// Technology badges on projects and experience.
export const tagStyles =
  'inline-flex items-center rounded-md border border-line bg-surface-2/60 px-2 py-0.5 text-[0.8125rem] leading-6 text-muted'

export const cardStyles = 'rounded-2xl border border-line bg-surface'

// HTTP method badges, shared by the API console and the contact form.
export const methodStyles = {
  GET: 'text-get',
  POST: 'text-accent',
}
