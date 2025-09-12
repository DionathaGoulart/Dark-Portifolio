import React from 'react'
import ImageGrid from '@/shared/components/ui/ImageGrid'
import { useI18n } from '@/shared/contexts/I18nContext'
import { useDocumentTitle } from '@/shared/hooks/useDocumentTitle'

// Importações das imagens
import image1 from '@assets/4/1.webp'
import image2 from '@assets/4/2.webp'
import image3 from '@assets/4/3.webp'
import image4 from '@assets/4/4.webp'
import image5 from '@assets/4/5.webp'
import image6 from '@assets/4/6.webp'
import image7 from '@assets/4/7.webp'
import image8 from '@assets/4/8.webp'
import image9 from '@assets/4/9.webp'
import image10 from '@assets/4/10.webp'
import image11 from '@assets/4/11.webp'
import image12 from '@assets/4/12.webp'
import image13 from '@assets/4/13.webp'
import image14 from '@assets/4/14.webp'
import image15 from '@assets/4/15.webp'
import image16 from '@assets/4/16.webp'
import image17 from '@assets/4/17.webp'

// Interface para os dados de imagem
interface ImageData {
  src: string
  alt?: string
}

export const Creepy: React.FC = () => {
  const { t } = useI18n()
  useDocumentTitle('Creepy')

  return (
    <div className="min-h-screen bg-transparent">
      {/* Container principal */}
      <section className="py-8 px-6 sm:px-8 lg:px-12">
        {/* Título centralizado com tradução */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl font-bold text-primary-black dark:text-primary-white mb-8 tracking-tight">
            {t.pages?.Creepy?.title || 'Faces Of Horror'}
          </h1>
          <p className="text-primary-black/60 dark:text-primary-white/60 leading-relaxed">
            {t.pages?.Creepy?.description ||
              'Disturbing face designs for use on printed products!'}
          </p>
        </div>

        {/* Grid com 3 imagens */}
        <div className="mb-12 sm:px-16">
          <ImageGrid
            images={[
              { src: image8, alt: 'Project Two - Imagem 1' },
              { src: image9, alt: 'Project Two - Imagem 2' },
              { src: image10, alt: 'Project Two - Imagem 3' }
            ]}
            columns={3}
            aspectRatio="3/4"
            objectFit="cover"
            rounded="none"
            gap="1"
          />
        </div>

        {/* Imagem inteira 1 - 100% width */}
        <div className="mb-12">
          <ImageGrid
            images={[{ src: image1, alt: 'Project Two - Imagem 4' }]}
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
            images={[{ src: image4, alt: 'Project Two - Imagem 5' }]}
            columns={1}
            aspectRatio="16/9"
            objectFit="cover"
            rounded="none"
            gap="1"
          />
        </div>

        {/* Imagem solo 1 - 100% width */}
        <div className="mb-12">
          <ImageGrid
            images={[{ src: image2, alt: 'Project Two - Imagem 9' }]}
            columns={1}
            aspectRatio="3/4"
            objectFit="cover"
            rounded="none"
            gap="1"
          />
        </div>

        {/* Imagem solo 1 - 100% width */}
        <div className="mb-12">
          <ImageGrid
            images={[{ src: image5, alt: 'Project Two - Imagem 9' }]}
            columns={1}
            aspectRatio="16/9"
            objectFit="cover"
            rounded="none"
            gap="1"
          />
        </div>

        {/* Imagem solo 1 - 100% width */}
        <div className="mb-12">
          <ImageGrid
            images={[{ src: image3, alt: 'Project Two - Imagem 9' }]}
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
            images={[{ src: image6, alt: 'Project Two - Imagem 10' }]}
            columns={1}
            aspectRatio="1/1"
            objectFit="cover"
            rounded="none"
            gap="1"
          />
        </div>

        <div className="mb-12">
          <ImageGrid
            images={[
              { src: image11, alt: 'Project Two - Imagem 1' },
              { src: image12, alt: 'Project Two - Imagem 2' }
            ]}
            columns={2}
            aspectRatio="4/3"
            objectFit="cover"
            rounded="none"
            gap="1"
          />
        </div>

        {/* Imagem solo 2 - 100% width */}
        <div className="mb-12">
          <ImageGrid
            images={[{ src: image7, alt: 'Project Two - Imagem 10' }]}
            columns={1}
            aspectRatio="9/16"
            objectFit="cover"
            rounded="none"
            gap="1"
          />
        </div>
      </section>
    </div>
  )
}
