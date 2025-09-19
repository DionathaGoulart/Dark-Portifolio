import React, { useState, useEffect, useRef } from 'react'

// ================================
// INTERFACES & TYPES
// ================================

/**
 * Props interface for ModalZoom component
 */
interface ModalZoomProps {
  image: {
    urls?: { large: string }
    url?: string
    alt?: string
  }
  onClose: () => void
}

// ================================
// CONSTANTS
// ================================

const KEYFRAME_STYLES = `
  @keyframes shimmer {
    0% { transform: translateX(-100%) skewX(-12deg); }
    100% { transform: translateX(200%) skewX(-12deg); }
  }
  @keyframes bounce {
    0%, 80%, 100% { transform: scale(0); }
    40% { transform: scale(1); }
  }
`

// ================================
// MAIN COMPONENT
// ================================

/**
 * ModalZoom component for displaying images in fullscreen with loading states
 * Features loading animation, error handling, and click-to-close functionality
 */
export const ModalZoom: React.FC<ModalZoomProps> = ({ image, onClose }) => {
  // ================================
  // STATE & REFS
  // ================================

  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const loadStartTime = useRef<number>(Date.now())

  // ================================
  // COMPUTED VALUES
  // ================================

  const imageUrl = image?.urls?.large || image?.url

  // ================================
  // EFFECTS
  // ================================

  useEffect(() => {
    // Reset states when image URL changes (for modal reopening with different image)
    loadStartTime.current = Date.now()
    setIsLoading(true)
    setHasError(false)
  }, [imageUrl])

  // ================================
  // EVENT HANDLERS
  // ================================

  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent image click from closing modal
  }

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  // ================================
  // EARLY RETURNS
  // ================================

  if (!imageUrl) {
    return null // Don't render if no image URL
  }

  // ================================
  // RENDER HELPERS
  // ================================

  const renderLoadingSpinner = () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="flex space-x-1">
        {[0, 200, 400].map((delay, index) => (
          <div
            key={index}
            className="w-2 h-2 bg-primary-white/50 rounded-full"
            style={{ animation: `bounce 1.4s infinite ${delay}ms` }}
          />
        ))}
      </div>
    </div>
  )

  const renderErrorState = () => (
    <div className="text-center text-primary-white/50">
      <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center">
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
        </svg>
      </div>
      <p className="text-sm font-medium">Imagem não encontrada</p>
    </div>
  )

  const renderCloseButton = () => (
    <button
      className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 transition-colors"
      onClick={onClose}
      aria-label="Fechar"
    >
      ✕
    </button>
  )

  // ================================
  // MAIN RENDER
  // ================================

  return (
    <div
      className="fixed inset-0 bg-primary-black/90 flex items-center justify-center z-50 p-4 cursor-pointer"
      onClick={onClose}
    >
      <style dangerouslySetInnerHTML={{ __html: KEYFRAME_STYLES }} />

      {isLoading && renderLoadingSpinner()}

      {!isLoading && hasError && renderErrorState()}

      <img
        src={imageUrl}
        alt={image.alt || ''}
        className={`max-w-full max-h-full object-contain transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onClick={handleImageClick}
        onLoad={handleLoad}
        onError={handleError}
      />

      {renderCloseButton()}
    </div>
  )
}
