'use client'

import React from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, Lock, CheckCircle, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { timelineData, getDifficultyColor, getDurationText } from "@/lib/timeline-data"
import { TimelineDay } from "@/types"
import { useTimeline } from "@/hooks/useTimeline"
import { useTranslations } from "@/contexts/language-context"
import { ErrorBoundary } from "@/components/ui/error-boundary"
import { getFocusClasses } from "@/lib/focus-styles"

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
    <motion.div
      key={day.id}
      className="relative"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.05, // Reduced delay for better performance
        type: "spring",
        stiffness: 100
      }}
      style={{
        marginLeft: `${day.position.x}%`,
        transform: `translateX(-50%)`
      }}
    >
      {/* Day Card */}
      <div 
        className={`
          relative bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 max-w-sm
          ${isCurrent(day) ? 'ring-4 ring-purple-500 shadow-purple-200 dark:shadow-purple-900/50' : ''}
          ${isCompleted(day) ? 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20' : ''}
          ${!isAccessible(day) ? 'opacity-60' : ''}
          ${getFocusClasses('card', 'focus-within:ring-2 focus-within:ring-purple-400')}
          transition-all duration-300 hover:shadow-xl cursor-pointer
        `}
        role="article"
        aria-labelledby={`day-${day.id}-title`}
        aria-describedby={`day-${day.id}-description`}
        tabIndex={isAccessible(day) ? 0 : -1}
      >
        
        {/* Status Icon */}
        <div className="absolute -top-3 -right-3">
          {isCompleted(day) ? (
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
          ) : isCurrent(day) ? (
            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center animate-pulse">
              <Play className="w-4 h-4 text-white ml-0.5" />
            </div>
          ) : !isAccessible(day) ? (
            <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
              <Lock className="w-4 h-4 text-white" />
            </div>
          ) : null}
        </div>

        {/* Day Number */}
        <div className={`
          inline-flex items-center justify-center w-12 h-12 rounded-full mb-4
          bg-gradient-to-r ${day.theme} text-white font-bold text-lg
        `}>
          {day.id}
        </div>

        {/* Content */}
        <div className="space-y-4">
          <div>
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

          {/* Meta Information */}
          <div className="flex items-center gap-4 text-sm">
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

          {/* Action Button */}
          <Button 
            size="sm" 
            className="w-full"
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

      {/* Connection Line to Next Day */}
      {index < timelineData.length - 1 && (
        <motion.div
          className="absolute top-full left-1/2 w-0.5 h-8 bg-gradient-to-b from-gray-300 to-transparent dark:from-gray-600"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.05 + 0.3, duration: 0.3 }}
          style={{ transformOrigin: 'top' }}
        />
      )}
    </motion.div>
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
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('timeline.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('timeline.subtitle')}
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Background SVG Path */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 180"
            preserveAspectRatio="none"
          >
            <path
              d="M10,20 Q50,10 90,15 Q50,30 20,40 Q80,30 80,35 Q30,50 15,60 Q85,50 85,55 Q35,70 25,80 Q75,70 75,75 Q40,90 30,100 Q70,90 70,95 Q50,110 40,120 Q60,110 60,115 Q50,130 50,140 Q50,150 50,160"
              stroke="url(#timeline-gradient)"
              strokeWidth="2"
              fill="none"
              strokeDasharray="5,5"
              className="opacity-30"
            />
            <defs>
              <linearGradient id="timeline-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="50%" stopColor="#EC4899" />
                <stop offset="100%" stopColor="#F59E0B" />
              </linearGradient>
            </defs>
          </svg>

          {/* Timeline Days */}
          <div className="relative grid grid-cols-1 gap-8 py-8">
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

        {/* Progress Summary */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div 
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 max-w-md mx-auto"
            role="region"
            aria-label="Progress summary"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {t('timeline.progressTitle')}
            </h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div 
                  className="text-2xl font-bold text-purple-600"
                  aria-label={`Current day: ${progressStats.currentDay}`}
                >
                  {progressStats.currentDay}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{t('timeline.current')}</div>
              </div>
              <div>
                <div 
                  className="text-2xl font-bold text-green-600"
                  aria-label={`Completed days: ${progressStats.completed}`}
                >
                  {progressStats.completed}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{t('timeline.completed')}</div>
              </div>
              <div>
                <div 
                  className="text-2xl font-bold text-orange-600"
                  aria-label={`Remaining days: ${progressStats.remaining}`}
                >
                  {progressStats.remaining}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{t('timeline.remaining')}</div>
              </div>
            </div>
          </div>
        </motion.div>
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