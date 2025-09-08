import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { batchPreloadImages, ImageItem, MasonryGrid } from '@features/grid'
import { getImage } from '@/core/utils/getImage'
import { useI18n } from '@/shared/contexts/I18nContext'
import { useDocumentTitle } from '@/shared/hooks/useDocumentTitle'
import { trackProjectClick } from '@/features/trafego'

import cover1Raw from '@assets/1 Faces of horror/10.png'
const cover1 = getImage(`${cover1Raw}?as=webp&width=400`)

// Função para otimizar URLs do Cloudinary (mantida igual da versão anterior)
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

// Função para criar dados dos projetos com traduções
const createProjectData = (t: any): ImageItem[] => [
  {
    id: 'proj1',
    url: '',
    alt: t.pages.projects.proj1.alt,
    linkTo: '/facesofhorror',
    urls: undefined,
    title: t.pages.projects.proj1.title
  },
  {
    id: 'proj2',
    url: cover1,
    alt: t.pages.projects.proj2.alt,
    linkTo: '/contact',
    urls: undefined,
    title: t.pages.projects.proj2.title
  },
  {
    id: 'proj3',
    url: 'https://res.cloudinary.com/dlaxva1qb/image/upload/v1751235158/3.png',
    alt: t.pages.projects.proj3.alt,
    linkTo: '/prints',
    urls: undefined,
    title: t.pages.projects.proj3.title
  },
  {
    id: 'proj4',
    url: 'https://res.cloudinary.com/dlaxva1qb/image/upload/v1751235158/4.png',
    alt: t.pages.projects.proj4.alt,
    linkTo: '/projects/paisagismo-natural',
    urls: undefined,
    title: t.pages.projects.proj4.title
  },
  {
    id: 'proj5',
    url: 'https://res.cloudinary.com/dlaxva1qb/image/upload/v1751235158/5.png',
    alt: t.pages.projects.proj5.alt,
    linkTo: '/projects/interiores-aconchegantes',
    urls: undefined,
    title: t.pages.projects.proj5.title
  }
]

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
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const loadImages = async () => {
      setLoading(true)
      setError(null)
      try {
        const projectData = createProjectData(t)
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
      <section className="py-8 px-6 sm:px-8 lg:px-12">
        <div className="animate-fade-in">
          <h1 className="text-4xl font-bold text-primary-black dark:text-primary-white mb-8 tracking-tight">
            {t.pages.projects.title}
          </h1>
          <p className="text-primary-black/60 dark:text-primary-white/60 leading-relaxed mb-12">
            {t.pages.projects.description}
          </p>
        </div>
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
        />
      </section>

      <div className="mt-16 w-32 h-0.5 bg-primary-black dark:bg-primary-white mx-auto"></div>
    </div>
  )
}
