import React, { useState, useEffect } from 'react'
import { batchPreloadImages, ImageItem } from '@features/grid'
import { useI18n } from '@/shared/contexts/I18nContext'
import {
  AdaptiveImageGrid,
  AdaptiveSoloGrid,
  AdaptiveThreeColumnGrid,
  AdaptiveTwoColumnGrid
} from '@/shared/components/ui/FlexibleImageGrid'

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

// URLs das 13 imagens
const originalUrls = [
  'https://res.cloudinary.com/dlaxva1qb/image/upload/v1758048739/p6_1.webp',
  'https://res.cloudinary.com/dlaxva1qb/image/upload/v1758048739/p6_2.webp',
  'https://res.cloudinary.com/dlaxva1qb/image/upload/v1758048739/p6_3.webp',
  'https://res.cloudinary.com/dlaxva1qb/image/upload/v1758048739/p6_4.webp',
  'https://res.cloudinary.com/dlaxva1qb/image/upload/v1758048739/p6_5.webp',
  'https://res.cloudinary.com/dlaxva1qb/image/upload/v1758048739/p6_6.webp',
  'https://res.cloudinary.com/dlaxva1qb/image/upload/v1758048739/p6_7.webp',
  'https://res.cloudinary.com/dlaxva1qb/image/upload/v1758048739/p6_8.webp',
  'https://res.cloudinary.com/dlaxva1qb/image/upload/v1758048739/p6_9.webp',
  'https://res.cloudinary.com/dlaxva1qb/image/upload/v1758048739/p6_10.webp',
  'https://res.cloudinary.com/dlaxva1qb/image/upload/v1758048739/p6_11.webp',
  'https://res.cloudinary.com/dlaxva1qb/image/upload/v1758048739/p6_12.webp'
]

// Função para gerar URLs otimizadas para diferentes contextos
const generateContextOptimizedUrls = (
  originalUrl: string,
  context: 'solo' | 'grid'
) => {
  if (context === 'solo') {
    // Para imagens solo: alta qualidade e tamanhos maiores
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
      // URL principal também em alta qualidade para solos
      main: optimizeCloudinaryUrl(originalUrl, {
        width: 1200,
        quality: 85,
        format: 'webp'
      })
    }
  } else {
    // Para grids: qualidade padrão
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
      // URL principal padrão para grids
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
  portrait: { aspectRatio: 'card', objectFit: 'cover' }, // Imagens altas ficam em formato card
  landscape: { aspectRatio: 'wide', objectFit: 'cover' }, // Imagens largas ficam wide
  square: { aspectRatio: 'square', objectFit: 'cover' }, // Quadradas ficam quadradas
  ultraWide: { aspectRatio: 'cinema', objectFit: 'cover' }, // Muito largas ficam cinema
  ultraTall: { aspectRatio: 'tall', objectFit: 'contain' } // Muito altas ficam com contain para mostrar tudo
}

export const Halloween: React.FC = () => {
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
      title: 'Halloween',
      description:
        'Desenhos perturbadores de rostos para serem usados em produtos estampados! Agora com adaptação automática de tamanho baseada nas proporções originais das imagens.'
    },
    en: {
      title: 'Halloween',
      description:
        'Disturbing face designs for use on printed products! Now with automatic size adaptation based on original image proportions.'
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
        // Carrega URLs otimizadas para grids
        const validGridImages = await batchPreloadImages(optimizedUrls)

        // Carrega URLs otimizadas para solos
        const validSoloImages = await batchPreloadImages(optimizedSoloUrls)

        // Cria duas versões das imagens: uma para grid e uma para solo
        const gridImages = validGridImages.map((image, index) => ({
          ...image,
          urls: generateOptimizedUrls(originalUrls[index]),
          alt: `Faces of Horror - Design ${index + 1}`,
          context: 'grid' as const
        }))

        const soloImages = validSoloImages.map((image, index) => ({
          ...image,
          id: `solo-${image.id}`, // ID diferente para evitar conflitos
          url: optimizedSoloUrls[index], // URL de alta qualidade
          urls: generateContextOptimizedUrls(originalUrls[index], 'solo'),
          alt: `Faces of Horror - Design ${index + 1}`,
          context: 'solo' as const
        }))

        // Combina as duas listas (você pode usar gridImages ou soloImages dependendo do contexto)
        setImages({ grid: gridImages, solo: soloImages })

        if (validGridImages.length === 0 && validSoloImages.length === 0) {
          setError('Erro ao carregar imagens')
        }
      } catch (err) {
        setError('Erro ao carregar imagens')
        console.error('Error loading images:', err)
      } finally {
        setLoading(false)
      }
    }

    loadImages()
  }, [])

  const handleImageClick = (image: ImageItem) => {
    setSelectedImage(image)
  }

  const handleImageError = (image: ImageItem) => {
    setImages((prev) => ({
      grid: prev.grid.filter((img) => img.id !== image.id),
      solo: prev.solo.filter((img) => img.id !== image.id)
    }))
  }

  // Se ainda está carregando ou há erro, exibe componente de loading/erro
  if (loading || error) {
    return (
      <div className="min-h-screen bg-transparent">
        <section className="py-8 px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl font-bold text-primary-black dark:text-primary-white mb-8 tracking-tight">
              {texts.title}
            </h1>
            <p className="text-primary-black/60 dark:text-primary-white/60 leading-relaxed">
              {texts.description}
            </p>
          </div>

          <AdaptiveImageGrid
            images={[]}
            loading={loading}
            error={error}
            mode="grid"
            gridColumns={3}
            adaptiveMode="auto"
            adaptiveRules={horrorAdaptiveRules}
          />
        </section>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-transparent">
      {/* Container principal */}
      <section className="py-8 px-6 sm:px-8 lg:px-12">
        {/* Título centralizado */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl font-bold text-primary-black dark:text-primary-white mb-8 tracking-tight">
            {texts.title}
          </h1>
          <p className="text-primary-black/60 dark:text-primary-white/60 leading-relaxed">
            {texts.description}
          </p>
        </div>

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

          {/* Grid de 2 colunas - usando imagens otimizadas para grid */}
          <div className="mb-12">
            <AdaptiveTwoColumnGrid
              images={images.grid.slice(3, 5)}
              adaptiveMode="manual"
              fallbackAspectRatio="wide"
              adaptiveRules={horrorAdaptiveRules}
              onImageClick={handleImageClick}
              onImageError={handleImageError}
              gap={1}
            />
          </div>

          {/* Imagem solo - usando imagem otimizada para solo (alta qualidade) */}
          <div className="mb-12">
            <AdaptiveSoloGrid
              images={images.solo.slice(5, 6)}
              adaptiveMode="manual"
              fallbackAspectRatio="square"
              fallbackObjectFit="contain"
              adaptiveRules={horrorAdaptiveRules}
              onImageClick={handleImageClick}
              onImageError={handleImageError}
              gap={1}
            />
          </div>

          {/* Grid de 2 colunas - usando imagens otimizadas para grid */}
          <div className="mb-12">
            <AdaptiveTwoColumnGrid
              images={images.grid.slice(6, 8)}
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
              fallbackAspectRatio="square"
              fallbackObjectFit="contain"
              adaptiveRules={horrorAdaptiveRules}
              onImageClick={handleImageClick}
              onImageError={handleImageError}
              gap={1}
            />
          </div>

          {/* Grid de 2 colunas - usando imagens otimizadas para grid */}
          <div className="mb-12">
            <AdaptiveTwoColumnGrid
              images={images.grid.slice(9, 11)}
              adaptiveMode="manual"
              fallbackAspectRatio="wide"
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
              fallbackAspectRatio="card"
              adaptiveRules={horrorAdaptiveRules}
              onImageClick={handleImageClick}
              onImageError={handleImageError}
              gap={1}
            />
          </div>
        </div>
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
