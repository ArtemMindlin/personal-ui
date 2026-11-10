import type React from 'react'

export interface NavItemProps {
  label: React.ReactNode
  icon?: React.ReactNode
  twisty?: React.ReactNode
  badge?: React.ReactNode
  active?: boolean
  onClick?: (e: React.MouseEvent) => void
  href?: string
  to?: string
  as?: React.ElementType
  className?: string
  title?: string
  style?: React.CSSProperties
  children?: React.ReactNode
  [key: string]: unknown
}

export function NavItem({
  label,
  icon,
  twisty,
  badge,
  active,
  onClick,
  href,
  to,
  as: Component = href || to ? 'a' : 'button',
  className = '',
  title,
  style,
  children,
  ...rest
}: NavItemProps) {
  const classes = ['nav-item', active ? 'active' : '', className].filter(Boolean).join(' ')
  const iconNode = icon ?? twisty

  const props: Record<string, unknown> = {
    className: classes,
    onClick,
    title: title ?? (typeof label === 'string' ? label : undefined),
    style,
    ...rest,
  }

  if (href) props.href = href
  if (to) props.to = to

  return (
    <Component {...props}>
      {iconNode && <span className="twisty">{iconNode}</span>}
      <span className="label">{label}</span>
      {badge !== undefined && badge !== null && <span className="badge">{badge}</span>}
      {children}
    </Component>
  )
}
