# personal-ui

Shared design system, tokens, and shell layout components for Artem's personal web apps (Mocha, Homebax, Gracy, Savia, Afort, Fira, Endal).

## Installation

```bash
npm install github:ArtemMindlin/personal-ui
```

Or reference a specific version / tag:
```bash
npm install github:ArtemMindlin/personal-ui#v0.1.0
```

## Usage

### 1. CSS Only

Import the full stylesheet (tokens, shell layout, buttons, inputs, badges):
```css
@import 'personal-ui/styles.css';
```

Or import modular parts:
```css
@import 'personal-ui/tokens.css';
@import 'personal-ui/shell.css';
@import 'personal-ui/components.css';
```

### 2. React Components

```tsx
import 'personal-ui/styles.css'
import { Shell, Sidebar, NavItem, ThemeToggle, MobileBar } from 'personal-ui'
import { Home, Layers } from 'lucide-react'

export function App() {
  return (
    <Shell
      mobileBar={{
        title: 'Mi App',
      }}
      sidebar={({ onClose }) => (
        <Sidebar
          brand={{ title: 'Mi App' }}
          onClose={onClose}
          bottom={
            <div className="row" style={{ width: '100%' }}>
              <ThemeToggle />
            </div>
          }
        >
          <NavItem href="/" icon={<Home size={18} />} label="Inicio" active />
          <NavItem href="/items" icon={<Layers size={18} />} label="Elementos" />
        </Sidebar>
      )}
    >
      <main className="content">
        {/* Your app views */}
      </main>
    </Shell>
  )
}
```

## Theme support

Includes light and dark modes with persistent system / light / dark switching via:

```tsx
import { useTheme, ThemeToggle } from 'personal-ui'

const { theme, isDark, setTheme, cycleTheme } = useTheme('my-app.theme')
```

## Development

```bash
npm install
npm run build
```
