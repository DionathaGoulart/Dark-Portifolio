// ================================
// External Imports
// ================================
import { useState, useEffect } from 'react'

// ================================
// Internal Imports
// ================================
import { batchPreloadImages, ImageItem } from '@features/grid'

// ================================
// Types and Interfaces
// ================================

/** Cloudinary URL optimization options */
interface CloudinaryOptions {
  width?: number
  height?: number
  quality?: 'auto' | number
  format?: 'auto' | 'webp' | 'jpg' | 'png'
  crop?: 'fill' | 'fit' | 'scale' | 'pad'
}

/** Optimized URLs for different screen sizes */
interface OptimizedUrls {
  small: string
  medium: string
  large: string
  main: string
}

/** Extended ImageItem with optimized URLs */
export interface OptimizedImageItem extends ImageItem {
  urls: OptimizedUrls
  alt: string
}

/** Image state organized by context */
interface ImageOptimizationState {
  grid: OptimizedImageItem[]
  solo: OptimizedImageItem[]
}

/** Hook return interface */
interface UseImageOptimizationReturn {
  images: ImageOptimizationState
  loading: boolean
  lazyLoading: boolean
  error: string | null
}

// ================================
// Utility Functions
// ================================

/**
 * Optimizes Cloudinary URLs with specified transformations
 * @param url - Original Cloudinary URL
 * @param options - Optimization parameters
 * @returns Optimized URL or original if not Cloudinary
 */
const optimizeCloudinaryUrl = (
  url: string,
  options: CloudinaryOptions = {}
): string => {
  const cloudinaryRegex =
    /https:\/\/res\.cloudinary\.com\/([^\/]+)\/image\/upload\/(.+)/
  const match = url.match(cloudinaryRegex)

  if (!match) return url

  const [, cloudName, imagePath] = match
  const transformations = []

  // Add dimension transformations
  if (options.width || options.height) {
    const dimensions = []
    if (options.width) dimensions.push(`w_${options.width}`)
    if (options.height) dimensions.push(`h_${options.height}`)
    if (options.crop) dimensions.push(`c_${options.crop}`)
    transformations.push(dimensions.join(','))
  }

  // Add quality and format transformations
  if (options.quality) transformations.push(`q_${options.quality}`)
  if (options.format) transformations.push(`f_${options.format}`)

  // Add performance optimizations
  transformations.push('fl_progressive')
  transformations.push('fl_immutable_cache')

  const transformationString = transformations.join('/')

  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformationString}/${imagePath}`
}

/**
 * Generates multiple optimized URL variants for responsive loading
 * @param originalUrl - Base URL to optimize
 * @returns Object with optimized URLs for different screen sizes
 */
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

// ================================
// Custom Hook
// ================================

/**
 * Hook for optimizing and loading images with priority-based loading strategy
 * @param originalUrls - Array of original image URLs
 * @param language - Current language setting
 * @param priorityCount - Number of images to load with high priority
 * @param bypassCache - Flag to bypass cache for development
 * @returns Object containing optimized images and loading states
 */
export const useImageOptimization = (
  originalUrls: string[],
  language: string,
  priorityCount: number = 5,
  bypassCache: boolean = false
): UseImageOptimizationReturn => {
  // ================================
  // State Management
  // ================================
  const [images, setImages] = useState<ImageOptimizationState>({
    grid: [],
    solo: []
  })
  const [loading, setLoading] = useState(true)
  const [lazyLoading, setLazyLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // ================================
  // Image Loading Effect
  // ================================
  useEffect(() => {
    const loadImages = async () => {
      setLoading(true)
      setLazyLoading(true)
      setError(null)

      try {
        // PHASE 1: Load priority images first
        const priorityUrls = originalUrls.slice(0, priorityCount)
        const priorityPromises = priorityUrls.map(
          async (originalUrl, index) => {
            let optimizedUrl = optimizeCloudinaryUrl(originalUrl, {
              width: 1400,
              quality: 95,
              format: 'webp'
            })

            // Add cache-busting for development
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

        // Set priority images for both grid and solo contexts
        setImages({
          grid: validPriorityImages,
          solo: validPriorityImages
        })

        setLoading(false)

        // PHASE 2: Load remaining images
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

              // Add cache-busting for development
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

          // Add remaining images to existing state
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

  // ================================
  // Return Hook API
  // ================================
  return {
    images,
    loading,
    lazyLoading,
    error
  }
}
