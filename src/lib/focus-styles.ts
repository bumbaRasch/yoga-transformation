// Focus indicator utilities for accessibility
export const focusStyles = {
  // Primary focus ring for interactive elements
  primary: 'focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800',
  
  // Subtle focus ring for cards and containers
  card: 'focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-offset-1 focus:ring-offset-white dark:focus:ring-offset-gray-800',
  
  // Strong focus for call-to-action elements
  cta: 'focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800',
  
  // Focus for form elements
  input: 'focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500',
  
  // Skip links focus
  skip: 'focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500'
} as const

export const focusVisibleStyles = {
  // Focus-visible for better mouse/keyboard UX
  primary: 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2',
  card: 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-300 focus-visible:ring-offset-1',
  cta: 'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-purple-500 focus-visible:ring-offset-2'
} as const

// Helper function to combine focus styles
export const getFocusClasses = (
  type: keyof typeof focusStyles = 'primary',
  additional: string = ''
): string => {
  return `${focusStyles[type]} ${additional}`.trim()
}

// Helper for focus-visible (modern browsers)
export const getFocusVisibleClasses = (
  type: keyof typeof focusVisibleStyles = 'primary',
  additional: string = ''
): string => {
  return `${focusVisibleStyles[type]} ${additional}`.trim()
}