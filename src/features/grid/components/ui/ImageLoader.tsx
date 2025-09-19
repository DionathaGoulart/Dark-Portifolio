import React, { useState, useRef } from 'react'

interface ImageLoaderProps {
  src: string
  alt: string
  onLoad?: () => void
  onError?: () => void
  className?: string
  crossOrigin?: 'anonymous' | 'use-credentials' | ''
}

export const ImageLoader: React.FC<ImageLoaderProps> = ({
  src,
  alt,
  onLoad,
  onError,
  className = '',
  crossOrigin = 'anonymous'
}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [imageSrc, setImageSrc] = useState(src)
  const imgRef = useRef<HTMLImageElement>(null)

  // Função para garantir HTTPS nas URLs da Cloudinary
  const ensureHttps = (url: string): string => {
    if (url.startsWith('http://')) {
      return url.replace('http://', 'https://')
    }
    return url
  }

  // Função para adicionar parâmetros anti-cache se necessário
  const addCacheBuster = (url: string): string => {
    const separator = url.includes('?') ? '&' : '?'
    return `${url}${separator}cb=${Date.now()}`
  }

  const handleLoad = () => {
    setIsLoading(false)
    setHasError(false)
    onLoad?.()
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)

    // Tentativa de recovery: força HTTPS e adiciona cache buster
    const httpsUrl = ensureHttps(src)
    const urlWithCacheBuster = addCacheBuster(httpsUrl)

    // Se ainda não tentamos com cache buster, tenta uma vez
    if (!imageSrc.includes('cb=')) {
      setImageSrc(urlWithCacheBuster)
      setHasError(false)
      setIsLoading(true)
      return
    }

    onError?.()
  }

  // Garantir que a URL inicial seja HTTPS
  React.useEffect(() => {
    const httpsUrl = ensureHttps(src)
    if (httpsUrl !== imageSrc) {
      setImageSrc(httpsUrl)
    }
  }, [src])

  if (hasError) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-200 dark:bg-gray-700 ${className}`}
      >
        <div className="text-center p-4">
          <div className="text-gray-500 dark:text-gray-400 text-sm">
            ⚠️ Erro ao carregar
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-full overflow-hidden">
      {isLoading && (
        <div
          className={`absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 ${className}`}
        >
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
        </div>
      )}
      <img
        ref={imgRef}
        src={imageSrc}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        crossOrigin={crossOrigin}
        referrerPolicy="no-referrer-when-downgrade" // Política de referrer mais permissiva
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        loading="lazy" // Lazy loading nativo
        decoding="async" // Decodificação assíncrona
      />
    </div>
  )
}
