import ImageGrid from '@/shared/components/ui/ImageGrid'
import React from 'react'

// Interfaces para os dados de imagem
interface ImageData {
  src: string
  alt?: string
}

// Função para criar conjuntos de imagens
const createImageSet = (start: number, count: number = 1): ImageData[] => {
  return Array.from({ length: count }, (_, i) => ({
    src: `https://picsum.photos/1200/800?random=${start + i}`,
    alt: `Projeto Imagem ${start + i}`
  }))
}

const ProjectOne: React.FC = () => {
  return (
    <div className="min-h-screen bg-transparent">
      {/* Container principal */}
      <section className="">
        {/* Título centralizado */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-primary-black dark:text-primary-white mb-8 tracking-tight">
            Project One
          </h1>
          <p className="text-primary-black/60 dark:text-primary-white/60 leading-relaxed">
            Uma coleção visual que explora diferentes perspectivas e momentos
            únicos
          </p>
        </div>

        {/* Grid com 3 imagens */}
        <div className="mb-12 px-20">
          <ImageGrid
            images={createImageSet(1, 3)}
            columns={3}
            aspectRatio="4/3"
            objectFit="cover"
            rounded="none"
            gap="1"
          />
        </div>

        {/* Imagem inteira 1 */}
        <div className="mb-12">
          <ImageGrid
            images={createImageSet(4, 1)}
            columns={2}
            aspectRatio="2/1"
            objectFit="cover"
            rounded="none"
            gap="1"
            className="grid-cols-1"
          />
        </div>

        {/* Imagem inteira 2 */}
        <div className="mb-12">
          <ImageGrid
            images={createImageSet(5, 1)}
            columns={2}
            aspectRatio="16/9"
            objectFit="cover"
            rounded="none"
            gap="1"
            className="grid-cols-1"
          />
        </div>

        {/* Imagem inteira 3 */}
        <div className="mb-12 px-20">
          <ImageGrid
            images={createImageSet(6, 1)}
            columns={2}
            aspectRatio="3/2"
            objectFit="cover"
            rounded="none"
            gap="1"
            className="grid-cols-1"
          />
        </div>

        {/* 2 imagens lado a lado */}
        <div className="mb-12">
          <ImageGrid
            images={createImageSet(7, 2)}
            columns={2}
            twoColumnLayout="equal"
            aspectRatio="1/1"
            objectFit="cover"
            rounded="none"
            gap="1"
          />
        </div>

        {/* Imagem solo 1 */}
        <div className="mb-12">
          <ImageGrid
            images={createImageSet(9, 1)}
            columns={2}
            aspectRatio="4/3"
            objectFit="cover"
            rounded="none"
            gap="1"
            className="grid-cols-1"
          />
        </div>

        {/* Imagem solo 2 */}
        <div className="mb-12">
          <ImageGrid
            images={createImageSet(10, 1)}
            columns={2}
            aspectRatio="16/9"
            objectFit="cover"
            rounded="none"
            gap="1"
            className="grid-cols-1"
          />
        </div>

        {/* Grid de 2 - direita maior */}
        <div className="mb-12">
          <ImageGrid
            images={createImageSet(11, 2)}
            columns={2}
            twoColumnLayout="right-dominant"
            aspectRatio="3/2"
            objectFit="cover"
            rounded="none"
            gap="1"
          />
        </div>

        {/* Imagem solo 3 */}
        <div className="mb-12">
          <ImageGrid
            images={createImageSet(13, 1)}
            columns={2}
            aspectRatio="2/1"
            objectFit="cover"
            rounded="none"
            gap="1"
            className="grid-cols-1"
          />
        </div>

        {/* Imagem solo 4 */}
        <div className="mb-12">
          <ImageGrid
            images={createImageSet(14, 1)}
            columns={2}
            aspectRatio="4/3"
            objectFit="cover"
            rounded="none"
            gap="1"
            className="grid-cols-1"
          />
        </div>

        {/* Grid de 2 - esquerda maior */}
        <div className="mb-12">
          <ImageGrid
            images={createImageSet(15, 2)}
            columns={2}
            twoColumnLayout="left-dominant"
            aspectRatio="1/1"
            objectFit="cover"
            rounded="none"
            gap="1"
          />
        </div>

        {/* Imagem solo final */}
        <div className="mb-12">
          <ImageGrid
            images={createImageSet(17, 1)}
            columns={2}
            aspectRatio="16/9"
            objectFit="cover"
            rounded="none"
            gap="1"
            className="grid-cols-1"
          />
        </div>
      </section>

      {/* Footer minimalista */}
      <footer className="border-t border-gray-200 py-8 mt-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-500">Project One © 2025</p>
        </div>
      </footer>
    </div>
  )
}

export default ProjectOne
