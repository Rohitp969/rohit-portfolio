// The theme lives on <html data-theme>. index.html applies the saved value before first
// paint; everything else reads and changes it through here so all controls stay in sync.
const themeColors = { dark: '#0f131a', light: '#f3f5f8' }
const EVENT = 'themechange'

export function getTheme() {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
}

export function setTheme(theme) {
  document.documentElement.dataset.theme = theme
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', themeColors[theme])
  try {
    localStorage.setItem('theme', theme)
  } catch {
    // Storage can be unavailable (private mode); the theme still applies for this visit.
  }
  window.dispatchEvent(new Event(EVENT))
}

export function toggleTheme() {
  setTheme(getTheme() === 'dark' ? 'light' : 'dark')
}

export function subscribeTheme(callback) {
  window.addEventListener(EVENT, callback)
  return () => window.removeEventListener(EVENT, callback)
}
