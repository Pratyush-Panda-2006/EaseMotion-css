# React Component: Interactive Command Palette (Kbar Style) - Phase #735

1. **What does this do?**  
   It renders a modular, copy-paste ready React component for an **Interactive Command Palette (Kbar Style)** styled with smooth backdrop blur overlays, nested submenus support, global shortcut triggers, and customizable styling options.

2. **How is it used?**  
   Import [CommandPalette.jsx](./CommandPalette.jsx) into your React application and pass an actions list array containing execution callbacks. Hitting `Ctrl+K` or `Cmd+K` toggles the palette.
   
3. **Why is it useful?**  
   It delivers zero-dependency keyboard accessible search lists, fuzzy text matching keyword filters, nested children action stacks, and customizable color themes.

---

## 📦 Installation

Copy [CommandPalette.jsx](./CommandPalette.jsx) and [style.css](./style.css) into your component directory. Import the component and style inside your React entry point:

```javascript
import CommandPalette from './CommandPalette';
import './style.css';
```

---

## 🚀 Usage Example

```jsx
import React, { useState } from 'react';
import CommandPalette from './CommandPalette';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    {
      id: 'home',
      name: 'Go to Dashboard',
      shortcut: ['h'],
      keywords: ['dashboard', 'home', 'main'],
      section: 'Navigation',
      perform: () => console.log('Navigating to Dashboard...'),
      icon: '🏠'
    },
    {
      id: 'theme',
      name: 'Change Theme...',
      shortcut: ['t'],
      keywords: ['dark', 'light', 'glass', 'color'],
      section: 'Preferences',
      icon: '🎨',
      children: [
        {
          id: 'theme-dark',
          name: 'Dark Mode',
          keywords: ['dark', 'night'],
          perform: () => console.log('Dark theme activated'),
          icon: '🌙'
        },
        {
          id: 'theme-light',
          name: 'Light Mode',
          keywords: ['light', 'day'],
          perform: () => console.log('Light theme activated'),
          icon: '☀️'
        }
      ]
    }
  ];

  return (
    <div style={{ padding: '3rem', color: '#fff' }}>
      <h1>Interactive Command Palette Showcase</h1>
      <button onClick={() => setIsOpen(true)}>Open Palette (Ctrl + K)</button>
      
      <CommandPalette 
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        actions={actions}
        theme="glass"
      />
    </div>
  );
}
```

---

## ⚙5 Props Specifications

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `actions` | `array` | *Required* | Array of structured action objects (id, name, shortcut, keywords, section, perform, children, icon). |
| `isOpen` | `boolean` | `undefined` | Controlled toggle state. If not provided, toggles globally on `Ctrl+K`. |
| `onClose` | `function`| `undefined` | Callback when palette closes. |
| `placeholder` | `string` | `'Type a command...'` | Input placeholder text. |
| `theme` | `string` | `'glass'` | Theme styling: `'glass' \| 'dark' \| 'light'`. |
| `accentColor` | `string` | `'#06b6d4'` | Highlight styling theme color. |
| `enableRecentCommands` | `boolean` | `true` | Prepend recently selected commands at the top. |
| `maxRecentCommands` | `number` | `5` | Capacity of recent actions list. |

---

## 🎨 Design and Layout Features

### 1. Radial Cursor Spotlight
The palette contains a mouse-movement spotlight tracking layout using CSS custom variables `--mouse-x` and `--mouse-y` dynamically set on hover:
```css
backgroundImage: radial-gradient(circle 120px at var(--mouse-x, 0) var(--mouse-y, 0), ...)
```

### 2. Micro-Animations
The backdrop utilizes a soft fade transition, while the dialog box slides and scales into position, ensuring a professional, premium interface matching modern command interfaces:
- Overlay transition timing: `0.2s`
- Dialog entry curve: `cubic-bezier(0.16, 1, 0.3, 1)`
