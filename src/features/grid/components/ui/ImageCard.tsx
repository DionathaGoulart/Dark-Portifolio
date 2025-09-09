import React, { useState } from 'react'
import { ImageLoader } from './ImageLoader'
import { ImageCardProps } from '../../types'

export const ImageCard: React.FC<ImageCardProps> = ({
  image,
  onClick,
  onLoad,
  onError,
  className = '',
  isSquare = false,
  showHoverEffect = false
}) => {
  const [isVisible, setIsVisible] = useState(true)

  const handleClick = () => onClick?.(image)
  const handleLoad = () => onLoad?.(image)
  const handleError = () => {
    setIsVisible(false)
    onError?.(image)
  }

  if (!isVisible) return null

  return (
    <div
      className={`group cursor-pointer transition-transform duration-200 hover:scale-105 ${className}`}
      onClick={handleClick}
    >
      <div
        className={`
          relative overflow-hidden shadow-lg hover:shadow-xl
          transition-shadow duration-200 bg-white dark:bg-gray-900
          ${isSquare ? 'aspect-square' : ''}
        `}
      >
        <ImageLoader
          src={image.url}
          alt={image.alt || 'Image'}
          onLoad={handleLoad}
          onError={handleError}
          className={`w-full h-full ${isSquare ? 'object-cover' : ''}
            ${showHoverEffect ? 'group-hover:brightness-75' : ''}
            transition-all duration-200`}
        />

        {/* Overlay hover sutil - só aparece se showHoverEffect for true */}
        {showHoverEffect && (
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        )}

        {/* Título overlay - só aparece se showHoverEffect for true */}
        {image.title && showHoverEffect && (
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
