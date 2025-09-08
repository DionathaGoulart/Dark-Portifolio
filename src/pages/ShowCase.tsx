import ImageGrid from '@/shared/components/ui/ImageGrid'
import React from 'react'

// Interfaces para os dados de imagem
interface ImageData {
  src: string
  alt?: string
}

// Componente de Seção
const Section: React.FC<{
  title: string
  description?: string
  children: React.ReactNode
}> = ({ title, description, children }) => (
  <section className="mb-16">
    <div className="mb-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
      {description && <p className="text-gray-600 text-lg">{description}</p>}
    </div>
    {children}
  </section>
)

// Componente de Exemplo
const Example: React.FC<{
  title: string
  props: string
  children: React.ReactNode
}> = ({ title, props, children }) => (
  <div className="mb-12">
    <div className="mb-4">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <code className="bg-gray-100 px-3 py-1 rounded text-sm text-gray-700">
        {props}
      </code>
    </div>
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      {children}
    </div>
  </div>
)

// Função para criar conjuntos de imagens para demonstração
const createImageSet = (start: number, count: number = 4): ImageData[] => {
  return Array.from({ length: count }, (_, i) => ({
    src: `https://picsum.photos/800/600?random=${start + i}`,
    alt: `Exemplo ${start + i}`
  }))
}

// Página principal de showcase
const ShowcasePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            ImageGrid Component Showcase
          </h1>
          <p className="text-xl text-gray-600">
            Demonstração completa de todas as funcionalidades e configurações
            possíveis
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Layouts de 2 Colunas */}
        <Section
          title="🏗️ Layouts de 2 Colunas"
          description="Diferentes configurações de layout para grids de duas colunas"
        >
          <Example
            title="Colunas Iguais (Equal)"
            props='columns={2} twoColumnLayout="equal"'
          >
            <ImageGrid
              images={createImageSet(1)}
              columns={2}
              twoColumnLayout="equal"
              aspectRatio="16/9"
              objectFit="cover"
              rounded="none"
              gap="1"
            />
          </Example>

          <Example
            title="Coluna Esquerda Dominante"
            props='columns={2} twoColumnLayout="left-dominant"'
          >
            <ImageGrid
              images={createImageSet(5)}
              columns={2}
              twoColumnLayout="left-dominant"
              aspectRatio="4/3"
              objectFit="cover"
              rounded="none"
              gap="1"
            />
          </Example>

          <Example
            title="Coluna Direita Dominante"
            props='columns={2} twoColumnLayout="right-dominant"'
          >
            <ImageGrid
              images={createImageSet(9)}
              columns={2}
              twoColumnLayout="right-dominant"
              aspectRatio="3/2"
              objectFit="cover"
              rounded="none"
              gap="1"
            />
          </Example>
        </Section>

        {/* Grid de 3 Colunas */}
        <Section
          title="📐 Grid de 3 Colunas"
          description="Layouts em três colunas para galerias maiores"
        >
          <Example
            title="Galeria Clássica 3x2"
            props='columns={3} aspectRatio="1/1"'
          >
            <ImageGrid
              images={createImageSet(13, 6)}
              columns={3}
              aspectRatio="1/1"
              objectFit="cover"
              rounded="none"
              gap="1"
            />
          </Example>

          <Example
            title="Galeria Widescreen"
            props='columns={3} aspectRatio="16/9" gap="1"'
          >
            <ImageGrid
              images={createImageSet(19, 6)}
              columns={3}
              aspectRatio="16/9"
              objectFit="cover"
              rounded="none"
              gap="1"
            />
          </Example>
        </Section>

        {/* Aspect Ratios */}
        <Section
          title="📏 Proporções (Aspect Ratios)"
          description="Diferentes proporções de imagem disponíveis"
        >
          <Example title="Quadrado (1:1)" props='aspectRatio="1/1"'>
            <ImageGrid
              images={createImageSet(25, 4)}
              columns={2}
              aspectRatio="1/1"
              objectFit="cover"
              rounded="lg"
              gap="4"
            />
          </Example>

          <Example title="Widescreen (16:9)" props='aspectRatio="16/9"'>
            <ImageGrid
              images={createImageSet(29, 4)}
              columns={2}
              aspectRatio="16/9"
              objectFit="cover"
              rounded="lg"
              gap="4"
            />
          </Example>

          <Example title="Retrato (9:16)" props='aspectRatio="9/16"'>
            <ImageGrid
              images={createImageSet(33, 4)}
              columns={2}
              aspectRatio="9/16"
              objectFit="cover"
              rounded="lg"
              gap="4"
            />
          </Example>
        </Section>

        {/* Object Fit */}
        <Section
          title="🖼️ Object Fit"
          description="Diferentes modos de ajuste das imagens dentro dos containers"
        >
          <Example title="Cover (padrão)" props='objectFit="cover"'>
            <ImageGrid
              images={createImageSet(37, 4)}
              columns={2}
              aspectRatio="16/9"
              objectFit="cover"
              rounded="lg"
              gap="4"
            />
          </Example>

          <Example
            title="Contain (preserva proporção)"
            props='objectFit="contain"'
          >
            <ImageGrid
              images={createImageSet(41, 4)}
              columns={2}
              aspectRatio="16/9"
              objectFit="contain"
              rounded="lg"
              gap="4"
              className="bg-gray-100 p-2"
            />
          </Example>

          <Example title="Fill (estica a imagem)" props='objectFit="fill"'>
            <ImageGrid
              images={createImageSet(45, 4)}
              columns={2}
              aspectRatio="1/1"
              objectFit="fill"
              rounded="lg"
              gap="4"
            />
          </Example>
        </Section>

        {/* Bordas Arredondadas */}
        <Section
          title="🎨 Bordas Arredondadas"
          description="Diferentes níveis de arredondamento das bordas"
        >
          <Example title="Sem Arredondamento" props='rounded="none"'>
            <ImageGrid
              images={createImageSet(49, 4)}
              columns={2}
              aspectRatio="4/3"
              objectFit="cover"
              rounded="none"
              gap="4"
            />
          </Example>

          <Example title="Arredondamento Médio" props='rounded="lg"'>
            <ImageGrid
              images={createImageSet(53, 4)}
              columns={2}
              aspectRatio="4/3"
              objectFit="cover"
              rounded="lg"
              gap="4"
            />
          </Example>

          <Example title="Muito Arredondado" props='rounded="3xl"'>
            <ImageGrid
              images={createImageSet(57, 4)}
              columns={2}
              aspectRatio="4/3"
              objectFit="cover"
              rounded="3xl"
              gap="4"
            />
          </Example>

          <Example
            title="Circular (apenas para aspect ratio 1:1)"
            props='rounded="full" aspectRatio="1/1"'
          >
            <ImageGrid
              images={createImageSet(61, 4)}
              columns={2}
              aspectRatio="1/1"
              objectFit="cover"
              rounded="full"
              gap="6"
            />
          </Example>
        </Section>

        {/* Espaçamentos */}
        <Section
          title="📐 Espaçamentos (Gap)"
          description="Diferentes espaçamentos entre as imagens"
        >
          <Example title="Sem Espaçamento" props='gap="0"'>
            <ImageGrid
              images={createImageSet(65, 4)}
              columns={2}
              aspectRatio="3/2"
              objectFit="cover"
              rounded="none"
              gap="0"
            />
          </Example>

          <Example title="Espaçamento Pequeno" props='gap="2"'>
            <ImageGrid
              images={createImageSet(69, 4)}
              columns={2}
              aspectRatio="3/2"
              objectFit="cover"
              rounded="md"
              gap="2"
            />
          </Example>

          <Example title="Espaçamento Grande" props='gap="10"'>
            <ImageGrid
              images={createImageSet(73, 4)}
              columns={2}
              aspectRatio="3/2"
              objectFit="cover"
              rounded="lg"
              gap="10"
            />
          </Example>
        </Section>

        {/* Combinações Avançadas */}
        <Section
          title="⚡ Combinações Avançadas"
          description="Exemplos de uso real com configurações customizadas"
        >
          <Example
            title="Hero Section com Destaque"
            props='twoColumnLayout="left-dominant" aspectRatio="2/1" gap="6"'
          >
            <ImageGrid
              images={createImageSet(77, 4)}
              columns={2}
              twoColumnLayout="left-dominant"
              aspectRatio="2/1"
              objectFit="cover"
              rounded="2xl"
              gap="6"
              className="max-w-6xl mx-auto"
            />
          </Example>

          <Example
            title="Galeria de Portfólio"
            props='columns={3} aspectRatio="4/3" rounded="xl" gap="8"'
          >
            <ImageGrid
              images={createImageSet(81, 9)}
              columns={3}
              aspectRatio="4/3"
              objectFit="cover"
              rounded="xl"
              gap="8"
            />
          </Example>

          <Example
            title="Mosaico Artístico"
            props='twoColumnLayout="right-dominant" objectFit="contain" rounded="3xl"'
          >
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-6 rounded-2xl">
              <ImageGrid
                images={createImageSet(90, 6)}
                columns={2}
                twoColumnLayout="right-dominant"
                aspectRatio="1/1"
                objectFit="contain"
                rounded="3xl"
                gap="5"
              />
            </div>
          </Example>

          <Example
            title="Feed de Redes Sociais"
            props='columns={3} aspectRatio="1/1" gap="1" rounded="none"'
          >
            <ImageGrid
              images={createImageSet(96, 9)}
              columns={3}
              aspectRatio="1/1"
              objectFit="cover"
              rounded="none"
              gap="1"
              className="max-w-lg mx-auto"
            />
          </Example>
        </Section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">ImageGrid Component</h3>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Componente React altamente customizável para criação de grids de
            imagens responsivos com TypeScript e Tailwind CSS. Perfeito para
            galerias, portfólios e layouts modernos.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default ShowcasePage
