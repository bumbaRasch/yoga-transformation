export interface PricingPlan {
  id: string
  name: string
  description: string
  price: {
    amount: number
    currency: string
    period: string
  }
  originalPrice?: number
  badge?: string
  features: string[]
  popular?: boolean
  cta: string
  benefits: string[]
}

export const pricingPlans: ReadonlyArray<PricingPlan> = [
  {
    id: 'basic',
    name: '14-Day Transformation',
    description: 'Perfect for beginners starting their yoga journey',
    price: {
      amount: 47,
      currency: 'USD',
      period: 'one-time'
    },
    originalPrice: 97,
    features: [
      '14 progressive daily sessions',
      'HD video instructions',
      'Downloadable pose guides',
      'Basic breathing exercises',
      'Email support',
      'Mobile & desktop access',
      'Lifetime access to course'
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
    name: 'Complete Wellness Package',
    description: 'Everything you need for lasting transformation',
    price: {
      amount: 97,
      currency: 'USD',
      period: 'one-time'
    },
    originalPrice: 197,
    badge: 'Most Popular',
    popular: true,
    features: [
      'Everything in Basic plan',
      'Personalized practice schedule',
      'Advanced breathing techniques',
      'Meditation & mindfulness sessions',
      '30-day meal planning guide',
      'Progress tracking tools',
      'Direct instructor support',
      'Private community access',
      'Bonus: 7-day advanced challenge'
    ],
    cta: 'Get Complete Package',
    benefits: [
      'Accelerated results',
      'Personal guidance',
      'Community support',
      'Nutritional guidance'
    ]
  },
  {
    id: 'vip',
    name: 'VIP Coaching Experience',
    description: 'Premium experience with 1-on-1 guidance',
    price: {
      amount: 297,
      currency: 'USD',
      period: 'one-time'
    },
    originalPrice: 497,
    badge: 'Best Value',
    features: [
      'Everything in Premium plan',
      '2 one-on-one video calls with Maya',
      'Personalized yoga sequence creation',
      'Custom modification for injuries',
      'Weekly progress check-ins',
      'Priority 24/7 support',
      'Bonus: 30-day habit tracker',
      'Bonus: Stress management workshop',
      '60-day money-back guarantee'
    ],
    cta: 'Get VIP Access',
    benefits: [
      'Personal attention',
      'Custom modifications',
      'Fastest results',
      'Risk-free guarantee'
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