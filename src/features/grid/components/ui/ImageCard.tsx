import React, { useState } from 'react'
import { ImageLoader } from './ImageLoader'
import { ImageCardProps } from '../../types'

export const ImageCard: React.FC<ImageCardProps> = ({
  image,
  onClick,
  onLoad,
  onError,
  className = '',
  isSquare = false
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
                     group-hover:brightness-95 transition-all duration-200`}
        />

        {/* Overlay hover sutil */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      </div>
    </div>
  )
}
