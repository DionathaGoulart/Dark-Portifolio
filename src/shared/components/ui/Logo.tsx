import React from 'react'
import logoOptimized from '@assets/logo.webp'

// ================================
// INTERFACES & TYPES
// ================================

interface LogoProps {
  src?: string
  alt?: string
  invertOnDark?: boolean
  className?: string
}

// ================================
// MAIN COMPONENT
// ================================

/**
 * Logo component with optional dark mode inversion
 * Displays optimized logo with responsive sizing
 */
export const Logo: React.FC<LogoProps> = ({
  src,
  alt = 'Dark Logo',
  invertOnDark = true,
  className = ''
}) => {
  // ================================
  // COMPUTED VALUES
  // ================================

  const logoSrc = src || logoOptimized

  const imageClasses = [
    'h-14 sm:h-16 w-auto object-contain transition-all duration-300',
    invertOnDark ? 'invert dark:filter-none' : ''
  ]
    .filter(Boolean)
    .join(' ')

  const containerClasses = ['flex items-center', className]
    .filter(Boolean)
    .join(' ')

  // ================================
  // RENDER
  // ================================

  return (
    <div className={containerClasses}>
      <img
        src={logoSrc}
        alt={alt}
        className={imageClasses}
        decoding="async"
        fetchPriority="high"
      />
    </div>
  )
}
