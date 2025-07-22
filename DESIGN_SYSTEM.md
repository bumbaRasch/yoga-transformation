# Design System - Yoga Transformation App

## Layout & Spacing

### Section Spacing
- **Standard Section**: `py-20` (5rem top/bottom padding)
- **CTA Sections**: `py-16` to `py-20` depending on content density
- **Container**: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`

### Grid System
- **Main Grids**: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`
- **Stats/Features**: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4`
- **Two Column**: `grid grid-cols-1 lg:grid-cols-2 gap-12`

## Card Components

### Standard Card Base
```tsx
className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
```

### Card Variations
- **Featured Cards**: Add `ring-2 ring-purple-500 ring-opacity-50`
- **Interactive Cards**: Add `cursor-pointer` and hover effects
- **Minimum Height**: Use `min-h-[320px]` for consistent card heights when needed

## Button System

### Button Variants (from button.tsx)
- **Primary**: `default` - Purple-pink gradient
- **Secondary**: `secondary` - Gray background
- **Outline**: `outline` - Purple border
- **Ghost**: `ghost` - No background
- **Link**: `link` - Text with underline

### Button Sizes
- **Small**: `sm` - `h-10 px-4 py-2`
- **Default**: `default` - `h-12 px-6 py-3`
- **Large**: `lg` - `h-14 px-8 py-4 text-base`
- **Extra Large**: `xl` - `h-16 px-10 py-5 text-lg`
- **Icon**: `icon` - `h-12 w-12`

### Button Usage Guidelines
- Use `size="lg"` for primary CTAs
- Use `size="xl"` for hero and major action buttons
- Include meaningful icons when appropriate
- Maintain `min-w-48` or similar for consistent button widths

## Color Palette

### Primary Colors
- **Purple**: `purple-600` to `purple-700`
- **Pink**: `pink-600` to `pink-700`
- **Gradients**: `from-purple-600 to-pink-600`

### Secondary Colors
- **Green**: Success states, achievements
- **Orange/Red**: Urgency, warnings
- **Blue**: Information, stats
- **Gray**: Neutral content

### Background Patterns
- **White Sections**: `bg-white dark:bg-gray-900`
- **Gray Sections**: `bg-gray-50 dark:bg-gray-900`
- **Gradient Sections**: Various themed gradients

## Typography

### Headings
- **Section Title**: `text-3xl sm:text-4xl font-bold`
- **Card Title**: `text-xl font-semibold`
- **Subtitle**: `text-lg text-gray-600 dark:text-gray-300`

### Content Text
- **Body**: `text-gray-600 dark:text-gray-300`
- **Small Text**: `text-sm text-gray-500 dark:text-gray-400`
- **Emphasis**: `font-medium` or `font-semibold`

## Animation Standards

### Motion Variants
- **Initial**: `{ opacity: 0, y: 20 }`
- **Animate**: `{ opacity: 1, y: 0 }`
- **Transition**: `{ duration: 0.6 }`
- **Delays**: Stagger by `0.1` to `0.2` seconds

### Hover Effects
- **Cards**: `whileHover={{ y: -4 }}`
- **Buttons**: `whileHover={{ scale: 1.05 }}`
- **Icons**: `whileHover={{ scale: 1.1 }}`

## Component Patterns

### Section Header Pattern
```tsx
<motion.div
  className="text-center mb-12"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
    {title}
  </h2>
  <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
    {subtitle}
  </p>
</motion.div>
```

### Badge Pattern
```tsx
<div className="inline-block px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-4">
  <span className="text-purple-600 dark:text-purple-400 text-sm font-medium">
    {badge}
  </span>
</div>
```

### Stats Card Pattern
```tsx
<div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
  <div className="text-2xl font-bold text-purple-600">{value}</div>
  <div className="text-sm text-gray-600 dark:text-gray-400">{label}</div>
</div>
```

## Accessibility

### Focus States
- Use `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2`
- Ring colors should match component theme
- Maintain sufficient contrast ratios

### Semantic HTML
- Use proper heading hierarchy (h1, h2, h3...)
- Include `aria-label` and `aria-describedby` where needed
- Use `role` attributes for complex components

### Keyboard Navigation
- All interactive elements must be keyboard accessible
- Logical tab order
- Proper focus management for modals and dropdowns

## Image Optimization

### Responsive Images
- Use `OptimizedImage` component
- Provide AVIF, WebP, and PNG fallbacks
- Include proper `sizes` attribute
- Use `loading="lazy"` for below-fold images

### Image Sizes
- Hero images: Multiple breakpoints from 480w to 2560w
- Component images: 256w, 400w, 600w, 800w
- Icons: Use Lucide React icons when possible

This design system ensures consistent appearance and behavior across all components while maintaining accessibility and performance standards.