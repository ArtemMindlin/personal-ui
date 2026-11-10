import { useEffect, useId, useRef, useState } from 'react'

export interface CommandPaletteItem {
  id: string
  label: string
  description?: string
  keywords?: string
  icon?: React.ReactNode
  onSelect: () => void
}

export interface CommandPaletteProps {
  open: boolean
  onClose: () => void
  items: CommandPaletteItem[]
  placeholder?: string
  label?: string
  emptyMessage?: string
  onQueryChange?: (query: string) => void
  filterItems?: boolean
}

const normalize = (value: string) => value.trim().toLocaleLowerCase('es').normalize('NFD').replace(/[\u0300-\u036f]/g, '')

export function CommandPalette({ open, onClose, items, placeholder = 'Buscar comandos…', label = 'Búsqueda rápida', emptyMessage = 'No hay resultados.', onQueryChange, filterItems = true }: CommandPaletteProps) {
  const dialog = useRef<HTMLDialogElement>(null)
  const input = useRef<HTMLInputElement>(null)
  const listId = useId()
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const needle = normalize(query)
  const results = filterItems ? items.filter(item => normalize(`${item.label} ${item.description ?? ''} ${item.keywords ?? ''}`).includes(needle)) : items
  const current = Math.min(selected, results.length - 1)

  useEffect(() => {
    const element = dialog.current
    if (!element) return
    if (open && !element.open) {
      setQuery('')
      onQueryChange?.('')
      setSelected(0)
      element.showModal()
      input.current?.focus()
    } else if (!open && element.open) element.close()
  }, [open])

  useEffect(() => {
    if (current >= 0) document.getElementById(`${listId}-${current}`)?.scrollIntoView?.({ block: 'nearest' })
  }, [current, listId])

  const select = (item: CommandPaletteItem) => {
    onClose()
    item.onSelect()
  }

  return <dialog ref={dialog} className="command-palette" aria-label={label} onCancel={(event) => { event.preventDefault(); onClose() }} onClick={(event) => { if (event.target === dialog.current) onClose() }}>
    <input ref={input} type="search" role="combobox" aria-label={label} aria-expanded="true" aria-controls={listId} aria-activedescendant={current >= 0 ? `${listId}-${current}` : undefined} placeholder={placeholder} value={query} onChange={(event) => { setQuery(event.target.value); onQueryChange?.(event.target.value); setSelected(0) }} onKeyDown={(event) => {
      if (event.key === 'ArrowDown' && results.length) { event.preventDefault(); setSelected((current + 1) % results.length) }
      if (event.key === 'ArrowUp' && results.length) { event.preventDefault(); setSelected((current + results.length - 1) % results.length) }
      if (event.key === 'Enter' && current >= 0) { event.preventDefault(); select(results[current]) }
    }} />
    <div id={listId} role="listbox" aria-label="Resultados" className="command-palette-results">
      {results.map((item, index) => <div id={`${listId}-${index}`} key={item.id} role="option" aria-selected={index === current} className="command-palette-result" onMouseEnter={() => setSelected(index)} onClick={() => select(item)}>
        {item.icon && <span className="command-palette-icon">{item.icon}</span>}
        <span><span className="command-palette-title">{item.label}</span>{item.description && <span className="command-palette-description">{item.description}</span>}</span>
      </div>)}
      {!results.length && <p className="command-palette-empty" role="status">{emptyMessage}</p>}
    </div>
  </dialog>
}
