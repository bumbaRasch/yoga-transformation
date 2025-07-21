// Component size monitoring utility for development

interface ComponentSizeMetrics {
  name: string
  lines: number
  complexity: 'low' | 'medium' | 'high' | 'critical'
  recommendation: string
}

// Component size thresholds
const SIZE_THRESHOLDS = {
  LOW: 50,
  MEDIUM: 150,
  HIGH: 250,
  CRITICAL: 300
} as const

export function analyzeComponentSize(
  componentName: string, 
  lineCount: number
): ComponentSizeMetrics {
  let complexity: ComponentSizeMetrics['complexity']
  let recommendation: string

  if (lineCount <= SIZE_THRESHOLDS.LOW) {
    complexity = 'low'
    recommendation = 'Component size is optimal'
  } else if (lineCount <= SIZE_THRESHOLDS.MEDIUM) {
    complexity = 'medium'
    recommendation = 'Component size is acceptable, monitor for growth'
  } else if (lineCount <= SIZE_THRESHOLDS.HIGH) {
    complexity = 'high'
    recommendation = 'Consider extracting sub-components or custom hooks'
  } else {
    complexity = 'critical'
    recommendation = 'Component is too large - requires immediate refactoring'
  }

  return {
    name: componentName,
    lines: lineCount,
    complexity,
    recommendation
  }
}

export function getComponentSizeReport(components: Array<{ name: string; lines: number }>) {
  const metrics = components.map(({ name, lines }) => 
    analyzeComponentSize(name, lines)
  )

  const summary = {
    total: metrics.length,
    low: metrics.filter(m => m.complexity === 'low').length,
    medium: metrics.filter(m => m.complexity === 'medium').length,
    high: metrics.filter(m => m.complexity === 'high').length,
    critical: metrics.filter(m => m.complexity === 'critical').length,
    averageSize: Math.round(metrics.reduce((sum, m) => sum + m.lines, 0) / metrics.length)
  }

  const issues = metrics.filter(m => m.complexity === 'high' || m.complexity === 'critical')

  return {
    summary,
    metrics,
    issues,
    needsAttention: issues.length > 0
  }
}

// Development-only logging
export function logComponentSizes() {
  if (process.env.NODE_ENV !== 'development') return

  // This would be populated by a build-time analysis tool
  const componentSizes = [
    { name: 'VideoModal', lines: 308 },
    { name: 'Timeline', lines: 273 },
    { name: 'Testimonials', lines: 278 },
    { name: 'Instructor', lines: 258 },
    { name: 'Pricing', lines: 266 },
    { name: 'Footer', lines: 239 },
    { name: 'CTA-Sections', lines: 217 },
    { name: 'Navigation', lines: 201 },
    { name: 'ErrorBoundary', lines: 200 },
    { name: 'Benefits', lines: 175 },
    { name: 'Hero', lines: 167 },
    { name: 'SkipToContent', lines: 59 },
    { name: 'Button', lines: 53 }
  ]

  const report = getComponentSizeReport(componentSizes)

  console.group('📊 Component Size Analysis')
  console.log('Summary:', report.summary)
  
  if (report.needsAttention) {
    console.warn('⚠️ Components needing attention:')
    report.issues.forEach(issue => {
      console.warn(`- ${issue.name} (${issue.lines} lines): ${issue.recommendation}`)
    })
  } else {
    console.log('✅ All components within acceptable size limits')
  }
  
  console.groupEnd()
}