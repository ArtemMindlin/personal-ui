import React, { useEffect, useState, useCallback, useRef } from 'react'
import { PanelLeft, X, Search as SearchIcon, Settings } from 'lucide-react'
import { NavItem } from './NavItem'
import { ThemeToggle } from './ThemeToggle'

export interface SidebarBrand {
  logo?: React.ReactNode
  title: React.ReactNode
  href?: string
  to?: string
  onClick?: (e?: React.MouseEvent) => void
  as?: React.ElementType
}

export interface SidebarSearch {
  placeholder?: string
  shortcut?: string | false
  value?: string
  onChange?: (value: string) => void
  onClick?: () => void
  action?: React.ReactNode
  title?: string
}

export interface SidebarFooter {
  to?: string
  href?: string
  label?: React.ReactNode
  icon?: React.ReactNode
  as?: React.ElementType
  onClick?: (e?: React.MouseEvent) => void
  active?: boolean
  themeToggle?: boolean | React.ReactNode
  themeStorageKey?: string
  extra?: React.ReactNode
}

export interface SidebarProps {
  brand?: SidebarBrand
  search?: SidebarSearch
  headerActions?: React.ReactNode
  children: React.ReactNode
  footer?: SidebarFooter | boolean
  bottom?: React.ReactNode
  bottomClassName?: string
  onClose?: () => void
  collapsed?: boolean
  defaultCollapsed?: boolean
  onToggleCollapse?: () => void
  enableShortcut?: boolean
  storageKey?: string
  className?: string
  'aria-label'?: string
}

export function Sidebar({
  brand,
  search,
  headerActions,
  children,
  footer,
  bottom,
  bottomClassName = 'row',
  onClose,
  collapsed: controlledCollapsed,
  defaultCollapsed = false,
  onToggleCollapse,
  enableShortcut = true,
  storageKey,
  className = '',
  'aria-label': ariaLabel = 'Principal',
}: SidebarProps) {
  const isControlled = controlledCollapsed !== undefined

  const [uncontrolledCollapsed, setUncontrolledCollapsed] = useState(() => {
    if (storageKey && typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(storageKey)
        if (stored !== null) return stored === 'true'
      } catch {
        /* storage may be restricted */
      }
    }
    return defaultCollapsed
  })

  const isCollapsed = isControlled ? controlledCollapsed : uncontrolledCollapsed
  const searchInput = useRef<HTMLInputElement>(null)
  const focusSearchOnExpand = useRef(false)
  const searchShortcut = search?.shortcut ?? '/'
  const editableSearch = Boolean(search?.onChange)
  const searchEnabled = Boolean(search && (editableSearch || search.onClick))

  const handleToggle = useCallback(() => {
    if (onToggleCollapse) {
      onToggleCollapse()
    }
    if (!isControlled) {
      setUncontrolledCollapsed((prev) => {
        const next = !prev
        if (storageKey && typeof window !== 'undefined') {
          try {
            localStorage.setItem(storageKey, String(next))
          } catch {
            /* storage may be restricted */
          }
        }
        return next
      })
    }
  }, [isControlled, onToggleCollapse, storageKey])

  const activateSearch = useCallback(() => {
    if (isCollapsed) {
      focusSearchOnExpand.current = editableSearch
      handleToggle()
    }
    if (editableSearch) {
      if (!isCollapsed) searchInput.current?.focus()
    } else {
      search?.onClick?.()
    }
  }, [editableSearch, isCollapsed, handleToggle, search?.onClick])

  useEffect(() => {
    if (!isCollapsed && focusSearchOnExpand.current) {
      focusSearchOnExpand.current = false
      searchInput.current?.focus()
    }
  }, [isCollapsed])

  useEffect(() => {
    if (!searchEnabled || !searchShortcut) return

    const handleSearchKeyDown = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.isComposing || e.repeat || e.metaKey || e.ctrlKey || e.altKey || e.key !== searchShortcut) return
      const target = e.target
      if (target instanceof HTMLElement && (target.isContentEditable || target.closest('input, textarea, select, [contenteditable]:not([contenteditable="false"]), [role="textbox"]'))) return
      e.preventDefault()
      activateSearch()
    }

    window.addEventListener('keydown', handleSearchKeyDown)
    return () => window.removeEventListener('keydown', handleSearchKeyDown)
  }, [searchEnabled, searchShortcut, activateSearch])

  useEffect(() => {
    if (!enableShortcut) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'b') {
        e.preventDefault()
        handleToggle()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [enableShortcut, handleToggle])

  const renderBrand = () => {
    if (!brand) return null
    const Component = brand.as || (brand.to || brand.href ? 'a' : 'div')
    const props: Record<string, unknown> = {
      className: 'brand',
      onClick: (e: React.MouseEvent) => {
        if (brand.onClick) {
          if (!brand.to && (!brand.href || brand.href === '#')) {
            e.preventDefault()
          }
          brand.onClick(e)
        }
      },
    }
    if (brand.href) props.href = brand.href
    if (brand.to) props.to = brand.to

    return (
      <Component {...props}>
        {brand.logo && <span className="brand-logo">{brand.logo}</span>}
        <span className="brand-name">{brand.title}</span>
      </Component>
    )
  }

  const renderBottom = () => {
    if (bottom) return bottom

    if (footer) {
      const footerOptions = typeof footer === 'object' ? footer : {}
      const to = footerOptions.to ?? (footerOptions.href ? undefined : '/settings')
      const label = footerOptions.label ?? 'Ajustes'
      const icon = footerOptions.icon ?? <Settings size={14} />

      return (
        <>
          <NavItem
            as={footerOptions.as || (to || footerOptions.href ? 'a' : 'button')}
            to={to}
            href={footerOptions.href}
            icon={icon}
            label={label}
            active={footerOptions.active}
            onClick={footerOptions.onClick}
            style={{ flex: 1 }}
          />
          {footerOptions.themeToggle !== false && (
            React.isValidElement(footerOptions.themeToggle) ? (
              footerOptions.themeToggle
            ) : (
              <ThemeToggle storageKey={footerOptions.themeStorageKey} />
            )
          )}
          {footerOptions.extra}
        </>
      )
    }

    return null
  }

  return (
    <aside className={['sidebar', isCollapsed ? 'is-collapsed' : '', className].filter(Boolean).join(' ')}>
      <div className="sidebar-top">
        <div className="brand-row">
          {renderBrand()}

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <button
              type="button"
              className="btn ghost sm icon collapse-btn"
              title={isCollapsed ? 'Expandir barra lateral (⌘B / Ctrl+B)' : 'Plegar barra lateral (⌘B / Ctrl+B)'}
              aria-label={isCollapsed ? 'Expandir barra lateral' : 'Plegar barra lateral'}
              aria-expanded={!isCollapsed}
              onClick={handleToggle}
            >
              <PanelLeft size={16} />
            </button>

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

        {search && (
          <div className="sidebar-actions">
            {editableSearch ? (
              <label className="search-box">
                <SearchIcon size={14} aria-hidden="true" />
                <input
                  ref={searchInput}
                  type="search"
                  aria-label={search.title || search.placeholder || 'Buscar'}
                  placeholder={search.placeholder || 'Buscar'}
                  value={search.value}
                  onChange={(e) => search.onChange?.(e.target.value)}
                />
                {searchShortcut && <kbd className="kbd" aria-hidden="true">{searchShortcut}</kbd>}
              </label>
            ) : (
              <button
                type="button"
                className="search-box"
                onClick={search.onClick}
                title={search.title}
                disabled={!search.onClick}
              >
                <SearchIcon size={14} aria-hidden="true" />
                <span>{search.placeholder || 'Buscar'}</span>
                {searchShortcut && <kbd className="kbd" aria-hidden="true">{searchShortcut}</kbd>}
              </button>
            )}
            <button
              type="button"
              className="btn ghost sm icon collapsed-only"
              title={search.title || (searchShortcut ? `Buscar (${searchShortcut})` : 'Buscar')}
              aria-label={search.title || search.placeholder || 'Buscar'}
              disabled={!editableSearch && !search.onClick}
              onClick={activateSearch}
            >
              <SearchIcon size={14} />
            </button>
            {search.action}
          </div>
        )}

        {headerActions}
      </div>

      <nav className="sidebar-scroll" aria-label={ariaLabel}>
        {children}
      </nav>

      {(bottom || footer) && (
        <div className={['sidebar-bottom', bottomClassName].filter(Boolean).join(' ')}>
          {renderBottom()}
        </div>
      )}
    </aside>
  )
}

export interface SidebarBottomProps {
  className?: string
  children: React.ReactNode
}

export function SidebarBottom({ className = '', children }: SidebarBottomProps) {
  return <div className={['sidebar-bottom', 'row', className].filter(Boolean).join(' ')}>{children}</div>
}

export interface SidebarSectionProps {
  title?: React.ReactNode
  action?: React.ReactNode
  children: React.ReactNode
  className?: string
}

export function SidebarSection({ title, action, children, className = '' }: SidebarSectionProps) {
  return (
    <div className={['sidebar-section', className].filter(Boolean).join(' ')}>
      {(title || action) && (
        <div className="sidebar-heading">
          {title && <span>{title}</span>}
          {action}
        </div>
      )}
      {children}
    </div>
  )
}
