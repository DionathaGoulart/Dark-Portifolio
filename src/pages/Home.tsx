import React, { useState, useEffect } from 'react'
import { batchPreloadImages, ImageItem, MasonryGrid } from '@features/grid'
import { useDocumentTitle } from '@/shared/hooks/useDocumentTitle'
import { useI18n } from '@/shared/contexts/I18nContext'
import { trackEvent } from '@/features/ga'
import { ModalZoom } from '@/features/grid/components/ui/ModalZoom'

// ================================
// INTERFACES & TYPES
// ================================

interface CloudinaryOptions {
  width?: number
  height?: number
  quality?: 'auto' | number
  format?: 'auto' | 'webp' | 'jpg' | 'png'
  crop?: 'fill' | 'fit' | 'scale' | 'pad'
}

interface OptimizedUrls {
  thumbnail: string
  medium: string
  large: string
  original: string
}

interface LoadingState {
  loading: boolean
  lazyLoading: boolean
  error: string | null
}

interface MasonryGridLoaderProps {
  count?: number
}

interface ErrorStateProps {
  error: string
}

// ================================
// CONSTANTS
// ================================

const CLOUDINARY_BASE_URL =
  'https://res.cloudinary.com/dlaxva1qb/image/upload/v1751235158'

const DEFAULT_CLOUDINARY_OPTIONS: CloudinaryOptions = {
  quality: 'auto',
  format: 'auto',
  crop: 'fit'
}

const PRIORITY_IMAGES_COUNT = 12
const MASONRY_HEIGHTS = [
  'h-48',
  'h-64',
  'h-56',
  'h-72',
  'h-52',
  'h-60'
] as const

const COLUMN_CONFIG = {
  sm: 2,
  md: 2,
  lg: 4,
  xl: 4
} as const

const LOADER_KEYFRAMES = `
  @keyframes shimmer {
    0% { transform: translateX(-100%) skewX(-12deg); }
    100% { transform: translateX(200%) skewX(-12deg); }
  }
  @keyframes bounce {
    0%, 80%, 100% { transform: scale(0); }
    40% { transform: scale(1); }
  }
`

const originalPrintUrls = Array.from(
  { length: 30 },
  (_, index) => `${CLOUDINARY_BASE_URL}/${index + 1}.png`
)

// ================================
// HELPER FUNCTIONS
// ================================

/**
 * Optimizes Cloudinary URLs with transformation parameters
 */
const optimizeCloudinaryUrl = (
  url: string,
  options: CloudinaryOptions = {}
): string => {
  const mergedOptions = { ...DEFAULT_CLOUDINARY_OPTIONS, ...options }
  const { width, height, quality, format, crop } = mergedOptions

  const cloudinaryRegex =
    /https:\/\/res\.cloudinary\.com\/([^\/]+)\/image\/upload\/(.+)/
  const match = url.match(cloudinaryRegex)

  if (!match) return url

  const [, cloudName, imagePath] = match
  const transformations: string[] = []

  if (width || height) {
    const dimensions: string[] = []
    if (width) dimensions.push(`w_${width}`)
    if (height) dimensions.push(`h_${height}`)
    if (crop) dimensions.push(`c_${crop}`)
    transformations.push(dimensions.join(','))
  }

  if (quality) transformations.push(`q_${quality}`)
  if (format) transformations.push(`f_${format}`)

  transformations.push('fl_progressive', 'fl_immutable_cache')

  const transformationString = transformations.join('/')
  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformationString}/${imagePath}`
}

/**
 * Generates optimized URLs for different image sizes
 */
const generateOptimizedUrls = (originalUrl: string): OptimizedUrls => ({
  thumbnail: optimizeCloudinaryUrl(originalUrl, {
    width: 400,
    height: 400,
    quality: 70,
    format: 'webp'
  }),
  medium: optimizeCloudinaryUrl(originalUrl, {
    width: 800,
    height: 800,
    quality: 80,
    format: 'webp'
  }),
  large: optimizeCloudinaryUrl(originalUrl, {
    width: 1200,
    height: 1200,
    quality: 85,
    format: 'webp'
  }),
  original: originalUrl
})

/**
 * Processes batch of URLs and returns ImageItems with optimized URLs
 */
const processBatchImages = async (urls: string[]): Promise<ImageItem[]> => {
  const optimizedUrls = urls.map((url) =>
    optimizeCloudinaryUrl(url, {
      width: 600,
      quality: 'auto',
      format: 'auto'
    })
  )

  const preloadedImages = await batchPreloadImages(optimizedUrls)

  return preloadedImages.map((image, index) => ({
    ...image,
    urls: generateOptimizedUrls(urls[index])
  }))
}

// ================================
// SUB COMPONENTS
// ================================

/**
 * Loading skeleton component for masonry grid
 */
const MasonryGridLoader: React.FC<MasonryGridLoaderProps> = ({
  count = 12
}) => (
  <div className="columns-2 md:columns-2 lg:columns-4 xl:columns-4 gap-4 space-y-4">
    <style dangerouslySetInnerHTML={{ __html: LOADER_KEYFRAMES }} />

    {Array.from({ length: count }).map((_, index) => {
      const randomHeight = MASONRY_HEIGHTS[index % MASONRY_HEIGHTS.length]

      return (
        <div
          key={index}
          className={`relative w-full ${randomHeight} overflow-hidden rounded-lg bg-primary-white dark:bg-primary-black border border-primary-black/10 dark:border-primary-white/10 break-inside-avoid mb-4`}
        >
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-black/5 dark:via-primary-white/5 to-transparent transform -skew-x-12"
            style={{
              animation: 'shimmer 2s infinite',
              transform: 'translateX(-100%) skewX(-12deg)'
            }}
          />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex space-x-1">
              {[0, 200, 400].map((delay, dotIndex) => (
                <div
                  key={dotIndex}
                  className="w-2 h-2 bg-primary-black/30 dark:bg-primary-white/30 rounded-full"
                  style={{ animation: `bounce 1.4s infinite ${delay}ms` }}
                />
              ))}
            </div>
          </div>
        </div>
      )
    })}
  </div>
)

/**
 * Lazy loading indicator component
 */
const LazyLoadingIndicator: React.FC = () => (
  <div className="text-center py-8">
    <div className="inline-flex flex-col items-center space-y-3 text-primary-black/70 dark:text-primary-white/70">
      <div className="flex space-x-1">
        {[0, 200, 400].map((delay, index) => (
          <div
            key={index}
            className="w-3 h-3 bg-primary-black/40 dark:bg-primary-white/40 rounded-full"
            style={{ animation: `bounce 1.4s infinite ${delay}ms` }}
          />
        ))}
      </div>
    </div>
  </div>
)

/**
 * Error state component
 */
const ErrorState: React.FC<ErrorStateProps> = ({ error }) => (
  <div className="min-h-screen bg-primary-white dark:bg-primary-black transition-colors duration-300">
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Erro ao carregar imagens
        </h2>
        <p className="text-gray-600 dark:text-gray-400">{error}</p>
      </div>
    </div>
  </div>
)

// ================================
// HOOKS
// ================================

/**
 * Custom hook to handle image loading and state management
 */
const useImageLoader = (t: any) => {
  const [images, setImages] = useState<ImageItem[]>([])
  const [loadingState, setLoadingState] = useState<LoadingState>({
    loading: true,
    lazyLoading: true,
    error: null
  })

  const loadImages = async () => {
    setLoadingState({ loading: true, lazyLoading: true, error: null })

    try {
      // Load priority images first
      const priorityUrls = originalPrintUrls.slice(0, PRIORITY_IMAGES_COUNT)
      const priorityImages = await processBatchImages(priorityUrls)

      setImages(priorityImages)
      setLoadingState((prev) => ({ ...prev, loading: false }))

      trackEvent({
        event_name: 'images_loaded',
        event_parameters: {
          images_count: priorityImages.length,
          load_type: 'priority',
          load_time: 'initial'
        }
      })

      // Load remaining images lazily
      if (originalPrintUrls.length > PRIORITY_IMAGES_COUNT) {
        const remainingUrls = originalPrintUrls.slice(PRIORITY_IMAGES_COUNT)
        const remainingImages = await processBatchImages(remainingUrls)

        setImages((prev) => [...prev, ...remainingImages])

        trackEvent({
          event_name: 'lazy_images_loaded',
          event_parameters: {
            total_images: priorityImages.length + remainingImages.length,
            lazy_images: remainingImages.length,
            load_type: 'lazy'
          }
        })
      }

      setLoadingState((prev) => ({ ...prev, lazyLoading: false }))

      if (priorityImages.length === 0) {
        setLoadingState((prev) => ({
          ...prev,
          error: t.common.noImages || 'Nenhuma imagem encontrada'
        }))
      }
    } catch (err) {
      console.error('Error loading images:', err)

      trackEvent({
        event_name: 'image_load_error',
        event_parameters: {
          error_message: err instanceof Error ? err.message : 'Unknown error',
          error_type: 'batch_load_failure'
        }
      })

      setLoadingState({
        loading: false,
        lazyLoading: false,
        error: t.common.error || 'Erro ao carregar imagens'
      })
    }
  }

  return { images, setImages, loadingState, loadImages }
}

// ================================
// MAIN COMPONENT
// ================================

/**
 * Home page component with masonry grid of images
 * Implements progressive loading for better user experience
 */
export const HomePage: React.FC = () => {
  const { t } = useI18n()
  const { images, setImages, loadingState, loadImages } = useImageLoader(t)
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null)

  useDocumentTitle('home')

  // ================================
  // EFFECTS
  // ================================

  useEffect(() => {
    trackEvent({
      event_name: 'page_view_home',
      event_parameters: {
        page_title: 'Home - Portfolio',
        content_type: 'portfolio_gallery',
        total_images_available: originalPrintUrls.length
      }
    })
  }, [])

  useEffect(() => {
    loadImages()
  }, [t])

  // ================================
  // HANDLERS
  // ================================

  const handleImageClick = (image: ImageItem) => {
    setSelectedImage(image)

    trackEvent({
      event_name: 'image_click',
      event_parameters: {
        image_id: image.id,
        image_title: image.title || 'untitled',
        action: 'open_modal'
      }
    })
  }

  const handleImageError = (image: ImageItem) => {
    console.error(`Error displaying image: ${image.id}`)
    setImages((prev) => prev.filter((img) => img.id !== image.id))

    trackEvent({
      event_name: 'image_display_error',
      event_parameters: {
        image_id: image.id,
        error_type: 'display_failure'
      }
    })
  }

  const handleModalClose = () => {
    if (selectedImage) {
      trackEvent({
        event_name: 'image_modal_close',
        event_parameters: {
          image_id: selectedImage.id,
          action: 'close_modal'
        }
      })
    }
    setSelectedImage(null)
  }

  // ================================
  // EARLY RETURNS
  // ================================

  if (loadingState.error) {
    return <ErrorState error={loadingState.error} />
  }

  // ================================
  // RENDER
  // ================================

  return (
    <div className="min-h-screen bg-primary-white dark:bg-primary-black transition-colors duration-300">
      {!loadingState.loading && loadingState.lazyLoading && (
        <LazyLoadingIndicator />
      )}

      <section className="py-8 px-2 sm:px-8 lg:px-12">
        {loadingState.loading ? (
          <MasonryGridLoader count={12} />
        ) : (
          <MasonryGrid
            images={images}
            loading={false}
            error={null}
            onImageClick={handleImageClick}
            onImageError={handleImageError}
            columnCount={COLUMN_CONFIG}
            gap={3}
          />
        )}
      </section>

      {selectedImage && (
        <ModalZoom image={selectedImage} onClose={handleModalClose} />
      )}
    </div>
  )
}
