import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ImageLoader } from './ImageLoader'

// ================================
// MOCKS E SETUP
// ================================

/**
 * Mock do Date.now para testes previsíveis de cache-busting
 */
const mockDateNow = vi.fn(() => 1234567890)

// ================================
// CONSTANTES DE TESTE
// ================================

/**
 * URLs de teste para diferentes cenários
 */
const TEST_URLS = {
  http: 'http://example.com/image.jpg',
  https: 'https://example.com/image.jpg',
  withParams: 'https://example.com/image.jpg?w=300&h=200',
  invalid: 'invalid-url'
} as const

/**
 * Props padrão para testes
 */
const defaultProps = {
  src: TEST_URLS.https,
  alt: 'Test image'
}

/**
 * Helper para renderizar o componente com props customizadas
 */
const renderImageLoader = (props: Partial<typeof defaultProps> = {}) => {
  const mergedProps = { ...defaultProps, ...props }
  return render(<ImageLoader {...mergedProps} />)
}

/**
 * Helper para obter elemento de imagem do DOM
 */
const getImageElement = () => screen.getByRole('img') as HTMLImageElement

/**
 * Helper para obter elemento de loading
 */
const getLoadingElement = () => screen.getByTestId('loading-spinner')

/**
 * Helper para obter elemento de erro
 */
const getErrorElement = () => screen.getByText('⚠️ Erro ao carregar')

/**
 * Adiciona data-testid ao loading spinner para facilitar os testes
 */
const originalConsoleError = console.error

// ================================
// SETUP E TEARDOWN
// ================================

beforeEach(() => {
  vi.clearAllMocks()
  vi.spyOn(Date, 'now').mockImplementation(mockDateNow)
  // Suprimir erros de console durante os testes
  console.error = vi.fn()
})

afterEach(() => {
  vi.restoreAllMocks()
  console.error = originalConsoleError
})

// ================================
// TESTES DO COMPONENTE IMAGELOADER
// ================================

describe('Componente ImageLoader', () => {
  // ================================
  // TESTES DE RENDERIZAÇÃO BÁSICA
  // ================================

  describe('Renderização básica', () => {
    it('deve renderizar imagem com props mínimas', () => {
      renderImageLoader()

      const image = getImageElement()
      expect(image).toBeInTheDocument()
      expect(image).toHaveAttribute('src', TEST_URLS.https)
      expect(image).toHaveAttribute('alt', 'Test image')
    })

    it('deve aplicar className customizada', () => {
      const customClassName = 'custom-image-class'
      renderImageLoader({
        src: TEST_URLS.https,
        alt: 'Test',
        className: customClassName
      })

      const image = getImageElement()
      expect(image).toHaveClass(customClassName)
    })

    it('deve definir atributos de otimização de imagem corretamente', () => {
      renderImageLoader()

      const image = getImageElement()
      expect(image).toHaveAttribute('loading', 'lazy')
      expect(image).toHaveAttribute('decoding', 'async')
      expect(image).toHaveAttribute('crossOrigin', 'anonymous')
      expect(image).toHaveAttribute(
        'referrerPolicy',
        'no-referrer-when-downgrade'
      )
    })

    it('deve aceitar crossOrigin customizado', () => {
      renderImageLoader({
        src: TEST_URLS.https,
        alt: 'Test',
        crossOrigin: 'use-credentials'
      })

      const image = getImageElement()
      expect(image).toHaveAttribute('crossOrigin', 'use-credentials')
    })
  })

  // ================================
  // TESTES DE ESTADO DE CARREGAMENTO
  // ================================

  describe('Estado de carregamento', () => {
    it('deve mostrar loading spinner inicialmente', () => {
      const { container } = renderImageLoader()

      // Verificar se existe um spinner de loading
      const spinner = container.querySelector('.animate-spin')
      expect(spinner).toBeInTheDocument()

      // Verificar se a imagem está com opacidade 0
      const image = getImageElement()
      expect(image).toHaveClass('opacity-0')
    })

    it('deve ocultar loading e mostrar imagem após carregamento', async () => {
      const { container } = renderImageLoader()

      const image = getImageElement()
      fireEvent.load(image)

      await waitFor(() => {
        expect(image).toHaveClass('opacity-100')
        expect(image).not.toHaveClass('opacity-0')
      })

      // Loading spinner deve desaparecer
      const spinner = container.querySelector('.animate-spin')
      expect(spinner).not.toBeInTheDocument()
    })

    it('deve aplicar transição de opacidade corretamente', () => {
      renderImageLoader()

      const image = getImageElement()
      expect(image).toHaveClass('transition-opacity', 'duration-300')
    })
  })

  // ================================
  // TESTES DE CONVERSÃO HTTPS
  // ================================

  describe('Conversão HTTPS', () => {
    it('deve converter URL HTTP para HTTPS automaticamente', async () => {
      renderImageLoader({ src: TEST_URLS.http })

      await waitFor(() => {
        const image = getImageElement()
        expect(image.src).toBe(TEST_URLS.https)
      })
    })

    it('deve manter URLs HTTPS inalteradas', () => {
      renderImageLoader({ src: TEST_URLS.https })

      const image = getImageElement()
      expect(image.src).toBe(TEST_URLS.https)
    })

    it('deve preservar parâmetros de query na conversão HTTPS', async () => {
      const httpWithParams = 'http://example.com/image.jpg?w=300&h=200'
      const expectedHttps = 'https://example.com/image.jpg?w=300&h=200'

      renderImageLoader({ src: httpWithParams })

      await waitFor(() => {
        const image = getImageElement()
        expect(image.src).toBe(expectedHttps)
      })
    })
  })

  // ================================
  // TESTES DE TRATAMENTO DE ERROS
  // ================================

  describe('Tratamento de erros e recuperação', () => {
    it('deve mostrar estado de erro quando carregamento falha', async () => {
      renderImageLoader()

      const image = getImageElement()
      fireEvent.error(image)

      await waitFor(() => {
        expect(screen.getByText('⚠️ Erro ao carregar')).toBeInTheDocument()
      })
    })

    it('deve tentar recuperação com cache-busting após primeiro erro', async () => {
      renderImageLoader({ src: TEST_URLS.https })

      const image = getImageElement()
      const originalSrc = image.src

      fireEvent.error(image)

      await waitFor(() => {
        const updatedImage = getImageElement()
        expect(updatedImage.src).toContain('cb=1234567890')
        expect(updatedImage.src).not.toBe(originalSrc)
      })
    })

    it('deve adicionar cache-buster corretamente em URLs sem parâmetros', async () => {
      renderImageLoader({ src: TEST_URLS.https })

      const image = getImageElement()
      fireEvent.error(image)

      await waitFor(() => {
        const updatedImage = getImageElement()
        expect(updatedImage.src).toBe(`${TEST_URLS.https}?cb=1234567890`)
      })
    })

    it('deve adicionar cache-buster corretamente em URLs com parâmetros existentes', async () => {
      renderImageLoader({ src: TEST_URLS.withParams })

      const image = getImageElement()
      fireEvent.error(image)

      await waitFor(() => {
        const updatedImage = getImageElement()
        expect(updatedImage.src).toBe(`${TEST_URLS.withParams}&cb=1234567890`)
      })
    })

    it('deve mostrar erro definitivo após tentativa de recuperação falhar', async () => {
      renderImageLoader()

      const image = getImageElement()

      // Primeiro erro - deve tentar recuperação
      fireEvent.error(image)

      await waitFor(() => {
        const updatedImage = getImageElement()
        expect(updatedImage.src).toContain('cb=')
      })

      // Segundo erro - deve mostrar erro definitivo
      const updatedImage = getImageElement()
      fireEvent.error(updatedImage)

      await waitFor(() => {
        expect(screen.getByText('⚠️ Erro ao carregar')).toBeInTheDocument()
        expect(screen.queryByRole('img')).not.toBeInTheDocument()
      })
    })

    it('deve aplicar className no estado de erro', async () => {
      const customClassName = 'error-class'
      renderImageLoader({
        src: TEST_URLS.invalid,
        className: customClassName
      })

      const image = getImageElement()
      fireEvent.error(image)
      fireEvent.error(image) // Segunda tentativa para forçar erro definitivo

      await waitFor(() => {
        const errorContainer = screen
          .getByText('⚠️ Erro ao carregar')
          .closest('div')
        expect(errorContainer).toHaveClass(customClassName)
      })
    })
  })

  // ================================
  // TESTES DE CALLBACKS E EVENTOS
  // ================================

  describe('Callbacks e eventos', () => {
    it('deve chamar onLoad quando imagem carrega com sucesso', () => {
      const onLoadMock = vi.fn()
      renderImageLoader({ onLoad: onLoadMock })

      const image = getImageElement()
      fireEvent.load(image)

      expect(onLoadMock).toHaveBeenCalledTimes(1)
    })

    it('deve chamar onError após tentativas de recuperação falharem', async () => {
      const onErrorMock = vi.fn()
      renderImageLoader({ onError: onErrorMock })

      const image = getImageElement()

      // Primeiro erro (não deve chamar onError ainda)
      fireEvent.error(image)
      expect(onErrorMock).not.toHaveBeenCalled()

      // Segundo erro (deve chamar onError)
      await waitFor(() => {
        const updatedImage = getImageElement()
        fireEvent.error(updatedImage)
      })

      await waitFor(() => {
        expect(onErrorMock).toHaveBeenCalledTimes(1)
      })
    })

    it('deve não chamar callbacks quando não são fornecidos', () => {
      renderImageLoader()

      const image = getImageElement()

      // Não deve gerar erro quando callbacks não existem
      expect(() => {
        fireEvent.load(image)
        fireEvent.error(image)
      }).not.toThrow()
    })

    it('deve resetar estado de erro após carregamento bem-sucedido', async () => {
      const { rerender } = renderImageLoader()

      let image = getImageElement()

      // Simular erro
      fireEvent.error(image)
      fireEvent.error(image) // Forçar erro definitivo

      await waitFor(() => {
        expect(screen.getByText('⚠️ Erro ao carregar')).toBeInTheDocument()
      })

      // Rerender com nova src
      rerender(
        <ImageLoader src="https://example.com/new-image.jpg" alt="New image" />
      )

      await waitFor(() => {
        image = getImageElement()
        fireEvent.load(image)
      })

      await waitFor(() => {
        expect(
          screen.queryByText('⚠️ Erro ao carregar')
        ).not.toBeInTheDocument()
        expect(image).toHaveClass('opacity-100')
      })
    })
  })

  // ================================
  // TESTES DE ATUALIZAÇÃO DE SRC
  // ================================

  describe('Atualização de src', () => {
    it('deve atualizar src quando prop src muda', async () => {
      const { rerender } = renderImageLoader({ src: TEST_URLS.https })

      let image = getImageElement()
      expect(image.src).toBe(TEST_URLS.https)

      const newSrc = 'https://example.com/new-image.jpg'
      rerender(<ImageLoader src={newSrc} alt="Test image" />)

      await waitFor(() => {
        image = getImageElement()
        expect(image.src).toBe(newSrc)
      })
    })

    it('deve resetar estados de loading e erro ao mudar src', async () => {
      const { rerender } = renderImageLoader()

      let image = getImageElement()

      // Simular carregamento bem-sucedido
      fireEvent.load(image)

      await waitFor(() => {
        expect(image).toHaveClass('opacity-100')
      })

      // Mudar src - deve voltar ao estado de loading
      rerender(
        <ImageLoader src="https://example.com/new-image.jpg" alt="Test image" />
      )

      await waitFor(() => {
        image = getImageElement()
        expect(image).toHaveClass('opacity-0')
      })
    })
  })

  // ================================
  // TESTES DE ESTRUTURA DOM
  // ================================

  describe('Estrutura DOM', () => {
    it('deve renderizar wrapper com classes corretas', () => {
      const { container } = renderImageLoader()

      const wrapper = container.firstChild as HTMLElement
      expect(wrapper).toHaveClass(
        'relative',
        'w-full',
        'h-full',
        'overflow-hidden'
      )
    })

    it('deve posicionar loading spinner corretamente', () => {
      const { container } = renderImageLoader()

      const spinner = container.querySelector('.animate-spin')
      const spinnerContainer = spinner?.closest('div')

      expect(spinnerContainer).toHaveClass(
        'absolute',
        'inset-0',
        'flex',
        'items-center',
        'justify-center',
        'bg-transparent'
      )
    })

    it('deve ter estrutura de erro adequada', async () => {
      renderImageLoader()

      const image = getImageElement()
      fireEvent.error(image)
      fireEvent.error(image) // Forçar erro definitivo

      await waitFor(() => {
        const errorDiv = screen.getByText('⚠️ Erro ao carregar').closest('div')
        expect(errorDiv?.parentElement).toHaveClass(
          'flex',
          'items-center',
          'justify-center',
          'bg-transparent'
        )
      })
    })
  })

  // ================================
  // TESTES DE CASOS EXTREMOS
  // ================================

  describe('Casos extremos e edge cases', () => {
    it('deve lidar com src vazia', () => {
      expect(() => {
        renderImageLoader({ src: '', alt: 'Empty src' })
      }).not.toThrow()
    })

    it('deve lidar com alt vazio', () => {
      expect(() => {
        renderImageLoader({ src: TEST_URLS.https, alt: '' })
      }).not.toThrow()
    })

    it('deve usar valores padrão para props opcionais', () => {
      renderImageLoader()

      const image = getImageElement()
      expect(image).toHaveAttribute('crossOrigin', 'anonymous')
      expect(image).toHaveClass('') // className vazio por padrão
    })

    it('deve lidar com múltiplas mudanças rápidas de src', async () => {
      const { rerender } = renderImageLoader({ src: TEST_URLS.https })

      const urls = [
        'https://example.com/image1.jpg',
        'https://example.com/image2.jpg',
        'https://example.com/image3.jpg'
      ]

      urls.forEach((url) => {
        rerender(<ImageLoader src={url} alt="Test image" />)
      })

      await waitFor(() => {
        const image = getImageElement()
        expect(image.src).toBe(urls[urls.length - 1])
      })
    })

    it('deve preservar ref da imagem entre rerenders', () => {
      const { rerender } = renderImageLoader()

      const initialImage = getImageElement()

      rerender(<ImageLoader src={TEST_URLS.https} alt="Updated alt" />)

      const updatedImage = getImageElement()
      expect(updatedImage).toBe(initialImage) // Mesma referência DOM
    })
  })

  // ================================
  // TESTES DE PERFORMANCE E OTIMIZAÇÃO
  // ================================

  describe('Performance e otimização', () => {
    it('deve aplicar atributos de otimização de performance', () => {
      renderImageLoader()

      const image = getImageElement()
      expect(image).toHaveAttribute('loading', 'lazy')
      expect(image).toHaveAttribute('decoding', 'async')
    })

    it('deve usar referrerPolicy adequada para privacidade', () => {
      renderImageLoader()

      const image = getImageElement()
      expect(image).toHaveAttribute(
        'referrerPolicy',
        'no-referrer-when-downgrade'
      )
    })

    it('deve aplicar transições CSS para UX suave', () => {
      renderImageLoader()

      const image = getImageElement()
      expect(image).toHaveClass('transition-opacity', 'duration-300')
    })
  })
})
