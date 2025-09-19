import React, { useState, useEffect } from 'react'
import { useI18n } from '@/shared/contexts/I18nContext'
import {
  AdaptiveThreeColumnGrid,
  AdaptiveSoloGrid,
  AdaptiveTwoColumnGrid
} from '@/shared/components/ui/FlexibleImageGrid'
import { useImageOptimization } from '@/features/grid/hooks/useImageOptimization'
import { ModalZoom } from '@/features/grid/components/ui/ModalZoom'

// URLs das 12 imagens
const originalUrls = [
  'https://res.cloudinary.com/dlaxva1qb/image/upload/v1758048739/pj6_1.webp',
  'https://res.cloudinary.com/dlaxva1qb/image/upload/v1758048739/pj6_2.webp',
  'https://res.cloudinary.com/dlaxva1qb/image/upload/v1758048739/pj6_3.webp',
  'https://res.cloudinary.com/dlaxva1qb/image/upload/v1758048739/pj6_4.webp',
  'https://res.cloudinary.com/dlaxva1qb/image/upload/v1758048739/pj6_5.webp',
  'https://res.cloudinary.com/dlaxva1qb/image/upload/v1758048739/pj6_6.webp',
  'https://res.cloudinary.com/dlaxva1qb/image/upload/v1758048739/pj6_7.webp',
  'https://res.cloudinary.com/dlaxva1qb/image/upload/v1758048739/pj6_8.webp',
  'https://res.cloudinary.com/dlaxva1qb/image/upload/v1758048739/pj6_9.webp',
  'https://res.cloudinary.com/dlaxva1qb/image/upload/v1758048739/pj6_10.webp',
  'https://res.cloudinary.com/dlaxva1qb/image/upload/v1758048739/pj6_11.webp',
  'https://res.cloudinary.com/dlaxva1qb/image/upload/v1758048739/pj6_12.webp'
]

const pageTexts = {
  pt: {
    title: 'Halloween',
    description:
      'Uma coleção de designs de Halloween, com uma estética assustadora e festiva. As imagens se adaptam automaticamente para se encaixar em qualquer dispositivo.'
  },
  en: {
    title: 'Halloween',
    description:
      'A collection of Halloween designs, with a spooky and festive aesthetic. The images automatically adapt to fit any device.'
  }
}

const horrorAdaptiveRules = {
  portrait: { aspectRatio: 'card', objectFit: 'cover' },
  landscape: { aspectRatio: 'wide', objectFit: 'cover' },
  square: { aspectRatio: 'square', objectFit: 'cover' },
  ultraWide: { aspectRatio: 'cinema', objectFit: 'cover' },
  ultraTall: { aspectRatio: 'tall', objectFit: 'contain' }
}

// Componente de loading elegante
const ImageSectionLoader = ({
  className = '',
  aspectRatio = 'aspect-square'
}: {
  className?: string
  aspectRatio?: string
}) => (
  <div
    className={`relative w-full ${aspectRatio} overflow-hidden rounded-lg bg-primary-white dark:bg-primary-black border border-primary-black/10 dark:border-primary-white/10 ${className}`}
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
    <div
      className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-black/5 dark:via-primary-white/5 to-transparent transform -skew-x-12"
      style={{
        animation: 'shimmer 2s infinite',
        transform: 'translateX(-100%) skewX(-12deg)'
      }}
    />
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

export const Halloween: React.FC = () => {
  const { language } = useI18n()
  const texts = pageTexts[language as keyof typeof pageTexts] || pageTexts.en

  const { images, loading, lazyLoading, error } = useImageOptimization(
    originalUrls,
    language,
    6 // Carrega as primeiras 6 imagens com prioridade (grid 3 + grid 2 + solo 1)
  )
  const [selectedImage, setSelectedImage] = useState<any | null>(null)

  useEffect(() => {
    document.title = `${texts.title} - Dark`
  }, [texts.title])

  const handleImageClick = (image: any) => {
    setSelectedImage(image)
  }

  const handleCloseModal = () => {
    setSelectedImage(null)
  }

  const handleImageError = (image: any) => {
    console.error(`Falha ao carregar a imagem: ${image.url}`)
  }

  // Função helper para renderizar seção com fallback de loading
  const renderSection = (
    component: React.ReactNode,
    imageIndices: number[],
    context: 'grid' | 'solo',
    loadingComponent: React.ReactNode
  ) => {
    const hasAllImages = imageIndices.every((index) => {
      const imageArray = context === 'grid' ? images.grid : images.solo
      return imageArray[index] !== undefined
    })

    if (loading || (!hasAllImages && lazyLoading)) {
      return loadingComponent
    }

    return component
  }

  if (error) {
    return (
      <div className="py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Erro ao carregar imagens
          </h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <section className="py-8 px-6 sm:px-8 lg:px-12">
          <div className="space-y-8">
            {/* Grid de 3 colunas - PRIORIDADE ALTA */}
            <div className="mb-12 sm:px-16">
              {renderSection(
                <AdaptiveThreeColumnGrid
                  images={images.grid.slice(0, 3)}
                  adaptiveMode="manual"
                  fallbackAspectRatio="card"
                  adaptiveRules={horrorAdaptiveRules}
                  onImageClick={handleImageClick}
                  onImageError={handleImageError}
                  gap={1}
                />,
                [0, 1, 2],
                'grid',
                <div className="grid grid-cols-3 gap-1">
                  <ImageSectionLoader />
                  <ImageSectionLoader />
                  <ImageSectionLoader />
                </div>
              )}
            </div>

            {/* Grid de 2 colunas - PRIORIDADE ALTA */}
            <div className="mb-12">
              {renderSection(
                <AdaptiveTwoColumnGrid
                  images={images.grid.slice(3, 5)}
                  adaptiveMode="manual"
                  fallbackAspectRatio="wide"
                  adaptiveRules={horrorAdaptiveRules}
                  onImageClick={handleImageClick}
                  onImageError={handleImageError}
                  gap={1}
                />,
                [3, 4],
                'grid',
                <div className="grid grid-cols-2 gap-1">
                  <ImageSectionLoader aspectRatio="aspect-video" />
                  <ImageSectionLoader aspectRatio="aspect-video" />
                </div>
              )}
            </div>

            {/* Imagem solo - PRIORIDADE ALTA */}
            <div className="mb-12">
              {renderSection(
                <AdaptiveSoloGrid
                  images={images.solo.slice(5, 6)}
                  adaptiveMode="manual"
                  fallbackAspectRatio="square"
                  fallbackObjectFit="contain"
                  adaptiveRules={horrorAdaptiveRules}
                  onImageClick={handleImageClick}
                  onImageError={handleImageError}
                  gap={1}
                />,
                [5],
                'solo',
                <ImageSectionLoader className="max-w-2xl mx-auto" />
              )}
            </div>

            {/* Indicador de carregamento das demais imagens */}
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
                  <span className="text-sm font-medium">
                    Carregando mais imagens...
                  </span>
                </div>
              </div>
            )}

            {/* Restante das seções com lazy loading */}
            <div className="mb-12">
              {renderSection(
                <AdaptiveTwoColumnGrid
                  images={images.grid.slice(6, 8)}
                  adaptiveMode="manual"
                  fallbackAspectRatio="wide"
                  adaptiveRules={horrorAdaptiveRules}
                  onImageClick={handleImageClick}
                  onImageError={handleImageError}
                  gap={1}
                />,
                [6, 7],
                'grid',
                <div className="grid grid-cols-2 gap-1">
                  <ImageSectionLoader aspectRatio="aspect-video" />
                  <ImageSectionLoader aspectRatio="aspect-video" />
                </div>
              )}
            </div>

            <div className="mb-12">
              {renderSection(
                <AdaptiveSoloGrid
                  images={images.solo.slice(8, 9)}
                  adaptiveMode="manual"
                  fallbackAspectRatio="square"
                  fallbackObjectFit="contain"
                  adaptiveRules={horrorAdaptiveRules}
                  onImageClick={handleImageClick}
                  onImageError={handleImageError}
                  gap={1}
                />,
                [8],
                'solo',
                <ImageSectionLoader className="max-w-2xl mx-auto" />
              )}
            </div>

            <div className="mb-12">
              {renderSection(
                <AdaptiveTwoColumnGrid
                  images={images.grid.slice(9, 11)}
                  adaptiveMode="manual"
                  fallbackAspectRatio="wide"
                  adaptiveRules={horrorAdaptiveRules}
                  onImageClick={handleImageClick}
                  onImageError={handleImageError}
                  gap={1}
                />,
                [9, 10],
                'grid',
                <div className="grid grid-cols-2 gap-1">
                  <ImageSectionLoader aspectRatio="aspect-video" />
                  <ImageSectionLoader aspectRatio="aspect-video" />
                </div>
              )}
            </div>

            <div className="mb-12">
              {renderSection(
                <AdaptiveSoloGrid
                  images={images.solo.slice(11, 12)}
                  adaptiveMode="manual"
                  fallbackAspectRatio="card"
                  adaptiveRules={horrorAdaptiveRules}
                  onImageClick={handleImageClick}
                  onImageError={handleImageError}
                  gap={1}
                />,
                [11],
                'solo',
                <ImageSectionLoader className="max-w-2xl mx-auto" />
              )}
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
