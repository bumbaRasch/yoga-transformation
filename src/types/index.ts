
export interface YogaDay {
  id: number
  title: string
  description: string
  duration: number
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  completed?: boolean
  unlocked?: boolean
}

export interface AnimationConfig {
  duration: number
  delay?: number
  ease?: string
  type?: 'spring' | 'tween'
}