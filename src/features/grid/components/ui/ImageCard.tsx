import React, { useState } from 'react'
import { ImageLoader } from './ImageLoader'
import { ImageCardProps } from '../../types'

// Atualização da interface ImageCardProps para incluir as novas props
export interface ImageCardPropsExtended extends ImageCardProps {
  enableHoverScale?: boolean
  objectFit?: 'cover' | 'contain' | 'fill' | 'scale-down' | 'none'
  showTitle?: boolean
}

// Object fit classes mapping
const objectFitClasses = {
  cover: 'object-cover',
  contain: 'object-contain',
  fill: 'object-fill',
  'scale-down': 'object-scale-down',
  none: 'object-none'
}

export const ImageCard: React.FC<ImageCardPropsExtended> = ({
  image,
  onClick,
  onLoad,
  onError,
  className = '',
  isSquare = false,
  showHoverEffect = false,
  enableHoverScale = true, // Padrão ativado para não quebrar código existente
  objectFit = 'cover', // Nova prop com padrão cover
  showTitle = true // Nova prop para controlar exibição do título
}) => {
  const [isVisible, setIsVisible] = useState(true)

  const handleClick = () => onClick?.(image)
  const handleLoad = () => onLoad?.(image)
  const handleError = () => {
    setIsVisible(false)
    onError?.(image)
  }

  if (!isVisible) return null

  const objectFitClass = objectFitClasses[objectFit]

  // Se hover está desabilitado, não aplicamos nenhuma transição
  const containerClasses = enableHoverScale
    ? 'group cursor-pointer transition-transform duration-300 hover:scale-105'
    : 'group cursor-pointer'

  const shadowClasses = showHoverEffect
    ? 'shadow-lg hover:shadow-xl transition-shadow duration-300'
    : 'shadow-lg'

  const imageClasses = showHoverEffect
    ? `w-full h-full ${objectFitClass} group-hover:brightness-75 transition-all duration-300`
    : `w-full h-full ${objectFitClass}`

  return (
    <div className={`${containerClasses} ${className}`} onClick={handleClick}>
      <div
        className={`
          relative overflow-hidden ${shadowClasses}
          bg-white dark:bg-gray-900 w-full h-full
        `}
      >
        <ImageLoader
          src={image.url}
          alt={image.alt || 'Image'}
          onLoad={handleLoad}
          onError={handleError}
          className={imageClasses}
        />

        {/* Overlay hover sutil - só aparece se showHoverEffect for true */}
        {showHoverEffect && (
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        )}

        {/* Título overlay - só aparece se showHoverEffect, showTitle forem true e houver título */}
        {image.title && showHoverEffect && showTitle && (
          <div
            className={`
              absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent
              p-4 transform transition-all duration-300 ease-out
              translate-y-0 opacity-100
              md:translate-y-full md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100
            `}
          >
            <h3 className="text-white font-semibold text-lg leading-tight drop-shadow-lg">
              {image.title}
            </h3>
          </div>
        )}
      </div>
    </div>
  )
}
