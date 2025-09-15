import React, { useEffect } from 'react'
import ImageGrid from '@/shared/components/ui/ImageGrid'
import { useI18n } from '@/shared/contexts/I18nContext'

// Importações das imagens
import image1 from '@assets/1/11.webp'
import image2 from '@assets/1/12.webp'
import image3 from '@assets/1/13.webp'
import image4 from '@assets/1/1.webp'
import image5 from '@assets/1/2.webp'
import image6 from '@assets/1/3.webp'
import image7 from '@assets/1/4.webp'
import image8 from '@assets/1/5.webp'
import image9 from '@assets/1/6.webp'
import image10 from '@assets/1/7.webp'
import image11 from '@assets/1/8.webp'
import image12 from '@assets/1/9.webp'
import image13 from '@assets/1/10.webp'
import image14 from '@assets/1/14.webp'

export const FacesOfHorror: React.FC = () => {
  const { language } = useI18n()

  // Define os textos diretamente no componente
  const pageTexts = {
    pt: {
      title: 'Faces do Horror',
      description:
        'Desenhos perturbadores de rostos para serem usados em produtos estampados!'
    },
    en: {
      title: 'Faces Of Horror',
      description: 'Disturbing face designs for use on printed products!'
    }
  }

  const texts = pageTexts[language as keyof typeof pageTexts] || pageTexts.en

  // Define o título do documento manualmente
  useEffect(() => {
    document.title = `${texts.title} - Dark`
  }, [texts.title])

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

        {/* Grid com 3 imagens */}
        <div className="mb-12 sm:px-16">
          <ImageGrid
            images={[
              { src: image1, alt: 'Faces of Horror - Design 1' },
              { src: image3, alt: 'Faces of Horror - Design 2' },
              { src: image2, alt: 'Faces of Horror - Design 3' }
            ]}
            columns={3}
            aspectRatio="3/4"
            objectFit="cover"
            rounded="none"
            gap="1"
          />
        </div>

        {/* Imagem inteira 1 */}
        <div className="mb-12">
          <ImageGrid
            images={[{ src: image5, alt: 'Faces of Horror - Full Design 1' }]}
            columns={1}
            aspectRatio="1/1"
            objectFit="cover"
            rounded="none"
            gap="1"
          />
        </div>

        {/* Imagem inteira 2 */}
        <div className="mb-12">
          <ImageGrid
            images={[{ src: image1, alt: 'Faces of Horror - Full Design 2' }]}
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
              { src: image6, alt: 'Faces of Horror - Design Pair 1' },
              { src: image7, alt: 'Faces of Horror - Design Pair 2' }
            ]}
            columns={2}
            twoColumnLayout="equal"
            aspectRatio="16/9"
            objectFit="cover"
            rounded="none"
            gap="1"
          />
        </div>

        {/* Imagem solo 1 */}
        <div className="mb-12">
          <ImageGrid
            images={[{ src: image14, alt: 'Faces of Horror - Solo Design 1' }]}
            columns={1}
            aspectRatio="4/3"
            objectFit="contain"
            rounded="none"
            gap="1"
          />
        </div>

        {/* Imagem solo 2 */}
        <div className="mb-12">
          <ImageGrid
            images={[{ src: image8, alt: 'Faces of Horror - Solo Design 2' }]}
            columns={1}
            aspectRatio="16/9"
            objectFit="cover"
            rounded="none"
            gap="1"
          />
        </div>

        {/* Imagem solo 3 */}
        <div className="mb-12">
          <ImageGrid
            images={[{ src: image3, alt: 'Faces of Horror - Solo Design 3' }]}
            columns={1}
            aspectRatio="3/4"
            objectFit="cover"
            rounded="none"
            gap="1"
          />
        </div>

        {/* Grid de 2 */}
        <div className="mb-12">
          <ImageGrid
            images={[
              { src: image9, alt: 'Faces of Horror - Grid Design 1' },
              { src: image10, alt: 'Faces of Horror - Grid Design 2' }
            ]}
            columns={2}
            aspectRatio="3/2"
            objectFit="cover"
            rounded="none"
            gap="1"
          />
        </div>

        {/* Imagem solo 4 */}
        <div className="mb-12">
          <ImageGrid
            images={[{ src: image2, alt: 'Faces of Horror - Solo Design 4' }]}
            columns={1}
            aspectRatio="3/4"
            objectFit="cover"
            rounded="none"
            gap="1"
          />
        </div>

        {/* Grid de 2 - segundo conjunto */}
        <div className="mb-12">
          <ImageGrid
            images={[
              { src: image11, alt: 'Faces of Horror - Grid Design 3' },
              { src: image12, alt: 'Faces of Horror - Grid Design 4' }
            ]}
            columns={2}
            aspectRatio="16/9"
            objectFit="cover"
            rounded="none"
            gap="1"
          />
        </div>

        {/* Imagem solo final */}
        <div className="mb-12">
          <ImageGrid
            images={[{ src: image13, alt: 'Faces of Horror - Final Design' }]}
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
