import { YogaDay } from '@/types'

export const YOGA_PROGRAM: YogaDay[] = [
  {
    id: 1,
    title: "Foundation & Breath",
    description: "Learn the basics of yoga breathing and fundamental poses",
    duration: 20,
    difficulty: 'beginner',
    unlocked: true
  },
  {
    id: 2,
    title: "Gentle Flow",
    description: "Connect movement with breath in a flowing sequence",
    duration: 25,
    difficulty: 'beginner'
  },
  {
    id: 3,
    title: "Strength Building",
    description: "Build core strength and stability",
    duration: 30,
    difficulty: 'intermediate'
  },
  {
    id: 4,
    title: "Flexibility Focus",
    description: "Deep stretches for improved flexibility",
    duration: 25,
    difficulty: 'beginner'
  },
  {
    id: 5,
    title: "Balance & Coordination",
    description: "Challenge your balance with standing poses",
    duration: 35,
    difficulty: 'intermediate'
  },
  {
    id: 6,
    title: "Restorative Practice",
    description: "Gentle poses for recovery and relaxation",
    duration: 40,
    difficulty: 'beginner'
  },
  {
    id: 7,
    title: "Power Yoga Flow",
    description: "Dynamic sequence to build strength and endurance",
    duration: 45,
    difficulty: 'advanced'
  },
  {
    id: 8,
    title: "Hip Opening",
    description: "Release tension in hips and lower back",
    duration: 35,
    difficulty: 'intermediate'
  },
  {
    id: 9,
    title: "Backbend Practice",
    description: "Open your heart with supported backbends",
    duration: 30,
    difficulty: 'intermediate'
  },
  {
    id: 10,
    title: "Arm Balance Focus",
    description: "Build arm strength and practice challenging poses",
    duration: 40,
    difficulty: 'advanced'
  },
  {
    id: 11,
    title: "Mindful Movement",
    description: "Slow, meditative practice for mind-body connection",
    duration: 50,
    difficulty: 'beginner'
  },
  {
    id: 12,
    title: "Full Body Flow",
    description: "Complete sequence working all muscle groups",
    duration: 60,
    difficulty: 'intermediate'
  },
  {
    id: 13,
    title: "Advanced Integration",
    description: "Combine all elements learned in challenging flow",
    duration: 55,
    difficulty: 'advanced'
  },
  {
    id: 14,
    title: "Celebration & Reflection",
    description: "Honor your journey with a special completion practice",
    duration: 45,
    difficulty: 'intermediate'
  }
]

export const ANIMATION_CONFIG = {
  hero: {
    duration: 0.8,
    ease: "easeOut"
  },
  timeline: {
    duration: 0.6,
    delay: 0.2,
    type: "spring" as const
  },
  cards: {
    duration: 0.4,
    ease: "easeInOut"
  }
} as const

export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
} as const