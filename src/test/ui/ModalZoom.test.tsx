import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ModalZoom } from './ModalZoom'

// ================================
// MOCKS E SETUP
// ================================

/**
 * Mock do Date.now para testes previsíveis
 */
const mockDateNow = vi.fn(() => 1234567890)

/**
 * Mock das animações CSS para evitar problemas em testes
 */
const mockGetComputedStyle = vi.fn(() => ({
  getPropertyValue: vi.fn(() => ''),
  animation: 'none'
}))

// ================================
// CONSTANTES DE TESTE
// ================================

/**
 * Dados mock de imagens para diferentes cenários
 */
const mockImages = {
  complete: {
    urls: { large: 'https://example.com/large-image.jpg' },
    url: 'https://example.com/fallback-image.jpg',
    alt: 'Test image description'
  },
  urlOnly: {
    url: 'https://example.com/simple-image.jpg',
    alt: 'Simple image'
  },
  largeOnly: {
    urls: { large: 'https://example.com/large-only.jpg' }
  },
  noAlt: {
    urls: { large: 'https://example.com/no-alt.jpg' }
  },
  empty: {},
  invalid: {
    urls: { large: 'invalid-url' },
    alt: 'Invalid image'
  }
} as const

/**
 * Props padrão para testes
 */
const defaultProps = {
  image: mockImages.complete,
  onClose: vi.fn()
}

/**
 * Helper para renderizar o componente com props customizadas
 */
const renderModalZoom = (props: Partial<typeof defaultProps> = {}) => {
  const mergedProps = { ...defaultProps, ...props }
  return render(<ModalZoom {...mergedProps} />)
}

/**
 * Helper para obter elementos do DOM
 */
const getImageElement = () => screen.getByRole('img') as HTMLImageElement
const getCloseButton = () => screen.getByRole('button', { name: /fechar/i })
const getLoadingSpinner = () => screen.getByTestId('loading-spinner')
const getErrorMessage = () => screen.getByText('Imagem não encontrada')
const getModalOverlay = () => screen.getByTestId('modal-overlay')

/**
 * Helper para simular clique fora da imagem
 */
const clickOutsideImage = async (user: ReturnType<typeof userEvent.setup>) => {
  const overlay = getModalOverlay()
  await user.click(overlay)
}

// ================================
// SETUP E TEARDOWN
// ================================

beforeEach(() => {
  vi.clearAllMocks()
  vi.spyOn(Date, 'now').mockImplementation(mockDateNow)
  vi.spyOn(window, 'getComputedStyle').mockImplementation(mockGetComputedStyle)

  // Adicionar data-testids via query selectors para facilitar testes
  const originalQuerySelector = document.querySelector
  document.querySelector = vi.fn((selector) => {
    if (selector === '.fixed.inset-0') {
      const element = originalQuerySelector.call(document, selector)
      if (element) element.setAttribute('data-testid', 'modal-overlay')
      return element
    }
    return originalQuerySelector.call(document, selector)
  })
})

afterEach(() => {
  vi.restoreAllMocks()
})

// ================================
// TESTES DO COMPONENTE MODALZOOM
// ================================

describe('Componente ModalZoom', () => {
  // ================================
  // TESTES DE RENDERIZAÇÃO BÁSICA
  // ================================

  describe('Renderização básica', () => {
    it('deve renderizar modal com imagem corretamente', () => {
      const { container } = renderModalZoom()

      // Verificar overlay do modal
      const overlay = container.querySelector('.fixed.inset-0')
      expect(overlay).toBeInTheDocument()
      expect(overlay).toHaveClass(
        'bg-primary-black/90',
        'flex',
        'items-center',
        'justify-center',
        'z-50'
      )

      // Verificar imagem
      const image = getImageElement()
      expect(image).toBeInTheDocument()
      expect(image).toHaveAttribute('src', mockImages.complete.urls!.large)
      expect(image).toHaveAttribute('alt', mockImages.complete.alt)
    })

    it('deve renderizar botão de fechar', () => {
      renderModalZoom()

      const closeButton = getCloseButton()
      expect(closeButton).toBeInTheDocument()
      expect(closeButton).toHaveClass('absolute', 'top-4', 'right-4')
      expect(closeButton).toHaveAttribute('aria-label', 'Fechar')
    })

    it('deve priorizar URL large sobre URL fallback', () => {
      renderModalZoom({ image: mockImages.complete })

      const image = getImageElement()
      expect(image).toHaveAttribute('src', mockImages.complete.urls!.large)
    })

    it('deve usar URL fallback quando large não existe', () => {
      renderModalZoom({ image: mockImages.urlOnly })

      const image = getImageElement()
      expect(image).toHaveAttribute('src', mockImages.urlOnly.url)
    })

    it('deve usar alt vazio quando não fornecido', () => {
      renderModalZoom({ image: mockImages.noAlt })

      const image = getImageElement()
      expect(image).toHaveAttribute('alt', '')
    })
  })

  // ================================
  // TESTES DE RENDERIZAÇÃO CONDICIONAL
  // ================================

  describe('Renderização condicional', () => {
    it('deve não renderizar quando não há URL de imagem', () => {
      const { container } = renderModalZoom({ image: mockImages.empty })

      expect(container.firstChild).toBeNull()
    })

    it('deve não renderizar quando image é null/undefined', () => {
      const { container } = render(
        <ModalZoom image={null as any} onClose={vi.fn()} />
      )

      expect(container.firstChild).toBeNull()
    })

    it('deve renderizar quando há apenas url (sem urls.large)', () => {
      renderModalZoom({ image: mockImages.urlOnly })

      expect(getImageElement()).toBeInTheDocument()
    })

    it('deve renderizar quando há apenas urls.large (sem url)', () => {
      renderModalZoom({ image: mockImages.largeOnly })

      expect(getImageElement()).toBeInTheDocument()
    })
  })

  // ================================
  // TESTES DE ESTADO DE CARREGAMENTO
  // ================================

  describe('Estado de carregamento', () => {
    it('deve mostrar loading spinner inicialmente', () => {
      const { container } = renderModalZoom()

      // Verificar se existem os 3 pontos do loading
      const loadingDots = container.querySelectorAll(
        '.w-2.h-2.bg-primary-white\\/50.rounded-full'
      )
      expect(loadingDots).toHaveLength(3)

      // Verificar container do loading
      const loadingContainer = container.querySelector(
        '.absolute.inset-0.flex.items-center.justify-center'
      )
      expect(loadingContainer).toBeInTheDocument()
    })

    it('deve aplicar delays de animação corretos nos pontos de loading', () => {
      const { container } = renderModalZoom()

      const loadingDots = container.querySelectorAll(
        '.w-2.h-2.bg-primary-white\\/50.rounded-full'
      )
      const expectedDelays = ['0ms', '200ms', '400ms']

      loadingDots.forEach((dot, index) => {
        const style = (dot as HTMLElement).style
        expect(style.animation).toContain(`${expectedDelays[index]}`)
      })
    })

    it('deve ocultar loading e mostrar imagem após carregamento', async () => {
      const { container } = renderModalZoom()

      const image = getImageElement()
      expect(image).toHaveClass('opacity-0')

      fireEvent.load(image)

      await waitFor(() => {
        expect(image).toHaveClass('opacity-100')
        expect(image).not.toHaveClass('opacity-0')
      })

      // Loading deve desaparecer
      const loadingContainer = container.querySelector(
        '.absolute.inset-0.flex.items-center.justify-center'
      )
      expect(loadingContainer).not.toBeInTheDocument()
    })

    it('deve aplicar transição de opacidade na imagem', () => {
      renderModalZoom()

      const image = getImageElement()
      expect(image).toHaveClass('transition-opacity', 'duration-300')
    })
  })

  // ================================
  // TESTES DE ESTADO DE ERRO
  // ================================

  describe('Estado de erro', () => {
    it('deve mostrar estado de erro quando carregamento falha', async () => {
      renderModalZoom()

      const image = getImageElement()
      fireEvent.error(image)

      await waitFor(() => {
        expect(screen.getByText('Imagem não encontrada')).toBeInTheDocument()
      })
    })

    it('deve renderizar ícone de erro corretamente', async () => {
      const { container } = renderModalZoom()

      const image = getImageElement()
      fireEvent.error(image)

      await waitFor(() => {
        const errorIcon = container.querySelector('svg')
        expect(errorIcon).toBeInTheDocument()
        expect(errorIcon).toHaveClass('w-12', 'h-12')
        expect(errorIcon).toHaveAttribute('viewBox', '0 0 24 24')
      })
    })

    it('deve ocultar loading e imagem no estado de erro', async () => {
      const { container } = renderModalZoom()

      const image = getImageElement()
      fireEvent.error(image)

      await waitFor(() => {
        // Loading desaparece
        const loadingContainer = container.querySelector(
          '.absolute.inset-0.flex.items-center.justify-center'
        )
        expect(loadingContainer).not.toBeInTheDocument()

        // Imagem fica invisível
        expect(image).toHaveClass('opacity-0')
      })
    })

    it('deve estilizar estado de erro corretamente', async () => {
      const { container } = renderModalZoom()

      const image = getImageElement()
      fireEvent.error(image)

      await waitFor(() => {
        const errorContainer = container.querySelector(
          '.text-center.text-primary-white\\/50'
        )
        expect(errorContainer).toBeInTheDocument()

        const errorText = screen.getByText('Imagem não encontrada')
        expect(errorText).toHaveClass('text-sm', 'font-medium')
      })
    })
  })

  // ================================
  // TESTES DE INTERAÇÕES E EVENTOS
  // ================================

  describe('Interações e eventos', () => {
    it('deve chamar onClose quando botão fechar é clicado', async () => {
      const user = userEvent.setup()
      const onCloseMock = vi.fn()

      renderModalZoom({ onClose: onCloseMock })

      const closeButton = getCloseButton()
      await user.click(closeButton)

      expect(onCloseMock).toHaveBeenCalledTimes(1)
    })

    it('deve chamar onClose quando clica no overlay (fora da imagem)', async () => {
      const user = userEvent.setup()
      const onCloseMock = vi.fn()

      const { container } = renderModalZoom({ onClose: onCloseMock })

      const overlay = container.querySelector('.fixed.inset-0')!
      await user.click(overlay)

      expect(onCloseMock).toHaveBeenCalledTimes(1)
    })

    it('deve NÃO chamar onClose quando clica na imagem', async () => {
      const user = userEvent.setup()
      const onCloseMock = vi.fn()

      renderModalZoom({ onClose: onCloseMock })

      const image = getImageElement()
      await user.click(image)

      expect(onCloseMock).not.toHaveBeenCalled()
    })

    it('deve prevenir propagação de eventos na imagem', () => {
      renderModalZoom()

      const image = getImageElement()
      const clickEvent = new MouseEvent('click', { bubbles: true })
      const stopPropagationSpy = vi.spyOn(clickEvent, 'stopPropagation')

      fireEvent(image, clickEvent)

      expect(stopPropagationSpy).toHaveBeenCalled()
    })

    it('deve aplicar cursor pointer no overlay', () => {
      const { container } = renderModalZoom()

      const overlay = container.querySelector('.fixed.inset-0')
      expect(overlay).toHaveClass('cursor-pointer')
    })
  })

  // ================================
  // TESTES DE ESTADOS E CICLO DE VIDA
  // ================================

  describe('Estados e ciclo de vida', () => {
    it('deve resetar estados quando URL da imagem muda', async () => {
      const { rerender } = renderModalZoom({ image: mockImages.complete })

      let image = getImageElement()
      fireEvent.load(image)

      await waitFor(() => {
        expect(image).toHaveClass('opacity-100')
      })

      // Mudar imagem - deve voltar ao estado de loading
      rerender(<ModalZoom image={mockImages.urlOnly} onClose={vi.fn()} />)

      await waitFor(() => {
        image = getImageElement()
        expect(image).toHaveClass('opacity-0')
      })
    })

    it('deve resetar estados de erro quando URL muda', async () => {
      const { rerender, container } = renderModalZoom({
        image: mockImages.invalid
      })

      let image = getImageElement()
      fireEvent.error(image)

      await waitFor(() => {
        expect(screen.getByText('Imagem não encontrada')).toBeInTheDocument()
      })

      // Mudar para imagem válida
      rerender(<ModalZoom image={mockImages.complete} onClose={vi.fn()} />)

      await waitFor(() => {
        expect(
          screen.queryByText('Imagem não encontrada')
        ).not.toBeInTheDocument()

        image = getImageElement()
        expect(image).toHaveClass('opacity-0') // Volta ao loading
      })
    })

    it('deve atualizar ref do tempo de carregamento quando URL muda', () => {
      const { rerender } = renderModalZoom({ image: mockImages.complete })

      const initialTime = mockDateNow()

      // Mudar tempo
      mockDateNow.mockReturnValue(9876543210)

      rerender(<ModalZoom image={mockImages.urlOnly} onClose={vi.fn()} />)

      expect(mockDateNow).toHaveBeenCalledTimes(2) // Uma vez no mount, outra no useEffect
    })
  })

  // ================================
  // TESTES DE ESTILOS E ANIMAÇÕES
  // ================================

  describe('Estilos e animações', () => {
    it('deve injetar keyframes CSS corretamente', () => {
      const { container } = renderModalZoom()

      const styleElement = container.querySelector('style')
      expect(styleElement).toBeInTheDocument()

      const cssContent = styleElement?.innerHTML
      expect(cssContent).toContain('@keyframes shimmer')
      expect(cssContent).toContain('@keyframes bounce')
      expect(cssContent).toContain('transform: translateX(-100%) skewX(-12deg)')
      expect(cssContent).toContain('transform: scale(0)')
    })

    it('deve aplicar classes de posicionamento e z-index corretas', () => {
      const { container } = renderModalZoom()

      const overlay = container.querySelector('.fixed.inset-0')
      expect(overlay).toHaveClass('z-50', 'p-4')
    })

    it('deve estilizar imagem com object-contain e dimensões responsivas', () => {
      renderModalZoom()

      const image = getImageElement()
      expect(image).toHaveClass('max-w-full', 'max-h-full', 'object-contain')
    })

    it('deve aplicar hover effects no botão fechar', () => {
      renderModalZoom()

      const closeButton = getCloseButton()
      expect(closeButton).toHaveClass(
        'hover:text-gray-300',
        'transition-colors'
      )
    })

    it('deve usar cores do tema corretas', () => {
      const { container } = renderModalZoom()

      const overlay = container.querySelector('.fixed.inset-0')
      expect(overlay).toHaveClass('bg-primary-black/90')

      const loadingDots = container.querySelectorAll('.bg-primary-white\\/50')
      expect(loadingDots).toHaveLength(3)
    })
  })

  // ================================
  // TESTES DE ACESSIBILIDADE
  // ================================

  describe('Acessibilidade', () => {
    it('deve ter aria-label no botão fechar', () => {
      renderModalZoom()

      const closeButton = getCloseButton()
      expect(closeButton).toHaveAttribute('aria-label', 'Fechar')
    })

    it('deve preservar alt text da imagem', () => {
      renderModalZoom({ image: mockImages.complete })

      const image = getImageElement()
      expect(image).toHaveAttribute('alt', mockImages.complete.alt)
    })

    it('deve usar alt vazio quando não fornecido (para evitar leitores lerem filename)', () => {
      renderModalZoom({ image: mockImages.noAlt })

      const image = getImageElement()
      expect(image).toHaveAttribute('alt', '')
    })

    it('deve ter contraste adequado no texto de erro', async () => {
      const { container } = renderModalZoom()

      const image = getImageElement()
      fireEvent.error(image)

      await waitFor(() => {
        const errorContainer = container.querySelector(
          '.text-primary-white\\/50'
        )
        expect(errorContainer).toBeInTheDocument()
      })
    })
  })

  // ================================
  // TESTES DE CASOS EXTREMOS
  // ================================

  describe('Casos extremos e edge cases', () => {
    it('deve lidar com props undefined graciosamente', () => {
      expect(() => {
        render(<ModalZoom image={undefined as any} onClose={vi.fn()} />)
      }).not.toThrow()
    })

    it('deve lidar com onClose undefined', () => {
      expect(() => {
        render(
          <ModalZoom image={mockImages.complete} onClose={undefined as any} />
        )
      }).not.toThrow()
    })

    it('deve lidar com URLs muito longas', () => {
      const longUrl =
        'https://example.com/' + 'very-long-path/'.repeat(100) + 'image.jpg'
      const imageWithLongUrl = {
        urls: { large: longUrl },
        alt: 'Long URL image'
      }

      expect(() => {
        renderModalZoom({ image: imageWithLongUrl })
      }).not.toThrow()

      const image = getImageElement()
      expect(image).toHaveAttribute('src', longUrl)
    })

    it('deve lidar com caracteres especiais no alt text', () => {
      const specialAltImage = {
        urls: { large: 'https://example.com/special.jpg' },
        alt: 'Imagem com acentos: ção, ã, é, ü & <símbolos>'
      }

      renderModalZoom({ image: specialAltImage })

      const image = getImageElement()
      expect(image).toHaveAttribute('alt', specialAltImage.alt)
    })

    it('deve preservar comportamento com múltiplas instâncias', () => {
      const onClose1 = vi.fn()
      const onClose2 = vi.fn()

      const { unmount } = renderModalZoom({
        image: mockImages.complete,
        onClose: onClose1
      })
      unmount()

      renderModalZoom({ image: mockImages.urlOnly, onClose: onClose2 })

      // Deve renderizar nova instância sem problemas
      expect(getImageElement()).toBeInTheDocument()
    })
  })

  // ================================
  // TESTES DE PERFORMANCE
  // ================================

  describe('Performance e otimização', () => {
    it('deve não renderizar elementos desnecessários durante loading', () => {
      const { container } = renderModalZoom()

      // Erro não deve estar presente durante loading
      expect(
        screen.queryByText('Imagem não encontrada')
      ).not.toBeInTheDocument()
    })

    it('deve não renderizar loading durante estado de erro', async () => {
      const { container } = renderModalZoom()

      const image = getImageElement()
      fireEvent.error(image)

      await waitFor(() => {
        const loadingContainer = container.querySelector(
          '.absolute.inset-0.flex.items-center.justify-center'
        )
        expect(loadingContainer).not.toBeInTheDocument()
      })
    })

    it('deve otimizar rerenders ao mudar apenas estados internos', async () => {
      const onCloseMock = vi.fn()
      renderModalZoom({ onClose: onCloseMock })

      const image = getImageElement()
      const initialSrc = image.src

      // Mudança de estado não deve alterar src
      fireEvent.load(image)

      await waitFor(() => {
        expect(image.src).toBe(initialSrc)
      })
    })
  })
})
