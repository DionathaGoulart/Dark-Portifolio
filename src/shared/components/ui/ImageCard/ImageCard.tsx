import React, { useState } from 'react'

import { ImageLoader } from '@/shared'
import { ImageCardPropsExtended } from '@/types'

// ================================
// CONSTANTES
// ================================

/**
 * Mapeamento de valores object-fit para classes CSS do Tailwind
 */
const OBJECT_FIT_CLASSES = {
  cover: 'object-cover',
  contain: 'object-contain',
  fill: 'object-fill',
  'scale-down': 'object-scale-down',
  none: 'object-none'
} as const

// ================================
// COMPONENTE PRINCIPAL
// ================================

/**
 * Componente ImageCard com efeitos de hover, animações de escala e object-fit customizável
 * Possui overlay de título condicional, tratamento de erros e design responsivo
 */
export const ImageCard: React.FC<ImageCardPropsExtended> = ({
  image,
  onClick,
  onLoad,
  onError,
  className = '',
  isSquare = false,
  showHoverEffect = false,
  enableHoverScale = true,
  objectFit = 'cover',
  showTitle = true,
  disableShadow = false
}) => {
  // ================================
  // ESTADO
  // ================================

  const [isVisible, setIsVisible] = useState(true)

  // ================================
  // VALORES COMPUTADOS
  // ================================

  const objectFitClass = OBJECT_FIT_CLASSES[objectFit]

  const containerClasses = enableHoverScale
    ? 'group cursor-pointer transition-transform duration-300 hover:scale-105'
    : 'group cursor-pointer'

  const shadowClasses = disableShadow
    ? ''
    : showHoverEffect
      ? 'shadow-lg hover:shadow-xl transition-shadow duration-300'
      : 'shadow-lg'

  const imageClasses = showHoverEffect
    ? `w-full h-full ${objectFitClass} group-hover:brightness-75 transition-all duration-300`
    : `w-full h-full ${objectFitClass}`

  // ================================
  // MANIPULADORES DE EVENTOS
  // ================================

  const handleClick = () => onClick?.(image)

  const handleLoad = () => onLoad?.(image)

  const handleError = () => {
    setIsVisible(false)
    onError?.(image)
  }

  // ================================
  // FUNÇÕES AUXILIARES DE RENDERIZAÇÃO
  // ================================

  const renderHoverOverlay = () => {
    if (!showHoverEffect) return null

    return (
      <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    )
  }

  const renderTitleOverlay = () => {
    if (!image.title || !showHoverEffect || !showTitle) return null

    return (
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
    )
  }

  // ================================
  // RETORNOS ANTECIPADOS
  // ================================

  if (!isVisible) return null

  // ================================
  // RENDERIZAÇÃO PRINCIPAL
  // ================================

  return (
    <div className={`${containerClasses} ${className}`} onClick={handleClick}>
      <div
        className={`
          relative overflow-hidden ${shadowClasses}
          bg-transparent dark:bg-transparent w-full h-full
        `}
      >
        <ImageLoader
          src={image.url}
          alt={image.alt || 'Image'}
          onLoad={handleLoad}
          onError={handleError}
          className={imageClasses}
        />

        {renderHoverOverlay()}
        {renderTitleOverlay()}
      </div>
    </div>
  )
}
