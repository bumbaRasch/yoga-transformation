'use client'

import { ErrorBoundary } from '@/components/ui/error-boundary'

interface SkipToContentProps {
  className?: string
}

const skipLinks = [
  { href: '#main-content', label: 'Skip to main content' },
  { href: '#benefits', label: 'Skip to benefits' },
  { href: '#timeline', label: 'Skip to your journey' },
  { href: '#testimonials', label: 'Skip to reviews' },
  { href: '#pricing', label: 'Skip to pricing' }
] as const

function SkipToContentLinks({ className }: SkipToContentProps) {
  const handleSkipClick = (href: string) => {
    const element = document.getElementById(href.substring(1))
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      element.focus({ preventScroll: true })
    }
  }

  return (
    <div className={`skip-to-content ${className || ''}`}>
      <div className="sr-only focus-within:not-sr-only focus-within:fixed focus-within:top-0 focus-within:left-0 focus-within:z-[9999] focus-within:bg-white focus-within:border focus-within:border-gray-300 focus-within:p-2 focus-within:shadow-lg">
        <nav aria-label="Skip navigation links">
          <ul className="list-none space-y-1">
            {skipLinks.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleSkipClick(link.href)}
                  className="block px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded hover:bg-gray-50 hover:border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      handleSkipClick(link.href)
                    }
                  }}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  )
}

export function SkipToContent(props: SkipToContentProps) {
  return (
    <ErrorBoundary>
      <SkipToContentLinks {...props} />
    </ErrorBoundary>
  )
}