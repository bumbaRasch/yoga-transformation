import { useMemo, useCallback } from 'react'
import { TimelineDay } from '@/types'
import { calculateProgress, getNextAvailableDay } from '@/lib/timeline-data'

interface UseTimelineProps {
  currentDay: number
  completedDays: number[]
}

interface UseTimelineReturn {
  isCompleted: (day: TimelineDay) => boolean
  isCurrent: (day: TimelineDay) => boolean
  isAccessible: (day: TimelineDay) => boolean
  progressStats: {
    completed: number
    remaining: number
    currentDay: number
    percentage: number
    nextAvailable: number | null
  }
  completedSet: Set<number>
}

export function useTimeline({ currentDay, completedDays }: UseTimelineProps): UseTimelineReturn {
  // Memoize Set for O(1) lookups instead of O(n) array.includes()
  const completedSet = useMemo(() => new Set(completedDays), [completedDays])
  
  // Memoize checker functions for performance
  const isCompleted = useCallback(
    (day: TimelineDay) => completedSet.has(day.id),
    [completedSet]
  )
  
  const isCurrent = useCallback(
    (day: TimelineDay) => day.id === currentDay,
    [currentDay]
  )
  
  const isAccessible = useCallback(
    (day: TimelineDay) => day.unlocked || day.id <= currentDay,
    [currentDay]
  )
  
  // Memoize progress statistics
  const progressStats = useMemo(() => ({
    completed: completedDays.length,
    remaining: 14 - completedDays.length,
    currentDay,
    percentage: calculateProgress(completedDays),
    nextAvailable: getNextAvailableDay(completedDays, currentDay)
  }), [completedDays, currentDay])

  return {
    isCompleted,
    isCurrent,
    isAccessible,
    progressStats,
    completedSet
  }
}