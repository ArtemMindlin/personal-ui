# personal-ui

Shared design system, tokens, and shell layout components for Artem's personal web apps (Mocha, Homebax, Gracy, Savia, Afort, Fira, Endal).

## Installation

```bash
npm install github:ArtemMindlin/personal-ui#v0.2.5
```

## Usage

### 1. CSS

Import the complete stylesheet:
```css
@import 'personal-ui/styles.css';
```

### 2. Fully Typed Sidebar & Shell Components

Always import `<Sidebar>`, `<NavItem>`, `<ThemeToggle>` and shell components directly from `personal-ui` instead of constructing custom sidebar HTML:

```tsx
import { Sidebar, NavItem, ThemeToggle, SidebarBottom, SidebarSection } from 'personal-ui'
import { LayoutDashboard, ListChecks, Settings } from 'lucide-react'
import { NavLink, Link } from 'react-router-dom'

export function AppSidebar({ navOpen, setNavOpen }: { navOpen: boolean; setNavOpen: (v: boolean) => void }) {
  return (
    <Sidebar
      brand={{
        logo: <Logo />,
        title: 'Mi App',
        as: Link,
        to: '/',
        onClick: () => setNavOpen(false),
      }}
      storageKey="miapp.sidebar-collapsed"
      enableShortcut={true} // ⌘B / Ctrl+B toggle
      onClose={() => setNavOpen(false)} // mobile drawer close (auto hidden on desktop via CSS)
      search={{
        placeholder: 'Buscar',
        shortcut: '/',
        onClick: () => openPalette(),
      }}
      bottom={
        <>
          <NavItem
            as={NavLink}
            to="/settings"
            icon={<Settings size={14} />}
            label="Ajustes"
            style={{ flex: 1 }}
            onClick={() => setNavOpen(false)}
          />
          <ThemeToggle storageKey="miapp.theme" />
        </>
      }
    >
      <NavItem
        as={NavLink}
        to="/"
        end
        icon={<LayoutDashboard size={14} />}
        label="Inicio"
        onClick={() => setNavOpen(false)}
      />
      <NavItem
        as={NavLink}
        to="/items"
        icon={<ListChecks size={14} />}
        label="Lista"
        badge={12}
        onClick={() => setNavOpen(false)}
      />
    </Sidebar>
  )
}
```

### Unified Sidebar Rules
1. **Never copy-paste raw `<aside className="sidebar">` HTML**. Always use `<Sidebar>` from `personal-ui`.
2. **Close button (`X`) is strictly for mobile drawers**. It is rendered automatically when `onClose` is passed and has `display: none !important` on desktop (`> 800px`).
3. **Bottom row (`.sidebar-bottom.row`)**:
   - Left: Navigation link or trigger (e.g. Ajustes, Perfil, Cuenta) taking `flex: 1`.
   - Right: Icon-only theme toggle (`<ThemeToggle />`).
   - Automatically collapses into icon stack in collapsed mode (`is-collapsed`).
4. **Keyboard shortcut**: `⌘B` / `Ctrl+B` is built into `<Sidebar>` out of the box.

### Sidebar quick search

Pass `search.onChange` to render an editable search field. The app owns the query and decides what to filter (sections, products, or other results):

```tsx
const [query, setQuery] = useState('')
const normalizedQuery = query.trim().toLocaleLowerCase('es')

<Sidebar
  brand={{ title: 'Gracy' }}
  search={{
    placeholder: 'Buscar',
    title: 'Buscar secciones',
    value: query,
    onChange: setQuery,
  }}
>
  {sections
    .filter((section) => section.label.toLocaleLowerCase('es').includes(normalizedQuery))
    .map((section) => <NavItem key={section.to} {...section} />)}
</Sidebar>
```

The `/` shortcut focuses the field and expands a collapsed sidebar. It ignores typing in form fields, editable content, modifier keys, and events already handled by the app. Set `search.shortcut` to another single key or `false` to disable it. With a controlled `collapsed` prop, provide `onToggleCollapse` so the search can expand the sidebar.

For a command palette or search dialog, pass `search.onClick` without `onChange`. This renders a native button with Enter/Space support; `/` invokes the same callback. `search.action` accepts an optional adjacent action, such as a create button. Search is opt-in: consuming apps must pass `search` to show it.

## Development

```bash
npm install
npm run build
```

### Command palette

Use `CommandPalette` as the standard search dialog. Pass an `open` state, `onClose`, and an array of `{ id, label, description?, keywords?, icon?, onSelect }` items. Pair it with `Sidebar`'s `search={{ onClick: () => setOpen(true) }}` to open it from the sidebar or `/`. The palette filters supplied items, supports arrow keys, Enter and Escape, and uses the shared modal styling. Apps own their results and actions.
