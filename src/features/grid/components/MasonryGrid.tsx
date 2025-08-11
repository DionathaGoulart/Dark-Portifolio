import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { ImageCard } from './ui/ImageCard'
import { GridLoadingSkeleton } from './ui/LoadingSkeleton'
import { MasonryGridProps, ImageItem } from '../types'

export const MasonryGrid: React.FC<MasonryGridProps> = ({
  images,
  columnCount = {
    sm: 1,
    md: 2,
    lg: 4,
    xl: 4
  },
  gap = 4,
  className = '',
  onImageClick,
  onImageLoad,
  onImageError,
  loading = false,
  error = null,
  isSquareGrid = false
}) => {
  const [validImages, setValidImages] = useState<ImageItem[]>([])
  const [loadedCount, setLoadedCount] = useState(0)
  const [columns, setColumns] = useState<ImageItem[][]>([])
  
  // Inicializa currentColumns com um valor padrão válido
  const [currentColumns, setCurrentColumns] = useState(() => {
    // Inicializa com um valor padrão baseado no columnCount
    const width = typeof window !== 'undefined' ? window.innerWidth : 1024
    if (width < 640) return columnCount.sm
    if (width < 1024) return columnCount.md
    if (width < 1280) return columnCount.lg
    return columnCount.xl
  })
  
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setValidImages(images)
    setLoadedCount(0)
  }, [images])

  // Determina o número de colunas baseado no tamanho da tela
  useLayoutEffect(() => {
    const updateColumns = () => {
      if (!containerRef.current) return

      const width = window.innerWidth
      let cols = columnCount.lg

      if (width < 640) cols = columnCount.sm
      else if (width < 1024) cols = columnCount.md
      else if (width < 1280) cols = columnCount.lg
      else cols = columnCount.xl

      // Só atualiza se realmente mudou para evitar re-renders desnecessários
      setCurrentColumns(prevCols => prevCols !== cols ? cols : prevCols)
    }

    updateColumns()
    window.addEventListener('resize', updateColumns)
    return () => window.removeEventListener('resize', updateColumns)
  }, [columnCount])

  // Distribui as imagens pelas colunas de forma sequencial (como Pinterest)
  useEffect(() => {
    if (validImages.length === 0 || currentColumns === 0) {
      setColumns([])
      return
    }

    // Cria arrays vazios para cada coluna
    const newColumns: ImageItem[][] = Array.from(
      { length: currentColumns },
      () => []
    )

    // Distribui as imagens sequencialmente
    // 1ª imagem -> coluna 0, 2ª -> coluna 1, 3ª -> coluna 2, 4ª -> coluna 0...
    validImages.forEach((image, index) => {
      const columnIndex = index % currentColumns
      newColumns[columnIndex].push(image)
    })

    setColumns(newColumns)
  }, [validImages, currentColumns])

  const handleImageLoad = (image: ImageItem) => {
    setLoadedCount((prev) => prev + 1)
    onImageLoad?.(image)
  }

  const handleError = (image: ImageItem) => {
    setValidImages((prev) => prev.filter((img) => img.id !== image.id))
    onImageError?.(image)
  }

  const getGapClass = () => {
    return `gap-${gap}`
  }

  const getPaddingClass = () => {
    // Mapeia valores de gap para classes de padding específicas
    const paddingMap: { [key: number]: string } = {
      1: 'p-0.5',
      2: 'p-1',
      3: 'p-1.5',
      4: 'p-2',
      5: 'p-2.5',
      6: 'p-3',
      8: 'p-4'
    }
    return paddingMap[gap] || 'p-2'
  }

  const getNegativeMarginClass = () => {
    // Mapeia valores de gap para classes de margem negativa específicas
    const marginMap: { [key: number]: string } = {
      1: '-m-0.5',
      2: '-m-1',
      3: '-m-1.5',
      4: '-m-2',
      5: '-m-2.5',
      6: '-m-3',
      8: '-m-4'
    }
    return marginMap[gap] || '-m-2'
  }

  if (loading) {
    return (
      <div className={`w-full ${className}`}>
        <GridLoadingSkeleton count={12} />
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
          <p className="text-primary-black/60 dark:text-primary-white/60">
            {error}
          </p>
        </div>
      </div>
    )
  }

  if (validImages.length === 0) {
    return (
      <div
        className={`w-full flex items-center justify-center p-8 ${className}`}
      >
        <div className="text-center">
          <div className="text-primary-black/70 dark:text-primary-white/70 text-lg mb-2">
            📷 Nenhuma imagem disponível
          </div>
        </div>
      </div>
    )
  }

  return (
    <div ref={containerRef} className={`w-full ${className}`}>
      {/* Masonry Grid estilo Pinterest com padding uniforme */}
      <div className={`flex ${getNegativeMarginClass()}`}>
        {columns.map((columnImages, columnIndex) => (
          <div key={columnIndex} className="flex-1 flex flex-col">
            {columnImages.map((image) => (
              <div key={image.id} className={`w-full ${getPaddingClass()}`}>
                <ImageCard
                  image={image}
                  onClick={onImageClick}
                  onLoad={handleImageLoad}
                  onError={handleError}
                  isSquare={isSquareGrid}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}