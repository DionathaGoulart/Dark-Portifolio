import React, { useState, useEffect, useRef } from 'react'

interface ModalZoomProps {
  image: {
    urls?: { large: string }
    url?: string
    alt?: string
  }
  onClose: () => void
}

export const ModalZoom: React.FC<ModalZoomProps> = ({ image, onClose }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const loadStartTime = useRef<number>(Date.now())

  // Verifica se a imagem existe e obtém a URL
  const imageUrl = image?.urls?.large || image?.url

  useEffect(() => {
    // Reseta os estados quando a URL da imagem muda (caso o modal seja reaberto com outra imagem)
    loadStartTime.current = Date.now()
    setIsLoading(true)
    setHasError(false)
  }, [imageUrl])

  if (!imageUrl) {
    return null // Não renderiza nada se não houver imagem
  }

  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation() // Impede que o clique na imagem feche o modal
  }

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  return (
    <div
      className="fixed inset-0 bg-primary-black/90 flex items-center justify-center z-50 p-4 cursor-pointer"
      onClick={onClose}
    >
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

      {/* Exibe o loader se estiver carregando */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex space-x-1">
            <div
              className="w-2 h-2 bg-primary-white/50 rounded-full"
              style={{ animation: 'bounce 1.4s infinite 0ms' }}
            />
            <div
              className="w-2 h-2 bg-primary-white/50 rounded-full"
              style={{ animation: 'bounce 1.4s infinite 200ms' }}
            />
            <div
              className="w-2 h-2 bg-primary-white/50 rounded-full"
              style={{ animation: 'bounce 1.4s infinite 400ms' }}
            />
          </div>
        </div>
      )}

      {/* Exibe a mensagem de erro se houver falha no carregamento */}
      {!isLoading && hasError && (
        <div className="text-center text-primary-white/50">
          <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center">
            <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
            </svg>
          </div>
          <p className="text-sm font-medium">Imagem não encontrada</p>
        </div>
      )}

      {/* Renderiza a imagem, mas a esconde até que o carregamento seja concluído */}
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

      <button
        className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 transition-colors"
        onClick={onClose}
        aria-label="Fechar"
      >
        ✕
      </button>
    </div>
  )
}
