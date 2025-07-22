import { Metadata } from 'next'
import { TermsOfService } from '@/components/legal/terms-of-service'

export const metadata: Metadata = {
  title: 'Terms of Service | YogaTransform',
  description: 'Read the terms and conditions for using YogaTransform services. Understand your rights, responsibilities, and our service policies.',
  robots: 'index, follow',
  openGraph: {
    title: 'Terms of Service | YogaTransform',
    description: 'Terms and conditions for using YogaTransform yoga transformation program.',
    type: 'website',
  },
}

export default function TermsOfServicePage() {
  return <TermsOfService />
}