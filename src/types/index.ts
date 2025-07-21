export interface YogaDay {
  id: number
  title: string
  description: string
  duration: number
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  completed?: boolean
  unlocked?: boolean
}

export interface TimelineDay extends YogaDay {
  position: {
    x: number
    y: number
  }
  theme: string
}

export interface UserProgress {
  currentDay: number
  completedDays: number[]
  startDate: Date
  streak: number
}

export interface AnimationConfig {
  duration: number
  delay?: number
  ease?: string
  type?: 'spring' | 'tween'
}