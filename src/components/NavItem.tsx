import type React from 'react'

export interface NavItemProps {
  label: React.ReactNode
  icon?: React.ReactNode
  badge?: React.ReactNode
  active?: boolean
  onClick?: (e: React.MouseEvent) => void
  href?: string
  to?: string
  as?: React.ElementType
  className?: string
  title?: string
  children?: React.ReactNode
}

export function NavItem({
  label,
  icon,
  badge,
  active,
  onClick,
  href,
  to,
  as: Component = href ? 'a' : 'button',
  className = '',
  title,
  children,
  ...rest
}: NavItemProps) {
  const classes = ['nav-item', active ? 'active' : '', className].filter(Boolean).join(' ')

  const props: Record<string, unknown> = {
    className: classes,
    onClick,
    title,
    ...rest,
  }

  if (href) props.href = href
  if (to) props.to = to

  return (
    <Component {...props}>
      {icon && <span className="icon">{icon}</span>}
      <span className="label">{label}</span>
      {badge && <span className="badge">{badge}</span>}
      {children}
    </Component>
  )
}
