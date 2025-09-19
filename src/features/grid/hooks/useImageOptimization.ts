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

const generateOptimizedUrls = (originalUrl: string): OptimizedUrls => {
  return {
    small: optimizeCloudinaryUrl(originalUrl, {
      width: 800,
      quality: 90,
      format: 'webp'
    }),
    medium: optimizeCloudinaryUrl(originalUrl, {
      width: 1400,
      quality: 95,
      format: 'webp'
    }),
    large: optimizeCloudinaryUrl(originalUrl, {
      width: 2000,
      quality: 95,
      format: 'webp'
    }),
    main: optimizeCloudinaryUrl(originalUrl, {
      width: 1200,
      quality: 95,
      format: 'webp'
    })
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

export const useImageOptimization = (
  originalUrls: string[],
  language: string,
  priorityCount: number = 5,
  bypassCache: boolean = false // Adicione este parâmetro para desenvolvimento
) => {
  const [images, setImages] = useState<ImageOptimizationState>({
    grid: [],
    solo: []
  })
  const [loading, setLoading] = useState(true)
  const [lazyLoading, setLazyLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadImages = async () => {
      setLoading(true)
      setLazyLoading(true)
      setError(null)

      try {
        // FASE 1: Carrega as imagens prioritárias primeiro
        const priorityUrls = originalUrls.slice(0, priorityCount)
        const priorityPromises = priorityUrls.map(
          async (originalUrl, index) => {
            let optimizedUrl = optimizeCloudinaryUrl(originalUrl, {
              width: 1400,
              quality: 95,
              format: 'webp'
            })

            // Para desenvolvimento: adiciona timestamp para evitar cache
            if (bypassCache) {
              optimizedUrl += `?t=${Date.now()}&i=${index}`
            }

            const [validImage] = await batchPreloadImages([optimizedUrl])

            if (validImage) {
              return {
                ...validImage,
                urls: generateOptimizedUrls(originalUrl),
                alt: `Image design ${index + 1}`
              } as OptimizedImageItem
            }
            return null
          }
        )

        const priorityResults = await Promise.all(priorityPromises)
        const validPriorityImages = priorityResults.filter(
          Boolean
        ) as OptimizedImageItem[]

        // Define as imagens prioritárias em ambos os contextos (grid e solo)
        setImages({
          grid: validPriorityImages,
          solo: validPriorityImages
        })

        setLoading(false)

        // FASE 2: Carrega as imagens restantes
        if (originalUrls.length > priorityCount) {
          const remainingUrls = originalUrls.slice(priorityCount)
          const remainingPromises = remainingUrls.map(
            async (originalUrl, index) => {
              const actualIndex = index + priorityCount
              let optimizedUrl = optimizeCloudinaryUrl(originalUrl, {
                width: 1400,
                quality: 95,
                format: 'webp'
              })

              // Para desenvolvimento: adiciona timestamp para evitar cache
              if (bypassCache) {
                optimizedUrl += `?t=${Date.now()}&i=${actualIndex}`
              }

              const [validImage] = await batchPreloadImages([optimizedUrl])

              if (validImage) {
                return {
                  ...validImage,
                  urls: generateOptimizedUrls(originalUrl),
                  alt: `Image design ${actualIndex + 1}`
                } as OptimizedImageItem
              }
              return null
            }
          )

          const remainingResults = await Promise.all(remainingPromises)
          const validRemainingImages = remainingResults.filter(
            Boolean
          ) as OptimizedImageItem[]

          // Adiciona as imagens restantes
          setImages((prevImages) => {
            const allImages = [...validPriorityImages, ...validRemainingImages]
            return {
              grid: allImages,
              solo: allImages
            }
          })
        }

        setLazyLoading(false)
      } catch (err) {
        setError('Failed to load images.')
        setLoading(false)
        setLazyLoading(false)
      }
    }

    loadImages()
  }, [originalUrls, language, priorityCount, bypassCache])

  return {
    images,
    loading,
    lazyLoading,
    error
  }
}
