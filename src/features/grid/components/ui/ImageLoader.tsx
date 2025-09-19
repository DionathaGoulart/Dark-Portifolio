import React, { useState, useRef, useEffect } from 'react'

// ================================
// INTERFACES & TYPES
// ================================

/**
 * Props interface for ImageLoader component
 */
interface ImageLoaderProps {
  src: string
  alt: string
  onLoad?: () => void
  onError?: () => void
  className?: string
  crossOrigin?: 'anonymous' | 'use-credentials' | ''
}

// ================================
// UTILITIES
// ================================

/**
 * Ensures URL uses HTTPS protocol for Cloudinary compatibility
 */
const ensureHttps = (url: string): string => {
  if (url.startsWith('http://')) {
    return url.replace('http://', 'https://')
  }
  return url
}

/**
 * Adds cache-busting parameter to prevent caching issues
 */
const addCacheBuster = (url: string): string => {
  const separator = url.includes('?') ? '&' : '?'
  return `${url}${separator}cb=${Date.now()}`
}

// ================================
// MAIN COMPONENT
// ================================

/**
 * ImageLoader component with automatic HTTPS conversion, error recovery, and loading states
 * Features lazy loading, async decoding, and cache-busting for failed loads
 */
export const ImageLoader: React.FC<ImageLoaderProps> = ({
  src,
  alt,
  onLoad,
  onError,
  className = '',
  crossOrigin = 'anonymous'
}) => {
  // ================================
  // STATE & REFS
  // ================================

  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [imageSrc, setImageSrc] = useState(src)
  const imgRef = useRef<HTMLImageElement>(null)

  // ================================
  // EFFECTS
  // ================================

  useEffect(() => {
    // Ensure initial URL is HTTPS
    const httpsUrl = ensureHttps(src)
    if (httpsUrl !== imageSrc) {
      setImageSrc(httpsUrl)
    }
  }, [src, imageSrc])

  // ================================
  // EVENT HANDLERS
  // ================================

  const handleLoad = () => {
    setIsLoading(false)
    setHasError(false)
    onLoad?.()
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)

    // Recovery attempt: force HTTPS and add cache buster
    const httpsUrl = ensureHttps(src)
    const urlWithCacheBuster = addCacheBuster(httpsUrl)

    // If we haven't tried with cache buster yet, attempt once more
    if (!imageSrc.includes('cb=')) {
      setImageSrc(urlWithCacheBuster)
      setHasError(false)
      setIsLoading(true)
      return
    }

    onError?.()
  }

  // ================================
  // RENDER HELPERS
  // ================================

  const renderErrorState = () => (
    <div
      className={`flex items-center justify-center bg-transparent dark:bg-transparent ${className}`}
    >
      <div className="text-center p-4">
        <div className="text-gray-500 dark:text-gray-400 text-sm">
          ⚠️ Erro ao carregar
        </div>
      </div>
    </div>
  )

  const renderLoadingState = () => (
    <div
      className={`absolute inset-0 flex items-center justify-center bg-transparent dark:bg-transparent ${className}`}
    >
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
    </div>
  )

  // ================================
  // EARLY RETURNS
  // ================================

  if (hasError) {
    return renderErrorState()
  }

  // ================================
  // MAIN RENDER
  // ================================

  return (
    <div className="relative w-full h-full overflow-hidden">
      {isLoading && renderLoadingState()}

      <img
        ref={imgRef}
        src={imageSrc}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        crossOrigin={crossOrigin}
        referrerPolicy="no-referrer-when-downgrade"
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        loading="lazy"
        decoding="async"
      />
    </div>
  )
}
