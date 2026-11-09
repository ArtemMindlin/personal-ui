import React, { useState } from 'react'
import { MobileBar, type MobileBarProps } from './MobileBar'

export interface ShellProps {
  sidebar: React.ReactNode | ((props: { onClose: () => void }) => React.ReactNode)
  mobileBar?: Partial<MobileBarProps> | React.ReactNode
  children: React.ReactNode
  className?: string
  defaultNavOpen?: boolean
}

export function Shell({
  sidebar,
  mobileBar,
  children,
  className = '',
  defaultNavOpen = false,
}: ShellProps) {
  const [navOpen, setNavOpen] = useState(defaultNavOpen)

  const closeNav = () => setNavOpen(false)
  const toggleNav = () => setNavOpen((v) => !v)

  const renderedSidebar = typeof sidebar === 'function' ? sidebar({ onClose: closeNav }) : sidebar

  return (
    <div className={['app', navOpen ? 'nav-open' : '', className].filter(Boolean).join(' ')}>
      {renderedSidebar}

      <div className="scrim" onClick={closeNav} />

      <div className="main">
        {React.isValidElement(mobileBar) ? (
          mobileBar
        ) : mobileBar ? (
          <MobileBar
            title={(mobileBar as MobileBarProps).title || ''}
            logo={(mobileBar as MobileBarProps).logo}
            actions={(mobileBar as MobileBarProps).actions}
            onToggleNav={toggleNav}
          />
        ) : null}

        {children}
      </div>
    </div>
  )
}
