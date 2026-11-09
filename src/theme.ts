import { useEffect, useState } from 'react'

export type Theme = 'system' | 'light' | 'dark'

export const themeLabels: Record<Theme, string> = {
  system: 'Sistema',
  light: 'Claro',
  dark: 'Oscuro',
}

const DEFAULT_THEME_KEY = 'personal.theme'

export function getTheme(key: string = DEFAULT_THEME_KEY): Theme {
  if (typeof window === 'undefined') return 'system'
  try {
    const saved = localStorage.getItem(key)
    return saved === 'light' || saved === 'dark' ? saved : 'system'
  } catch {
    return 'system'
  }
}

export function applyTheme(t: Theme, key: string = DEFAULT_THEME_KEY) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(key, t)
  } catch {
    /* private mode */
  }
  if (t === 'system') {
    delete document.documentElement.dataset.theme
  } else {
    document.documentElement.dataset.theme = t
  }
}

export function isDarkActive(t: Theme): boolean {
  if (typeof window === 'undefined') return false
  if (t === 'dark') return true
  if (t === 'light') return false
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export function useTheme(storageKey: string = DEFAULT_THEME_KEY) {
  const [theme, setThemeState] = useState<Theme>(() => getTheme(storageKey))
  const [isDark, setIsDark] = useState<boolean>(() => isDarkActive(getTheme(storageKey)))

  useEffect(() => {
    applyTheme(theme, storageKey)
    setIsDark(isDarkActive(theme))

    if (theme === 'system') {
      const media = window.matchMedia('(prefers-color-scheme: dark)')
      const listener = () => setIsDark(media.matches)
      media.addEventListener('change', listener)
      return () => media.removeEventListener('change', listener)
    }
  }, [theme, storageKey])

  const setTheme = (t: Theme) => {
    setThemeState(t)
    applyTheme(t, storageKey)
  }

  const cycleTheme = () => {
    const cycle: Record<Theme, Theme> = {
      system: 'light',
      light: 'dark',
      dark: 'system',
    }
    setTheme(cycle[theme])
  }

  return { theme, isDark, setTheme, cycleTheme }
}
