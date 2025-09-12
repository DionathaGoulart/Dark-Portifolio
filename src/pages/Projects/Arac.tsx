import React from 'react'

import ImageGrid from '@/shared/components/ui/ImageGrid'
import { useI18n } from '@/shared/contexts/I18nContext'
import { useDocumentTitle } from '@/shared/hooks/useDocumentTitle'

// Importações das imagens
import image1 from '@assets/8/1.webp'
import image2 from '@assets/8/2.webp'
import image3 from '@assets/8/3.webp'
import image4 from '@assets/8/4.webp'
import image5 from '@assets/8/5.webp'
import image6 from '@assets/8/6.webp'
import image7 from '@assets/8/7.webp'
import image8 from '@assets/8/8.webp'

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
