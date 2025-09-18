// src/features/grid/hooks/useImageOptimization.ts
import { useState, useEffect } from 'react'
import { batchPreloadImages, ImageItem } from '@features/grid'

const optimizeCloudinaryUrl = (
  url: string,
  options: {
    width?: number
    height?: number
    quality?: 'auto' | number
    format?: 'auto' | 'webp' | 'jpg' | 'png'
    crop?: 'fill' | 'fit' | 'scale' | 'pad'
  } = {}
): string => {
  const cloudinaryRegex =
    /https:\/\/res\.cloudinary\.com\/([^\/]+)\/image\/upload\/(.+)/
  const match = url.match(cloudinaryRegex)

  if (!match) return url

  const [, cloudName, imagePath] = match

  const transformations = []

  if (options.width || options.height) {
    const dimensions = []
    if (options.width) dimensions.push(`w_${options.width}`)
    if (options.height) dimensions.push(`h_${options.height}`)
    if (options.crop) dimensions.push(`c_${options.crop}`)
    transformations.push(dimensions.join(','))
  }

  if (options.quality) transformations.push(`q_${options.quality}`)
  if (options.format) transformations.push(`f_${options.format}`)

  transformations.push('fl_progressive')
  transformations.push('fl_immutable_cache')

  const transformationString = transformations.join('/')

  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformationString}/${imagePath}`
}

interface OptimizedUrls {
  small: string
  medium: string
  large: string
  main: string
}

const generateContextOptimizedUrls = (
  originalUrl: string,
  context: 'solo' | 'grid'
): OptimizedUrls => {
  if (context === 'solo') {
    return {
      small: optimizeCloudinaryUrl(originalUrl, {
        width: 800,
        quality: 85,
        format: 'webp'
      }),
      medium: optimizeCloudinaryUrl(originalUrl, {
        width: 1400,
        quality: 90,
        format: 'webp'
      }),
      large: optimizeCloudinaryUrl(originalUrl, {
        width: 2000,
        quality: 95,
        format: 'webp'
      }),
      main: optimizeCloudinaryUrl(originalUrl, {
        width: 1200,
        quality: 85,
        format: 'webp'
      })
    }
  } else {
    return {
      small: optimizeCloudinaryUrl(originalUrl, {
        width: 400,
        quality: 70,
        format: 'webp'
      }),
      medium: optimizeCloudinaryUrl(originalUrl, {
        width: 800,
        quality: 80,
        format: 'webp'
      }),
      large: optimizeCloudinaryUrl(originalUrl, {
        width: 1200,
        quality: 85,
        format: 'webp'
      }),
      main: optimizeCloudinaryUrl(originalUrl, {
        width: 600,
        quality: 'auto',
        format: 'auto'
      })
    }
  }
}

export interface OptimizedImageItem extends ImageItem {
  urls: OptimizedUrls
  alt: string
}

interface ImageOptimizationState {
  grid: OptimizedImageItem[]
  solo: OptimizedImageItem[]
}

interface LoadingState {
  priority: boolean
  lazy: boolean
}

// Mapa das imagens que aparecem primeiro baseado no seu layout
const getVisibleImageMap = () => {
  return {
    // Primeiras 3 imagens no grid de 3 colunas
    grid: [0, 1, 2, 5, 6, 10, 11, 13, 14], // índices que aparecem em grids
    solo: [3, 4, 7, 8, 9, 12, 15], // índices que aparecem em solo
    // Ordem de prioridade baseada na posição visual
    priority: [0, 1, 2, 3, 4] // primeiras 5 imagens que o usuário vê
  }
}

export const useImageOptimization = (
  originalUrls: string[],
  language: string,
  priorityCount: number = 5
) => {
  const [images, setImages] = useState<ImageOptimizationState>({
    grid: [],
    solo: []
  })
  const [loading, setLoading] = useState<LoadingState>({
    priority: true,
    lazy: true
  })
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadImages = async () => {
      setLoading({ priority: true, lazy: true })
      setError(null)

      try {
        const visibleMap = getVisibleImageMap()

        const priorityPromises = visibleMap.priority.map(async (index) => {
          const originalUrl = originalUrls[index]
          if (!originalUrl) return null

          // Determina se esta imagem aparece em grid ou solo
          const isInGrid = visibleMap.grid.includes(index)
          const context = isInGrid ? 'grid' : 'solo'

          // Carrega apenas no contexto necessário
          const optimizedUrl =
            context === 'grid'
              ? optimizeCloudinaryUrl(originalUrl, {
                  width: 600,
                  quality: 'auto',
                  format: 'auto'
                })
              : optimizeCloudinaryUrl(originalUrl, {
                  width: 1200,
                  quality: 85,
                  format: 'webp'
                })

          const [validImage] = await batchPreloadImages([optimizedUrl])

          if (validImage) {
            return {
              index,
              context,
              image: {
                ...validImage,
                urls: generateContextOptimizedUrls(originalUrl, context),
                alt: `Image design ${index + 1}`
              } as OptimizedImageItem
            }
          }
          return null
        })

        const priorityResults = await Promise.all(priorityPromises)
        const validPriorityResults = priorityResults.filter(Boolean) as Array<{
          index: number
          context: 'grid' | 'solo'
          image: OptimizedImageItem
        }>

        // Organiza as imagens por contexto
        const initialGridImages: OptimizedImageItem[] = []
        const initialSoloImages: OptimizedImageItem[] = []

        // Cria arrays com placeholders para manter os índices corretos
        for (let i = 0; i < originalUrls.length; i++) {
          initialGridImages[i] = null as any
          initialSoloImages[i] = null as any
        }

        // Preenche com as imagens carregadas
        validPriorityResults.forEach(({ index, context, image }) => {
          if (context === 'grid') {
            initialGridImages[index] = image
          } else {
            initialSoloImages[index] = image
          }
        })

        setImages({
          grid: initialGridImages.filter(Boolean),
          solo: initialSoloImages.filter(Boolean)
        })

        setLoading((prev) => ({ ...prev, priority: false }))

        // FASE 2: Carrega as imagens restantes de forma inteligente
        const loadRemainingImages = async () => {
          const remainingPromises = originalUrls.map(
            async (originalUrl, index) => {
              // Pula se já foi carregada na fase prioritária
              if (visibleMap.priority.includes(index)) return null

              const isInGrid = visibleMap.grid.includes(index)
              const context = isInGrid ? 'grid' : 'solo'

              // Carrega as duas versões para imagens não prioritárias
              const gridUrl = optimizeCloudinaryUrl(originalUrl, {
                width: 600,
                quality: 'auto',
                format: 'auto'
              })
              const soloUrl = optimizeCloudinaryUrl(originalUrl, {
                width: 1200,
                quality: 85,
                format: 'webp'
              })

              const [validGridImage] = await batchPreloadImages([gridUrl])
              const [validSoloImage] = await batchPreloadImages([soloUrl])

              return {
                index,
                gridImage: validGridImage
                  ? ({
                      ...validGridImage,
                      urls: generateContextOptimizedUrls(originalUrl, 'grid'),
                      alt: `Image design ${index + 1}`
                    } as OptimizedImageItem)
                  : null,
                soloImage: validSoloImage
                  ? ({
                      ...validSoloImage,
                      urls: generateContextOptimizedUrls(originalUrl, 'solo'),
                      alt: `Image design ${index + 1}`
                    } as OptimizedImageItem)
                  : null
              }
            }
          )

          const remainingResults = await Promise.all(remainingPromises)
          const validRemainingResults = remainingResults.filter(
            Boolean
          ) as Array<{
            index: number
            gridImage: OptimizedImageItem | null
            soloImage: OptimizedImageItem | null
          }>

          // Atualiza o estado com as imagens restantes
          setImages((prevImages) => {
            const newGridImages = [...prevImages.grid]
            const newSoloImages = [...prevImages.solo]

            // Garante que os arrays tenham o tamanho correto
            while (newGridImages.length < originalUrls.length) {
              newGridImages.push(null as any)
            }
            while (newSoloImages.length < originalUrls.length) {
              newSoloImages.push(null as any)
            }

            validRemainingResults.forEach(({ index, gridImage, soloImage }) => {
              if (gridImage) newGridImages[index] = gridImage
              if (soloImage) newSoloImages[index] = soloImage
            })

            return {
              grid: newGridImages.filter(Boolean),
              solo: newSoloImages.filter(Boolean)
            }
          })

          setLoading((prev) => ({ ...prev, lazy: false }))
        }

        // Inicia o carregamento das imagens restantes após um pequeno delay
        setTimeout(() => {
          loadRemainingImages()
        }, 100)
      } catch (err) {
        setError('Failed to load images.')
        setLoading({ priority: false, lazy: false })
      }
    }

    loadImages()
  }, [originalUrls, language, priorityCount])

  return {
    images,
    loading: loading.priority,
    lazyLoading: loading.lazy,
    error
  }
}
