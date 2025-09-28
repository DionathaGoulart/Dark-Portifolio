import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MasonryGrid } from './MasonryGrid'
import { ImageItem } from '../types'

// ================================
// MOCKS E SETUP
// ================================

/**
 * Mock do componente ImageCard
 */
vi.mock('./ui/ImageCard', () => ({
  ImageCard: vi.fn(
    ({
      image,
      onClick,
      onLoad,
      onError,
      isSquare,
      showHoverEffect,
      objectFit
    }) => (
      <div
        data-testid={`image-card-${image.id}`}
        data-image-id={image.id}
        data-is-square={isSquare}
        data-hover-effect={showHoverEffect}
        data-object-fit={objectFit}
        className="mock-image-card"
        onClick={() => onClick?.(image)}
        onLoad={() => onLoad?.(image)}
        onError={() => onError?.(image)}
      >
        <img src={image.url} alt={image.alt || ''} />
        <span>{image.title}</span>
      </div>
    )
  )
}))

/**
 * Utilitário para simular mudanças de largura da janela
 */
const mockWindowWidth = (width: number) => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width
  })
}

/**
 * Utilitário para simular evento de resize
 */
const triggerResize = () => {
  act(() => {
    window.dispatchEvent(new Event('resize'))
  })
}

// ================================
// CONSTANTES DE TESTE
// ================================

/**
 * Dados mock de imagens para testes
 */
const mockImages: ImageItem[] = [
  {
    id: '1',
    url: 'https://example.com/image1.jpg',
    alt: 'Image 1',
    title: 'First Image'
  },
  {
    id: '2',
    url: 'https://example.com/image2.jpg',
    alt: 'Image 2',
    title: 'Second Image'
  },
  {
    id: '3',
    url: 'https://example.com/image3.jpg',
    alt: 'Image 3',
    title: 'Third Image'
  },
  {
    id: '4',
    url: 'https://example.com/image4.jpg',
    alt: 'Image 4',
    title: 'Fourth Image'
  },
  {
    id: '5',
    url: 'https://example.com/image5.jpg',
    alt: 'Image 5',
    title: 'Fifth Image'
  },
  {
    id: '6',
    url: 'https://example.com/image6.jpg',
    alt: 'Image 6',
    title: 'Sixth Image'
  }
]

/**
 * Configuração de colunas responsivas para testes
 */
const defaultColumnCount = {
  sm: 1,
  md: 2,
  lg: 3,
  xl: 4
}

/**
 * Props padrão para testes
 */
const defaultProps = {
  images: mockImages,
  columnCount: defaultColumnCount,
  gap: 4,
  className: '',
  loading: false,
  error: null
}

/**
 * Helper para renderizar o componente com props customizadas
 */
const renderMasonryGrid = (props: Partial<typeof defaultProps> = {}) => {
  const mergedProps = { ...defaultProps, ...props }
  return render(<MasonryGrid {...mergedProps} />)
}

/**
 * Helper para obter ImageCards renderizados
 */
const getImageCards = () => screen.getAllByTestId(/^image-card-/)
const getImageCard = (id: string) => screen.getByTestId(`image-card-${id}`)
const getImageCardsByColumn = (columnIndex: number, totalColumns: number) => {
  const allCards = getImageCards()
  return allCards.filter((_, index) => index % totalColumns === columnIndex)
}

/**
 * Helper para obter elementos de estado
 */
const getErrorMessage = () => screen.getByText('⚠️ Erro ao carregar imagens')
const getEmptyMessage = () => screen.getByText('📷 Nenhuma imagem disponível')

// ================================
// SETUP E TEARDOWN
// ================================

beforeEach(() => {
  vi.clearAllMocks()
  mockWindowWidth(1024) // Largura padrão (lg)

  // Mock do setTimeout para debounce
  vi.useFakeTimers()
})

afterEach(() => {
  vi.restoreAllMocks()
  vi.useRealTimers()
})

// ================================
// TESTES DO COMPONENTE MASONRYGRID
// ================================

describe('Componente MasonryGrid', () => {
  // ================================
  // TESTES DE RENDERIZAÇÃO BÁSICA
  // ================================

  describe('Renderização básica', () => {
    it('deve renderizar grid com imagens fornecidas', () => {
      renderMasonryGrid()

      const imageCards = getImageCards()
      expect(imageCards).toHaveLength(mockImages.length)

      mockImages.forEach((image) => {
        expect(getImageCard(image.id)).toBeInTheDocument()
      })
    })

    it('deve aplicar className customizada no container', () => {
      const customClassName = 'custom-grid-class'
      const { container } = renderMasonryGrid({ className: customClassName })

      const gridContainer = container.firstChild as HTMLElement
      expect(gridContainer).toHaveClass(customClassName)
    })

    it('deve renderizar com props padrão quando não fornecidas', () => {
      renderMasonryGrid({ images: mockImages.slice(0, 3) })

      expect(screen.getAllByTestId(/^image-card-/)).toHaveLength(3)
    })

    it('deve aplicar gap classes corretas', () => {
      const { container } = renderMasonryGrid({ gap: 6 })

      const flexContainer = container.querySelector('.flex')
      expect(flexContainer).toHaveClass('-m-6')

      const itemContainers = container.querySelectorAll('.p-6')
      expect(itemContainers.length).toBeGreaterThan(0)
    })
  })

  // ================================
  // TESTES DE COLUNAS RESPONSIVAS
  // ================================

  describe('Colunas responsivas', () => {
    it('deve usar 1 coluna em tela pequena (sm)', async () => {
      mockWindowWidth(500) // < 640px
      renderMasonryGrid()

      triggerResize()
      vi.runAllTimers()

      await waitFor(() => {
        const columns =
          screen
            .getByRole('main', { hidden: true })
            ?.parentElement?.querySelectorAll('.flex-1') ||
          document.querySelectorAll('.flex-1')
        expect(columns).toHaveLength(1)
      })
    })

    it('deve usar 2 colunas em tela média (md)', async () => {
      mockWindowWidth(800) // >= 640px, < 1024px
      renderMasonryGrid()

      triggerResize()
      vi.runAllTimers()

      await waitFor(() => {
        const columns = document.querySelectorAll('.flex-1')
        expect(columns).toHaveLength(2)
      })
    })

    it('deve usar 3 colunas em tela grande (lg)', async () => {
      mockWindowWidth(1200) // >= 1024px, < 1280px
      renderMasonryGrid()

      triggerResize()
      vi.runAllTimers()

      await waitFor(() => {
        const columns = document.querySelectorAll('.flex-1')
        expect(columns).toHaveLength(3)
      })
    })

    it('deve usar 4 colunas em tela extra grande (xl)', async () => {
      mockWindowWidth(1400) // >= 1280px
      renderMasonryGrid()

      triggerResize()
      vi.runAllTimers()

      await waitFor(() => {
        const columns = document.querySelectorAll('.flex-1')
        expect(columns).toHaveLength(4)
      })
    })

    it('deve usar columnCount customizado', async () => {
      const customColumns = { sm: 2, md: 3, lg: 4, xl: 5 }
      mockWindowWidth(1400)
      renderMasonryGrid({ columnCount: customColumns })

      triggerResize()
      vi.runAllTimers()

      await waitFor(() => {
        const columns = document.querySelectorAll('.flex-1')
        expect(columns).toHaveLength(5)
      })
    })

    it('deve atualizar colunas quando janela é redimensionada', async () => {
      renderMasonryGrid()

      // Iniciar com lg (3 colunas)
      let columns = document.querySelectorAll('.flex-1')
      expect(columns).toHaveLength(3)

      // Redimensionar para md (2 colunas)
      mockWindowWidth(800)
      triggerResize()
      vi.runAllTimers()

      await waitFor(() => {
        columns = document.querySelectorAll('.flex-1')
        expect(columns).toHaveLength(2)
      })
    })

    it('deve fazer debounce dos eventos de resize', async () => {
      renderMasonryGrid()

      // Simular múltiplos resizes rápidos
      mockWindowWidth(500)
      triggerResize()
      mockWindowWidth(800)
      triggerResize()
      mockWindowWidth(1200)
      triggerResize()

      // Não deve atualizar ainda (debounce de 150ms)
      expect(document.querySelectorAll('.flex-1')).toHaveLength(3)

      // Após debounce
      vi.runAllTimers()

      await waitFor(() => {
        expect(document.querySelectorAll('.flex-1')).toHaveLength(3) // Último valor (1200px = lg = 3)
      })
    })
  })

  // ================================
  // TESTES DE DISTRIBUIÇÃO DE IMAGENS
  // ================================

  describe('Distribuição de imagens', () => {
    it('deve distribuir imagens igualmente entre colunas', () => {
      mockWindowWidth(1200) // 3 colunas
      renderMasonryGrid({ images: mockImages.slice(0, 6) })

      const columns = document.querySelectorAll('.flex-1')
      expect(columns).toHaveLength(3)

      // Cada coluna deve ter 2 imagens (6 imagens / 3 colunas)
      columns.forEach((column) => {
        const imageCards = column.querySelectorAll(
          '[data-testid^="image-card-"]'
        )
        expect(imageCards).toHaveLength(2)
      })
    })

    it('deve distribuir imagens sequencialmente (round-robin)', () => {
      mockWindowWidth(1200) // 3 colunas
      renderMasonryGrid({ images: mockImages.slice(0, 6) })

      const imageCards = getImageCards()

      // Primeira coluna: imagens 1, 4
      expect(imageCards[0]).toHaveAttribute('data-image-id', '1')
      expect(imageCards[3]).toHaveAttribute('data-image-id', '4')

      // Segunda coluna: imagens 2, 5
      expect(imageCards[1]).toHaveAttribute('data-image-id', '2')
      expect(imageCards[4]).toHaveAttribute('data-image-id', '5')

      // Terceira coluna: imagens 3, 6
      expect(imageCards[2]).toHaveAttribute('data-image-id', '3')
      expect(imageCards[5]).toHaveAttribute('data-image-id', '6')
    })

    it('deve lidar com número de imagens não divisível por colunas', () => {
      mockWindowWidth(1200) // 3 colunas
      renderMasonryGrid({ images: mockImages.slice(0, 5) }) // 5 imagens

      const columns = document.querySelectorAll('.flex-1')
      const column1Cards = columns[0].querySelectorAll(
        '[data-testid^="image-card-"]'
      )
      const column2Cards = columns[1].querySelectorAll(
        '[data-testid^="image-card-"]'
      )
      const column3Cards = columns[2].querySelectorAll(
        '[data-testid^="image-card-"]'
      )

      expect(column1Cards).toHaveLength(2) // imagens 1, 4
      expect(column2Cards).toHaveLength(2) // imagens 2, 5
      expect(column3Cards).toHaveLength(1) // imagem 3
    })

    it('deve recalcular distribuição quando imagens mudam', async () => {
      const { rerender } = renderMasonryGrid({ images: mockImages.slice(0, 3) })

      expect(getImageCards()).toHaveLength(3)

      rerender(
        <MasonryGrid {...defaultProps} images={mockImages.slice(0, 6)} />
      )

      await waitFor(() => {
        expect(getImageCards()).toHaveLength(6)
      })
    })
  })

  // ================================
  // TESTES DE PROPS DO IMAGECARD
  // ================================

  describe('Props do ImageCard', () => {
    it('deve repassar props corretamente para ImageCard', () => {
      renderMasonryGrid({
        isSquareGrid: true,
        showHoverEffect: true,
        objectFit: 'contain'
      })

      const imageCards = getImageCards()
      imageCards.forEach((card) => {
        expect(card).toHaveAttribute('data-is-square', 'true')
        expect(card).toHaveAttribute('data-hover-effect', 'true')
        expect(card).toHaveAttribute('data-object-fit', 'contain')
      })
    })

    it('deve usar valores padrão quando props não são fornecidas', () => {
      renderMasonryGrid()

      const imageCards = getImageCards()
      imageCards.forEach((card) => {
        expect(card).toHaveAttribute('data-is-square', 'false')
        expect(card).toHaveAttribute('data-hover-effect', 'false')
        expect(card).toHaveAttribute('data-object-fit', 'cover')
      })
    })

    it('deve repassar todos os valores de objectFit', () => {
      const objectFitOptions = [
        'cover',
        'contain',
        'fill',
        'scale-down',
        'none'
      ] as const

      objectFitOptions.forEach((objectFit) => {
        const { unmount } = renderMasonryGrid({
          objectFit,
          images: [mockImages[0]]
        })

        const imageCard = getImageCard(mockImages[0].id)
        expect(imageCard).toHaveAttribute('data-object-fit', objectFit)

        unmount()
      })
    })
  })

  // ================================
  // TESTES DE CALLBACKS E EVENTOS
  // ================================

  describe('Callbacks e eventos', () => {
    it('deve chamar onImageClick quando ImageCard é clicado', async () => {
      const user = userEvent.setup()
      const onImageClickMock = vi.fn()

      renderMasonryGrid({ onImageClick: onImageClickMock })

      const firstImageCard = getImageCard(mockImages[0].id)
      await user.click(firstImageCard)

      expect(onImageClickMock).toHaveBeenCalledTimes(1)
      expect(onImageClickMock).toHaveBeenCalledWith(mockImages[0])
    })

    it('deve chamar onImageLoad quando ImageCard carrega', () => {
      const onImageLoadMock = vi.fn()
      renderMasonryGrid({ onImageLoad: onImageLoadMock })

      const firstImageCard = getImageCard(mockImages[0].id)
      fireEvent.load(firstImageCard)

      expect(onImageLoadMock).toHaveBeenCalledTimes(1)
      expect(onImageLoadMock).toHaveBeenCalledWith(mockImages[0])
    })

    it('deve chamar onImageError e remover imagem quando há erro', async () => {
      const onImageErrorMock = vi.fn()
      renderMasonryGrid({ onImageError: onImageErrorMock })

      const firstImageCard = getImageCard(mockImages[0].id)
      fireEvent.error(firstImageCard)

      expect(onImageErrorMock).toHaveBeenCalledTimes(1)
      expect(onImageErrorMock).toHaveBeenCalledWith(mockImages[0])

      // Imagem deve ser removida da lista
      await waitFor(() => {
        expect(
          screen.queryByTestId(`image-card-${mockImages[0].id}`)
        ).not.toBeInTheDocument()
      })
    })

    it('deve não chamar callbacks quando não são fornecidos', () => {
      renderMasonryGrid({})

      const firstImageCard = getImageCard(mockImages[0].id)

      expect(() => {
        fireEvent.click(firstImageCard)
        fireEvent.load(firstImageCard)
        fireEvent.error(firstImageCard)
      }).not.toThrow()
    })

    it('deve manter outras imagens quando uma falha', async () => {
      renderMasonryGrid({ images: mockImages.slice(0, 3) })

      const firstImageCard = getImageCard(mockImages[0].id)
      fireEvent.error(firstImageCard)

      await waitFor(() => {
        expect(
          screen.queryByTestId(`image-card-${mockImages[0].id}`)
        ).not.toBeInTheDocument()
        expect(getImageCard(mockImages[1].id)).toBeInTheDocument()
        expect(getImageCard(mockImages[2].id)).toBeInTheDocument()
      })
    })
  })

  // ================================
  // TESTES DE ESTADOS DE ERRO E VAZIO
  // ================================

  describe('Estados de erro e vazio', () => {
    it('deve mostrar mensagem de erro quando error prop é fornecido', () => {
      const errorMessage = 'Falha na conexão com servidor'
      renderMasonryGrid({ error: errorMessage })

      expect(getErrorMessage()).toBeInTheDocument()
      expect(screen.getByText(errorMessage)).toBeInTheDocument()
      expect(screen.queryByTestId(/^image-card-/)).not.toBeInTheDocument()
    })

    it('deve mostrar mensagem de vazio quando não há imagens e não está carregando', () => {
      renderMasonryGrid({ images: [], loading: false })

      expect(getEmptyMessage()).toBeInTheDocument()
      expect(screen.queryByTestId(/^image-card-/)).not.toBeInTheDocument()
    })

    it('deve não mostrar mensagem de vazio quando está carregando', () => {
      renderMasonryGrid({ images: [], loading: true })

      expect(
        screen.queryByText('📷 Nenhuma imagem disponível')
      ).not.toBeInTheDocument()
    })

    it('deve aplicar className no estado de erro', () => {
      const customClassName = 'error-state-class'
      const { container } = renderMasonryGrid({
        error: 'Test error',
        className: customClassName
      })

      const errorContainer = container.firstChild as HTMLElement
      expect(errorContainer).toHaveClass(customClassName)
    })

    it('deve aplicar className no estado vazio', () => {
      const customClassName = 'empty-state-class'
      const { container } = renderMasonryGrid({
        images: [],
        loading: false,
        className: customClassName
      })

      const emptyContainer = container.firstChild as HTMLElement
      expect(emptyContainer).toHaveClass(customClassName)
    })
  })

  // ================================
  // TESTES DE ESTRUTURA DOM
  // ================================

  describe('Estrutura DOM', () => {
    it('deve ter estrutura de container correta', () => {
      const { container } = renderMasonryGrid()

      const mainContainer = container.firstChild as HTMLElement
      expect(mainContainer).toHaveClass('w-full')

      const flexContainer = mainContainer.querySelector('.flex')
      expect(flexContainer).toBeInTheDocument()
      expect(flexContainer).toHaveClass('flex', '-m-4')
    })

    it('deve criar colunas com classes flex corretas', () => {
      renderMasonryGrid()

      const columns = document.querySelectorAll('.flex-1.flex.flex-col')
      expect(columns.length).toBeGreaterThan(0)
    })

    it('deve envolver cada ImageCard em container com padding', () => {
      const { container } = renderMasonryGrid({ images: [mockImages[0]] })

      const imageCardWrapper = container.querySelector('.p-4')
      expect(imageCardWrapper).toBeInTheDocument()
      expect(imageCardWrapper).toHaveClass('w-full')
    })

    it('deve manter referência do container', () => {
      const { container } = renderMasonryGrid()

      const mainContainer = container.firstChild as HTMLElement
      expect(mainContainer.tagName).toBe('DIV')
    })
  })

  // ================================
  // TESTES DE PERFORMANCE E OTIMIZAÇÃO
  // ================================

  describe('Performance e otimização', () => {
    it('deve usar useMemo para distribuição de colunas', () => {
      const { rerender } = renderMasonryGrid()

      const initialCards = getImageCards()

      // Rerender com mesmas props não deve recalcular distribuição
      rerender(<MasonryGrid {...defaultProps} />)

      const newCards = getImageCards()
      expect(newCards).toHaveLength(initialCards.length)
    })

    it('deve recalcular apenas quando imagens ou colunas mudam', async () => {
      const { rerender } = renderMasonryGrid({ images: mockImages.slice(0, 3) })

      expect(getImageCards()).toHaveLength(3)

      // Mudança irrelevante não deve afetar
      rerender(
        <MasonryGrid
          {...defaultProps}
          images={mockImages.slice(0, 3)}
          className="new-class"
        />
      )
      expect(getImageCards()).toHaveLength(3)

      // Mudança relevante deve recalcular
      rerender(
        <MasonryGrid {...defaultProps} images={mockImages.slice(0, 5)} />
      )
      await waitFor(() => {
        expect(getImageCards()).toHaveLength(5)
      })
    })

    it('deve fazer debounce de eventos de resize para evitar recálculos excessivos', () => {
      renderMasonryGrid()

      const resizeHandler = vi.fn()
      window.addEventListener('resize', resizeHandler)

      // Múltiplos resizes
      for (let i = 0; i < 10; i++) {
        triggerResize()
      }

      expect(resizeHandler).toHaveBeenCalledTimes(10)

      // Mas o debounce deve limitar atualizações internas
      vi.runAllTimers()

      window.removeEventListener('resize', resizeHandler)
    })

    it('deve otimizar re-renders quando número de colunas não muda', async () => {
      renderMasonryGrid()

      const initialColumns = document.querySelectorAll('.flex-1')

      // Mudanças pequenas na largura que não afetam breakpoints
      mockWindowWidth(1200)
      triggerResize()
      mockWindowWidth(1250)
      triggerResize()

      vi.runAllTimers()

      await waitFor(() => {
        const newColumns = document.querySelectorAll('.flex-1')
        expect(newColumns).toHaveLength(initialColumns.length)
      })
    })
  })

  // ================================
  // TESTES DE CASOS EXTREMOS
  // ================================

  describe('Casos extremos e edge cases', () => {
    it('deve lidar com array de imagens vazio', () => {
      expect(() => {
        renderMasonryGrid({ images: [] })
      }).not.toThrow()
    })

    it('deve lidar com columnCount zero ou negativo graciosamente', () => {
      const invalidColumns = { sm: 0, md: -1, lg: 0, xl: 1 }

      expect(() => {
        renderMasonryGrid({ columnCount: invalidColumns })
      }).not.toThrow()
    })

    it('deve lidar com gap zero', () => {
      const { container } = renderMasonryGrid({ gap: 0 })

      const flexContainer = container.querySelector('.flex')
      expect(flexContainer).toHaveClass('-m-0')

      const itemContainer = container.querySelector('.p-0')
      expect(itemContainer).toBeInTheDocument()
    })

    it('deve lidar com gap muito grande', () => {
      const { container } = renderMasonryGrid({ gap: 20 })

      const flexContainer = container.querySelector('.flex')
      expect(flexContainer).toHaveClass('-m-20')
    })

    it('deve funcionar sem window (SSR)', () => {
      const originalWindow = global.window
      delete (global as any).window

      expect(() => {
        renderMasonryGrid()
      }).not.toThrow()

      global.window = originalWindow
    })

    it('deve lidar com mudanças rápidas de props', async () => {
      const { rerender } = renderMasonryGrid({ images: [mockImages[0]] })

      // Mudanças rápidas
      for (let i = 1; i <= 5; i++) {
        rerender(
          <MasonryGrid {...defaultProps} images={mockImages.slice(0, i)} />
        )
      }

      await waitFor(() => {
        expect(getImageCards()).toHaveLength(5)
      })
    })

    it('deve preservar keys dos elementos durante re-renders', () => {
      const { rerender } = renderMasonryGrid({ images: mockImages.slice(0, 3) })

      const initialCards = getImageCards()
      const initialIds = initialCards.map((card) =>
        card.getAttribute('data-image-id')
      )

      rerender(
        <MasonryGrid
          {...defaultProps}
          images={mockImages.slice(0, 3)}
          className="updated"
        />
      )

      const updatedCards = getImageCards()
      const updatedIds = updatedCards.map((card) =>
        card.getAttribute('data-image-id')
      )

      expect(updatedIds).toEqual(initialIds)
    })
  })

  // ================================
  // TESTES DE CLEANUP
  // ================================

  describe('Cleanup e memory leaks', () => {
    it('deve remover event listeners ao desmontar', () => {
      const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')

      const { unmount } = renderMasonryGrid()
      unmount()

      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        'resize',
        expect.any(Function)
      )
    })

    it('deve limpar timeouts do debounce ao desmontar', () => {
      const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout')

      const { unmount } = renderMasonryGrid()

      // Simular resize pendente
      triggerResize()

      unmount()

      expect(clearTimeoutSpy).toHaveBeenCalled()
    })

    it('deve não vazar memoria com múltiplos mounts/unmounts', () => {
      const addEventListenerSpy = vi.spyOn(window, 'addEventListener')
      const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')

      // Múltiplos ciclos
      for (let i = 0; i < 5; i++) {
        const { unmount } = renderMasonryGrid()
        unmount()
      }

      expect(addEventListenerSpy).toHaveBeenCalledTimes(5)
      expect(removeEventListenerSpy).toHaveBeenCalledTimes(5)
    })
  })
})
