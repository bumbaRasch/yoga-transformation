'use client'

import { ErrorBoundary } from '@/components/ui/error-boundary'
import { useTranslations } from '@/contexts/language-context'

interface SkipToContentProps {
  className?: string
}

const skipLinks = [
  { href: '#main-content', labelKey: 'accessibility.skipToContent' },
  { href: '#benefits', labelKey: 'accessibility.skipToBenefits' },
  { href: '#testimonials', labelKey: 'accessibility.skipToReviews' },
  { href: '#pricing', labelKey: 'accessibility.skipToPricing' }
] as const

function SkipToContentLinks({ className }: SkipToContentProps) {
  const t = useTranslations()
  const handleSkipClick = (href: string) => {
    const element = document.getElementById(href.substring(1))
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      element.focus({ preventScroll: true })
    }
  }

  return (
    <div className={`skip-to-content ${className || ''}`}>
      <div className="sr-only focus-within:not-sr-only focus-within:fixed focus-within:top-0 focus-within:left-0 focus-within:z-[9999] focus-within:bg-white dark:focus-within:bg-gray-900 focus-within:border focus-within:border-gray-300 dark:focus-within:border-gray-700 focus-within:p-2 focus-within:shadow-lg">
        <nav aria-label={t('accessibility.skipNavigation')}>
          <ul className="list-none space-y-1">
            {skipLinks.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleSkipClick(link.href)}
                  className="block px-3 py-2 text-sm font-medium text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-purple-300 dark:hover:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-purple-500 dark:focus:border-purple-400 transition-colors"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      handleSkipClick(link.href)
                    }
                  }}
                >
                  {t(link.labelKey)}
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