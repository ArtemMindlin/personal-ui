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

## Development

```bash
npm install
npm run build
```
