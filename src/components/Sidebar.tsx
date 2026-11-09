import type React from 'react'
import { PanelLeft, X } from 'lucide-react'

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
  collapsed?: boolean
  onToggleCollapse?: () => void
  className?: string
}

export function Sidebar({
  brand,
  headerActions,
  children,
  bottom,
  onClose,
  collapsed = false,
  onToggleCollapse,
  className = '',
}: SidebarProps) {
  return (
    <aside className={['sidebar', collapsed ? 'is-collapsed' : '', className].filter(Boolean).join(' ')}>
      <div className="sidebar-top">
        <div className="brand-row">
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
              <span className="brand-name">{brand.title}</span>
            </a>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            {onToggleCollapse && (
              <button
                type="button"
                className="btn ghost sm icon collapse-btn"
                title={collapsed ? 'Expandir barra lateral (⌘B / Ctrl+B)' : 'Plegar barra lateral (⌘B / Ctrl+B)'}
                aria-label={collapsed ? 'Expandir barra lateral' : 'Plegar barra lateral'}
                aria-expanded={!collapsed}
                onClick={onToggleCollapse}
              >
                <PanelLeft size={16} />
              </button>
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
        </div>

        {headerActions}
      </div>

      <div className="sidebar-scroll">{children}</div>

      {bottom && <div className="sidebar-bottom">{bottom}</div>}
    </aside>
  )
}
