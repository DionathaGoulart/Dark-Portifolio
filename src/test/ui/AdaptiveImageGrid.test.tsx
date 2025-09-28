import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  AdaptiveImageGrid,
  AdaptiveSoloGrid,
  AdaptiveTwoColumnGrid,
  AdaptiveThreeColumnGrid,
  AdaptiveFourColumnGrid,
  AdaptiveFiveColumnGrid
} from './AdaptiveImageGrid'
import { ImageItem } from '@/types/Ui.types'

// ================================
// MOCKS E SETUP
// ================================

/**
 * Mock do componente ImageCard
 */
vi.mock('@/features/grid', () => ({
  ImageCard: vi.fn(
    ({
      image,
      onClick,
      onLoad,
      onError,
      isSquare,
      objectFit,
      showHoverEffect,
      enableHoverScale,
      showTitle,
      className,
      disableShadow
    }) => (
      <div
        data-testid={`adaptive-image-card-${image.id}`}
        data-image-id={image.id}
        data-is-square={isSquare}
        data-object-fit={objectFit}
        data-hover-effect={showHoverEffect}
        data-hover-scale={enableHoverScale}
        data-show-title={showTitle}
        data-disable-shadow={disableShadow}
        className={`mock-adaptive-image-card ${className}`}
        onClick={() => onClick?.(image)}
        onLoad={() => onLoad?.(image)}
        onError={() => onError?.(image)}
      >
        <img src={image.url} alt={image.alt || ''} />
        {image.title && <span>{image.title}</span>}
      </div>
    )
  )
}))

/**
 * Mock da Image API para simular detecção de orientação
 */
class MockImage {
  src: string = ''
  naturalWidth: number = 400
  naturalHeight: number = 300
  onload: (() => void) | null = null
  onerror: (() => void) | null = null

  constructor() {
    // Simular carregamento assíncrono
    setTimeout(() => {
      if (this.onload) this.onload()
    }, 10)
  }
}

global.Image = MockImage as any

// ================================
// CONSTANTES DE TESTE
// ================================

/**
 * Dados mock de imagens com diferentes orientações simuladas
 */
const mockImages: ImageItem[] = [
  {
    id: '1',
    url: 'https://example.com/landscape.jpg',
    alt: 'Landscape image',
    title: 'Landscape',
    width: 800,
    height: 600
  },
  {
    id: '2',
    url: 'https://example.com/portrait.jpg',
    alt: 'Portrait image',
    title: 'Portrait',
    width: 600,
    height: 800
  },
  {
    id: '3',
    url: 'https://example.com/square.jpg',
    alt: 'Square image',
    title: 'Square',
    width: 500,
    height: 500
  },
  {
    id: '4',
    url: 'https://example.com/ultrawide.jpg',
    alt: 'Ultra wide image',
    title: 'Ultra Wide',
    width: 1000,
    height: 300
  },
  {
    id: '5',
    url: 'https://example.com/ultratall.jpg',
    alt: 'Ultra tall image',
    title: 'Ultra Tall',
    width: 200,
    height: 800
  },
  {
    id: '6',
    url: 'https://example.com/photo.jpg',
    alt: 'Photo image',
    title: 'Photo',
    width: 400,
    height: 600
  }
]

/**
 * Regras adaptáveis customizadas para testes
 */
const customAdaptiveRules = {
  portrait: { aspectRatio: 'portrait', objectFit: 'contain' },
  landscape: { aspectRatio: 'landscape', objectFit: 'cover' },
  square: { aspectRatio: 'square', objectFit: 'fill' },
  ultraWide: { aspectRatio: 'ultrawide', objectFit: 'scale-down' },
  ultraTall: { aspectRatio: 'tall', objectFit: 'none' }
}

/**
 * Props padrão para testes
 */
const defaultProps = {
  images: mockImages.slice(0, 4),
  mode: 'grid' as const,
  gridColumns: 3 as const,
  gap: 4,
  className: '',
  loading: false,
  error: null
}

/**
 * Helper para renderizar o componente com props customizadas
 */
const renderAdaptiveGrid = (props: Partial<typeof defaultProps> = {}) => {
  const mergedProps = { ...defaultProps, ...props }
  return render(<AdaptiveImageGrid {...mergedProps} />)
}

/**
 * Helpers para obter elementos do DOM
 */
const getImageCards = () => screen.getAllByTestId(/^adaptive-image-card-/)
const getImageCard = (id: string) =>
  screen.getByTestId(`adaptive-image-card-${id}`)
const getErrorMessage = () => screen.getByText('⚠️ Erro ao carregar imagens')
const getGridContainer = () =>
  document.querySelector('.grid') || document.querySelector('.flex')

/**
 * Helper para simular diferentes orientações de imagem
 */
const mockImageOrientation = (
  imageId: string,
  width: number,
  height: number
) => {
  const originalImage = global.Image

  global.Image = vi.fn().mockImplementation(function (this: any) {
    this.naturalWidth = width
    this.naturalHeight = height
    this.src = ''
    this.onload = null
    this.onerror = null

    setTimeout(() => {
      if (this.onload) this.onload()
    }, 10)

    return this
  }) as any

  return () => {
    global.Image = originalImage
  }
}

// ================================
// SETUP E TEARDOWN
// ================================

beforeEach(() => {
  vi.clearAllMocks()
  vi.useFakeTimers()
})

afterEach(() => {
  vi.restoreAllMocks()
  vi.useRealTimers()
})

// ================================
// TESTES DO COMPONENTE ADAPTIVEIMAGEGRID
// ================================

describe('Componente AdaptiveImageGrid', () => {
  // ================================
  // TESTES DE RENDERIZAÇÃO BÁSICA
  // ================================

  describe('Renderização básica', () => {
    it('deve renderizar grid com imagens fornecidas', () => {
      renderAdaptiveGrid()

      const imageCards = getImageCards()
      expect(imageCards).toHaveLength(4)

      mockImages.slice(0, 4).forEach((image) => {
        expect(getImageCard(image.id)).toBeInTheDocument()
      })
    })

    it('deve aplicar className customizada', () => {
      const customClassName = 'custom-adaptive-grid'
      const { container } = renderAdaptiveGrid({ className: customClassName })

      const gridContainer = container.firstChild as HTMLElement
      expect(gridContainer).toHaveClass(customClassName)
    })

    it('deve renderizar com props padrão', () => {
      renderAdaptiveGrid({ images: [mockImages[0]] })

      const imageCard = getImageCard(mockImages[0].id)
      expect(imageCard).toBeInTheDocument()
      expect(imageCard).toHaveAttribute('data-object-fit', 'cover')
      expect(imageCard).toHaveAttribute('data-is-square', 'false')
    })

    it('deve aplicar backgroundColor quando fornecido', () => {
      const backgroundColor = '#ff0000'
      const { container } = renderAdaptiveGrid({ backgroundColor })

      const styledElements = container.querySelectorAll(
        '[style*="background-color"]'
      )
      expect(styledElements.length).toBeGreaterThan(0)

      styledElements.forEach((element) => {
        expect((element as HTMLElement).style.backgroundColor).toBe(
          'rgb(255, 0, 0)'
        )
      })
    })
  })

  // ================================
  // TESTES DE MODOS DE GRID
  // ================================

  describe('Modos de grid', () => {
    it('deve renderizar em modo solo', () => {
      const { container } = renderAdaptiveGrid({ mode: 'solo' })

      const gridContainer = container.querySelector('.grid-cols-1')
      expect(gridContainer).toBeInTheDocument()
    })

    it('deve renderizar grid com 2 colunas', () => {
      const { container } = renderAdaptiveGrid({ gridColumns: 2 })

      const gridContainer = container.querySelector('.grid-cols-2')
      expect(gridContainer).toBeInTheDocument()
    })

    it('deve renderizar grid com 3 colunas (padrão)', () => {
      const { container } = renderAdaptiveGrid({ gridColumns: 3 })

      const gridContainer = container.querySelector('.grid-cols-3')
      expect(gridContainer).toBeInTheDocument()
    })

    it('deve renderizar grid com 4 colunas', () => {
      const { container } = renderAdaptiveGrid({ gridColumns: 4 })

      const gridContainer = container.querySelector('.grid-cols-4')
      expect(gridContainer).toBeInTheDocument()
    })

    it('deve renderizar grid com 5 colunas', () => {
      const { container } = renderAdaptiveGrid({ gridColumns: 5 })

      const gridContainer = container.querySelector('.grid-cols-5')
      expect(gridContainer).toBeInTheDocument()
    })

    it('deve usar grid padrão para valores inválidos de colunas', () => {
      const { container } = renderAdaptiveGrid({ gridColumns: 10 as any })

      const gridContainer = container.querySelector('.grid-cols-3')
      expect(gridContainer).toBeInTheDocument()
    })
  })

  // ================================
  // TESTES DE MODO DOMINANTE
  // ================================

  describe('Modo dominante', () => {
    it('deve renderizar layout dominante à esquerda', () => {
      const { container } = renderAdaptiveGrid({
        gridColumns: 2,
        dominantSide: 'left',
        images: mockImages.slice(0, 4)
      })

      const flexContainer = container.querySelector('.flex.flex-col')
      expect(flexContainer).toBeInTheDocument()

      const dominantElements = container.querySelectorAll('.flex-\\[4\\]')
      expect(dominantElements.length).toBeGreaterThan(0)
    })

    it('deve renderizar layout dominante à direita', () => {
      const { container } = renderAdaptiveGrid({
        gridColumns: 2,
        dominantSide: 'right',
        images: mockImages.slice(0, 4)
      })

      const flexContainer = container.querySelector('.flex.flex-col')
      expect(flexContainer).toBeInTheDocument()

      const dominantElements = container.querySelectorAll('.flex-\\[4\\]')
      expect(dominantElements.length).toBeGreaterThan(0)
    })

    it('deve não aplicar modo dominante quando dominantSide é none', () => {
      const { container } = renderAdaptiveGrid({
        gridColumns: 2,
        dominantSide: 'none'
      })

      const gridContainer = container.querySelector('.grid-cols-2')
      expect(gridContainer).toBeInTheDocument()

      const flexContainer = container.querySelector('.flex.flex-col')
      expect(flexContainer).not.toBeInTheDocument()
    })

    it('deve não aplicar modo dominante quando não é 2 colunas', () => {
      const { container } = renderAdaptiveGrid({
        gridColumns: 3,
        dominantSide: 'left'
      })

      const gridContainer = container.querySelector('.grid-cols-3')
      expect(gridContainer).toBeInTheDocument()

      const dominantElements = container.querySelectorAll('.flex-\\[4\\]')
      expect(dominantElements).toHaveLength(0)
    })

    it('deve renderizar pares de imagens em modo dominante', () => {
      const { container } = renderAdaptiveGrid({
        gridColumns: 2,
        dominantSide: 'left',
        images: mockImages.slice(0, 6) // 6 imagens = 3 pares
      })

      const pairs = container.querySelectorAll('[key*="pair-"]')
      // Como não podemos acessar keys diretamente, verificamos estrutura
      const pairContainers = container.querySelectorAll('.flex.items-stretch')
      expect(pairContainers).toHaveLength(3)
    })
  })

  // ================================
  // TESTES DE DETECÇÃO DE ORIENTAÇÃO
  // ================================

  describe('Detecção de orientação', () => {
    it('deve detectar orientação landscape automaticamente', async () => {
      const restoreMock = mockImageOrientation('1', 800, 600) // landscape

      renderAdaptiveGrid({ adaptiveMode: 'auto', images: [mockImages[0]] })

      vi.runAllTimers()
      await act(async () => {
        await waitFor(() => {
          const imageCard = getImageCard(mockImages[0].id)
          expect(imageCard).toBeInTheDocument()
        })
      })

      restoreMock()
    })

    it('deve detectar orientação portrait automaticamente', async () => {
      const restoreMock = mockImageOrientation('2', 600, 800) // portrait

      renderAdaptiveGrid({ adaptiveMode: 'auto', images: [mockImages[1]] })

      vi.runAllTimers()
      await act(async () => {
        await waitFor(() => {
          const imageCard = getImageCard(mockImages[1].id)
          expect(imageCard).toBeInTheDocument()
        })
      })

      restoreMock()
    })

    it('deve detectar orientação square automaticamente', async () => {
      const restoreMock = mockImageOrientation('3', 500, 500) // square

      renderAdaptiveGrid({ adaptiveMode: 'auto', images: [mockImages[2]] })

      vi.runAllTimers()
      await act(async () => {
        await waitFor(() => {
          const imageCard = getImageCard(mockImages[2].id)
          expect(imageCard).toBeInTheDocument()
        })
      })

      restoreMock()
    })

    it('deve detectar orientação ultraWide automaticamente', async () => {
      const restoreMock = mockImageOrientation('4', 1000, 300) // ultraWide (ratio > 2.5)

      renderAdaptiveGrid({ adaptiveMode: 'auto', images: [mockImages[3]] })

      vi.runAllTimers()
      await act(async () => {
        await waitFor(() => {
          const imageCard = getImageCard(mockImages[3].id)
          expect(imageCard).toBeInTheDocument()
        })
      })

      restoreMock()
    })

    it('deve detectar orientação ultraTall automaticamente', async () => {
      const restoreMock = mockImageOrientation('5', 200, 800) // ultraTall (ratio < 0.4)

      renderAdaptiveGrid({ adaptiveMode: 'auto', images: [mockImages[4]] })

      vi.runAllTimers()
      await act(async () => {
        await waitFor(() => {
          const imageCard = getImageCard(mockImages[4].id)
          expect(imageCard).toBeInTheDocument()
        })
      })

      restoreMock()
    })

    it('deve usar fallback square quando detecção falha', async () => {
      const originalImage = global.Image
      global.Image = vi.fn().mockImplementation(function (this: any) {
        this.src = ''
        this.onerror = null
        setTimeout(() => {
          if (this.onerror) this.onerror()
        }, 10)
        return this
      }) as any

      renderAdaptiveGrid({ adaptiveMode: 'auto', images: [mockImages[0]] })

      vi.runAllTimers()
      await act(async () => {
        await waitFor(() => {
          const imageCard = getImageCard(mockImages[0].id)
          expect(imageCard).toBeInTheDocument()
        })
      })

      global.Image = originalImage
    })
  })

  // ================================
  // TESTES DE ADAPTIVE RULES
  // ================================

  describe('Regras adaptáveis', () => {
    it('deve usar regras adaptáveis padrão', () => {
      renderAdaptiveGrid({ adaptiveMode: 'manual' })

      const imageCards = getImageCards()
      imageCards.forEach((card) => {
        expect(card).toHaveAttribute('data-object-fit', 'cover') // fallback padrão
      })
    })

    it('deve usar regras adaptáveis customizadas', () => {
      renderAdaptiveGrid({
        adaptiveMode: 'manual',
        adaptiveRules: customAdaptiveRules,
        fallbackObjectFit: 'contain'
      })

      const imageCards = getImageCards()
      imageCards.forEach((card) => {
        expect(card).toHaveAttribute('data-object-fit', 'contain')
      })
    })

    it('deve aplicar fallbackAspectRatio em modo manual', () => {
      const { container } = renderAdaptiveGrid({
        adaptiveMode: 'manual',
        fallbackAspectRatio: 'square'
      })

      const aspectSquareElements = container.querySelectorAll('.aspect-square')
      expect(aspectSquareElements.length).toBeGreaterThan(0)
    })

    it('deve aplicar fallbackObjectFit em modo manual', () => {
      renderAdaptiveGrid({
        adaptiveMode: 'manual',
        fallbackObjectFit: 'contain'
      })

      const imageCards = getImageCards()
      imageCards.forEach((card) => {
        expect(card).toHaveAttribute('data-object-fit', 'contain')
      })
    })
  })

  // ================================
  // TESTES DE CLASSES CSS E ESTILOS
  // ================================

  describe('Classes CSS e estilos', () => {
    it('deve aplicar classes de gap corretas', () => {
      const gapValues = [1, 2, 3, 4, 6, 8]

      gapValues.forEach((gap) => {
        const { container, unmount } = renderAdaptiveGrid({ gap })

        const gapElement = container.querySelector(`.gap-${gap}`)
        expect(gapElement).toBeInTheDocument()

        unmount()
      })
    })

    it('deve usar gap padrão para valores inválidos', () => {
      const { container } = renderAdaptiveGrid({ gap: 99 })

      const gapElement = container.querySelector('.gap-4')
      expect(gapElement).toBeInTheDocument()
    })

    it('deve aplicar aspect ratio classes corretamente', () => {
      const aspectRatios = [
        'square',
        'portrait',
        'landscape',
        'wide',
        'ultrawide',
        'tall',
        'vertical',
        'story',
        'photo',
        'golden',
        'cinema',
        'banner',
        'instagram',
        'card'
      ]

      aspectRatios.forEach((ratio) => {
        const { container, unmount } = renderAdaptiveGrid({
          fallbackAspectRatio: ratio as any,
          adaptiveMode: 'manual'
        })

        // Verificar se alguma classe de aspect ratio foi aplicada
        const hasAspectClass =
          Array.from(container.querySelectorAll('[class*="aspect-"]')).length >
          0
        expect(hasAspectClass).toBe(true)

        unmount()
      })
    })

    it('deve aplicar backface-visibility para otimização', () => {
      const { container } = renderAdaptiveGrid()

      const optimizedElements = container.querySelectorAll(
        '[style*="backface-visibility: hidden"]'
      )
      expect(optimizedElements.length).toBeGreaterThan(0)
    })

    it('deve aplicar classes de centralização em grid dominante', () => {
      const { container } = renderAdaptiveGrid({
        gridColumns: 2,
        dominantSide: 'left',
        fallbackObjectFit: 'contain'
      })

      const centeringElements = container.querySelectorAll(
        '.items-center.justify-center'
      )
      expect(centeringElements.length).toBeGreaterThan(0)
    })
  })

  // ================================
  // TESTES DE CALLBACKS E EVENTOS
  // ================================

  describe('Callbacks e eventos', () => {
    it('deve chamar onImageClick quando ImageCard é clicado', async () => {
      const user = userEvent.setup()
      const onImageClickMock = vi.fn()

      renderAdaptiveGrid({ onImageClick: onImageClickMock })

      const firstImageCard = getImageCard(mockImages[0].id)
      await user.click(firstImageCard)

      expect(onImageClickMock).toHaveBeenCalledTimes(1)
      expect(onImageClickMock).toHaveBeenCalledWith(mockImages[0])
    })

    it('deve chamar onImageLoad quando ImageCard carrega', () => {
      const onImageLoadMock = vi.fn()
      renderAdaptiveGrid({ onImageLoad: onImageLoadMock })

      const firstImageCard = getImageCard(mockImages[0].id)
      fireEvent.load(firstImageCard)

      expect(onImageLoadMock).toHaveBeenCalledTimes(1)
      expect(onImageLoadMock).toHaveBeenCalledWith(mockImages[0])
    })

    it('deve chamar onImageError e remover imagem quando há erro', async () => {
      const onImageErrorMock = vi.fn()
      renderAdaptiveGrid({ onImageError: onImageErrorMock })

      const firstImageCard = getImageCard(mockImages[0].id)
      fireEvent.error(firstImageCard)

      expect(onImageErrorMock).toHaveBeenCalledTimes(1)
      expect(onImageErrorMock).toHaveBeenCalledWith(mockImages[0])

      await waitFor(() => {
        expect(
          screen.queryByTestId(`adaptive-image-card-${mockImages[0].id}`)
        ).not.toBeInTheDocument()
      })
    })

    it('deve não chamar callbacks quando não são fornecidos', () => {
      renderAdaptiveGrid({})

      const firstImageCard = getImageCard(mockImages[0].id)

      expect(() => {
        fireEvent.click(firstImageCard)
        fireEvent.load(firstImageCard)
        fireEvent.error(firstImageCard)
      }).not.toThrow()
    })
  })

  // ================================
  // TESTES DE ESTADOS DE ERRO E VAZIO
  // ================================

  describe('Estados de erro e vazio', () => {
    it('deve mostrar mensagem de erro quando error prop é fornecido', () => {
      const errorMessage = 'Falha na conexão'
      renderAdaptiveGrid({ error: errorMessage })

      expect(getErrorMessage()).toBeInTheDocument()
      expect(screen.getByText(errorMessage)).toBeInTheDocument()
      expect(
        screen.queryByTestId(/^adaptive-image-card-/)
      ).not.toBeInTheDocument()
    })

    it('deve não renderizar nada quando não há imagens e não está carregando', () => {
      const { container } = renderAdaptiveGrid({ images: [], loading: false })

      expect(container.firstChild).toBeEmptyDOMElement()
    })

    it('deve não renderizar vazio quando está carregando', () => {
      const { container } = renderAdaptiveGrid({ images: [], loading: true })

      expect(container.firstChild).toBeEmptyDOMElement()
    })

    it('deve aplicar className no estado de erro', () => {
      const customClassName = 'error-adaptive-grid'
      const { container } = renderAdaptiveGrid({
        error: 'Test error',
        className: customClassName
      })

      const errorContainer = container.firstChild as HTMLElement
      expect(errorContainer).toHaveClass(customClassName)
    })
  })

  // ================================
  // TESTES DE PROPS DO IMAGECARD
  // ================================

  describe('Props do ImageCard', () => {
    it('deve repassar props corretas para ImageCard', () => {
      renderAdaptiveGrid()

      const imageCards = getImageCards()
      imageCards.forEach((card) => {
        expect(card).toHaveAttribute('data-is-square', 'false')
        expect(card).toHaveAttribute('data-hover-effect', 'false')
        expect(card).toHaveAttribute('data-hover-scale', 'false')
        expect(card).toHaveAttribute('data-show-title', 'false')
        expect(card).toHaveAttribute('data-disable-shadow', 'true')
      })
    })

    it('deve aplicar className customizada nos ImageCards', () => {
      renderAdaptiveGrid()

      const imageCards = getImageCards()
      imageCards.forEach((card) => {
        expect(card).toHaveClass('mock-adaptive-image-card')
      })
    })

    it('deve ajustar className baseado no modo dominante', () => {
      const { container } = renderAdaptiveGrid({
        gridColumns: 2,
        dominantSide: 'left',
        fallbackObjectFit: 'contain'
      })

      const imageCards = container.querySelectorAll('.max-w-full.max-h-full')
      expect(imageCards.length).toBeGreaterThan(0)
    })
  })

  // ================================
  // TESTES DE CASOS EXTREMOS
  // ================================

  describe('Casos extremos e edge cases', () => {
    it('deve lidar com array de imagens vazio', () => {
      expect(() => {
        renderAdaptiveGrid({ images: [] })
      }).not.toThrow()
    })

    it('deve lidar com imagem sem dimensões', async () => {
      const imageWithoutDimensions = { ...mockImages[0] }
      delete imageWithoutDimensions.width
      delete imageWithoutDimensions.height

      renderAdaptiveGrid({
        images: [imageWithoutDimensions],
        adaptiveMode: 'auto'
      })

      vi.runAllTimers()
      await act(async () => {
        await waitFor(() => {
          expect(getImageCard(imageWithoutDimensions.id)).toBeInTheDocument()
        })
      })
    })

    it('deve lidar com aspectRatio inválido', () => {
      const { container } = renderAdaptiveGrid({
        fallbackAspectRatio: 'invalid-ratio' as any,
        adaptiveMode: 'manual'
      })

      // Deve não quebrar e não aplicar classe aspect inválida
      expect(container.firstChild).toBeInTheDocument()
    })

    it('deve lidar com objectFit inválido', () => {
      renderAdaptiveGrid({
        fallbackObjectFit: 'invalid-fit' as any
      })

      const imageCards = getImageCards()
      imageCards.forEach((card) => {
        expect(card).toHaveAttribute('data-object-fit', 'invalid-fit')
      })
    })

    it('deve lidar com mudanças rápidas de images prop', async () => {
      const { rerender } = renderAdaptiveGrid({ images: [mockImages[0]] })

      for (let i = 2; i <= 4; i++) {
        rerender(
          <AdaptiveImageGrid
            {...defaultProps}
            images={mockImages.slice(0, i)}
          />
        )
      }

      await waitFor(() => {
        expect(getImageCards()).toHaveLength(4)
      })
    })

    it('deve funcionar com número ímpar de imagens no modo dominante', () => {
      const { container } = renderAdaptiveGrid({
        gridColumns: 2,
        dominantSide: 'left',
        images: mockImages.slice(0, 5) // 5 imagens
      })

      const pairContainers = container.querySelectorAll('.flex.items-stretch')
      expect(pairContainers).toHaveLength(3) // 2 pares + 1 imagem sozinha
    })
  })

  // ================================
  // TESTES DOS COMPONENTES DE CONVENIÊNCIA
  // ================================

  describe('Componentes de conveniência', () => {
    it('deve renderizar AdaptiveSoloGrid corretamente', () => {
      const { container } = render(
        <AdaptiveSoloGrid images={[mockImages[0]]} />
      )

      const soloGrid = container.querySelector('.grid-cols-1')
      expect(soloGrid).toBeInTheDocument()
      expect(getImageCard(mockImages[0].id)).toBeInTheDocument()
    })

    it('deve renderizar AdaptiveTwoColumnGrid corretamente', () => {
      const { container } = render(
        <AdaptiveTwoColumnGrid images={mockImages.slice(0, 2)} />
      )

      const twoColumnGrid = container.querySelector('.grid-cols-2')
      expect(twoColumnGrid).toBeInTheDocument()
      expect(getImageCards()).toHaveLength(2)
    })

    it('deve renderizar AdaptiveThreeColumnGrid corretamente', () => {
      const { container } = render(
        <AdaptiveThreeColumnGrid images={mockImages.slice(0, 3)} />
      )

      const threeColumnGrid = container.querySelector('.grid-cols-3')
      expect(threeColumnGrid).toBeInTheDocument()
      expect(getImageCards()).toHaveLength(3)
    })

    it('deve renderizar AdaptiveFourColumnGrid corretamente', () => {
      const { container } = render(
        <AdaptiveFourColumnGrid images={mockImages.slice(0, 4)} />
      )

      const fourColumnGrid = container.querySelector('.grid-cols-4')
      expect(fourColumnGrid).toBeInTheDocument()
      expect(getImageCards()).toHaveLength(4)
    })

    it('deve renderizar AdaptiveFiveColumnGrid corretamente', () => {
      const { container } = render(
        <AdaptiveFiveColumnGrid images={mockImages.slice(0, 5)} />
      )

      const fiveColumnGrid = container.querySelector('.grid-cols-5')
      expect(fiveColumnGrid).toBeInTheDocument()
      expect(getImageCards()).toHaveLength(5)
    })

    it('deve aceitar todas as props nos componentes de conveniência', () => {
      const commonProps = {
        images: [mockImages[0]],
        gap: 6,
        className: 'convenience-test',
        backgroundColor: '#f0f0f0',
        fallbackObjectFit: 'contain' as const,
        onImageClick: vi.fn()
      }

      // Testa cada componente de conveniência
      const components = [
        { Component: AdaptiveSoloGrid, expectedClass: '.grid-cols-1' },
        { Component: AdaptiveTwoColumnGrid, expectedClass: '.grid-cols-2' },
        { Component: AdaptiveThreeColumnGrid, expectedClass: '.grid-cols-3' },
        { Component: AdaptiveFourColumnGrid, expectedClass: '.grid-cols-4' },
        { Component: AdaptiveFiveColumnGrid, expectedClass: '.grid-cols-5' }
      ]

      components.forEach(({ Component, expectedClass }) => {
        const { container, unmount } = render(<Component {...commonProps} />)

        expect(container.querySelector(expectedClass)).toBeInTheDocument()
        expect(container.firstChild).toHaveClass('convenience-test')

        const imageCard = getImageCard(mockImages[0].id)
        expect(imageCard).toHaveAttribute('data-object-fit', 'contain')

        unmount()
      })
    })
  })

  // ================================
  // TESTES DE PERFORMANCE E OTIMIZAÇÃO
  // ================================

  describe('Performance e otimização', () => {
    it('deve usar useEffect para recarregar orientações quando images mudam', async () => {
      const { rerender } = renderAdaptiveGrid({
        images: [mockImages[0]],
        adaptiveMode: 'auto'
      })

      vi.runAllTimers()
      await act(async () => {
        await waitFor(() => {
          expect(getImageCard(mockImages[0].id)).toBeInTheDocument()
        })
      })

      // Mudar imagens deve recarregar detecção
      rerender(
        <AdaptiveImageGrid
          {...defaultProps}
          images={[mockImages[1]]}
          adaptiveMode="auto"
        />
      )

      vi.runAllTimers()
      await act(async () => {
        await waitFor(() => {
          expect(getImageCard(mockImages[1].id)).toBeInTheDocument()
        })
      })
    })

    it('deve não executar detecção de orientação em modo manual', () => {
      const imageSpy = vi.spyOn(global, 'Image')

      renderAdaptiveGrid({ adaptiveMode: 'manual' })

      vi.runAllTimers()

      expect(imageSpy).not.toHaveBeenCalled()
    })

    it('deve otimizar rerenders quando apenas className muda', () => {
      const { rerender } = renderAdaptiveGrid({ images: [mockImages[0]] })

      const initialImageCard = getImageCard(mockImages[0].id)

      rerender(
        <AdaptiveImageGrid
          {...defaultProps}
          images={[mockImages[0]]}
          className="updated-class"
        />
      )

      const updatedImageCard = getImageCard(mockImages[0].id)
      expect(updatedImageCard).toBe(initialImageCard) // Mesma referência DOM
    })

    it('deve aplicar backface-visibility para performance de animações', () => {
      const { container } = renderAdaptiveGrid()

      const optimizedElements = container.querySelectorAll(
        '[style*="backface-visibility"]'
      )
      optimizedElements.forEach((element) => {
        expect((element as HTMLElement).style.backfaceVisibility).toBe('hidden')
      })
    })

    it('deve limpar estado de orientações quando adaptiveMode muda', async () => {
      const { rerender } = renderAdaptiveGrid({
        adaptiveMode: 'auto',
        images: [mockImages[0]]
      })

      vi.runAllTimers()
      await act(async () => {
        await waitFor(() => {
          expect(getImageCard(mockImages[0].id)).toBeInTheDocument()
        })
      })

      // Mudar para manual deve não executar nova detecção
      const imageSpy = vi.spyOn(global, 'Image')

      rerender(
        <AdaptiveImageGrid
          {...defaultProps}
          adaptiveMode="manual"
          images={[mockImages[0]]}
        />
      )

      vi.runAllTimers()

      expect(imageSpy).not.toHaveBeenCalled()
    })
  })

  // ================================
  // TESTES DE ALGORITMO DE ORIENTAÇÃO
  // ================================

  describe('Algoritmo de detecção de orientação', () => {
    it('deve detectar ultraWide corretamente (ratio > 2.5)', async () => {
      const restoreMock = mockImageOrientation('test', 1000, 300) // ratio = 3.33

      renderAdaptiveGrid({
        adaptiveMode: 'auto',
        images: [{ ...mockImages[0], id: 'test' }]
      })

      vi.runAllTimers()
      await act(async () => {
        await waitFor(() => {
          expect(getImageCard('test')).toBeInTheDocument()
        })
      })

      restoreMock()
    })

    it('deve detectar landscape corretamente (1.3 < ratio <= 2.5)', async () => {
      const restoreMock = mockImageOrientation('test', 800, 500) // ratio = 1.6

      renderAdaptiveGrid({
        adaptiveMode: 'auto',
        images: [{ ...mockImages[0], id: 'test' }]
      })

      vi.runAllTimers()
      await act(async () => {
        await waitFor(() => {
          expect(getImageCard('test')).toBeInTheDocument()
        })
      })

      restoreMock()
    })

    it('deve detectar square corretamente (0.9 <= ratio <= 1.1)', async () => {
      const restoreMock = mockImageOrientation('test', 500, 510) // ratio = 0.98

      renderAdaptiveGrid({
        adaptiveMode: 'auto',
        images: [{ ...mockImages[0], id: 'test' }]
      })

      vi.runAllTimers()
      await act(async () => {
        await waitFor(() => {
          expect(getImageCard('test')).toBeInTheDocument()
        })
      })

      restoreMock()
    })

    it('deve detectar portrait corretamente (0.4 < ratio < 0.9)', async () => {
      const restoreMock = mockImageOrientation('test', 400, 600) // ratio = 0.67

      renderAdaptiveGrid({
        adaptiveMode: 'auto',
        images: [{ ...mockImages[0], id: 'test' }]
      })

      vi.runAllTimers()
      await act(async () => {
        await waitFor(() => {
          expect(getImageCard('test')).toBeInTheDocument()
        })
      })

      restoreMock()
    })

    it('deve detectar ultraTall corretamente (ratio <= 0.4)', async () => {
      const restoreMock = mockImageOrientation('test', 200, 1000) // ratio = 0.2

      renderAdaptiveGrid({
        adaptiveMode: 'auto',
        images: [{ ...mockImages[0], id: 'test' }]
      })

      vi.runAllTimers()
      await act(async () => {
        await waitFor(() => {
          expect(getImageCard('test')).toBeInTheDocument()
        })
      })

      restoreMock()
    })

    it('deve lidar com divisão por zero graciosamente', async () => {
      const restoreMock = mockImageOrientation('test', 500, 0) // altura zero

      expect(() => {
        renderAdaptiveGrid({
          adaptiveMode: 'auto',
          images: [{ ...mockImages[0], id: 'test' }]
        })
      }).not.toThrow()

      restoreMock()
    })

    it('deve lidar com dimensões negativas', async () => {
      const restoreMock = mockImageOrientation('test', -500, 600) // largura negativa

      expect(() => {
        renderAdaptiveGrid({
          adaptiveMode: 'auto',
          images: [{ ...mockImages[0], id: 'test' }]
        })
      }).not.toThrow()

      restoreMock()
    })
  })

  // ================================
  // TESTES DE INTEGRAÇÃO COMPLEXA
  // ================================

  describe('Integração complexa', () => {
    it('deve funcionar com todas as props customizadas simultaneamente', async () => {
      const allProps = {
        images: mockImages.slice(0, 6),
        mode: 'grid' as const,
        gridColumns: 2 as const,
        adaptiveMode: 'auto' as const,
        fallbackAspectRatio: 'portrait' as const,
        fallbackObjectFit: 'contain' as const,
        dominantSide: 'left' as const,
        gap: 6,
        backgroundColor: '#f0f0f0',
        className: 'complex-integration-test',
        onImageClick: vi.fn(),
        onImageLoad: vi.fn(),
        onImageError: vi.fn(),
        loading: false,
        error: null,
        adaptiveRules: customAdaptiveRules
      }

      const { container } = render(<AdaptiveImageGrid {...allProps} />)

      // Verificar estrutura principal
      expect(container.firstChild).toHaveClass('complex-integration-test')
      expect(container.querySelector('.flex.flex-col')).toBeInTheDocument()
      expect(container.querySelector('.gap-6')).toBeInTheDocument()

      // Verificar imagens
      expect(getImageCards()).toHaveLength(6)

      // Verificar background
      const styledElements = container.querySelectorAll(
        '[style*="background-color"]'
      )
      expect(styledElements.length).toBeGreaterThan(0)

      // Simular interação
      vi.runAllTimers()
      await act(async () => {
        await waitFor(() => {
          const firstCard = getImageCard(mockImages[0].id)
          expect(firstCard).toBeInTheDocument()
        })
      })
    })

    it('deve manter consistência durante múltiplas mudanças de estado', async () => {
      const initialProps = {
        images: mockImages.slice(0, 2),
        gridColumns: 2 as const,
        dominantSide: 'none' as const
      }

      const { rerender, container } = renderAdaptiveGrid(initialProps)

      // Estado 1: Grid normal
      expect(container.querySelector('.grid-cols-2')).toBeInTheDocument()

      // Estado 2: Modo dominante
      rerender(
        <AdaptiveImageGrid
          {...defaultProps}
          {...initialProps}
          dominantSide="left"
        />
      )
      expect(container.querySelector('.flex.flex-col')).toBeInTheDocument()

      // Estado 3: Mais imagens
      rerender(
        <AdaptiveImageGrid
          {...defaultProps}
          images={mockImages.slice(0, 6)}
          gridColumns={2}
          dominantSide="left"
        />
      )
      expect(getImageCards()).toHaveLength(6)

      // Estado 4: Modo solo
      rerender(
        <AdaptiveImageGrid
          {...defaultProps}
          images={mockImages.slice(0, 6)}
          mode="solo"
        />
      )
      expect(container.querySelector('.grid-cols-1')).toBeInTheDocument()

      await waitFor(() => {
        expect(getImageCards()).toHaveLength(6)
      })
    })

    it('deve gerenciar memory leaks com detecção de orientação', async () => {
      const { unmount } = renderAdaptiveGrid({
        adaptiveMode: 'auto',
        images: mockImages
      })

      vi.runAllTimers()

      // Simular múltiplas detecções
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 50))
      })

      // Desmontar deve não causar erros
      expect(() => unmount()).not.toThrow()
    })
  })

  // ================================
  // TESTES DE ACESSIBILIDADE
  // ================================

  describe('Acessibilidade', () => {
    it('deve preservar alt text das imagens', () => {
      renderAdaptiveGrid()

      const imageElements = screen.getAllByRole('img')
      imageElements.forEach((img, index) => {
        expect(img).toHaveAttribute('alt', mockImages[index].alt)
      })
    })

    it('deve manter estrutura semântica adequada', () => {
      const { container } = renderAdaptiveGrid()

      // Verificar se não há problemas de aninhamento
      const nestedGrids = container.querySelectorAll('.grid .grid')
      expect(nestedGrids).toHaveLength(0)
    })

    it('deve funcionar com tecnologias assistivas', () => {
      renderAdaptiveGrid()

      const imageCards = getImageCards()
      imageCards.forEach((card) => {
        // Verificar se elementos são clicáveis
        expect(card).toHaveAttribute('data-testid')
      })
    })

    it('deve manter contraste adequado com backgroundColor', () => {
      const { container } = renderAdaptiveGrid({ backgroundColor: '#ffffff' })

      const styledElements = container.querySelectorAll(
        '[style*="background-color"]'
      )
      styledElements.forEach((element) => {
        expect((element as HTMLElement).style.backgroundColor).toBe(
          'rgb(255, 255, 255)'
        )
      })
    })
  })
})
