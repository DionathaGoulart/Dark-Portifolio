import React from 'react'
import { getImage } from '@/core/utils/getImage'
import ImageGrid from '@/shared/components/ui/ImageGrid'
import { useI18n } from '@/shared/contexts/I18nContext'
import { useDocumentTitle } from '@/shared/hooks/useDocumentTitle'

// Importações das imagens
import image1Raw from '@assets/1 Faces of horror/11.png'
import image2Raw from '@assets/1 Faces of horror/12.png'
import image3Raw from '@assets/1 Faces of horror/13.png'
import image4Raw from '@assets/1 Faces of horror/1.png'
import image5Raw from '@assets/1 Faces of horror/2.png'
import image6Raw from '@assets/1 Faces of horror/3.png'
import image7Raw from '@assets/1 Faces of horror/4.png'
import image8Raw from '@assets/1 Faces of horror/5.png'
import image9Raw from '@assets/1 Faces of horror/6.png'
import image10Raw from '@assets/1 Faces of horror/7.png'
import image11Raw from '@assets/1 Faces of horror/8.png'
import image12Raw from '@assets/1 Faces of horror/9.png'
import image13Raw from '@assets/1 Faces of horror/10.png'
import image14Raw from '@assets/1 Faces of horror/14.png'

// Processamento das imagens
const image1 = getImage(`${image1Raw}?as=webp&width=1200`)
const image2 = getImage(`${image2Raw}?as=webp&width=1200`)
const image3 = getImage(`${image3Raw}?as=webp&width=1200`)
const image4 = getImage(`${image4Raw}?as=webp&width=1200`)
const image5 = getImage(`${image5Raw}?as=webp&width=1200`)
const image6 = getImage(`${image6Raw}?as=webp&width=1200`)
const image7 = getImage(`${image7Raw}?as=webp&width=1200`)
const image8 = getImage(`${image8Raw}?as=webp&width=1200`)
const image9 = getImage(`${image9Raw}?as=webp&width=1200`)
const image10 = getImage(`${image10Raw}?as=webp&width=1200`)
const image11 = getImage(`${image11Raw}?as=webp&width=1200`)
const image12 = getImage(`${image12Raw}?as=webp&width=1200`)
const image13 = getImage(`${image13Raw}?as=webp&width=1200`)
const image14 = getImage(`${image14Raw}?as=webp&width=1200`)

// Interface para os dados de imagem
interface ImageData {
  src: string
  alt?: string
}

export const FacesOfHorror: React.FC = () => {
  const { t } = useI18n()
  useDocumentTitle('facesOfHorror')

  return (
    <div className="min-h-screen bg-transparent">
      {/* Container principal */}
      <section className="py-8 px-6 sm:px-8 lg:px-12">
        {/* Título centralizado com tradução */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl font-bold text-primary-black dark:text-primary-white mb-8 tracking-tight">
            {t.pages?.facesOfHorror?.title || 'Faces Of Horror'}
          </h1>
          <p className="text-primary-black/60 dark:text-primary-white/60 leading-relaxed">
            {t.pages?.facesOfHorror?.description ||
              'Disturbing face designs for use on printed products!'}
          </p>
        </div>

        {/* Grid com 3 imagens */}
        <div className="mb-12 px-20">
          <ImageGrid
            images={[
              { src: image1, alt: 'Project Two - Imagem 1' },
              { src: image3, alt: 'Project Two - Imagem 2' },
              { src: image2, alt: 'Project Two - Imagem 3' }
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
            images={[{ src: image5, alt: 'Project Two - Imagem 4' }]}
            columns={1}
            aspectRatio="1/1"
            objectFit="cover"
            rounded="none"
            gap="1"
          />
        </div>

        {/* Imagem inteira 2 - 100% width */}
        <div className="mb-12">
          <ImageGrid
            images={[{ src: image1, alt: 'Project Two - Imagem 5' }]}
            columns={1}
            aspectRatio="4/3"
            objectFit="contain"
            rounded="none"
            gap="1"
          />
        </div>

        {/* 2 imagens lado a lado */}
        <div className="mb-12">
          <ImageGrid
            images={[
              { src: image6, alt: 'Project Two - Imagem 7' },
              { src: image7, alt: 'Project Two - Imagem 8' }
            ]}
            columns={2}
            twoColumnLayout="equal"
            aspectRatio="16/9"
            objectFit="cover"
            rounded="none"
            gap="1"
          />
        </div>

        {/* Imagem solo 1 - 100% width */}
        <div className="mb-12">
          <ImageGrid
            images={[{ src: image14, alt: 'Project Two - Imagem 9' }]}
            columns={1}
            aspectRatio="4/3"
            objectFit="contain"
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
            images={[{ src: image3, alt: 'Project Two - Imagem 10' }]}
            columns={1}
            aspectRatio="4/3"
            objectFit="contain"
            rounded="none"
            gap="1"
          />
        </div>

        {/* Grid de 2 - direita maior */}
        <div className="mb-12">
          <ImageGrid
            images={[
              { src: image9, alt: 'Project Two - Imagem 11' },
              { src: image10, alt: 'Project Two - Imagem 12' }
            ]}
            columns={2}
            aspectRatio="3/2"
            objectFit="cover"
            rounded="none"
            gap="1"
          />
        </div>

        {/* Imagem solo 3 - 100% width */}
        <div className="mb-12">
          <ImageGrid
            images={[{ src: image2, alt: 'Project Two - Imagem 13' }]}
            columns={1}
            aspectRatio="4/3"
            objectFit="contain"
            rounded="none"
            gap="1"
          />
        </div>

        {/* Grid de 2 - esquerda maior */}
        <div className="mb-12">
          <ImageGrid
            images={[
              { src: image11, alt: 'Project Two - Imagem 15' },
              { src: image12, alt: 'Project Two - Imagem 16' }
            ]}
            columns={2}
            aspectRatio="16/9"
            objectFit="cover"
            rounded="none"
            gap="1"
          />
        </div>

        {/* Imagem solo final - 100% width */}
        <div className="mb-12">
          <ImageGrid
            images={[{ src: image13, alt: 'Project Two - Imagem 17' }]}
            columns={1}
            aspectRatio="16/9"
            objectFit="cover"
            rounded="none"
            gap="1"
          />
        </div>
      </section>
    </div>
  )
}
