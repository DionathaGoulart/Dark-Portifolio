import React, { useState, useEffect } from 'react'

// ================================
// INTERFACES E TIPOS
// ================================

interface ImageData {
  src: string
  alt?: string
}

interface FullscreenModalProps {
  image: ImageData
  isOpen: boolean
  onClose: () => void
}

interface ImageGridProps {
  images: ImageData[]
  columns: Columns
  twoColumnLayout?: TwoColumnLayout
  aspectRatio?: AspectRatio
  objectFit?: ObjectFit
  rounded?: Rounded
  gap?: Gap
  className?: string
  enableFullscreen?: boolean
}

type AspectRatio = '1/1' | '16/9' | '4/3' | '3/2' | '2/1' | '3/4' | '9/16'
type ObjectFit = 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
type Rounded = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'
type Gap = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10' | '12'
type Columns = 1 | 2 | 3 | 4 | 5
type TwoColumnLayout = 'equal' | 'left-dominant' | 'right-dominant'

// ================================
// CONSTANTES
// ================================

const aspectRatioClasses: Record<AspectRatio, string> = {
  '1/1': 'aspect-square',
  '16/9': 'aspect-video',
  '4/3': 'aspect-[4/3]',
  '3/2': 'aspect-[3/2]',
  '2/1': 'aspect-[2/1]',
  '3/4': 'aspect-[3/4]',
  '9/16': 'aspect-[9/16]'
}

const objectFitClasses: Record<ObjectFit, string> = {
  cover: 'object-cover',
  contain: 'object-contain',
  fill: 'object-fill',
  none: 'object-none',
  'scale-down': 'object-scale-down'
}

const roundedClasses: Record<Rounded, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  '3xl': 'rounded-3xl',
  full: 'rounded-full'
}

const gapClasses: Record<Gap, string> = {
  '0': 'gap-0',
  '1': 'gap-1',
  '2': 'gap-2',
  '3': 'gap-3',
  '4': 'gap-4',
  '5': 'gap-5',
  '6': 'gap-6',
  '8': 'gap-8',
  '10': 'gap-10',
  '12': 'gap-12'
}

const twoColumnLayoutClasses: Record<TwoColumnLayout, string> = {
  equal: 'grid-cols-2',
  'left-dominant': 'grid-cols-[2fr_1fr]',
  'right-dominant': 'grid-cols-[1fr_2fr]'
}

const columnClasses: Record<Columns, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2', // Será sobrescrito por twoColumnLayout
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5'
}

// ================================
// COMPONENTES AUXILIARES
// ================================

/**
 * Componente modal de tela cheia para exibir imagens
 */
const FullscreenModal: React.FC<FullscreenModalProps> = ({
  image,
  isOpen,
  onClose
}) => {
  // Gerencia o scroll do corpo quando o modal está aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Gerencia a tecla ESC para fechar o modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen || !image) return null

  return (
    <div
      className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <button
          onClick={(e) => {
            e.stopPropagation()
            onClose()
          }}
          className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all duration-200 flex items-center justify-center group"
          aria-label="Fechar imagem"
        >
          <svg
            className="w-6 h-6 group-hover:scale-110 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="w-full h-full p-16 flex items-center justify-center">
          <img
            src={image.src}
            alt={image.alt || 'Imagem em tela cheia'}
            className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            draggable={false}
          />
        </div>
      </div>
    </div>
  )
}

// ================================
// FUNÇÕES AUXILIARES
// ================================

/**
 * Obtém classes de colunas da grade baseadas na contagem de colunas e layout
 */
const getGridClasses = (
  columns: Columns,
  twoColumnLayout: TwoColumnLayout
): string => {
  if (columns === 2) {
    return twoColumnLayoutClasses[twoColumnLayout]
  }
  return columnClasses[columns]
}

// ================================
// COMPONENTE PRINCIPAL
// ================================

/**
 * Componente de grade de imagens responsiva com suporte a modal de tela cheia
 * Suporta vários layouts de colunas, proporções e opções de estilização
 */
const ImageGrid: React.FC<ImageGridProps> = ({
  images,
  columns,
  twoColumnLayout = 'equal',
  aspectRatio = '16/9',
  objectFit = 'cover',
  rounded = 'none',
  gap = '1',
  className = '',
  enableFullscreen = true
}) => {
  const [fullscreenImage, setFullscreenImage] = useState<ImageData | null>(null)

  // ================================
  // VALORES COMPUTADOS
  // ================================

  const gridClasses = [
    'grid',
    getGridClasses(columns, twoColumnLayout),
    gapClasses[gap],
    className
  ]
    .filter(Boolean)
    .join(' ')

  const imageClasses = [
    'w-full',
    'h-full',
    aspectRatioClasses[aspectRatio],
    objectFitClasses[objectFit],
    roundedClasses[rounded],
    enableFullscreen ? 'cursor-pointer' : ''
  ]
    .filter(Boolean)
    .join(' ')

  // ================================
  // MANIPULADORES
  // ================================

  const handleImageClick = (image: ImageData) => {
    if (enableFullscreen) {
      setFullscreenImage(image)
    }
  }

  const closeFullscreen = () => {
    setFullscreenImage(null)
  }

  // ================================
  // RENDERIZAÇÃO
  // ================================

  return (
    <>
      <div className={gridClasses}>
        {images.map((image, index) => (
          <div
            key={index}
            className={`overflow-hidden ${roundedClasses[rounded]}`}
          >
            <img
              src={image.src}
              alt={image.alt || `Imagem ${index + 1}`}
              className={imageClasses}
              loading="lazy"
              onClick={() => handleImageClick(image)}
            />
          </div>
        ))}
      </div>

      {enableFullscreen && (
        <FullscreenModal
          image={fullscreenImage!}
          isOpen={!!fullscreenImage}
          onClose={closeFullscreen}
        />
      )}
    </>
  )
}

// ================================
// EXPORTAÇÕES
// ================================

export default ImageGrid
