import { TimelineDay } from '@/types'

// Constants for better maintainability
const TOTAL_DAYS = 14 as const
const INITIAL_UNLOCKED_DAYS = 5 as const

export const timelineData: ReadonlyArray<TimelineDay> = [
  {
    id: 1,
    title: "Foundation & Breath",
    description: "Learn basic poses and breathing techniques. Start your transformation with mindful awareness.",
    duration: 20,
    difficulty: 'beginner',
    unlocked: true,
    position: { x: 10, y: 20 },
    theme: 'from-purple-400 to-purple-600'
  },
  {
    id: 2,
    title: "Strength Building",
    description: "Build core strength with warrior poses and planks. Feel your body getting stronger.",
    duration: 25,
    difficulty: 'beginner',
    unlocked: true,
    position: { x: 90, y: 15 },
    theme: 'from-blue-400 to-blue-600'
  },
  {
    id: 3,
    title: "Flexibility Focus",
    description: "Deep stretches and hip openers. Release tension and increase mobility.",
    duration: 30,
    difficulty: 'beginner',
    unlocked: true,
    position: { x: 20, y: 40 },
    theme: 'from-green-400 to-green-600'
  },
  {
    id: 4,
    title: "Balance & Stability",
    description: "Tree pose and single-leg stands. Develop physical and mental balance.",
    duration: 25,
    difficulty: 'intermediate',
    unlocked: true,
    position: { x: 80, y: 35 },
    theme: 'from-yellow-400 to-yellow-600'
  },
  {
    id: 5,
    title: "Flow Sequence",
    description: "Connect breath with movement in sun salutation variations.",
    duration: 35,
    difficulty: 'intermediate',
    unlocked: true,
    position: { x: 15, y: 60 },
    theme: 'from-orange-400 to-orange-600'
  },
  {
    id: 6,
    title: "Power Practice",
    description: "Challenge yourself with stronger poses and longer holds.",
    duration: 40,
    difficulty: 'intermediate',
    unlocked: false,
    position: { x: 85, y: 55 },
    theme: 'from-red-400 to-red-600'
  },
  {
    id: 7,
    title: "Reflection & Rest",
    description: "Gentle restorative poses and meditation. Honor your practice.",
    duration: 30,
    difficulty: 'beginner',
    unlocked: false,
    position: { x: 25, y: 80 },
    theme: 'from-indigo-400 to-indigo-600'
  },
  {
    id: 8,
    title: "Advanced Poses",
    description: "Introduction to arm balances and deeper backbends.",
    duration: 45,
    difficulty: 'advanced',
    unlocked: false,
    position: { x: 75, y: 75 },
    theme: 'from-pink-400 to-pink-600'
  },
  {
    id: 9,
    title: "Mindful Movement",
    description: "Slow, intentional practice focusing on alignment and awareness.",
    duration: 35,
    difficulty: 'intermediate',
    unlocked: false,
    position: { x: 30, y: 100 },
    theme: 'from-teal-400 to-teal-600'
  },
  {
    id: 10,
    title: "Heart Opening",
    description: "Chest and shoulder opening poses to release emotional tension.",
    duration: 30,
    difficulty: 'intermediate',
    unlocked: false,
    position: { x: 70, y: 95 },
    theme: 'from-rose-400 to-rose-600'
  },
  {
    id: 11,
    title: "Twisting & Detox",
    description: "Spinal twists to cleanse the body and improve digestion.",
    duration: 25,
    difficulty: 'intermediate',
    unlocked: false,
    position: { x: 40, y: 120 },
    theme: 'from-emerald-400 to-emerald-600'
  },
  {
    id: 12,
    title: "Integration Practice",
    description: "Combine all learned elements in flowing sequences.",
    duration: 50,
    difficulty: 'advanced',
    unlocked: false,
    position: { x: 60, y: 115 },
    theme: 'from-violet-400 to-violet-600'
  },
  {
    id: 13,
    title: "Peak Challenge",
    description: "Advanced poses and challenging sequences. Test your limits.",
    duration: 60,
    difficulty: 'advanced',
    unlocked: false,
    position: { x: 50, y: 140 },
    theme: 'from-fuchsia-400 to-fuchsia-600'
  },
  {
    id: 14,
    title: "Celebration & Gratitude",
    description: "Complete your transformation journey with joy and gratitude practice.",
    duration: 45,
    difficulty: 'intermediate',
    unlocked: false,
    position: { x: 50, y: 160 },
    theme: 'from-amber-400 to-amber-600'
  }
]

// Utility functions with improved type safety
export const getDifficultyColor = (difficulty: TimelineDay['difficulty']): string => {
  const colorMap = {
    beginner: 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20',
    intermediate: 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/20',
    advanced: 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/20',
  } as const
  
  return colorMap[difficulty] || 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/20'
}

export const getDurationText = (duration: number): string => {
  return `${duration} min`
}

export const getTotalDays = (): number => TOTAL_DAYS

export const getInitialUnlockedDays = (): number => INITIAL_UNLOCKED_DAYS

// Helper function to calculate progress percentage
export const calculateProgress = (completedDays: number[]): number => {
  return Math.round((completedDays.length / TOTAL_DAYS) * 100)
}

// Helper function to get next available day
export const getNextAvailableDay = (completedDays: number[], currentDay: number): number | null => {
  const allDays = Array.from({ length: TOTAL_DAYS }, (_, i) => i + 1)
  const incompleteDays = allDays.filter(day => !completedDays.includes(day) && day >= currentDay)
  return incompleteDays.length > 0 ? Math.min(...incompleteDays) : null
}