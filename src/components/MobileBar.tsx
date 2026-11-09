import type React from 'react'
import { Menu } from 'lucide-react'

export interface MobileBarProps {
  title: string
  logo?: React.ReactNode
  onToggleNav: () => void
  actions?: React.ReactNode
  className?: string
}

export function MobileBar({ title, logo, onToggleNav, actions, className = 'mobile-bar' }: MobileBarProps) {
  return (
    <div className={className}>
      <button
        type="button"
        className="btn ghost sm icon menu-btn"
        onClick={onToggleNav}
        aria-label="Abrir menú"
      >
        <Menu size={18} />
      </button>

      {logo && <span className="brand-logo">{logo}</span>}
      <span className="mobile-bar-title">{title}</span>

      {actions && (
        <div className="mobile-bar-actions" style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
          {actions}
        </div>
      )}
    </div>
  )
}
