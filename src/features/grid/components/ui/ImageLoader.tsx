import React, { useState, useEffect, useRef } from 'react'

interface ImageLoaderProps {
  src: string
  alt?: string
  className?: string
  onLoad?: () => void
  onError?: () => void
  fallback?: React.ReactNode
}

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
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const loadStartTime = useRef<number>(Date.now())

  useEffect(() => {
    // Reseta os estados quando a URL da imagem muda
    loadStartTime.current = Date.now()
    setIsLoading(true)
    setHasError(false)
    setIsImageLoaded(false)
  }, [src])

  const handleLoad = () => {
    setIsImageLoaded(true)
    setHasError(false)
    setIsLoading(false)
    onLoad?.()
  }

  const handleError = () => {
    const elapsedTime = Date.now() - loadStartTime.current
    const minLoadTime = 1000

    if (elapsedTime >= minLoadTime) {
      setIsLoading(false)
      setHasError(true)
      onError?.()
    } else {
      // Se deu erro muito rápido, espera o tempo restante antes de exibir a falha
      setTimeout(() => {
        setIsLoading(false)
        setHasError(true)
        onError?.()
      }, minLoadTime - elapsedTime)
    }
  }

  if (hasError) {
    return (
      fallback || (
        <div className="w-full h-48 bg-primary-white dark:bg-primary-black border border-primary-black/10 dark:border-primary-white/10 flex items-center justify-center transition-all duration-300">
          <div className="text-center text-primary-black/50 dark:text-primary-white/50">
            <div className="w-12 h-12 mx-auto mb-3 bg-primary-black/10 dark:bg-primary-white/10 flex items-center justify-center">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
              </svg>
            </div>
            <p className="text-sm font-medium">Imagem não encontrada</p>
          </div>
        </div>
      )
    )
  }

  return (
    <div className="relative w-full h-full overflow-hidden">
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes shimmer {
            0% { transform: translateX(-100%) skewX(-12deg); }
            100% { transform: translateX(200%) skewX(-12deg); }
          }
          @keyframes bounce {
            0%, 80%, 100% { transform: scale(0); }
            40% { transform: scale(1); }
          }
        `
        }}
      />

      {/* Renderiza o loader somente se estiver carregando ou se o tempo mínimo não passou */}
      {isLoading && (
        <div className="absolute inset-0 bg-primary-white dark:bg-primary-black">
          {/* Shimmer effect */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-black/5 dark:via-primary-white/5 to-transparent transform -skew-x-12"
            style={{
              animation: 'shimmer 2s infinite',
              transform: 'translateX(-100%) skewX(-12deg)'
            }}
          />

          {/* Elegant loading dots */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex space-x-1">
              <div
                className="w-2 h-2 bg-primary-black/30 dark:bg-primary-white/30 rounded-full"
                style={{
                  animation: 'bounce 1.4s infinite 0ms'
                }}
              />
              <div
                className="w-2 h-2 bg-primary-black/30 dark:bg-primary-white/30 rounded-full"
                style={{
                  animation: 'bounce 1.4s infinite 200ms'
                }}
              />
              <div
                className="w-2 h-2 bg-primary-black/30 dark:bg-primary-white/30 rounded-full"
                style={{
                  animation: 'bounce 1.4s infinite 400ms'
                }}
              />
            </div>
          </div>
        </div>
      )}

      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-all duration-700 ease-out ${
          isLoading ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
        } ${className}`}
        onLoad={handleLoad}
        onError={handleError}
        loading="lazy"
      />
    </div>
  )
}
