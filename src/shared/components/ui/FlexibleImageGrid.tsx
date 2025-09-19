import React, { useState, useEffect } from 'react'
import { ImageCard } from '@/features/grid'
import { ImageItem } from '@/features/grid/types'

// ================================
// INTERFACES & TYPES
// ================================

/**
 * Adaptive rules for different image orientations
 */
interface AdaptiveRules {
  portrait: { aspectRatio: string; objectFit: string }
  landscape: { aspectRatio: string; objectFit: string }
  square: { aspectRatio: string; objectFit: string }
  ultraWide: { aspectRatio: string; objectFit: string }
  ultraTall: { aspectRatio: string; objectFit: string }
}

/**
 * Props for the AdaptiveImageGrid component
 */
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
  adaptiveRules?: AdaptiveRules
}

type ImageOrientation =
  | 'ultraWide'
  | 'landscape'
  | 'square'
  | 'portrait'
  | 'ultraTall'

// ================================
// CONSTANTS & HELPERS
// ================================

const defaultAdaptiveRules: AdaptiveRules = {
  portrait: { aspectRatio: 'portrait', objectFit: 'cover' },
  landscape: { aspectRatio: 'landscape', objectFit: 'cover' },
  square: { aspectRatio: 'square', objectFit: 'cover' },
  ultraWide: { aspectRatio: 'ultrawide', objectFit: 'cover' },
  ultraTall: { aspectRatio: 'tall', objectFit: 'cover' }
}

/**
 * Detects image orientation based on width/height ratio
 */
const detectImageOrientation = (
  width: number,
  height: number
): ImageOrientation => {
  const ratio = width / height

  if (ratio > 2.5) return 'ultraWide'
  if (ratio > 1.3) return 'landscape'
  if (ratio > 0.9 && ratio < 1.1) return 'square'
  if (ratio > 0.4) return 'portrait'
  return 'ultraTall'
}

/**
 * Maps aspect ratio strings to Tailwind classes
 */
const getAspectRatioClass = (aspectRatio: string): string => {
  const aspectRatioMap: Record<string, string> = {
    square: 'aspect-square',
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[4/3]',
    wide: 'aspect-[16/9]',
    ultrawide: 'aspect-[21/9]',
    tall: 'aspect-[2/3]',
    vertical: 'aspect-[9/16]',
    story: 'aspect-[9/16]',
    photo: 'aspect-[5/4]',
    golden: 'aspect-[8/5]',
    cinema: 'aspect-[2/1]',
    banner: 'aspect-[5/1]',
    instagram: 'aspect-square',
    card: 'aspect-[5/6]'
  }

  return aspectRatioMap[aspectRatio] || ''
}

/**
 * Maps gap numbers to Tailwind classes
 */
const getGapClass = (gap: number): string => {
  const gapMap: Record<number, string> = {
    1: 'gap-1',
    2: 'gap-2',
    3: 'gap-3',
    4: 'gap-4',
    6: 'gap-6',
    8: 'gap-8'
  }

  return gapMap[gap] || 'gap-4'
}

// ================================
// MAIN COMPONENT
// ================================

/**
 * Adaptive image grid that automatically adjusts layout based on image orientations
 * Supports various grid configurations and dominant side layouts
 */
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

  // ================================
  // EFFECTS
  // ================================

  useEffect(() => {
    setValidImages(images)

    if (adaptiveMode !== 'auto') return

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
        } catch {
          orientations[image.id] = 'square'
        }
      }

      setImageOrientations(orientations)
    }

    loadImageDimensions()
  }, [images, adaptiveMode])

  // ================================
  // HANDLERS
  // ================================

  const handleImageLoad = (image: ImageItem) => {
    onImageLoad?.(image)
  }

  const handleImageError = (image: ImageItem) => {
    setValidImages((prev) => prev.filter((img) => img.id !== image.id))
    onImageError?.(image)
  }

  // ================================
  // COMPUTED VALUES
  // ================================

  const getAdaptiveAspectRatio = (imageId: string): string => {
    if (adaptiveMode === 'manual') return fallbackAspectRatio

    const orientation = imageOrientations[imageId]
    if (!orientation) return fallbackAspectRatio

    return (
      adaptiveRules[orientation as keyof AdaptiveRules]?.aspectRatio ||
      fallbackAspectRatio
    )
  }

  const getAdaptiveObjectFit = (imageId: string): string => {
    if (adaptiveMode === 'manual') return fallbackObjectFit

    const orientation = imageOrientations[imageId]
    if (!orientation) return fallbackObjectFit

    return (
      adaptiveRules[orientation as keyof AdaptiveRules]?.objectFit ||
      fallbackObjectFit
    )
  }

  const getGridClass = (): string => {
    if (mode === 'solo') return 'grid grid-cols-1'

    if (gridColumns === 2 && dominantSide !== 'none') {
      return 'grid grid-cols-6 auto-rows-fr'
    }

    const gridMap: Record<number, string> = {
      2: 'grid grid-cols-2',
      3: 'grid grid-cols-3',
      4: 'grid grid-cols-4',
      5: 'grid grid-cols-5'
    }

    return gridMap[gridColumns] || 'grid grid-cols-3'
  }

  const getDominanceClasses = (index: number): string => {
    if (mode !== 'grid' || gridColumns !== 2 || dominantSide === 'none') {
      return ''
    }

    const pairIndex = Math.floor(index / 2)
    const positionInPair = index % 2
    const isEvenPair = pairIndex % 2 === 0

    const getDominantClasses = (
      isFirst: boolean,
      isDominant: boolean
    ): string => {
      return isDominant ? 'col-span-4 h-full' : 'col-span-2 h-full'
    }

    if (dominantSide === 'left') {
      const isDominant = positionInPair === 0 ? isEvenPair : !isEvenPair
      return getDominantClasses(positionInPair === 0, isDominant)
    }

    if (dominantSide === 'right') {
      const isDominant = positionInPair === 0 ? !isEvenPair : isEvenPair
      return getDominantClasses(positionInPair === 0, isDominant)
    }

    return ''
  }

  const getAdjustedAspectRatio = (imageId: string, index: number): string => {
    // Remove fixed aspect ratio for dominant grid to allow height adjustment
    if (mode === 'grid' && gridColumns === 2 && dominantSide !== 'none') {
      return 'auto'
    }

    return getAdaptiveAspectRatio(imageId)
  }

  const getCenteringClasses = (
    objectFit: string,
    isDominantGrid: boolean
  ): string => {
    if (
      (objectFit === 'scale-down' || objectFit === 'contain') &&
      isDominantGrid
    ) {
      return 'flex items-center justify-center'
    }
    return ''
  }

  // ================================
  // RENDER HELPERS
  // ================================

  const renderImageCard = (image: ImageItem, index: number) => {
    const dominanceClasses = getDominanceClasses(index)
    const adaptiveAspectRatio = getAdjustedAspectRatio(image.id, index)
    const adaptiveObjectFit = getAdaptiveObjectFit(image.id)
    const aspectClasses = getAspectRatioClass(adaptiveAspectRatio)
    const isDominantGrid =
      mode === 'grid' && gridColumns === 2 && dominantSide !== 'none'
    const centeringClasses = getCenteringClasses(
      adaptiveObjectFit,
      isDominantGrid
    )

    const containerClasses = isDominantGrid
      ? `h-full min-h-[300px] ${centeringClasses}`
      : `${aspectClasses} ${centeringClasses}`

    const imageClasses =
      isDominantGrid &&
      (adaptiveObjectFit === 'scale-down' || adaptiveObjectFit === 'contain')
        ? 'max-w-full max-h-full'
        : 'w-full h-full'

    return (
      <div key={image.id} className={dominanceClasses}>
        <div
          className={`w-full ${containerClasses}`}
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
            className={imageClasses}
          />
        </div>
      </div>
    )
  }

  // ================================
  // RENDER
  // ================================

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
      <div className={`${getGridClass()} ${getGapClass(gap)}`}>
        {validImages.map((image, index) => renderImageCard(image, index))}
      </div>
    </div>
  )
}

// ================================
// CONVENIENCE COMPONENTS
// ================================

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
