# Noēma Design Specification

This document outlines the visual design language and UI/UX principles of Noēma.

## Design Philosophy

> "Clarity through simplicity. Insight through elegance."

Noēma's design embraces:
- **Minimalism**: Remove everything unnecessary
- **Natural aesthetics**: Colors and patterns from nature
- **Purposeful motion**: Animations that guide and inform
- **Sophisticated typography**: Fonts that convey intelligence and care
- **Generous whitespace**: Breathing room for focused thinking

## Color System

### Primary Palette: Sage

Inspired by forest canopies and natural growth.

```
sage-50:  #f6f7f6  (Lightest)
sage-100: #e3e5e3
sage-200: #c7cbc7
sage-300: #a3aaa3
sage-400: #7d867d
sage-500: #5f6b5f  ← Primary brand color
sage-600: #4a564a
sage-700: #3d463d  ← Primary buttons, themes
sage-800: #333933
sage-900: #2b302b  (Darkest)
```

**Usage:**
- `sage-700`: Primary actions, theme nodes, accents
- `sage-50`: Subtle backgrounds, tags
- `sage-600`: Borders, dividers

### Neutral Palette: Stone

Warm, natural grays inspired by river stones and earth.

```
stone-50:  #fafaf9  ← Page background
stone-100: #f5f5f4
stone-200: #e7e5e4  ← Borders
stone-300: #d6d3d1
stone-400: #a8a29e
stone-500: #78716c
stone-600: #57534e  ← Secondary text
stone-700: #44403c
stone-800: #292524  ← Primary text
stone-900: #1c1917  (Darkest)
```

**Usage:**
- `stone-50`: Main background
- `stone-800`: Primary text
- `stone-600`: Secondary text
- `stone-200`: Card borders

### Semantic Colors

Used sparingly for specific purposes:

- **Success**: `green-600` (#16a34a)
- **Error**: `red-600` (#dc2626)
- **Warning**: `amber-600` (#d97706)
- **Info**: `blue-600` (#2563eb)

## Typography System

### Font Families

**1. Inter (Body & UI)**
```css
font-family: 'Inter', system-ui, sans-serif;
weights: 300 (light), 400 (regular), 500 (medium), 600 (semibold)
```
- Clean, highly readable
- Excellent at small sizes
- Professional appearance
- Used for: Body text, UI elements, buttons

**2. Playfair Display (Display & Headings)**
```css
font-family: 'Playfair Display', serif;
weights: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
```
- Elegant, sophisticated
- High contrast serifs
- Classical proportions
- Used for: App title, section headings

**3. JetBrains Mono (Code)**
```css
font-family: 'JetBrains Mono', monospace;
weights: 400 (regular), 500 (medium)
```
- Excellent code readability
- Increased height for better legibility
- Used for: Code samples, technical details

### Type Scale

```
text-xs:   0.75rem (12px)  - Captions, labels
text-sm:   0.875rem (14px) - Small body, metadata
text-base: 1rem (16px)     - Body text (default)
text-lg:   1.125rem (18px) - Emphasized body
text-xl:   1.25rem (20px)  - Small headings
text-2xl:  1.5rem (24px)   - Section headings
text-3xl:  1.875rem (30px) - Page headings
text-4xl:  2.25rem (36px)  - Display text
```

### Typography Usage

**App Title**
```
font: Playfair Display
size: 2xl (24px)
weight: 600 (semibold)
color: stone-800
```

**Section Headings**
```
font: Playfair Display
size: 2xl (24px)
weight: 600 (semibold)
color: stone-800
```

**Body Text**
```
font: Inter
size: base (16px)
weight: 300 (light)
color: stone-700
line-height: relaxed (1.625)
```

**Button Text**
```
font: Inter
size: base (16px)
weight: 500 (medium)
color: white (primary) / stone-700 (secondary)
```

## Component Styles

### Cards

```css
.card {
  background: white;
  backdrop-filter: blur(4px);
  border: 1px solid stone-200;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
  transition: box-shadow 200ms;
}

.card:hover {
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}
```

### Buttons

**Primary Button**
```css
background: sage-700
color: white
padding: 12px 24px
border-radius: 8px
font-weight: 500
shadow: sm
hover:background: sage-800
hover:shadow: md
transition: all 200ms
```

**Secondary Button**
```css
background: white
color: stone-700
padding: 12px 24px
border: 1px solid stone-300
border-radius: 8px
font-weight: 500
hover:background: stone-50
transition: all 200ms
```

### Input Fields

```css
background: white
border: 1px solid stone-300
border-radius: 8px
padding: 12px 16px
font-size: 16px
font-weight: 300
focus:border: transparent
focus:ring: 2px sage-500
transition: all 200ms
```

### Glass Panel Effect

Used for header and controls:

```css
background: rgba(255,255,255,0.8)
backdrop-filter: blur(4px)
border: 1px solid stone-200
box-shadow: 0 1px 2px rgba(0,0,0,0.05)
```

## Spacing System

Based on 4px increments (Tailwind default):

```
0:    0px
1:    4px
2:    8px
3:    12px
4:    16px
5:    20px
6:    24px   ← Standard padding
8:    32px
10:   40px
12:   48px
16:   64px
20:   80px
24:   96px
```

**Common Uses:**
- Card padding: `6` (24px)
- Section gaps: `4` to `6` (16-24px)
- Element spacing: `3` to `4` (12-16px)
- Page padding: `6` (24px)

## Border Radius

```
rounded-md:  6px  - Small elements
rounded-lg:  8px  - Buttons, inputs
rounded-xl:  12px - Cards
rounded-2xl: 16px - Large cards
rounded-full: 9999px - Pills, badges
```

## Shadows

Subtle and layered:

```
shadow-sm:  0 1px 2px rgba(0,0,0,0.05)   - Default cards
shadow:     0 1px 3px rgba(0,0,0,0.1)    - Slightly elevated
shadow-md:  0 4px 6px rgba(0,0,0,0.1)    - Hover states
shadow-lg:  0 10px 15px rgba(0,0,0,0.1)  - Modals, overlays
```

## Animation Principles

### Timing

```
duration-200: 200ms - Quick transitions (hover, active states)
duration-300: 300ms - Standard transitions (expand, collapse)
duration-400: 400ms - Slower transitions (page transitions)
```

### Easing

```
ease-out:     Fast start, slow end (entering)
ease-in-out:  Smooth both ends (attention)
ease-in:      Slow start, fast end (exiting)
```

### Custom Animations

**Fade In**
```css
@keyframes fadeIn {
  from { 
    opacity: 0; 
    transform: translateY(10px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
}

.animate-fade-in {
  animation: fadeIn 400ms ease-out;
}
```

**Gentle Pulse** (Loading states)
```css
@keyframes pulse-gentle {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.animate-pulse-gentle {
  animation: pulse-gentle 2s ease-in-out infinite;
}
```

## Layout Grid

### Containers

```
max-w-4xl: 896px  - Notes, inputs, insights
max-w-7xl: 1280px - Header, full-width sections
```

### Responsive Breakpoints

```
sm:  640px   (Mobile landscape)
md:  768px   (Tablet)
lg:  1024px  (Desktop)
xl:  1280px  (Large desktop)
2xl: 1536px  (Extra large)
```

## Mind Map Visualization

### Node Styles

**Theme Node**
```css
background: sage-700
border: 2px solid sage-800
color: white
min-width: 200px
padding: 16px 24px
border-radius: 8px
box-shadow: 0 4px 6px rgba(0,0,0,0.1)
```

**Note Node**
```css
background: white
border: 2px solid stone-200
color: stone-800
min-width: 180px
padding: 16px 24px
border-radius: 8px
box-shadow: 0 2px 4px rgba(0,0,0,0.05)
```

### Edge Styles

**Theme to Note**
```css
stroke: sage-700
stroke-width: 2px
arrow: closed, sage-700
```

**Theme to Theme** (Insights)
```css
stroke: sage-900
stroke-width: 3px
stroke-dasharray: 5 5
animated: true
```

## Icons

Using Lucide React for consistent, minimal icons:

- Size: 18-20px for UI elements
- Size: 24px for emphasis
- Stroke width: 2px
- Color: Match text color

**Common Icons:**
- `Brain`: Logo/branding
- `Plus`: Add action
- `Sparkles`: AI/insights
- `Trash2`: Delete
- `List`: List view
- `Network`: Mind map view
- `Lightbulb`: Insights
- `Tag`: Categories/themes

## Accessibility

### Color Contrast

All text meets WCAG AA standards:
- Large text (18pt+): 3:1 minimum
- Normal text: 4.5:1 minimum
- UI components: 3:1 minimum

### Focus States

```css
focus:outline-none
focus:ring-2
focus:ring-sage-500
focus:ring-offset-2
```

### Keyboard Navigation

- All interactive elements keyboard accessible
- Logical tab order
- Clear focus indicators
- Escape to cancel/close

## State Variations

### Default
- Full opacity
- Standard colors
- No shadows

### Hover
- Slightly elevated (shadow-md)
- Color shift (100 darker)
- Cursor: pointer

### Active/Pressed
- Slightly depressed (no shadow)
- Color shift (200 darker)
- Transform: scale(0.98)

### Disabled
- Opacity: 50%
- Cursor: not-allowed
- No hover effects

### Loading
- Gentle pulse animation
- Reduced opacity
- Disabled interactions

## Empty States

Clear, helpful messages:

```
Icon: Large, light-colored (stone-300)
Text: stone-400, font-light
Message: Concise, actionable
No overwhelming illustrations
```

## Error States

```
Background: red-50
Border: red-200
Text: red-700
Icon: AlertCircle (lucide)
Tone: Helpful, not alarming
```

## Responsive Design

### Mobile (<768px)
- Single column layout
- Full-width cards
- Simplified navigation
- Touch-friendly targets (min 44px)
- Reduced padding

### Tablet (768px-1024px)
- Two-column where appropriate
- Comfortable padding
- Full feature set

### Desktop (>1024px)
- Multi-column layouts
- Spacious padding
- Enhanced interactions
- Full mind map experience

## Brand Elements

### Logo
- Icon: Brain (Lucide)
- Container: 48x48px rounded square
- Background: sage-700
- Icon color: white

### App Name
- "Noēma" with macron over 'o'
- Playfair Display, semibold
- Always capitalized as shown

### Tagline
- "Discover connections in your thoughts"
- Inter, light (300)
- stone-500 color

---

This design system creates a cohesive, sophisticated experience that helps users focus on their thoughts while enjoying a beautiful, minimalist interface.
