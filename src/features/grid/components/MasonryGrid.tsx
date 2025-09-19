import React, { useState, useEffect, useRef, useMemo } from 'react'
import { ImageCard } from './ui/ImageCard'
import { MasonryGridProps, ImageItem } from '../types'

// ================================
// INTERFACES & TYPES
// ================================

/**
 * Extended props interface for MasonryGrid component
 */
interface MasonryGridPropsExtended extends MasonryGridProps {
  objectFit?: 'cover' | 'contain' | 'fill' | 'scale-down' | 'none'
}

// ================================
// UTILITIES
// ================================

/**
 * Debounce utility to optimize resize events
 */
const debounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout
  return (...args: any[]) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(null, args), wait)
  }
}

// ================================
// CUSTOM HOOKS
// ================================

/**
 * Hook to manage responsive columns based on screen width
 */
const useResponsiveColumns = (columnCount: MasonryGridProps['columnCount']) => {
  const getInitialColumns = () => {
    if (typeof window === 'undefined') return columnCount?.lg || 3

    const width = window.innerWidth
    if (width < 640) return columnCount?.sm || 1
    if (width < 1024) return columnCount?.md || 2
    if (width < 1280) return columnCount?.lg || 3
    return columnCount?.xl || 4
  }

  const [columns, setColumns] = useState(getInitialColumns)

  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth
      let newCols = columnCount?.lg || 3

      if (width < 640) newCols = columnCount?.sm || 1
      else if (width < 1024) newCols = columnCount?.md || 2
      else if (width < 1280) newCols = columnCount?.lg || 3
      else newCols = columnCount?.xl || 4

      setColumns((prev) => (prev !== newCols ? newCols : prev))
    }

    const debouncedUpdate = debounce(updateColumns, 150)
    window.addEventListener('resize', debouncedUpdate)
    return () => window.removeEventListener('resize', debouncedUpdate)
  }, [columnCount])

  return columns
}

// ================================
// MAIN COMPONENT
// ================================

/**
 * MasonryGrid component for displaying images in a masonry layout
 * Supports responsive columns, hover effects, and various image fit modes
 */
export const MasonryGrid: React.FC<MasonryGridPropsExtended> = ({
  images = [],
  columnCount = { sm: 1, md: 2, lg: 3, xl: 4 },
  gap = 4,
  className = '',
  onImageClick,
  onImageLoad,
  onImageError,
  loading = false,
  error = null,
  isSquareGrid = false,
  showHoverEffect = false,
  objectFit = 'cover'
}) => {
  // ================================
  // STATE & REFS
  // ================================

  const [validImages, setValidImages] = useState<ImageItem[]>(images)
  const containerRef = useRef<HTMLDivElement>(null)
  const currentColumns = useResponsiveColumns(columnCount)

  // ================================
  // EFFECTS
  // ================================

  useEffect(() => {
    setValidImages(images)
  }, [images])

  // ================================
  // COMPUTED VALUES
  // ================================

  const distributedColumns = useMemo(() => {
    if (validImages.length === 0 || currentColumns === 0) return []

    const columns: ImageItem[][] = Array.from(
      { length: currentColumns },
      () => []
    )

    validImages.forEach((image, index) => {
      columns[index % currentColumns].push(image)
    })

    return columns
  }, [validImages, currentColumns])

  const gapClasses = useMemo(
    () => ({
      container: `-m-${gap}`,
      item: `p-${gap}`
    }),
    [gap]
  )

  // ================================
  // EVENT HANDLERS
  // ================================

  const handleImageLoad = (image: ImageItem) => onImageLoad?.(image)

  const handleImageError = (image: ImageItem) => {
    setValidImages((prev) => prev.filter((img) => img.id !== image.id))
    onImageError?.(image)
  }

  // ================================
  // EARLY RETURNS
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
    return (
      <div
        className={`w-full flex items-center justify-center p-8 ${className}`}
      >
        <div className="text-center">
          <div className="text-gray-700 dark:text-gray-300 text-lg">
            📷 Nenhuma imagem disponível
          </div>
        </div>
      </div>
    )
  }

  // ================================
  // MAIN RENDER
  // ================================

  return (
    <div ref={containerRef} className={`w-full ${className}`}>
      <div className={`flex ${gapClasses.container}`}>
        {distributedColumns.map((columnImages, columnIndex) => (
          <div key={columnIndex} className="flex-1 flex flex-col">
            {columnImages.map((image) => (
              <div key={image.id} className={`w-full ${gapClasses.item}`}>
                <ImageCard
                  image={image}
                  onClick={onImageClick}
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                  isSquare={isSquareGrid}
                  showHoverEffect={showHoverEffect}
                  objectFit={objectFit}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
