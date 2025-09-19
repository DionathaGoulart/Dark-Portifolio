// ================================
// Internal Imports
// ================================
import { ImageItem } from '../types'

// ================================
// Constants
// ================================

/** Default timeout for image preloading (in milliseconds) */
const IMAGE_PRELOAD_TIMEOUT = 10000

// ================================
// ID Generation Utilities
// ================================

/**
 * Generates a unique identifier for an image
 * @param url - The image URL
 * @param index - Optional index for sequential identification
 * @returns Unique image ID string
 */
export const generateImageId = (url: string, index?: number): string => {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substr(2, 9)
  return `img-${index ?? 0}-${timestamp}-${random}`
}

// ================================
// URL Validation Utilities
// ================================

/**
 * Validates if a string is a valid HTTP/HTTPS image URL
 * @param url - URL string to validate
 * @returns True if valid HTTP/HTTPS URL, false otherwise
 */
export const isValidImageUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url)
    return ['http:', 'https:'].includes(urlObj.protocol)
  } catch {
    return false
  }
}

// ================================
// Image Creation Utilities
// ================================

/**
 * Creates an ImageItem object from a URL
 * @param url - Image URL
 * @param index - Optional index for identification and alt text
 * @returns ImageItem with generated ID and basic properties
 */
export const createImageFromUrl = (url: string, index?: number): ImageItem => {
  const imageNumber = (index ?? 0) + 1

  return {
    id: generateImageId(url, index),
    url,
    alt: `Image ${imageNumber}`,
    title: `Image ${imageNumber}`,
    urls: undefined
  }
}

/**
 * Creates an array of ImageItem objects from URL strings
 * Filters out invalid URLs and creates proper ImageItem objects
 * @param urls - Array of image URL strings
 * @returns Array of valid ImageItem objects
 */
export const createImagesFromUrls = (urls: string[]): ImageItem[] => {
  return urls
    .filter((url) => url.trim() && isValidImageUrl(url.trim()))
    .map((url, index) => createImageFromUrl(url.trim(), index))
}

// ================================
// Image Dimension Utilities
// ================================

/**
 * Gets the natural dimensions of an image
 * @param url - Image URL to measure
 * @returns Promise resolving to width and height in pixels
 */
export const getImageDimensions = (
  url: string
): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image()

    img.onload = () => {
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight
      })
    }

    img.onerror = reject
    img.src = url
  })
}

// ================================
// Image Preloading Utilities
// ================================

/**
 * Preloads a single image and returns success status
 * @param url - Image URL to preload
 * @returns Promise resolving to true if loaded successfully, false otherwise
 */
export const preloadImage = (url: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image()

    img.onload = () => resolve(true)
    img.onerror = () => resolve(false)
    img.src = url

    // Timeout fallback
    setTimeout(() => resolve(false), IMAGE_PRELOAD_TIMEOUT)
  })
}

/**
 * Preloads multiple images in parallel and returns successfully loaded ones
 * @param urls - Array of image URLs to preload
 * @returns Promise resolving to array of ImageItem objects for successfully loaded images
 */
export const batchPreloadImages = async (
  urls: string[]
): Promise<ImageItem[]> => {
  const results = await Promise.allSettled(
    urls.map(async (url, index) => {
      const isValid = await preloadImage(url)

      if (isValid) {
        return createImageFromUrl(url, index)
      }

      throw new Error(`Failed to load: ${url}`)
    })
  )

  return results
    .filter(
      (result): result is PromiseFulfilledResult<ImageItem> =>
        result.status === 'fulfilled'
    )
    .map((result) => result.value)
}
