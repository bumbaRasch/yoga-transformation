export interface PricingPlan {
  id: string
  name: string
  description: string
  pricing: {
    monthly: {
      amount: number
      currency: string
      originalPrice?: number
    }
    annual: {
      amount: number
      currency: string
      originalPrice?: number
    }
  }
  badge?: string
  features: string[]
  popular?: boolean
  cta: string
  benefits: string[]
}

export const pricingPlans: ReadonlyArray<PricingPlan> = [
  {
    id: 'basic',
    name: 'Yoga Essentials',
    description: 'Perfect for beginners starting their yoga journey',
    pricing: {
      monthly: {
        amount: 29,
        currency: 'USD',
        originalPrice: 39
      },
      annual: {
        amount: 19,
        currency: 'USD',
        originalPrice: 29
      }
    },
    features: [
      '14-day progressive program',
      'HD video instructions',
      'Downloadable pose guides',
      'Basic breathing exercises',
      'Email support',
      'Mobile & desktop access',
      'New content monthly'
    ],
    cta: 'Start Your Journey',
    benefits: [
      'Build flexibility',
      'Reduce stress',
      'Improve posture'
    ]
  },
  {
    id: 'premium',
    name: 'Complete Wellness',
    description: 'Everything you need for lasting transformation',
    pricing: {
      monthly: {
        amount: 49,
        currency: 'USD',
        originalPrice: 69
      },
      annual: {
        amount: 39,
        currency: 'USD',
        originalPrice: 49
      }
    },
    badge: 'Most Popular',
    popular: true,
    features: [
      'Everything in Yoga Essentials',
      '30+ advanced sessions library',
      'Personalized meal planning guide',
      'Meditation & mindfulness series',
      'Live monthly Q&A sessions',
      'Private community access',
      'Priority email support',
      'Progress tracking tools',
      'Weekly new content'
    ],
    cta: 'Get Complete Package',
    benefits: [
      'Complete transformation',
      'Long-term wellness',
      'Community support',
      'Expert guidance'
    ]
  },
  {
    id: 'vip',
    name: 'VIP Coaching',
    description: '1-on-1 guidance for maximum results',
    pricing: {
      monthly: {
        amount: 97,
        currency: 'USD',
        originalPrice: 149
      },
      annual: {
        amount: 77,
        currency: 'USD',
        originalPrice: 97
      }
    },
    badge: 'Best Value',
    features: [
      'Everything in Complete Wellness',
      'Monthly 1-on-1 coaching calls',
      'Custom practice plan creation',
      'Real-time form correction',
      'WhatsApp support access',
      'Personalized nutrition advice',
      'Goal setting & accountability',
      'Priority feature requests',
      'Unlimited email support'
    ],
    cta: 'Book VIP Experience',
    benefits: [
      'Personal attention',
      'Faster results',
      'Expert accountability',
      'Lifetime guidance'
    ]
  }
] as const

export interface PricingFeature {
  icon: string
  title: string
  description: string
}

export const additionalFeatures: ReadonlyArray<PricingFeature> = [
  {
    icon: 'shield-check',
    title: '60-Day Money-Back Guarantee',
    description: 'Try risk-free. If you\'re not completely satisfied, get a full refund.'
  },
  {
    icon: 'clock',
    title: 'Lifetime Access',
    description: 'Keep all materials forever. Practice at your own pace, anytime.'
  },
  {
    icon: 'smartphone',
    title: 'All Devices Supported',
    description: 'Access on mobile, tablet, or desktop. Download for offline use.'
  },
  {
    icon: 'users',
    title: 'Supportive Community',
    description: 'Join thousands of practitioners on the same transformation journey.'
  }
] as const

export const formatPrice = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency
  }).format(amount)
}

export const calculateSavings = (original: number, current: number): number => {
  return Math.round(((original - current) / original) * 100)
}

export const getPlanPrice = (plan: PricingPlan, isAnnual: boolean) => {
  return isAnnual ? plan.pricing.annual : plan.pricing.monthly
}

export const calculateAnnualSavings = (plan: PricingPlan): number => {
  const monthlyTotal = plan.pricing.monthly.amount * 12
  const annualPrice = plan.pricing.annual.amount * 12
  return Math.round(((monthlyTotal - annualPrice) / monthlyTotal) * 100)
}