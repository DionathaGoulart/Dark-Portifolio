import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { batchPreloadImages, ImageItem, MasonryGrid } from '@features/grid'
import { useI18n } from '@/shared/contexts/I18nContext'
import { useDocumentTitle } from '@/shared/hooks/useDocumentTitle'
import { trackProjectClick } from '@/features/trafego'

import cover1 from '@assets/1/10.webp'
import cover2 from '@assets/2/8.webp'
import cover3 from '@assets/3/7.webp'
import cover4 from '@assets/4/1.webp'
import cover5 from '@assets/5/1.webp'
import cover6 from '@assets/6/3.webp'
import cover7 from '@assets/7/11.webp'
import cover8 from '@assets/8/3.webp'

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

const generateOptimizedUrls = (originalUrl: string) => {
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

// Dados dos projetos (agora sem dependência das traduções específicas)
const projectsData = [
  {
    id: 'faces-of-horror',
    title: 'Faces of Horror',
    titlePt: 'Faces do Horror',
    url: cover1,
    linkTo: '/facesofhorror'
  },
  {
    id: 'macabre-faces',
    title: 'Macabre Faces T-shirt',
    titlePt: 'Camiseta Faces Macabras',
    url: cover2,
    linkTo: '/tshirt-raglan'
  },
  {
    id: 'killer-ladybugs',
    title: 'Killer Ladybugs',
    titlePt: 'Joaninhas Assassinas',
    url: cover3,
    linkTo: '/ladybugs'
  },
  {
    id: 'creepy-faces',
    title: 'Creepy Faces',
    titlePt: 'Rostos Assustadores',
    url: cover4,
    linkTo: '/creepy'
  },
  {
    id: 'horror-art',
    title: 'Horror Art',
    titlePt: 'Arte de Horror',
    url: cover5,
    linkTo: '/horror-art'
  },
  {
    id: 'halloween-tshirts',
    title: 'Halloween T-shirts',
    titlePt: 'Camisetas de Halloween',
    url: cover6,
    linkTo: '/halloween'
  },
  {
    id: 'fantasy-creatures',
    title: 'Fantasy Creatures',
    titlePt: 'Criaturas Fantásticas',
    url: cover7,
    linkTo: '/fantasy'
  },
  {
    id: 'arachnophobia',
    title: 'Arachnophobia',
    titlePt: 'Aracnofobia',
    url: cover8,
    linkTo: '/arachnophobia'
  }
]

// Função para criar dados dos projetos com base no idioma
const createProjectData = (language: string): ImageItem[] => {
  return projectsData.map((project) => ({
    id: project.id,
    url: project.url,
    alt: language === 'pt' ? project.titlePt : project.title,
    title: language === 'pt' ? project.titlePt : project.title,
    linkTo: project.linkTo,
    urls: undefined
  }))
}

const preloadImageItems = async (
  originalImageItems: ImageItem[]
): Promise<ImageItem[]> => {
  const optimizedForGridUrls: string[] = originalImageItems.map((item) =>
    optimizeCloudinaryUrl(item.url, {
      width: 600,
      quality: 'auto',
      format: 'auto'
    })
  )

  try {
    const validPreloadedImages = (await batchPreloadImages(
      optimizedForGridUrls
    )) as ImageItem[]

    const imagesWithMultipleResolutions: ImageItem[] = validPreloadedImages.map(
      (preloadedImage, index) => {
        const originalItem = originalImageItems[index]
        if (!originalItem) {
          return preloadedImage
        }
        return {
          ...originalItem,
          url: preloadedImage.url,
          urls: generateOptimizedUrls(originalItem.url)
        }
      }
    )

    return imagesWithMultipleResolutions
  } catch (error) {
    console.error('Erro no preload das imagens dos projetos:', error)
    return []
  }
}

export const ProjectsPage: React.FC = () => {
  const { t, language } = useI18n()
  useDocumentTitle('projects')

  const [images, setImages] = useState<ImageItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const loadImages = async () => {
      setLoading(true)
      setError(null)
      try {
        const projectData = createProjectData(language)
        const validImages = await preloadImageItems(projectData)

        setImages(validImages)

        if (validImages.length === 0) {
          setError(t.common.noImages)
        }
      } catch (err) {
        setError(t.common.error)
        console.error('Error loading project images:', err)
      } finally {
        setLoading(false)
      }
    }
    loadImages()
  }, [t, language])

  const handleProjectClick = (image: ImageItem) => {
    trackProjectClick(image.id, image.alt)

    if (image.linkTo) {
      navigate(image.linkTo)
    } else {
      navigate(`/projects/${image.id}`)
      console.warn(
        `A imagem com ID ${image.id} não possui um 'linkTo' definido. Navegando para o ID como fallback.`
      )
    }
  }

  const handleImageError = (image: ImageItem) => {
    setImages((prev) => prev.filter((img) => img.id !== image.id))
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

      <section className="pb-8 px-6 sm:px-8 lg:px-12">
        <MasonryGrid
          images={images}
          loading={loading}
          error={error}
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
      </section>

      <div className="mt-16 w-32 h-0.5 bg-primary-black dark:bg-primary-white mx-auto"></div>
    </div>
  )
}
