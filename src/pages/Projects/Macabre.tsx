import React, { useState, useEffect } from 'react'
import { batchPreloadImages, ImageItem } from '@features/grid'
import { useI18n } from '@/shared/contexts/I18nContext'
import {
  AdaptiveImageGrid,
  AdaptiveSoloGrid,
  AdaptiveThreeColumnGrid,
  AdaptiveTwoColumnGrid
} from '@/shared/components/ui/FlexibleImageGrid'
import { ModalZoom } from '@/features/grid/components/ui/ModalZoom'

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

// URLs das 12 imagens
const originalUrls = [
  'https://res.cloudinary.com/dlaxva1qb/image/upload/v1758048739/pj2_1.webp',
  'https://res.cloudinary.com/dlaxva1qb/image/upload/v1758048739/pj2_2.webp',
  'https://res.cloudinary.com/dlaxva1qb/image/upload/v1758048739/pj2_3.webp',
  'https://res.cloudinary.com/dlaxva1qb/image/upload/v1758048739/pj2_4.webp',
  'https://res.cloudinary.com/dlaxva1qb/image/upload/v1758048739/pj2_5.webp',
  'https://res.cloudinary.com/dlaxva1qb/image/upload/v1758048739/pj2_6.webp',
  'https://res.cloudinary.com/dlaxva1qb/image/upload/v1758048739/pj2_7.webp',
  'https://res.cloudinary.com/dlaxva1qb/image/upload/v1758048739/pj2_8.webp',
  'https://res.cloudinary.com/dlaxva1qb/image/upload/v1758048739/pj2_9.webp',
  'https://res.cloudinary.com/dlaxva1qb/image/upload/v1758048739/pj2_10.webp',
  'https://res.cloudinary.com/dlaxva1qb/image/upload/v1758048739/pj2_11.webp',
  'https://res.cloudinary.com/dlaxva1qb/image/upload/v1758048739/pj2_12.webp'
]

// Função para gerar URLs otimizadas para diferentes contextos
const generateContextOptimizedUrls = (
  originalUrl: string,
  context: 'solo' | 'grid'
) => {
  if (context === 'solo') {
    return {
      small: optimizeCloudinaryUrl(originalUrl, {
        width: 800,
        height: 800,
        quality: 85,
        format: 'webp'
      }),
      medium: optimizeCloudinaryUrl(originalUrl, {
        width: 1400,
        height: 1400,
        quality: 90,
        format: 'webp'
      }),
      large: optimizeCloudinaryUrl(originalUrl, {
        width: 2000,
        height: 2000,
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
      main: optimizeCloudinaryUrl(originalUrl, {
        width: 600,
        quality: 'auto',
        format: 'auto'
      })
    }
  }
}

const generateOptimizedUrls = (originalUrl: string) => {
  return {
    small: optimizeCloudinaryUrl(originalUrl, {
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
    })
  }
}

// URLs otimizadas para grid (qualidade padrão)
const optimizedUrls = originalUrls.map((url) =>
  optimizeCloudinaryUrl(url, {
    width: 600,
    quality: 'auto',
    format: 'auto'
  })
)

// URLs otimizadas para solo (alta qualidade)
const optimizedSoloUrls = originalUrls.map((url) =>
  optimizeCloudinaryUrl(url, {
    width: 1200,
    quality: 85,
    format: 'webp'
  })
)

// Configuração personalizada de adaptação para horror art
const horrorAdaptiveRules = {
  portrait: { aspectRatio: 'card', objectFit: 'cover' },
  landscape: { aspectRatio: 'wide', objectFit: 'cover' },
  square: { aspectRatio: 'square', objectFit: 'cover' },
  ultraWide: { aspectRatio: 'cinema', objectFit: 'cover' },
  ultraTall: { aspectRatio: 'tall', objectFit: 'contain' }
}

export const Macabre: React.FC = () => {
  const { language } = useI18n()

  const [images, setImages] = useState<{
    grid: ImageItem[]
    solo: ImageItem[]
  }>({ grid: [], solo: [] })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null)

  // Define os textos diretamente no componente
  const pageTexts = {
    pt: {
      title: 'Macabre',
      description:
        'Uma coleção de designs macabros, com uma estética sombria e cativante. As imagens se adaptam automaticamente para se encaixar em qualquer dispositivo.'
    },
    en: {
      title: 'Macabre',
      description:
        'A collection of macabre designs, with a dark and captivating aesthetic. The images automatically adapt to fit any device.'
    }
  }

  const texts = pageTexts[language as keyof typeof pageTexts] || pageTexts.en

  // Define o título do documento manualmente
  useEffect(() => {
    document.title = `${texts.title} - Dark`
  }, [texts.title])

  // Carrega as imagens
  useEffect(() => {
    const loadImages = async () => {
      setLoading(true)
      setError(null)

      try {
        const validGridImages = await batchPreloadImages(optimizedUrls)
        const validSoloImages = await batchPreloadImages(optimizedSoloUrls)

        const gridImages = validGridImages.map((image, index) => ({
          ...image,
          urls: generateOptimizedUrls(originalUrls[index]),
          alt: `${texts.title} - Design ${index + 1}`,
          context: 'grid' as const
        }))

        const soloImages = validSoloImages.map((image, index) => ({
          ...image,
          id: `solo-${image.id}`,
          url: optimizedSoloUrls[index],
          urls: generateContextOptimizedUrls(originalUrls[index], 'solo'),
          alt: `${texts.title} - Design ${index + 1}`,
          context: 'solo' as const
        }))

        setImages({ grid: gridImages, solo: soloImages })
        setLoading(false)
      } catch (e) {
        setError('Failed to load images.')
        console.error(e)
        setLoading(false)
      }
    }

    loadImages()
  }, [texts.title])

  const handleImageClick = (image: any) => {
    setSelectedImage(image)
  }

  const handleCloseModal = () => {
    setSelectedImage(null)
  }

  const handleImageError = (image: ImageItem) => {
    console.error(`Failed to load image: ${image.url}`)
  }

  return (
    <div className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <section className="py-8 px-6 sm:px-8 lg:px-12">
          {/* Título centralizado */}
          {/* Grid adaptativo - as imagens se ajustam automaticamente */}
          <div className="space-y-8">
            {/* Grid de 3 colunas - usando imagens otimizadas para grid */}
            <div className="mb-12 sm:px-16">
              <AdaptiveThreeColumnGrid
                images={images.grid.slice(0, 3)}
                adaptiveMode="manual"
                fallbackAspectRatio="card"
                adaptiveRules={horrorAdaptiveRules}
                onImageClick={handleImageClick}
                onImageError={handleImageError}
                gap={1}
              />
            </div>

            {/* Imagem solo - usando imagem otimizada para solo (alta qualidade) */}
            <div className="mb-12">
              <AdaptiveSoloGrid
                images={images.solo.slice(3, 4)}
                adaptiveMode="manual"
                fallbackAspectRatio="card"
                adaptiveRules={horrorAdaptiveRules}
                onImageClick={handleImageClick}
                onImageError={handleImageError}
                gap={1}
              />
            </div>

            {/* Imagem solo - usando imagem otimizada para solo (alta qualidade) */}
            <div className="mb-12">
              <AdaptiveSoloGrid
                images={images.solo.slice(4, 5)}
                adaptiveMode="manual"
                fallbackAspectRatio="portrait"
                adaptiveRules={horrorAdaptiveRules}
                onImageClick={handleImageClick}
                onImageError={handleImageError}
                gap={1}
              />
            </div>

            {/* Mais uma seção solo - alta qualidade */}
            <div className="mb-12">
              <AdaptiveSoloGrid
                images={images.solo.slice(5, 6)}
                adaptiveMode="manual"
                fallbackAspectRatio="card"
                fallbackObjectFit="contain"
                adaptiveRules={horrorAdaptiveRules}
                onImageClick={handleImageClick}
                onImageError={handleImageError}
                gap={1}
              />
            </div>

            {/* Mais uma seção solo - alta qualidade */}
            <div className="mb-12">
              <AdaptiveSoloGrid
                images={images.solo.slice(6, 7)}
                adaptiveMode="manual"
                fallbackAspectRatio="card"
                adaptiveRules={horrorAdaptiveRules}
                onImageClick={handleImageClick}
                onImageError={handleImageError}
                gap={1}
              />
            </div>

            {/* Mais uma seção solo - alta qualidade */}
            <div className="mb-12">
              <AdaptiveSoloGrid
                images={images.solo.slice(7, 8)}
                adaptiveMode="manual"
                fallbackAspectRatio="wide"
                adaptiveRules={horrorAdaptiveRules}
                onImageClick={handleImageClick}
                onImageError={handleImageError}
                gap={1}
              />
            </div>

            {/* Mais uma seção solo - alta qualidade */}
            <div className="mb-12">
              <AdaptiveSoloGrid
                images={images.solo.slice(8, 9)}
                adaptiveMode="manual"
                fallbackAspectRatio="portrait"
                adaptiveRules={horrorAdaptiveRules}
                onImageClick={handleImageClick}
                onImageError={handleImageError}
                gap={1}
              />
            </div>

            {/* Mais uma seção solo - alta qualidade */}
            <div className="mb-12">
              <AdaptiveSoloGrid
                images={images.solo.slice(9, 10)}
                adaptiveMode="manual"
                fallbackAspectRatio="portrait"
                adaptiveRules={horrorAdaptiveRules}
                onImageClick={handleImageClick}
                onImageError={handleImageError}
                gap={1}
              />
            </div>

            {/* Mais uma seção solo - alta qualidade */}
            <div className="mb-12">
              <AdaptiveSoloGrid
                images={images.solo.slice(10, 11)}
                adaptiveMode="manual"
                fallbackAspectRatio="portrait"
                adaptiveRules={horrorAdaptiveRules}
                onImageClick={handleImageClick}
                onImageError={handleImageError}
                gap={1}
              />
            </div>

            {/* Imagem solo final - alta qualidade */}
            <div className="mb-12">
              <AdaptiveSoloGrid
                images={images.solo.slice(11, 12)}
                adaptiveMode="manual"
                fallbackAspectRatio="wide"
                adaptiveRules={horrorAdaptiveRules}
                onImageClick={handleImageClick}
                onImageError={handleImageError}
                gap={1}
              />
            </div>
          </div>
        </section>
      </div>

      {selectedImage && (
        <ModalZoom image={selectedImage} onClose={handleCloseModal} />
      )}
    </div>
  )
}
