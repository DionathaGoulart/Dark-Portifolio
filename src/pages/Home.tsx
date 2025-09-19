import React, { useState, useEffect } from 'react'
import { batchPreloadImages, ImageItem, MasonryGrid } from '@features/grid'
import { useDocumentTitle } from '@/shared/hooks/useDocumentTitle'
import { useI18n } from '@/shared/contexts/I18nContext'

// Função para otimizar URLs do Cloudinary
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

// URLs originais das 35 imagens
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
  'https://res.cloudinary.com/dlaxva1qb/image/upload/v1751235158/24.png'
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

// Componente de loading elegante para o masonry grid
const MasonryGridLoader = ({ count = 12 }: { count?: number }) => (
  <div className="columns-2 md:columns-2 lg:columns-4 xl:columns-4 gap-4 space-y-4">
    {Array.from({ length: count }).map((_, index) => {
      // Varia as alturas para simular um masonry
      const heights = ['h-48', 'h-64', 'h-56', 'h-72', 'h-52', 'h-60']
      const randomHeight = heights[index % heights.length]

      return (
        <div
          key={index}
          className={`relative w-full ${randomHeight} overflow-hidden rounded-lg bg-primary-white dark:bg-primary-black border border-primary-black/10 dark:border-primary-white/10 break-inside-avoid mb-4`}
        >
          <style
            dangerouslySetInnerHTML={{
              __html: `
              @keyframes shimmer {
                0% { transform: translateX(-100%) skewX(-12deg); }
                100% { transform: translateX(200%) skewX(-12deg); }
              }
              @keyframes bounce {
                0%, 80%, 100% { transform: scale(0); }
                40% { transform: scale(1); }
              }
            `
            }}
          />

          {/* Shimmer effect */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-black/5 dark:via-primary-white/5 to-transparent transform -skew-x-12"
            style={{
              animation: 'shimmer 2s infinite',
              transform: 'translateX(-100%) skewX(-12deg)'
            }}
          />

          {/* Bounce dots */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex space-x-1">
              <div
                className="w-2 h-2 bg-primary-black/30 dark:bg-primary-white/30 rounded-full"
                style={{ animation: 'bounce 1.4s infinite 0ms' }}
              />
              <div
                className="w-2 h-2 bg-primary-black/30 dark:bg-primary-white/30 rounded-full"
                style={{ animation: 'bounce 1.4s infinite 200ms' }}
              />
              <div
                className="w-2 h-2 bg-primary-black/30 dark:bg-primary-white/30 rounded-full"
                style={{ animation: 'bounce 1.4s infinite 400ms' }}
              />
            </div>
          </div>
        </div>
      )
    })}
  </div>
)

export const HomePage: React.FC = () => {
  const { t } = useI18n()
  useDocumentTitle('home')

  const [images, setImages] = useState<ImageItem[]>([])
  const [loading, setLoading] = useState(true)
  const [lazyLoading, setLazyLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null)

  useEffect(() => {
    const loadImages = async () => {
      setLoading(true)
      setLazyLoading(true)
      setError(null)

      try {
        // FASE 1: Carrega as primeiras 12 imagens (prioritárias - o que aparece na tela)
        const priorityUrls = originalPrintUrls.slice(0, 12)
        const priorityOptimizedUrls = priorityUrls.map((url) =>
          optimizeCloudinaryUrl(url, {
            width: 600,
            quality: 'auto',
            format: 'auto'
          })
        )

        const priorityImages = await batchPreloadImages(priorityOptimizedUrls)

        const priorityImagesWithUrls = priorityImages.map((image, index) => ({
          ...image,
          urls: generateOptimizedUrls(priorityUrls[index])
        }))

        setImages(priorityImagesWithUrls)
        setLoading(false)

        // FASE 2: Carrega as imagens restantes (23 restantes)
        if (originalPrintUrls.length > 12) {
          const remainingUrls = originalPrintUrls.slice(12)
          const remainingOptimizedUrls = remainingUrls.map((url) =>
            optimizeCloudinaryUrl(url, {
              width: 600,
              quality: 'auto',
              format: 'auto'
            })
          )

          const remainingImages = await batchPreloadImages(
            remainingOptimizedUrls
          )

          const remainingImagesWithUrls = remainingImages.map(
            (image, index) => ({
              ...image,
              urls: generateOptimizedUrls(remainingUrls[index])
            })
          )

          setImages((prev) => [...prev, ...remainingImagesWithUrls])
          setLazyLoading(false)
        } else {
          setLazyLoading(false)
        }

        if (priorityImages.length === 0) {
          setError(t.common.noImages || 'Nenhuma imagem encontrada')
        }
      } catch (err) {
        console.error('❌ Erro ao carregar imagens:', err)
        setError(t.common.error || 'Erro ao carregar imagens')
        setLoading(false)
        setLazyLoading(false)
      }
    }

    loadImages()
  }, [t])

  const handleImageClick = (image: ImageItem) => {
    setSelectedImage(image)
  }

  const handleImageError = (image: ImageItem) => {
    console.error(`❌ Erro ao exibir imagem: ${image.id}`)
    setImages((prev) => prev.filter((img) => img.id !== image.id))
  }

  if (error) {
    return (
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
  }

  return (
    <div className="min-h-screen bg-primary-white dark:bg-primary-black transition-colors duration-300">
      {/* Indicador de carregamento das imagens restantes */}
      {!loading && lazyLoading && (
        <div className="text-center py-8">
          <div className="inline-flex flex-col items-center space-y-3 text-primary-black/70 dark:text-primary-white/70">
            <div className="flex space-x-1">
              <div
                className="w-3 h-3 bg-primary-black/40 dark:bg-primary-white/40 rounded-full"
                style={{ animation: 'bounce 1.4s infinite 0ms' }}
              />
              <div
                className="w-3 h-3 bg-primary-black/40 dark:bg-primary-white/40 rounded-full"
                style={{ animation: 'bounce 1.4s infinite 200ms' }}
              />
              <div
                className="w-3 h-3 bg-primary-black/40 dark:bg-primary-white/40 rounded-full"
                style={{ animation: 'bounce 1.4s infinite 400ms' }}
              />
            </div>
          </div>
        </div>
      )}

      <section className="py-8 px-6 sm:px-8 lg:px-12">
        {loading ? (
          <MasonryGridLoader count={12} />
        ) : (
          <MasonryGrid
            images={images}
            loading={false}
            error={null}
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
        )}
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
