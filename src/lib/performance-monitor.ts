// Performance monitoring utilities
interface PerformanceEntry {
  name: string
  duration: number
  startTime: number
  endTime: number
}

interface PerformanceBudget {
  name: string
  budget: number // in milliseconds
  warning: number // in milliseconds
}

class PerformanceMonitor {
  private entries: Map<string, PerformanceEntry> = new Map()
  private budgets: Map<string, PerformanceBudget> = new Map()
  private observers: PerformanceObserver[] = []

  constructor() {
    if (typeof window !== 'undefined') {
      this.initializeBudgets()
      this.setupObservers()
    }
  }

  private initializeBudgets() {
    // Define performance budgets
    this.setBudget('component-render', { budget: 16, warning: 10 }) // 60fps target
    this.setBudget('timeline-animation', { budget: 100, warning: 50 })
    this.setBudget('navigation-scroll', { budget: 50, warning: 25 })
    this.setBudget('image-load', { budget: 1000, warning: 500 })
    this.setBudget('api-call', { budget: 2000, warning: 1000 })
  }

  private setupObservers() {
    try {
      // Observe navigation timing
      if (PerformanceObserver.supportedEntryTypes?.includes('navigation')) {
        const navObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          entries.forEach((entry) => {
            this.logNavigationTiming(entry as PerformanceNavigationTiming)
          })
        })
        navObserver.observe({ entryTypes: ['navigation'] })
        this.observers.push(navObserver)
      }

      // Observe resource timing
      if (PerformanceObserver.supportedEntryTypes?.includes('resource')) {
        const resourceObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          entries.forEach((entry) => {
            this.logResourceTiming(entry as PerformanceResourceTiming)
          })
        })
        resourceObserver.observe({ entryTypes: ['resource'] })
        this.observers.push(resourceObserver)
      }

      // Observe layout shifts (CLS)
      if (PerformanceObserver.supportedEntryTypes?.includes('layout-shift')) {
        const clsObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          let clsScore = 0
          entries.forEach((entry) => {
            const clsEntry = entry as unknown as { hadRecentInput?: boolean; value?: number }
            if (!clsEntry.hadRecentInput && clsEntry.value) {
              clsScore += clsEntry.value
            }
          })
          if (clsScore > 0.1) {
            this.warn(`CLS Score: ${clsScore.toFixed(4)} (Target: <0.1)`)
          }
        })
        clsObserver.observe({ entryTypes: ['layout-shift'] })
        this.observers.push(clsObserver)
      }
    } catch (error) {
      console.warn('Performance Observer not supported:', error)
    }
  }

  // Start timing a performance measurement
  startMeasure(name: string): void {
    if (typeof performance !== 'undefined') {
      performance.mark(`${name}-start`)
    }
  }

  // End timing and log results
  endMeasure(name: string): number | null {
    if (typeof performance === 'undefined') return null

    try {
      performance.mark(`${name}-end`)
      performance.measure(name, `${name}-start`, `${name}-end`)
      
      const measure = performance.getEntriesByName(name, 'measure')[0]
      if (measure) {
        const entry: PerformanceEntry = {
          name,
          duration: measure.duration,
          startTime: measure.startTime,
          endTime: measure.startTime + measure.duration
        }
        
        this.entries.set(name, entry)
        this.checkBudget(name, entry.duration)
        
        // Clean up marks and measures
        performance.clearMarks(`${name}-start`)
        performance.clearMarks(`${name}-end`)
        performance.clearMeasures(name)
        
        return entry.duration
      }
    } catch (error) {
      console.warn(`Performance measurement failed for ${name}:`, error)
    }
    
    return null
  }

  // Set performance budget for a measurement
  setBudget(name: string, budget: { budget: number; warning: number }): void {
    this.budgets.set(name, { name, ...budget })
  }

  // Check if measurement exceeds budget
  private checkBudget(name: string, duration: number): void {
    const budget = this.budgets.get(name)
    if (!budget) return

    if (duration > budget.budget) {
      this.error(`⚠️ Budget exceeded for ${name}: ${duration.toFixed(2)}ms (Budget: ${budget.budget}ms)`)
    } else if (duration > budget.warning) {
      this.warn(`⚡ Performance warning for ${name}: ${duration.toFixed(2)}ms (Warning: ${budget.warning}ms)`)
    } else if (process.env.NODE_ENV === 'development') {
      this.log(`✅ ${name}: ${duration.toFixed(2)}ms (Within budget)`)
    }
  }

  // Log navigation timing metrics
  private logNavigationTiming(entry: PerformanceNavigationTiming): void {
    const metrics = {
      'DNS Lookup': entry.domainLookupEnd - entry.domainLookupStart,
      'TCP Connection': entry.connectEnd - entry.connectStart,
      'Request': entry.responseStart - entry.requestStart,
      'Response': entry.responseEnd - entry.responseStart,
      'DOM Processing': entry.domContentLoadedEventEnd - entry.domContentLoadedEventStart,
      'Load Complete': entry.loadEventEnd - entry.loadEventStart,
      'Total': entry.duration
    }

    this.log('Navigation Timing:', metrics)

    // Check Core Web Vitals
    if (entry.duration > 2500) {
      this.warn(`LCP likely over 2.5s: ${(entry.duration / 1000).toFixed(2)}s`)
    }
  }

  // Log resource timing
  private logResourceTiming(entry: PerformanceResourceTiming): void {
    // Only log slow resources in development
    if (process.env.NODE_ENV === 'development' && entry.duration > 100) {
      this.warn(`Slow resource: ${entry.name} (${entry.duration.toFixed(2)}ms)`)
    }
  }

  // Get all performance entries
  getEntries(): Map<string, PerformanceEntry> {
    return new Map(this.entries)
  }

  // Get performance summary
  getSummary(): Record<string, { duration: string; status: string }> {
    const summary: Record<string, { duration: string; status: string }> = {}
    
    this.entries.forEach((entry, name) => {
      summary[name] = {
        duration: `${entry.duration.toFixed(2)}ms`,
        status: this.getStatus(name, entry.duration)
      }
    })

    return summary
  }

  private getStatus(name: string, duration: number): string {
    const budget = this.budgets.get(name)
    if (!budget) return 'unmeasured'
    
    if (duration > budget.budget) return 'over-budget'
    if (duration > budget.warning) return 'warning'
    return 'good'
  }

  // Logging methods
  private log(message: string, data?: Record<string, number>): void {
    if (process.env.NODE_ENV === 'development') {
      console.log(`🏃 Performance:`, message, data || '')
    }
  }

  private warn(message: string): void {
    console.warn(`⚡ Performance Warning:`, message)
  }

  private error(message: string): void {
    console.error(`🚨 Performance Error:`, message)
  }

  // Cleanup method
  destroy(): void {
    this.observers.forEach(observer => observer.disconnect())
    this.observers = []
    this.entries.clear()
  }
}

// Global performance monitor instance
export const performanceMonitor = new PerformanceMonitor()

// React hook for component performance monitoring
export const usePerformanceMonitor = () => {
  return {
    startMeasure: performanceMonitor.startMeasure.bind(performanceMonitor),
    endMeasure: performanceMonitor.endMeasure.bind(performanceMonitor),
    getSummary: performanceMonitor.getSummary.bind(performanceMonitor)
  }
}