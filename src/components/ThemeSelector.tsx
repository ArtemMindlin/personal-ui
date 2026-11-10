import { themeLabels, type Theme } from '../theme'

export interface ThemeSelectorProps {
  value: Theme
  onChange: (theme: Theme) => void
  options?: Theme[]
}

export function ThemeSelector({ value, onChange, options = ['system', 'light', 'dark'] }: ThemeSelectorProps) {
  return <div className="segmented" role="group" aria-label="Tema">
    {options.map(theme => <button type="button" key={theme} className={value === theme ? 'on' : undefined} aria-pressed={value === theme} onClick={() => onChange(theme)}>{themeLabels[theme]}</button>)}
  </div>
}
