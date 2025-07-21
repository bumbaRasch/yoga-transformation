'use client'

import React, { Component, ReactNode } from 'react'
import { AlertCircle, RefreshCw, Bug, Mail } from 'lucide-react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

interface State {
  hasError: boolean
  error?: Error
  errorInfo?: React.ErrorInfo
  retryCount: number
  isRetrying: boolean
}

// Error reporting service (placeholder - would integrate with Sentry, Bugsnag, etc.)
const reportError = (error: Error, errorInfo: React.ErrorInfo, retryCount: number) => {
  // In production, this would send to your error reporting service
  const errorData = {
    message: error.message,
    stack: error.stack,
    componentStack: errorInfo.componentStack,
    retryCount,
    timestamp: new Date().toISOString(),
    userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'SSR',
    url: typeof window !== 'undefined' ? window.location.href : 'SSR'
  }

  if (process.env.NODE_ENV === 'development') {
    console.group('🐛 Error Boundary Report')
    console.error('Error:', error)
    console.error('Error Info:', errorInfo)
    console.error('Error Data:', errorData)
    console.groupEnd()
  } else {
    // In production, send to error reporting service
    console.error('Error caught by boundary:', error.message)
    // Example: Sentry.captureException(error, { extra: errorData })
  }
}

export class ErrorBoundary extends Component<Props, State> {
  private retryTimer: NodeJS.Timeout | null = null

  constructor(props: Props) {
    super(props)
    this.state = { 
      hasError: false, 
      retryCount: 0,
      isRetrying: false
    }
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState(prevState => ({ 
      errorInfo,
      retryCount: prevState.retryCount + 1
    }))

    // Report error to logging service
    reportError(error, errorInfo, this.state.retryCount)
    
    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo)
  }

  componentWillUnmount() {
    if (this.retryTimer) {
      clearTimeout(this.retryTimer)
    }
  }

  handleRetry = () => {
    this.setState({ isRetrying: true })
    
    // Add a small delay to show retry feedback
    this.retryTimer = setTimeout(() => {
      this.setState({ 
        hasError: false, 
        error: undefined, 
        errorInfo: undefined,
        isRetrying: false
      })
    }, 500)
  }

  handleRefreshPage = () => {
    if (typeof window !== 'undefined') {
      window.location.reload()
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      const isDevelopment = process.env.NODE_ENV === 'development'

      return (
        <div className="flex items-center justify-center p-8 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
          <div className="text-center max-w-md">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            
            <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
              {isDevelopment ? 'Development Error' : 'Something went wrong'}
            </h3>
            
            <p className="text-red-600 dark:text-red-300 text-sm mb-4">
              {isDevelopment 
                ? 'Check the console for detailed error information.'
                : 'We apologize for the inconvenience. Please try again or refresh the page.'
              }
            </p>

            {/* Development Error Details */}
            {isDevelopment && this.state.error && (
              <details className="text-left bg-red-100 dark:bg-red-900/40 p-3 rounded mb-4 text-xs">
                <summary className="cursor-pointer font-medium text-red-800 dark:text-red-200 mb-2">
                  <Bug className="w-4 h-4 inline mr-1" />
                  Error Details
                </summary>
                <div className="space-y-2">
                  <div>
                    <strong>Message:</strong> {this.state.error.message}
                  </div>
                  {this.state.error.stack && (
                    <div>
                      <strong>Stack:</strong>
                      <pre className="whitespace-pre-wrap text-xs mt-1 text-red-700 dark:text-red-300">
                        {this.state.error.stack}
                      </pre>
                    </div>
                  )}
                </div>
              </details>
            )}

            {/* Retry Information */}
            {this.state.retryCount > 0 && (
              <p className="text-xs text-red-500 mb-4">
                Retry attempt: {this.state.retryCount}
                {this.state.retryCount >= 3 && ' (Consider refreshing the page)'}
              </p>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <button
                onClick={this.handleRetry}
                disabled={this.state.isRetrying}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {this.state.isRetrying ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <RefreshCw className="w-4 h-4" />
                )}
                {this.state.isRetrying ? 'Retrying...' : 'Try Again'}
              </button>
              
              <button
                onClick={this.handleRefreshPage}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Refresh Page
              </button>
            </div>

            {/* Contact Support (Production) */}
            {!isDevelopment && (
              <div className="mt-4 pt-4 border-t border-red-200 dark:border-red-800">
                <p className="text-xs text-red-600 dark:text-red-400">
                  If the problem persists, please contact support
                </p>
                <a
                  href="mailto:support@yogatransform.com?subject=Error%20Report"
                  className="inline-flex items-center gap-1 text-xs text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200 mt-1"
                >
                  <Mail className="w-3 h-3" />
                  support@yogatransform.com
                </a>
              </div>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}