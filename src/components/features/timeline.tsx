'use client'

import React from "react"
import { Calendar, Clock, Lock, CheckCircle, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { timelineData, getDifficultyColor, getDurationText } from "@/lib/timeline-data"
import { TimelineDay } from "@/types"
import { useTimeline } from "@/hooks/useTimeline"
import { useTranslations } from "@/contexts/language-context"
import { ErrorBoundary } from "@/components/ui/error-boundary"

interface TimelineProps {
  currentDay?: number
  completedDays?: number[]
  onDayClick?: (day: TimelineDay) => void
  className?: string
}

interface TimelineDayCardProps {
  day: TimelineDay
  index: number
  isCompleted: (day: TimelineDay) => boolean
  isCurrent: (day: TimelineDay) => boolean
  isAccessible: (day: TimelineDay) => boolean
  onDayClick?: (day: TimelineDay) => void
}

const TimelineDayCard = React.memo(function TimelineDayCard({
  day,
  index,
  isCompleted,
  isCurrent,
  isAccessible,
  onDayClick
}: TimelineDayCardProps) {
  const t = useTranslations()
  return (
    <div className="h-full">
      {/* Day Card - Consistent Layout */}
      <div 
        className={`
          bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 h-full
          flex flex-col min-h-[320px]
          ${isCurrent(day) ? 'ring-2 ring-purple-500' : ''}
          ${isCompleted(day) ? 'bg-green-50 dark:bg-green-900/20' : ''}
          ${!isAccessible(day) ? 'opacity-60' : ''}
          transition-all duration-300 hover:shadow-xl cursor-pointer
        `}
        role="article"
        aria-labelledby={`day-${day.id}-title`}
        aria-describedby={`day-${day.id}-description`}
        tabIndex={isAccessible(day) ? 0 : -1}
      >
        {/* Day Number - Fixed Header */}
        <div className={`
          inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 flex-shrink-0
          bg-gradient-to-r ${day.theme} text-white font-bold text-lg
        `}>
          {day.id}
        </div>

        {/* Content - Flexible Body */}
        <div className="flex flex-col flex-1 gap-4">
          {/* Title and Description - Grows to fill space */}
          <div className="flex-1">
            <h3 
              id={`day-${day.id}-title`}
              className="text-xl font-semibold text-gray-900 dark:text-white mb-2"
            >
              {t(`timeline.days.day${day.id}.title`)}
            </h3>
            <p 
              id={`day-${day.id}-description`}
              className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed"
            >
              {t(`timeline.days.day${day.id}.description`)}
            </p>
          </div>

          {/* Meta Information - Fixed */}
          <div className="flex items-center gap-4 text-sm flex-shrink-0">
            <div className="flex items-center gap-1 text-gray-500">
              <Clock className="w-4 h-4" />
              <span>{getDurationText(day.duration)}</span>
            </div>
            <div className={`
              px-2 py-1 rounded-full text-xs font-medium
              ${getDifficultyColor(day.difficulty)}
            `}>
              {t(`timeline.difficulty.${day.difficulty}`)}
            </div>
          </div>

          {/* Action Button - Fixed Footer */}
          <Button 
            size="sm" 
            className="w-full flex-shrink-0 mt-auto"
            variant={isCurrent(day) ? "default" : isCompleted(day) ? "outline" : "secondary"}
            disabled={!isAccessible(day)}
            onClick={() => onDayClick?.(day)}
            aria-label={`${isCompleted(day) ? 'Completed' : isCurrent(day) ? 'Start' : isAccessible(day) ? 'Preview' : 'Locked'} Day ${day.id}: ${day.title}`}
          >
            {isCompleted(day) ? (
              <>
                <CheckCircle className="w-4 h-4" />
                {t('timeline.completed')}
              </>
            ) : isCurrent(day) ? (
              <>
                <Play className="w-4 h-4" />
                {t('timeline.startPractice')}
              </>
            ) : isAccessible(day) ? (
              <>
                <Calendar className="w-4 h-4" />
                {t('timeline.preview')}
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                {t('timeline.locked')}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
})

function TimelineContent({ currentDay = 1, completedDays = [], onDayClick, className }: TimelineProps) {
  const t = useTranslations()
  
  // Validate props
  if (currentDay < 1 || currentDay > 14) {
    throw new Error(`Invalid currentDay: ${currentDay}. Must be between 1 and 14.`)
  }
  
  if (completedDays.some(day => day < 1 || day > 14)) {
    throw new Error('Invalid completedDays: All days must be between 1 and 14.')
  }
  // Use custom hook for optimized timeline logic
  const { isCompleted, isCurrent, isAccessible, progressStats } = useTimeline({
    currentDay,
    completedDays
  })

  return (
    <section className={`py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 ${className || ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('timeline.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('timeline.subtitle')}
          </p>
        </div>

        {/* Timeline Days - Consistent Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {timelineData.map((day, index) => (
            <TimelineDayCard
              key={day.id}
              day={day}
              index={index}
              isCompleted={isCompleted}
              isCurrent={isCurrent}
              isAccessible={isAccessible}
              onDayClick={onDayClick}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export function Timeline(props: TimelineProps) {
  return (
    <ErrorBoundary>
      <TimelineContent {...props} />
    </ErrorBoundary>
  )
}