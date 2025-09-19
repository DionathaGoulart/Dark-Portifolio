import React, { useState, useEffect } from 'react'

// ================================
// INTERFACES & TYPES
// ================================

interface ScrollToTopButtonProps {
  showAfter?: number
  smooth?: boolean
  className?: string
}

interface ScrollInfo {
  isVisible: boolean
  scrollProgress: number
}

interface UseScrollToTopReturn {
  isVisible: boolean
  scrollToTop: (smooth?: boolean) => void
}

// ================================
// CONSTANTS
// ================================

const DEFAULT_SHOW_AFTER = 400
const CIRCLE_RADIUS = 26
const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS

const baseButtonClasses = [
  'fixed bottom-6 right-6 z-50',
  'rounded-full',
  'bg-primary-black dark:bg-primary-white',
  'text-primary-white dark:text-primary-black',
  'shadow-lg hover:shadow-xl',
  'transform transition-all duration-300',
  'hover:scale-110 active:scale-95',
  'flex items-center justify-center',
  'focus:outline-none focus:ring-2 focus:ring-offset-2',
  'focus:ring-primary-black dark:focus:ring-primary-white'
].join(' ')

// ================================
// HELPER FUNCTIONS
// ================================

/**
 * Calculates scroll progress as a percentage
 */
const calculateScrollProgress = (): number => {
  const scrollTop = window.pageYOffset
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  return docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
}

/**
 * Scrolls to top of page with optional smooth behavior
 */
const scrollToTopHandler = (smooth: boolean = true): void => {
  if (smooth) {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  } else {
    window.scrollTo(0, 0)
  }
}

/**
 * Gets button classes with optional additional className
 */
const getButtonClasses = (
  size: 'small' | 'large',
  className: string
): string => {
  const sizeClasses =
    size === 'small' ? 'w-12 h-12' : 'w-14 h-14 relative overflow-hidden'
  return `${baseButtonClasses} ${sizeClasses} ${className}`
}

// ================================
// SUB COMPONENTS
// ================================

/**
 * Arrow up icon component
 */
const ArrowUpIcon: React.FC<{ className?: string }> = ({
  className = 'w-6 h-6'
}) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 10l7-7m0 0l7 7m-7-7v18"
    />
  </svg>
)

/**
 * Progress circle component for scroll indicator
 */
const ProgressCircle: React.FC<{ progress: number }> = ({ progress }) => (
  <svg
    className="absolute inset-0 w-full h-full transform -rotate-90"
    viewBox="0 0 56 56"
  >
    <circle
      cx="28"
      cy="28"
      r={CIRCLE_RADIUS}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      opacity="0.2"
    />
    <circle
      cx="28"
      cy="28"
      r={CIRCLE_RADIUS}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeDasharray={CIRCLE_CIRCUMFERENCE}
      strokeDashoffset={CIRCLE_CIRCUMFERENCE * (1 - progress / 100)}
      className="transition-all duration-150"
    />
  </svg>
)

// ================================
// MAIN COMPONENTS
// ================================

/**
 * Simple scroll to top button that appears after scrolling
 */
export const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({
  showAfter = DEFAULT_SHOW_AFTER,
  smooth = true,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > showAfter)
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [showAfter])

  const handleClick = () => {
    scrollToTopHandler(smooth)
  }

  if (!isVisible) return null

  return (
    <button
      onClick={handleClick}
      className={getButtonClasses('small', className)}
      aria-label="Scroll to top"
    >
      <ArrowUpIcon />
    </button>
  )
}

/**
 * Advanced scroll to top button with progress indicator
 */
export const ScrollToTopWithProgress: React.FC<ScrollToTopButtonProps> = ({
  showAfter = DEFAULT_SHOW_AFTER,
  smooth = true,
  className = ''
}) => {
  const [scrollInfo, setScrollInfo] = useState<ScrollInfo>({
    isVisible: false,
    scrollProgress: 0
  })

  useEffect(() => {
    const updateScrollInfo = () => {
      const scrollTop = window.pageYOffset
      const scrollProgress = calculateScrollProgress()

      setScrollInfo({
        isVisible: scrollTop > showAfter,
        scrollProgress
      })
    }

    window.addEventListener('scroll', updateScrollInfo)
    return () => window.removeEventListener('scroll', updateScrollInfo)
  }, [showAfter])

  const handleClick = () => {
    scrollToTopHandler(smooth)
  }

  if (!scrollInfo.isVisible) return null

  return (
    <button
      onClick={handleClick}
      className={getButtonClasses('large', className)}
      aria-label="Scroll to top"
    >
      <ProgressCircle progress={scrollInfo.scrollProgress} />
      <ArrowUpIcon className="w-6 h-6 relative z-10" />
    </button>
  )
}

// ================================
// HOOKS
// ================================

/**
 * Hook for scroll to top functionality
 * Returns visibility state and scroll function for custom implementations
 */
export const useScrollToTop = (
  showAfter: number = DEFAULT_SHOW_AFTER
): UseScrollToTopReturn => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > showAfter)
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [showAfter])

  const scrollToTop = (smooth: boolean = true) => {
    scrollToTopHandler(smooth)
  }

  return { isVisible, scrollToTop }
}
