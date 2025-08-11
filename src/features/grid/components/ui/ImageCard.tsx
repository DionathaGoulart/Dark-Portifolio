import React, { useState } from 'react'
import { ImageLoader } from './ImageLoader'
import { ImageCardProps } from '../../types'

export const ImageCard: React.FC<ImageCardProps> = ({
  image,
  onClick,
  onLoad,
  onError,
  className = '',
  isSquare = false // Valor padrão como false
}) => {
  const [isVisible, setIsVisible] = useState(true)

  const handleClick = () => {
    if (onClick) {
      onClick(image)
    }
  }

  const handleLoad = () => {
    onLoad?.(image)
  }

  const handleError = () => {
    setIsVisible(false)
    onError?.(image)
  }

  if (!isVisible) {
    return null
  }

  return (
    <div
      className={`group cursor-pointer transition-all duration-300 hover:scale-105 ${className}`}
      onClick={handleClick}
    >
      <div
        className={`relative overflow-hidden shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1),0_4px_6px_-1px_rgba(0,0,0,0.1)] hover:shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.1),0_10px_15px_-3px_rgba(0,0,0,0.1)] transition-shadow duration-300 bg-primary-white dark:bg-primary-black
        ${isSquare ? 'w-full pb-[100%]' : ''} `}
      >
        {/* Adicione um div intermediário para o ImageLoader quando for quadrado */}
        {isSquare ? (
          <div className="absolute inset-0">
            {' '}
            {/* Este div garantirá que o ImageLoader preencha o espaço */}
            <ImageLoader
              src={image.url}
              alt={image.alt || 'Image'}
              onLoad={handleLoad}
              onError={handleError}
              // As classes 'w-full h-full object-cover' agora são aplicadas no ImageLoader,
              // mas a 'absolute inset-0' está no div pai para garantir o posicionamento
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <ImageLoader
            src={image.url}
            alt={image.alt || 'Image'}
            onLoad={handleLoad}
            onError={handleError}
            className="group-hover:brightness-95 transition-all duration-300"
          />
        )}
        {/* Indicador de hover sutil */}
        <div className="absolute inset-0 bg-primary-black/5 dark:bg-primary-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </div>
  )
}
