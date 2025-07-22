import { Metadata } from 'next'
import { PrivacyPolicy } from '@/components/legal/privacy-policy'

export const metadata: Metadata = {
  title: 'Privacy Policy | YogaTransform',
  description: 'Learn about how YogaTransform collects, uses, and protects your personal information. Our comprehensive privacy policy covers data collection, cookies, and your rights.',
  robots: 'index, follow',
  openGraph: {
    title: 'Privacy Policy | YogaTransform',
    description: 'Learn about how YogaTransform protects your privacy and personal information.',
    type: 'website',
  },
}

export default function PrivacyPolicyPage() {
  return <PrivacyPolicy />
}