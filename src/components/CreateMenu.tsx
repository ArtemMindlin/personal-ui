import { useEffect, useRef, useState } from 'react'
import { Plus } from 'lucide-react'
import type { ReactNode } from 'react'

export interface CreateMenuItem {
  id: string
  label: string
  icon?: ReactNode
  onSelect: () => void
}

export interface CreateMenuProps {
  items: CreateMenuItem[]
  label?: string
}

export function CreateMenu({ items, label = 'Crear' }: CreateMenuProps) {
  const [open, setOpen] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const menu = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const outside = (event: PointerEvent) => { if (!root.current?.contains(event.target as Node)) setOpen(false) }
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); setOpen(false); trigger.current?.focus() }
    }
    document.addEventListener('pointerdown', outside)
    document.addEventListener('keydown', escape, true)
    return () => { document.removeEventListener('pointerdown', outside); document.removeEventListener('keydown', escape, true) }
  }, [open])

  function moveFocus(event: React.KeyboardEvent) {
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return
    const buttons = Array.from(menu.current?.querySelectorAll<HTMLButtonElement>('button:not(:disabled)') ?? [])
    if (!buttons.length) return
    event.preventDefault()
    const index = buttons.indexOf(document.activeElement as HTMLButtonElement)
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? buttons.length - 1 : event.key === 'ArrowDown' ? (index + 1) % buttons.length : (index <= 0 ? buttons.length - 1 : index - 1)
    buttons[next]?.focus()
  }

  return <div className="create-menu" ref={root}>
    <button ref={trigger} type="button" className="btn sm icon create-menu-trigger" title={label} aria-label={label} aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen(value => !value)} onKeyDown={event => { if (event.key === 'ArrowDown') { event.preventDefault(); setOpen(true); requestAnimationFrame(() => menu.current?.querySelector('button')?.focus()) } }}><Plus size={16} aria-hidden="true" /></button>
    {open && <div ref={menu} className="create-menu-popup" role="menu" aria-label={label} onKeyDown={moveFocus}>
      {items.map(item => <button key={item.id} type="button" role="menuitem" onClick={() => { setOpen(false); item.onSelect() }}>{item.icon && <span aria-hidden="true">{item.icon}</span>}<span>{item.label}</span></button>)}
    </div>}
  </div>
}
