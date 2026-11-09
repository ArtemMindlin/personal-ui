import { Moon, Sun } from 'lucide-react'
import { useTheme, themeLabels } from '../theme'

export interface ThemeToggleProps {
  storageKey?: string
  className?: string
  size?: number
}

export function ThemeToggle({ storageKey, className = 'btn ghost sm icon', size = 15 }: ThemeToggleProps) {
  const { theme, isDark, cycleTheme } = useTheme(storageKey)

  return (
    <button
      type="button"
      className={className}
      onClick={cycleTheme}
      title={`Tema: ${themeLabels[theme]}`}
      aria-label={`Cambiar tema (actual: ${themeLabels[theme]})`}
    >
      {isDark ? <Moon size={size} /> : <Sun size={size} />}
    </button>
  )
}
