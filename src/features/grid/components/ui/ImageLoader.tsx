import React, { useState, useCallback } from 'react'
import { ImageLoaderProps } from '../../types'

export const ImageLoader: React.FC<ImageLoaderProps> = ({
  src,
  alt = '',
  className = '',
  onLoad,
  onError,
  fallback
}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleLoad = useCallback(() => {
    setIsLoading(false)
    setHasError(false)
    onLoad?.()
  }, [onLoad, src])

  const handleError = useCallback(() => {
    setIsLoading(false)
    setHasError(true)
    onError?.()
    console.error('Image Load Error:', src) // Adicionado para depuração
  }, [onError, src])

  if (hasError) {
    return (
      fallback || (
        <div className="w-full h-48 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
          <div className="text-center text-gray-500 dark:text-gray-400">
            <svg
              className="w-12 h-12 mx-auto mb-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-sm">Erro ao carregar</p>
          </div>
        </div>
      )
    )
  }

  return (
    <div className="relative overflow-hidden w-full h-full">
      {/* Loading Skeleton com animação mais suave */}
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700">
          {/* Shimmer effect */}
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

          {/* Loading spinner centralizado */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-gray-300 dark:border-gray-500 border-t-blue-500 rounded-full animate-spin"></div>
          </div>

          {/* Pulse overlay */}
          <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse opacity-50"></div>
        </div>
      )}

      <img
        src={src}
        alt={alt}
        className={`w-full h-full transition-all duration-500 ease-out ${
          isLoading ? 'opacity-0' : 'opacity-100'
        } ${className}`}
        onLoad={handleLoad}
        onError={handleError}
        loading="lazy"
      />
    </div>
  )
}
