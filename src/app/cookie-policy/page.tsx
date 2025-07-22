import { Metadata } from 'next'
import { CookiePolicy } from '@/components/legal/cookie-policy'

export const metadata: Metadata = {
  title: 'Cookie Policy | YogaTransform',
  description: 'Understand how YogaTransform uses cookies and similar technologies. Learn about cookie types, management options, and your privacy choices.',
  robots: 'index, follow',
  openGraph: {
    title: 'Cookie Policy | YogaTransform',
    description: 'Learn about how YogaTransform uses cookies and how to manage your cookie preferences.',
    type: 'website',
  },
}

export default function CookiePolicyPage() {
  return <CookiePolicy />
}