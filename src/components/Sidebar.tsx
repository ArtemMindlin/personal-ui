import type React from 'react'
import { X } from 'lucide-react'

export interface SidebarProps {
  brand?: {
    logo?: React.ReactNode
    title: React.ReactNode
    href?: string
    onClick?: () => void
  }
  headerActions?: React.ReactNode
  children: React.ReactNode
  bottom?: React.ReactNode
  onClose?: () => void
  className?: string
}

export function Sidebar({
  brand,
  headerActions,
  children,
  bottom,
  onClose,
  className = '',
}: SidebarProps) {
  return (
    <aside className={['sidebar', className].filter(Boolean).join(' ')}>
      <div className="sidebar-top">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          {brand && (
            <a
              href={brand.href || '#'}
              className="brand"
              onClick={(e) => {
                if (brand.onClick) {
                  e.preventDefault()
                  brand.onClick()
                }
              }}
            >
              {brand.logo && <span className="brand-logo">{brand.logo}</span>}
              <span>{brand.title}</span>
            </a>
          )}

          {onClose && (
            <button
              type="button"
              className="btn ghost sm icon sidebar-close-btn"
              onClick={onClose}
              aria-label="Cerrar menú"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {headerActions}
      </div>

      <div className="sidebar-scroll">{children}</div>

      {bottom && <div className="sidebar-bottom">{bottom}</div>}
    </aside>
  )
}
