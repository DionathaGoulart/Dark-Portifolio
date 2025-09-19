import { ImageCard } from '@/features/grid'
import { ImageItem } from '@/features/grid/types'
import React, { useState, useEffect } from 'react'

export interface AdaptiveImageGridProps {
  images?: ImageItem[]
  mode?: 'solo' | 'grid'
  gridColumns?: 2 | 3 | 4 | 5
  adaptiveMode?: 'auto' | 'manual'
  fallbackAspectRatio?:
    | 'auto'
    | 'square'
    | 'portrait'
    | 'landscape'
    | 'wide'
    | 'ultrawide'
    | 'tall'
    | 'photo'
    | 'golden'
    | 'cinema'
    | 'vertical'
    | 'instagram'
    | 'story'
    | 'banner'
    | 'card'
  fallbackObjectFit?: 'cover' | 'contain' | 'fill' | 'scale-down' | 'none'
  dominantSide?: 'left' | 'right' | 'none'
  gap?: number
  className?: string
  onImageClick?: (image: ImageItem) => void
  onImageLoad?: (image: ImageItem) => void
  onImageError?: (image: ImageItem) => void
  loading?: boolean
  error?: string | null
  // Configurações de adaptação
  adaptiveRules?: {
    portrait: { aspectRatio: string; objectFit: string }
    landscape: { aspectRatio: string; objectFit: string }
    square: { aspectRatio: string; objectFit: string }
    ultraWide: { aspectRatio: string; objectFit: string }
    ultraTall: { aspectRatio: string; objectFit: string }
  }
}

// Função para detectar a orientação da imagem baseada nas dimensões
const detectImageOrientation = (width: number, height: number) => {
  const ratio = width / height

  if (ratio > 2.5) return 'ultraWide' // Muito largo (ex: 21:9, banners)
  if (ratio > 1.3) return 'landscape' // Paisagem (ex: 16:9, 4:3)
  if (ratio > 0.9 && ratio < 1.1) return 'square' // Quadrado (aprox 1:1)
  if (ratio > 0.4) return 'portrait' // Retrato (ex: 3:4, 9:16)
  return 'ultraTall' // Muito alto (ex: banners verticais)
}

// Configurações padrão de adaptação
const defaultAdaptiveRules = {
  portrait: { aspectRatio: 'portrait', objectFit: 'cover' },
  landscape: { aspectRatio: 'landscape', objectFit: 'cover' },
  square: { aspectRatio: 'square', objectFit: 'cover' },
  ultraWide: { aspectRatio: 'ultrawide', objectFit: 'cover' },
  ultraTall: { aspectRatio: 'tall', objectFit: 'cover' }
}

export const AdaptiveImageGrid: React.FC<AdaptiveImageGridProps> = ({
  images = [],
  mode = 'grid',
  gridColumns = 3,
  adaptiveMode = 'auto',
  fallbackAspectRatio = 'auto',
  fallbackObjectFit = 'cover',
  dominantSide = 'none',
  gap = 4,
  className = '',
  onImageClick,
  onImageLoad,
  onImageError,
  loading = false,
  error = null,
  adaptiveRules = defaultAdaptiveRules
}) => {
  const [validImages, setValidImages] = useState<ImageItem[]>(images)
  const [imageOrientations, setImageOrientations] = useState<
    Record<string, string>
  >({})

  useEffect(() => {
    setValidImages(images)

    // Se modo adaptativo está ativado, detecta orientações das imagens
    if (adaptiveMode === 'auto') {
      const loadImageDimensions = async () => {
        const orientations: Record<string, string> = {}

        for (const image of images) {
          try {
            const img = new Image()
            img.src = image.url

            await new Promise((resolve, reject) => {
              img.onload = () => {
                const orientation = detectImageOrientation(
                  img.naturalWidth,
                  img.naturalHeight
                )
                orientations[image.id] = orientation
                resolve(img)
              }
              img.onerror = reject
            })
          } catch (error) {
            // Se falhar ao carregar, usa fallback
            orientations[image.id] = 'square'
          }
        }

        setImageOrientations(orientations)
      }

      loadImageDimensions()
    }
  }, [images, adaptiveMode])

  const handleImageLoad = (image: ImageItem) => {
    if (onImageLoad) {
      onImageLoad(image)
    }
  }

  const handleImageError = (image: ImageItem) => {
    setValidImages((prev) => prev.filter((img) => img.id !== image.id))
    if (onImageError) {
      onImageError(image)
    }
  }

  // Função para obter aspect ratio adaptativo
  const getAdaptiveAspectRatio = (imageId: string) => {
    if (adaptiveMode === 'manual') return fallbackAspectRatio

    const orientation = imageOrientations[imageId]
    if (!orientation) return fallbackAspectRatio

    return (
      adaptiveRules[orientation as keyof typeof adaptiveRules]?.aspectRatio ||
      fallbackAspectRatio
    )
  }

  // Função para obter object-fit adaptativo
  const getAdaptiveObjectFit = (imageId: string) => {
    if (adaptiveMode === 'manual') return fallbackObjectFit

    const orientation = imageOrientations[imageId]
    if (!orientation) return fallbackObjectFit

    return (
      adaptiveRules[orientation as keyof typeof adaptiveRules]?.objectFit ||
      fallbackObjectFit
    )
  }

  // Função para obter classes de aspect ratio
  const getAspectRatioClass = (aspectRatio: string) => {
    switch (aspectRatio) {
      case 'square':
        return 'aspect-square'
      case 'portrait':
        return 'aspect-[3/4]'
      case 'landscape':
        return 'aspect-[4/3]'
      case 'wide':
        return 'aspect-[16/9]'
      case 'ultrawide':
        return 'aspect-[21/9]'
      case 'tall':
        return 'aspect-[2/3]'
      case 'vertical':
        return 'aspect-[9/16]'
      case 'story':
        return 'aspect-[9/16]'
      case 'photo':
        return 'aspect-[5/4]'
      case 'golden':
        return 'aspect-[8/5]'
      case 'cinema':
        return 'aspect-[2/1]'
      case 'banner':
        return 'aspect-[5/1]'
      case 'instagram':
        return 'aspect-square'
      case 'card':
        return 'aspect-[5/6]'
      default:
        return ''
    }
  }

  // Função para obter classes de gap
  const getGapClass = () => {
    switch (gap) {
      case 1:
        return 'gap-1'
      case 2:
        return 'gap-2'
      case 3:
        return 'gap-3'
      case 4:
        return 'gap-4'
      case 6:
        return 'gap-6'
      case 8:
        return 'gap-8'
      default:
        return 'gap-4'
    }
  }

  // Função para obter classes de grid
  const getGridClass = () => {
    if (mode === 'solo') return 'grid grid-cols-1'

    // Para 2 colunas com dominantSide, usamos uma configuração específica
    if (gridColumns === 2 && dominantSide !== 'none') {
      return 'grid grid-cols-6 auto-rows-fr' // 6 colunas para proporções 4:2
    }

    switch (gridColumns) {
      case 2:
        return 'grid grid-cols-2'
      case 3:
        return 'grid grid-cols-3'
      case 4:
        return 'grid grid-cols-4'
      case 5:
        return 'grid grid-cols-5'
      default:
        return 'grid grid-cols-3'
    }
  }

  // Função para classes de dominância
  const getDominanceClasses = (index: number) => {
    if (mode !== 'grid' || gridColumns !== 2 || dominantSide === 'none') {
      return ''
    }

    const pairIndex = Math.floor(index / 2) // Qual par de imagens (0, 1, 2...)
    const positionInPair = index % 2 // Posição dentro do par (0 = primeira, 1 = segunda)

    // Alterna a dominância a cada par para criar um padrão interessante
    const isEvenPair = pairIndex % 2 === 0

    if (dominantSide === 'left') {
      if (positionInPair === 0) {
        // Primeira imagem do par
        return isEvenPair ? 'col-span-4 h-full' : 'col-span-2 h-full'
      } else {
        // Segunda imagem do par
        return isEvenPair ? 'col-span-2 h-full' : 'col-span-4 h-full'
      }
    }

    if (dominantSide === 'right') {
      if (positionInPair === 0) {
        // Primeira imagem do par
        return isEvenPair ? 'col-span-2 h-full' : 'col-span-4 h-full'
      } else {
        // Segunda imagem do par
        return isEvenPair ? 'col-span-4 h-full' : 'col-span-2 h-full'
      }
    }

    return ''
  }

  // Função para obter aspect ratio ajustado para dominância
  const getAdjustedAspectRatio = (imageId: string, index: number) => {
    // Se há dominância em grid de 2 colunas, remove aspect ratio fixo
    // para permitir que as imagens se ajustem à altura da linha
    if (mode === 'grid' && gridColumns === 2 && dominantSide !== 'none') {
      return 'auto' // Remove aspect ratio fixo
    }

    return getAdaptiveAspectRatio(imageId)
  }

  // NOVA FUNÇÃO: Para obter classes de centralização quando usa scale-down
  const getCenteringClasses = (objectFit: string, isDominantGrid: boolean) => {
    // Se é scale-down ou contain E está em grid dominante, centraliza
    if (
      (objectFit === 'scale-down' || objectFit === 'contain') &&
      isDominantGrid
    ) {
      return 'flex items-center justify-center'
    }
    return ''
  }

  const renderImageCard = (image: ImageItem, index: number) => {
    const dominanceClasses = getDominanceClasses(index)
    const adaptiveAspectRatio = getAdjustedAspectRatio(image.id, index)
    const adaptiveObjectFit = getAdaptiveObjectFit(image.id)
    const aspectClasses = getAspectRatioClass(adaptiveAspectRatio)

    // Para dominantSide em grid de 2 colunas, usa height 100% em vez de aspect ratio fixo
    const isDominantGrid =
      mode === 'grid' && gridColumns === 2 && dominantSide !== 'none'

    // Classes para centralização quando necessário
    const centeringClasses = getCenteringClasses(
      adaptiveObjectFit,
      isDominantGrid
    )

    return (
      <div key={image.id} className={`${dominanceClasses}`}>
        <div
          className={`w-full ${
            isDominantGrid
              ? `h-full min-h-[300px] ${centeringClasses}`
              : `${aspectClasses} ${centeringClasses}`
          }`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <ImageCard
            image={image}
            onClick={onImageClick}
            onLoad={handleImageLoad}
            onError={handleImageError}
            isSquare={false}
            objectFit={adaptiveObjectFit as any}
            showHoverEffect={false}
            enableHoverScale={false}
            showTitle={false}
            className={`${
              isDominantGrid &&
              (adaptiveObjectFit === 'scale-down' ||
                adaptiveObjectFit === 'contain')
                ? 'max-w-full max-h-full' // Garante que a imagem não ultrapasse os limites do container
                : 'w-full h-full'
            }`}
          />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div
        className={`w-full flex items-center justify-center p-8 ${className}`}
      >
        <div className="text-center">
          <div className="text-red-500 dark:text-red-400 text-lg mb-2">
            ⚠️ Erro ao carregar imagens
          </div>
          <p className="text-gray-600 dark:text-gray-400">{error}</p>
        </div>
      </div>
    )
  }

  if (validImages.length === 0 && !loading) {
    return <></>
  }

  return (
    <div className={`w-full ${className}`}>
      <div className={`${getGridClass()} ${getGapClass()}`}>
        {validImages.map((image, index) => renderImageCard(image, index))}
      </div>
    </div>
  )
}

// Componentes de conveniência
export const AdaptiveSoloGrid: React.FC<
  Omit<AdaptiveImageGridProps, 'mode'>
> = (props) => <AdaptiveImageGrid {...props} mode="solo" />

export const AdaptiveTwoColumnGrid: React.FC<
  Omit<AdaptiveImageGridProps, 'mode' | 'gridColumns'>
> = (props) => <AdaptiveImageGrid {...props} mode="grid" gridColumns={2} />

export const AdaptiveThreeColumnGrid: React.FC<
  Omit<AdaptiveImageGridProps, 'mode' | 'gridColumns'>
> = (props) => <AdaptiveImageGrid {...props} mode="grid" gridColumns={3} />

export const AdaptiveFourColumnGrid: React.FC<
  Omit<AdaptiveImageGridProps, 'mode' | 'gridColumns'>
> = (props) => <AdaptiveImageGrid {...props} mode="grid" gridColumns={4} />

export const AdaptiveFiveColumnGrid: React.FC<
  Omit<AdaptiveImageGridProps, 'mode' | 'gridColumns'>
> = (props) => <AdaptiveImageGrid {...props} mode="grid" gridColumns={5} />
