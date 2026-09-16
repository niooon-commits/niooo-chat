---
name: material-symbols
description: Mandatory icon standard using Material Symbols (@expo/material-symbols) for all UI components and applications.
---

# Material Symbols Icon Standard (@expo/material-symbols)

Whenever you build, modify, or enhance an application in this workspace, **Material Symbols** is the designated icon library for all UI elements (navigation bars, action buttons, status badges, menu items, tabs, dialogs, and cards).

## Core Directives

1. **Default Icon Library**: For any application or component needing icons, prefer Material Symbols over any generic SVG or ad-hoc icon set.
2. **Library Standard**: The project has installed `@expo/material-symbols` (including CLI `add-material-symbols`) and configured high-performance web typography assets for Material Symbols (Outlined, Rounded, and Sharp).
3. **Consistency**: Keep icon style uniform across the application:
   - Default to `symbolStyle="outlined"` (or `material-symbols-outlined`) for clean, modern interfaces.
   - Use `fill={true}` for active/selected states (e.g., active tab, favorited item).
   - Use standard sizes: `16` (dense badges), `20` (inline buttons/menus), `24` (standard interactive controls/headers), `32`-`48` (hero highlights).

---

## 1. Web & React Usage Pattern

Use the universal component located at `src/components/MaterialSymbol.tsx`:

```tsx
import { MaterialSymbol } from './components/MaterialSymbol';

// Basic usage
<MaterialSymbol name="home" />

// Sized and colored with Tailwind
<MaterialSymbol 
  name="search" 
  size={20} 
  className="text-gray-500 hover:text-blue-600 transition-colors" 
/>

// Filled state for active tab or favorite
<MaterialSymbol 
  name="favorite" 
  fill={true} 
  className="text-red-500" 
/>

// Rounded variant with customized weight
<MaterialSymbol 
  name="settings" 
  symbolStyle="rounded" 
  weight={500} 
  size={24} 
/>
```

Or using native HTML/Tailwind classes:
```tsx
<span className="material-symbols-outlined text-xl text-indigo-600">
  rocket_launch
</span>
```

---

## 2. Expo / Mobile Usage Pattern (@expo/material-symbols)

In Expo or React Native mobile projects:

```tsx
import { Host, Icon } from "@expo/ui/jetpack-compose";
import Star from "@expo/material-symbols/star.xml";
import Home from "@expo/material-symbols/home.xml";

<Host matchContents>
  <Icon source={Star} size={32} tint="#007AFF" />
</Host>
```

To fetch specific custom weights, fills, or styles from the CLI:
```bash
npx add-material-symbols home search settings
npx add-material-symbols --style rounded star favorite
```

---

## 3. Common Material Symbol Names Reference

| Category | Recommended Symbol Names |
| :--- | :--- |
| **Navigation** | `home`, `arrow_back`, `arrow_forward`, `menu`, `close`, `more_vert`, `more_horiz`, `expand_more`, `chevron_right` |
| **Actions** | `search`, `add`, `edit`, `delete`, `refresh`, `share`, `download`, `upload`, `send`, `check`, `done`, `close` |
| **Media & Audio** | `play_arrow`, `pause`, `stop`, `volume_up`, `volume_off`, `mic`, `videocam`, `image`, `movie` |
| **Status & Alerts** | `check_circle`, `error`, `warning`, `info`, `help`, `notifications`, `verified`, `lock`, `visibility` |
| **Social & User** | `person`, `group`, `account_circle`, `favorite`, `thumb_up`, `chat`, `forum`, `mail` |
| **Ecommerce & Utilities** | `shopping_cart`, `shopping_bag`, `credit_card`, `receipt`, `dashboard`, `settings`, `tune`, `filter_list` |
