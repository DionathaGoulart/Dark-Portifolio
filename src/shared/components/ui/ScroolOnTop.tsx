// 1. Componente ScrollToTopButton
import React, { useState, useEffect } from 'react'

interface ScrollToTopButtonProps {
  showAfter?: number // pixels scrolled before showing button
  smooth?: boolean
  className?: string
}

export const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({
  showAfter = 400,
  smooth = true,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > showAfter) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [showAfter])

  const scrollToTop = () => {
    if (smooth) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    } else {
      window.scrollTo(0, 0)
    }
  }

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className={`
            fixed bottom-6 right-6 z-50
            w-12 h-12 rounded-full
            bg-primary-black dark:bg-primary-white
            text-primary-white dark:text-primary-black
            shadow-lg hover:shadow-xl
            transform transition-all duration-300
            hover:scale-110 active:scale-95
            flex items-center justify-center
            focus:outline-none focus:ring-2 focus:ring-offset-2
            focus:ring-primary-black dark:focus:ring-primary-white
            ${className}
          `}
          aria-label="Scroll to top"
        >
          {/* Seta para cima */}
          <svg
            className="w-6 h-6"
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
        </button>
      )}
    </>
  )
}

// 2. Versão mais sofisticada com progresso do scroll
export const ScrollToTopWithProgress: React.FC<ScrollToTopButtonProps> = ({
  showAfter = 400,
  smooth = true,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const updateScrollInfo = () => {
      const scrollTop = window.pageYOffset
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = (scrollTop / docHeight) * 100

      setScrollProgress(scrollPercent)
      setIsVisible(scrollTop > showAfter)
    }

    window.addEventListener('scroll', updateScrollInfo)
    return () => window.removeEventListener('scroll', updateScrollInfo)
  }, [showAfter])

  const scrollToTop = () => {
    if (smooth) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    } else {
      window.scrollTo(0, 0)
    }
  }

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className={`
            fixed bottom-6 right-6 z-50
            w-14 h-14 rounded-full
            bg-primary-black dark:bg-primary-white
            text-primary-white dark:text-primary-black
            shadow-lg hover:shadow-xl
            transform transition-all duration-300
            hover:scale-110 active:scale-95
            flex items-center justify-center
            focus:outline-none focus:ring-2 focus:ring-offset-2
            focus:ring-primary-black dark:focus:ring-primary-white
            relative overflow-hidden
            ${className}
          `}
          aria-label="Scroll to top"
        >
          {/* Círculo de progresso */}
          <svg
            className="absolute inset-0 w-full h-full transform -rotate-90"
            viewBox="0 0 56 56"
          >
            <circle
              cx="28"
              cy="28"
              r="26"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              opacity="0.2"
            />
            <circle
              cx="28"
              cy="28"
              r="26"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray={`${2 * Math.PI * 26}`}
              strokeDashoffset={`${2 * Math.PI * 26 * (1 - scrollProgress / 100)}`}
              className="transition-all duration-150"
            />
          </svg>

          {/* Seta para cima */}
          <svg
            className="w-6 h-6 relative z-10"
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
        </button>
      )}
    </>
  )
}

// 3. Hook para usar em qualquer componente
export const useScrollToTop = (showAfter: number = 400) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > showAfter)
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [showAfter])

  const scrollToTop = (smooth: boolean = true) => {
    if (smooth) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    } else {
      window.scrollTo(0, 0)
    }
  }

  return { isVisible, scrollToTop }
}
