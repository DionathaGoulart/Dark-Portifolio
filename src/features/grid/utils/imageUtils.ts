import { ImageItem } from '../types'

export const generateImageId = (url: string, index?: number): string => {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substr(2, 9)
  return `img-${index ?? 0}-${timestamp}-${random}`
}

export const isValidImageUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url)
    return ['http:', 'https:'].includes(urlObj.protocol)
  } catch {
    return false
  }
}

export const createImageFromUrl = (url: string, index?: number): ImageItem => {
  return {
    id: generateImageId(url, index),
    url,
    alt: `Image ${(index ?? 0) + 1}`,
    title: `Image ${(index ?? 0) + 1}`,
    urls: undefined
  }
}

export const createImagesFromUrls = (urls: string[]): ImageItem[] => {
  return urls
    .filter((url) => url.trim() && isValidImageUrl(url.trim()))
    .map((url, index) => createImageFromUrl(url.trim(), index))
}

export const getImageDimensions = (
  url: string
): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight })
    }
    img.onerror = reject
    img.src = url
  })
}

export const preloadImage = (url: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve(true)
    img.onerror = () => resolve(false)
    img.src = url

    // Timeout após 10 segundos
    setTimeout(() => resolve(false), 10000)
  })
}

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
