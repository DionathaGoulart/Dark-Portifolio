import React, { useState, useEffect } from 'react'
import { batchPreloadImages, ImageItem, MasonryGrid } from '@features/grid'
import { useDocumentTitle } from '@/shared/hooks/useDocumentTitle'
import { useI18n } from '@/shared/contexts/I18nContext'

// Função para otimizar URLs do Cloudinary (mantida igual)
const optimizeCloudinaryUrl = (
  url: string,
  options: {
    width?: number
    height?: number
    quality?: 'auto' | number
    format?: 'auto' | 'webp' | 'jpg' | 'png'
    crop?: 'fill' | 'fit' | 'scale' | 'pad'
  } = {}
) => {
  const {
    width,
    height,
    quality = 'auto',
    format = 'auto',
    crop = 'fit'
  } = options

  const cloudinaryRegex =
    /https:\/\/res\.cloudinary\.com\/([^\/]+)\/image\/upload\/(.+)/
  const match = url.match(cloudinaryRegex)

  if (!match) return url

  const [, cloudName, imagePath] = match

  const transformations = []

  if (width || height) {
    const dimensions = []
    if (width) dimensions.push(`w_${width}`)
    if (height) dimensions.push(`h_${height}`)
    if (crop) dimensions.push(`c_${crop}`)
    transformations.push(dimensions.join(','))
  }

  if (quality) transformations.push(`q_${quality}`)
  if (format) transformations.push(`f_${format}`)

  transformations.push('fl_progressive')
  transformations.push('fl_immutable_cache')

  const transformationString = transformations.join('/')

  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformationString}/${imagePath}`
}

// URLs originais (mantidas iguais)
const originalPrintUrls = [
  'https://res.cloudinary.com/dlaxva1qb/image/upload/v1751235158/1.png',
  'https://res.cloudinary.com/dlaxva1qb/image/upload/v1751235158/2.png',
  'https://res.cloudinary.com/dlaxva1qb/image/upload/v1751235158/3.png',
  'https://res.cloudinary.com/dlaxva1qb/image/upload/v1751235158/4.png',
  'https://res.cloudinary.com/dlaxva1qb/image/upload/v1751235158/5.png',
  'https://res.cloudinary.com/dlaxva1qb/image/upload/v1751235158/6.png',
  'https://res.cloudinary.com/dlaxva1qb/image/upload/v1751235158/7.png',
  'https://res.cloudinary.com/dlaxva1qb/image/upload/v1751235158/8.png',
  'https://res.cloudinary.com/dlaxva1qb/image/upload/v1751235158/9.png',
  'https://res.cloudinary.com/dlaxva1qb/image/upload/v1751235158/10.png',
  'https://res.cloudinary.com/dlaxva1qb/image/upload/v1751235158/11.png',
  'https://res.cloudinary.com/dlaxva1qb/image/upload/v1751235158/12.png',
  'https://res.cloudinary.com/dlaxva1qb/image/upload/v1751235158/13.png',
  'https://res.cloudinary.com/dlaxva1qb/image/upload/v1751235158/14.png',
  'https://res.cloudinary.com/dlaxva1qb/image/upload/v1751235158/15.png',
  'https://res.cloudinary.com/dlaxva1qb/image/upload/v1751235158/16.png',
  'https://res.cloudinary.com/dlaxva1qb/image/upload/v1751235158/17.png',
  'https://res.cloudinary.com/dlaxva1qb/image/upload/v1751235158/18.png',
  'https://res.cloudinary.com/dlaxva1qb/image/upload/v1751235158/19.png',
  'https://res.cloudinary.com/dlaxva1qb/image/upload/v1751235158/20.png',
  'https://res.cloudinary.com/dlaxva1qb/image/upload/v1751235158/21.png',
  'https://res.cloudinary.com/dlaxva1qb/image/upload/v1751235158/22.png',
  'https://res.cloudinary.com/dlaxva1qb/image/upload/v1751235158/23.png',
  'https://res.cloudinary.com/dlaxva1qb/image/upload/v1751235158/24.png',
  'https://res.cloudinary.com/dlaxva1qb/image/upload/v1751235158/25.png',
  'https://res.cloudinary.com/dlaxva1qb/image/upload/v1751235158/26.png',
  'https://res.cloudinary.com/dlaxva1qb/image/upload/v1751235158/27.png',
  'https://res.cloudinary.com/dlaxva1qb/image/upload/v1751235158/28.png',
  'https://res.cloudinary.com/dlaxva1qb/image/upload/v1751235158/29.png',
  'https://res.cloudinary.com/dlaxva1qb/image/upload/v1751235158/30.png',
  'https://res.cloudinary.com/dlaxva1qb/image/upload/v1751235158/31.png',
  'https://res.cloudinary.com/dlaxva1qb/image/upload/v1751235158/32.png',
  'https://res.cloudinary.com/dlaxva1qb/image/upload/v1751235158/33.png',
  'https://res.cloudinary.com/dlaxva1qb/image/upload/v1751235158/34.png',
  'https://res.cloudinary.com/dlaxva1qb/image/upload/v1751235158/35.png'
]

const generateOptimizedUrls = (originalUrl: string) => {
  return {
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
  }
}

const optimizedPrintUrls = originalPrintUrls.map((url) =>
  optimizeCloudinaryUrl(url, {
    width: 600,
    quality: 'auto',
    format: 'auto'
  })
)

export const HomePage: React.FC = () => {
  const { t } = useI18n()
  useDocumentTitle('home')

  const [images, setImages] = useState<ImageItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null)

  useEffect(() => {
    const loadImages = async () => {
      setLoading(true)
      setError(null)

      try {
        const validImages = await batchPreloadImages(optimizedPrintUrls)

        const imagesWithMultipleResolutions = validImages.map(
          (image, index) => ({
            ...image,
            urls: generateOptimizedUrls(originalPrintUrls[index])
          })
        )

        setImages(imagesWithMultipleResolutions)

        if (validImages.length === 0) {
          setError(t.common.noImages)
        }
      } catch (err) {
        setError(t.common.error)
        console.error('Error loading images:', err)
      } finally {
        setLoading(false)
      }
    }

    loadImages()
  }, [t])

  const handleImageClick = (image: ImageItem) => {
    setSelectedImage(image)
  }

  const handleImageError = (image: ImageItem) => {
    setImages((prev) => prev.filter((img) => img.id !== image.id))
  }

  return (
    <div className="min-h-screen bg-primary-white dark:bg-primary-black transition-colors duration-300">
      <section className="py-8 px-6 sm:px-8 lg:px-12">
        <MasonryGrid
          images={images}
          loading={loading}
          error={error}
          onImageClick={handleImageClick}
          onImageError={handleImageError}
          columnCount={{
            sm: 2,
            md: 2,
            lg: 4,
            xl: 4
          }}
          gap={4}
        />
      </section>

      {/* Modal de imagem ampliada */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-primary-black/90 flex items-center justify-center z-50 p-4 cursor-pointer"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage.urls?.large || selectedImage.url}
            alt={selectedImage.alt || ''}
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Fechar com ESC */}
          <button
            className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 transition-colors"
            onClick={() => setSelectedImage(null)}
            aria-label="Fechar"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  )
}
