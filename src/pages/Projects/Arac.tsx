import React from 'react'
import { getImage } from '@/core/utils/getImage'
import ImageGrid from '@/shared/components/ui/ImageGrid'
import { useI18n } from '@/shared/contexts/I18nContext'
import { useDocumentTitle } from '@/shared/hooks/useDocumentTitle'

// Importações das imagens
import image1Raw from '@assets/8/1.webp'
import image2Raw from '@assets/8/2.webp'
import image3Raw from '@assets/8/3.webp'
import image4Raw from '@assets/8/4.webp'
import image5Raw from '@assets/8/5.webp'
import image6Raw from '@assets/8/6.webp'
import image7Raw from '@assets/8/7.webp'
import image8Raw from '@assets/8/8.webp'

// Processamento das imagens
const image1 = getImage(`${image1Raw}?as=webp&width=1200`)
const image2 = getImage(`${image2Raw}?as=webp&width=1200`)
const image3 = getImage(`${image3Raw}?as=webp&width=1200`)
const image4 = getImage(`${image4Raw}?as=webp&width=1200`)
const image5 = getImage(`${image5Raw}?as=webp&width=1200`)
const image6 = getImage(`${image6Raw}?as=webp&width=1200`)
const image7 = getImage(`${image7Raw}?as=webp&width=1200`)
const image8 = getImage(`${image8Raw}?as=webp&width=1200`)

// Interface para os dados de imagem
interface ImageData {
  src: string
  alt?: string
}

export const Arac: React.FC = () => {
  const { t } = useI18n()
  useDocumentTitle('Aracphobia')

  return (
    <div className="min-h-screen bg-transparent">
      {/* Container principal */}
      <section className="py-8 px-6 sm:px-8 lg:px-12">
        {/* Título centralizado com tradução */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl font-bold text-primary-black dark:text-primary-white mb-8 tracking-tight">
            {t.pages?.Aracphobia?.title || 'Faces Of Horror'}
          </h1>
          <p className="text-primary-black/60 dark:text-primary-white/60 leading-relaxed">
            {t.pages?.Aracphobia?.description ||
              'Disturbing face designs for use on printed products!'}
          </p>
        </div>

        {/* Imagem inteira 1 - 100% width */}
        <div className="mb-12">
          <ImageGrid
            images={[{ src: image7, alt: 'Project Two - Imagem 4' }]}
            columns={1}
            aspectRatio="3/4"
            objectFit="cover"
            rounded="none"
            gap="1"
          />
        </div>

        {/* Imagem inteira 2 - 100% width */}
        <div className="mb-12">
          <ImageGrid
            images={[{ src: image5, alt: 'Project Two - Imagem 5' }]}
            columns={1}
            aspectRatio="1/1"
            objectFit="cover"
            rounded="none"
            gap="1"
          />
        </div>

        {/* Imagem solo 1 - 100% width */}
        <div className="mb-12">
          <ImageGrid
            images={[{ src: image6, alt: 'Project Two - Imagem 9' }]}
            columns={1}
            aspectRatio="1/1"
            objectFit="cover"
            rounded="none"
            gap="1"
          />
        </div>

        {/* Imagem solo 1 - 100% width */}
        <div className="mb-12">
          <ImageGrid
            images={[{ src: image1, alt: 'Project Two - Imagem 9' }]}
            columns={1}
            aspectRatio="1/1"
            objectFit="cover"
            rounded="none"
            gap="1"
          />
        </div>

        {/* Imagem solo 1 - 100% width */}
        <div className="mb-12">
          <ImageGrid
            images={[{ src: image4, alt: 'Project Two - Imagem 9' }]}
            columns={1}
            aspectRatio="1/1"
            objectFit="cover"
            rounded="none"
            gap="1"
          />
        </div>

        {/* Imagem solo 2 - 100% width */}
        <div className="mb-12">
          <ImageGrid
            images={[{ src: image8, alt: 'Project Two - Imagem 10' }]}
            columns={1}
            aspectRatio="16/9"
            objectFit="cover"
            rounded="none"
            gap="1"
          />
        </div>

        {/* Imagem solo 2 - 100% width */}
        <div className="mb-12">
          <ImageGrid
            images={[{ src: image2, alt: 'Project Two - Imagem 10' }]}
            columns={1}
            aspectRatio="1/1"
            objectFit="cover"
            rounded="none"
            gap="1"
          />
        </div>

        {/* Imagem solo 2 - 100% width */}
        <div className="mb-12">
          <ImageGrid
            images={[{ src: image3, alt: 'Project Two - Imagem 10' }]}
            columns={1}
            aspectRatio="1/1"
            objectFit="cover"
            rounded="none"
            gap="1"
          />
        </div>
      </section>
    </div>
  )
}
