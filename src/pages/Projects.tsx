import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { batchPreloadImages, ImageItem, MasonryGrid } from '@features/grid'
import { useI18n } from '@/shared/contexts/I18nContext'
import { useDocumentTitle } from '@/shared/hooks/useDocumentTitle'

// URLs do Cloudinary para as capas dos projetos
const cloudinaryCovers = {
  cover1:
    'https://res.cloudinary.com/dlaxva1qb/image/upload/v1758048739/pj1_cover.webp',
  cover2:
    'https://res.cloudinary.com/dlaxva1qb/image/upload/v1758048739/pj2_cover.webp',
  cover3:
    'https://res.cloudinary.com/dlaxva1qb/image/upload/v1758048739/pj3_cover.webp',
  cover4:
    'https://res.cloudinary.com/dlaxva1qb/image/upload/v1758048739/pj4_cover.webp',
  cover5:
    'https://res.cloudinary.com/dlaxva1qb/image/upload/v1758048739/pj5_cover.webp',
  cover6:
    'https://res.cloudinary.com/dlaxva1qb/image/upload/v1758048739/pj6_cover.webp',
  cover7:
    'https://res.cloudinary.com/dlaxva1qb/image/upload/v1758048739/pj7_cover.webp',
  cover8:
    'https://res.cloudinary.com/dlaxva1qb/image/upload/v1758048739/p8_cover.webp'
}

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

// Função para gerar URLs otimizadas específicas para projetos
const generateProjectUrls = (originalUrl: string) => {
  return {
    thumbnail: optimizeCloudinaryUrl(originalUrl, {
      width: 400,
      height: 400,
      quality: 70,
      format: 'webp',
      crop: 'fill'
    }),
    medium: optimizeCloudinaryUrl(originalUrl, {
      width: 800,
      height: 800,
      quality: 80,
      format: 'webp',
      crop: 'fit'
    }),
    large: optimizeCloudinaryUrl(originalUrl, {
      width: 1200,
      height: 1200,
      quality: 85,
      format: 'webp',
      crop: 'fit'
    }),
    original: originalUrl
  }
}

// Dados dos projetos
const projectsData = [
  {
    id: 'faces-of-horror',
    title: 'Faces of Horror',
    titlePt: 'Faces do Horror',
    url: cloudinaryCovers.cover1,
    linkTo: '/facesofhorror'
  },
  {
    id: 'macabre-faces',
    title: 'Macabre Faces T-shirt',
    titlePt: 'Camiseta Faces Macabras',
    url: cloudinaryCovers.cover2,
    linkTo: '/tshirt-raglan'
  },
  {
    id: 'killer-ladybugs',
    title: 'Killer Ladybugs',
    titlePt: 'Joaninhas Assassinas',
    url: cloudinaryCovers.cover3,
    linkTo: '/ladybugs'
  },
  {
    id: 'creepy-faces',
    title: 'Creepy Faces',
    titlePt: 'Rostos Assustadores',
    url: cloudinaryCovers.cover4,
    linkTo: '/creepy'
  },
  {
    id: 'horror-art',
    title: 'Horror Art',
    titlePt: 'Arte de Horror',
    url: cloudinaryCovers.cover5,
    linkTo: '/horror-art'
  },
  {
    id: 'halloween-tshirts',
    title: 'Halloween T-shirts',
    titlePt: 'Camisetas de Halloween',
    url: cloudinaryCovers.cover6,
    linkTo: '/halloween'
  },
  {
    id: 'fantasy-creatures',
    title: 'Fantasy Creatures',
    titlePt: 'Criaturas Fantásticas',
    url: cloudinaryCovers.cover7,
    linkTo: '/fantasy'
  },
  {
    id: 'arachnophobia',
    title: 'Arachnophobia',
    titlePt: 'Aracnofobia',
    url: cloudinaryCovers.cover8,
    linkTo: '/arachnophobia'
  }
]

// Componente de loading elegante para o grid
const ProjectGridLoader = ({ count = 8 }: { count?: number }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
    {Array.from({ length: count }).map((_, index) => (
      <div
        key={index}
        className="relative aspect-square overflow-hidden rounded-lg bg-primary-white dark:bg-primary-black border border-primary-black/10 dark:border-primary-white/10"
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
    ))}
  </div>
)

export const ProjectsPage: React.FC = () => {
  const { t, language } = useI18n()
  useDocumentTitle('projects')
  const navigate = useNavigate()

  const [images, setImages] = useState<ImageItem[]>([])
  const [loading, setLoading] = useState(true)
  const [lazyLoading, setLazyLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadImages = async () => {
      setLoading(true)
      setLazyLoading(true)
      setError(null)

      try {
        // FASE 1: Carrega as primeiras 4 capas (prioritárias)
        const priorityProjects = projectsData.slice(0, 4)
        const priorityUrls = priorityProjects.map((project) =>
          optimizeCloudinaryUrl(project.url, {
            width: 600,
            height: 600,
            quality: 80,
            format: 'webp',
            crop: 'fill'
          })
        )

        const priorityImages = await batchPreloadImages(priorityUrls)

        const priorityItems: ImageItem[] = priorityImages.map(
          (image, index) => {
            const project = priorityProjects[index]
            return {
              id: project.id,
              url: image.url,
              alt: language === 'pt' ? project.titlePt : project.title,
              title: language === 'pt' ? project.titlePt : project.title,
              linkTo: project.linkTo,
              urls: generateProjectUrls(project.url)
            }
          }
        )

        setImages(priorityItems)
        setLoading(false)

        // FASE 2: Carrega as capas restantes
        if (projectsData.length > 4) {
          const remainingProjects = projectsData.slice(4)
          const remainingUrls = remainingProjects.map((project) =>
            optimizeCloudinaryUrl(project.url, {
              width: 600,
              height: 600,
              quality: 80,
              format: 'webp',
              crop: 'fill'
            })
          )

          const remainingImages = await batchPreloadImages(remainingUrls)

          const remainingItems: ImageItem[] = remainingImages.map(
            (image, index) => {
              const project = remainingProjects[index]
              return {
                id: project.id,
                url: image.url,
                alt: language === 'pt' ? project.titlePt : project.title,
                title: language === 'pt' ? project.titlePt : project.title,
                linkTo: project.linkTo,
                urls: generateProjectUrls(project.url)
              }
            }
          )

          setImages((prev) => [...prev, ...remainingItems])
          setLazyLoading(false)
        } else {
          setLazyLoading(false)
        }
      } catch (err) {
        console.error('❌ Erro ao carregar capas:', err)
        setError(t.common.error || 'Erro ao carregar projetos')
        setLoading(false)
        setLazyLoading(false)
      }
    }

    loadImages()
  }, [t, language])

  const handleProjectClick = (image: ImageItem) => {
    if (image.linkTo) {
      navigate(image.linkTo)
    } else {
      navigate(`/projects/${image.id}`)
      console.warn(`Projeto ${image.id} sem linkTo definido`)
    }
  }

  const handleImageError = (image: ImageItem) => {
    console.error(`❌ Erro ao carregar capa: ${image.id}`)
    setImages((prev) => prev.filter((img) => img.id !== image.id))
  }

  if (error) {
    return (
      <div className="min-h-screen bg-primary-white dark:bg-primary-black transition-colors duration-300">
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Erro ao carregar projetos
          </h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-primary-white dark:bg-primary-black transition-colors duration-300">
      {/* Header da página */}
      <div className="text-center py-12 px-6">
        <h1 className="text-4xl font-bold text-primary-black dark:text-primary-white mb-4">
          {t.pages.projects.title}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {t.pages.projects.description}
        </p>
      </div>

      {/* Indicador de carregamento das capas restantes */}
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

      {/* Grid de projetos */}
      <section className="pb-8 px-6 sm:px-8 lg:px-12">
        {loading ? (
          <ProjectGridLoader count={8} />
        ) : (
          <MasonryGrid
            images={images}
            loading={false}
            error={null}
            onImageClick={handleProjectClick}
            onImageError={handleImageError}
            columnCount={{
              sm: 1,
              md: 2,
              lg: 2,
              xl: 4
            }}
            gap={3}
            isSquareGrid
            showHoverEffect
          />
        )}
      </section>

      {/* Divider */}
      <div className="mt-16 w-32 h-0.5 bg-primary-black dark:bg-primary-white mx-auto"></div>
    </div>
  )
}
