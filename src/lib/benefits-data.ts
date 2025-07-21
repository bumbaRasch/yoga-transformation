// Benefit interfaces and data

export interface Benefit {
  id: string
  title: string
  description: string
  icon: string
  gradient: string
  stats?: {
    value: string
    label: string
  }
}

export const benefitsData: ReadonlyArray<Benefit> = [
  {
    id: 'strength',
    title: 'Build Strength',
    description: 'Develop functional strength through progressive poses and flows that target your entire body.',
    icon: 'dumbbell',
    gradient: 'from-purple-500 to-purple-600',
    stats: {
      value: '85%',
      label: 'strength increase'
    }
  },
  {
    id: 'flexibility',
    title: 'Increase Flexibility',
    description: 'Unlock your body\'s natural range of motion with targeted stretches and mobility work.',
    icon: 'move',
    gradient: 'from-blue-500 to-blue-600',
    stats: {
      value: '70%',
      label: 'flexibility improvement'
    }
  },
  {
    id: 'mindfulness',
    title: 'Mental Clarity',
    description: 'Cultivate mindfulness and reduce stress through meditation and breathwork practices.',
    icon: 'brain',
    gradient: 'from-green-500 to-green-600',
    stats: {
      value: '90%',
      label: 'stress reduction'
    }
  },
  {
    id: 'balance',
    title: 'Better Balance',
    description: 'Improve physical and mental balance through focused stability and coordination exercises.',
    icon: 'balance-scale',
    gradient: 'from-yellow-500 to-yellow-600',
    stats: {
      value: '65%',
      label: 'balance improvement'
    }
  },
  {
    id: 'energy',
    title: 'Boost Energy',
    description: 'Feel more energized throughout your day with invigorating morning and evening flows.',
    icon: 'zap',
    gradient: 'from-orange-500 to-orange-600',
    stats: {
      value: '80%',
      label: 'energy increase'
    }
  },
  {
    id: 'sleep',
    title: 'Better Sleep',
    description: 'Improve sleep quality with restorative poses and evening relaxation sequences.',
    icon: 'moon',
    gradient: 'from-indigo-500 to-indigo-600',
    stats: {
      value: '75%',
      label: 'sleep quality'
    }
  }
] as const

// Icon mapping for type safety
export const iconMap = {
  'dumbbell': 'Dumbbell',
  'move': 'Move',
  'brain': 'Brain',
  'balance-scale': 'Scale',
  'zap': 'Zap',
  'moon': 'Moon'
} as const

export type IconName = keyof typeof iconMap

export const getBenefitIcon = (iconName: string): string => {
  return iconMap[iconName as IconName] || 'Circle'
}