import { Metadata } from 'next'
import { RefundPolicy } from '@/components/legal/refund-policy'

export const metadata: Metadata = {
  title: 'Refund Policy | YogaTransform',
  description: 'Learn about YogaTransform refund policy, including eligibility criteria, timelines, and how to request a refund for our yoga programs.',
  robots: 'index, follow',
  openGraph: {
    title: 'Refund Policy | YogaTransform',
    description: 'Understanding refunds, guarantees, and our commitment to customer satisfaction.',
    type: 'website',
  },
}

export default function RefundPolicyPage() {
  return <RefundPolicy />
}