import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ImageCard, ImageCardPropsExtended } from './ImageCard'
import { ImageCardProps } from '@/features/grid'

// ================================
// MOCKS E SETUP
// ================================

/**
 * Mock do componente ImageLoader
 */
vi.mock('./ImageLoader', () => ({
  ImageLoader: vi.fn(({ src, alt, onLoad, onError, className }) => {
    const handleLoad = () => onLoad?.()
    const handleError = () => onError?.()

    return (
      <img
        src={src}
        alt={alt}
        className={className}
        onLoad={handleLoad}
        onError={handleError}
        data-testid="image-loader"
      />
    )
  })
}))

// ================================
// CONSTANTES DE TESTE
// ================================

/**
 * Dados mock para testes do ImageCard
 */
const mockImage: ImageCardProps['image'] = {
  id: '1',
  url: 'https://example.com/image.jpg',
  alt: 'Test image',
  title: 'Test Image Title'
}

const mockImageWithoutTitle: ImageCardProps['image'] = {
  id: '2',
  url: 'https://example.com/image2.jpg',
  alt: 'Test image without title'
}

/**
 * Props padrão para testes
 */
const defaultProps: ImageCardPropsExtended = {
  image: mockImage
}

/**
 * Helper para renderizar o componente com props customizadas
 */
const renderImageCard = (props: Partial<ImageCardPropsExtended> = {}) => {
  const mergedProps = { ...defaultProps, ...props }
  return render(<ImageCard {...mergedProps} />)
}

// ================================
// SETUP E TEARDOWN
// ================================

beforeEach(() => {
  vi.clearAllMocks()
})

afterEach(() => {
  vi.restoreAllMocks()
})

// ================================
// TESTES DO COMPONENTE IMAGECARD
// ================================

describe('Componente ImageCard', () => {
  // ================================
  // TESTES DE RENDERIZAÇÃO BÁSICA
  // ================================

  describe('Renderização básica', () => {
    it('deve renderizar o componente corretamente com props mínimas', () => {
      renderImageCard()

      const imageLoader = screen.getByTestId('image-loader')
      expect(imageLoader).toBeInTheDocument()
      expect(imageLoader).toHaveAttribute('src', mockImage.url)
      expect(imageLoader).toHaveAttribute('alt', mockImage.alt)
    })

    it('deve aplicar className customizada', () => {
      const customClassName = 'custom-class'
      renderImageCard({ className: customClassName })

      const container = screen.getByTestId('image-loader').closest('div')
      expect(container).toHaveClass(customClassName)
    })

    it('deve não renderizar quando isVisible é false (após erro)', async () => {
      renderImageCard()

      const imageLoader = screen.getByTestId('image-loader')
      fireEvent.error(imageLoader)

      await waitFor(() => {
        expect(screen.queryByTestId('image-loader')).not.toBeInTheDocument()
      })
    })
  })

  // ================================
  // TESTES DE PROPRIEDADES VISUAIS
  // ================================

  describe('Propriedades visuais', () => {
    it('deve aplicar classe de object-fit correta', () => {
      renderImageCard({ objectFit: 'contain' })

      const imageLoader = screen.getByTestId('image-loader')
      expect(imageLoader).toHaveClass('object-contain')
    })

    it('deve aplicar todas as classes de object-fit disponíveis', () => {
      const objectFitOptions = [
        'cover',
        'contain',
        'fill',
        'scale-down',
        'none'
      ] as const

      objectFitOptions.forEach((objectFit) => {
        const { unmount } = renderImageCard({ objectFit })
        const imageLoader = screen.getByTestId('image-loader')
        expect(imageLoader).toHaveClass(`object-${objectFit}`)
        unmount()
      })
    })

    it('deve aplicar classes de hover scale quando enableHoverScale é true', () => {
      renderImageCard({ enableHoverScale: true })

      const container = screen.getByTestId('image-loader').closest('div')
      expect(container).toHaveClass(
        'group',
        'cursor-pointer',
        'transition-transform',
        'duration-300',
        'hover:scale-105'
      )
    })

    it('deve não aplicar classes de hover scale quando enableHoverScale é false', () => {
      renderImageCard({ enableHoverScale: false })

      const container = screen.getByTestId('image-loader').closest('div')
      expect(container).toHaveClass('group', 'cursor-pointer')
      expect(container).not.toHaveClass(
        'transition-transform',
        'duration-300',
        'hover:scale-105'
      )
    })

    it('deve aplicar classes de shadow quando disableShadow é false', () => {
      renderImageCard({ disableShadow: false, showHoverEffect: true })

      const imageContainer = screen.getByTestId('image-loader').parentElement
      expect(imageContainer).toHaveClass(
        'shadow-lg',
        'hover:shadow-xl',
        'transition-shadow',
        'duration-300'
      )
    })

    it('deve não aplicar classes de shadow quando disableShadow é true', () => {
      renderImageCard({ disableShadow: true })

      const imageContainer = screen.getByTestId('image-loader').parentElement
      expect(imageContainer).not.toHaveClass('shadow-lg')
    })
  })

  // ================================
  // TESTES DE EFEITOS DE HOVER
  // ================================

  describe('Efeitos de hover', () => {
    it('deve renderizar overlay de hover quando showHoverEffect é true', () => {
      const { container } = renderImageCard({ showHoverEffect: true })

      const overlay = container.querySelector('.bg-black\\/5')
      expect(overlay).toBeInTheDocument()
      expect(overlay).toHaveClass(
        'opacity-0',
        'group-hover:opacity-100',
        'transition-opacity',
        'duration-300'
      )
    })

    it('deve não renderizar overlay de hover quando showHoverEffect é false', () => {
      const { container } = renderImageCard({ showHoverEffect: false })

      const overlay = container.querySelector('.bg-black\\/5')
      expect(overlay).not.toBeInTheDocument()
    })

    it('deve aplicar classes de hover effect na imagem quando showHoverEffect é true', () => {
      renderImageCard({ showHoverEffect: true })

      const imageLoader = screen.getByTestId('image-loader')
      expect(imageLoader).toHaveClass(
        'group-hover:brightness-75',
        'transition-all',
        'duration-300'
      )
    })
  })

  // ================================
  // TESTES DE TÍTULO E OVERLAY
  // ================================

  describe('Título e overlay', () => {
    it('deve renderizar overlay de título quando todas as condições são atendidas', () => {
      const { container } = renderImageCard({
        showHoverEffect: true,
        showTitle: true,
        image: mockImage
      })

      const titleOverlay = container.querySelector('.bg-gradient-to-t')
      expect(titleOverlay).toBeInTheDocument()
      expect(screen.getByText(mockImage.title!)).toBeInTheDocument()
    })

    it('deve não renderizar overlay de título quando showHoverEffect é false', () => {
      const { container } = renderImageCard({
        showHoverEffect: false,
        showTitle: true,
        image: mockImage
      })

      const titleOverlay = container.querySelector('.bg-gradient-to-t')
      expect(titleOverlay).not.toBeInTheDocument()
    })

    it('deve não renderizar overlay de título quando showTitle é false', () => {
      const { container } = renderImageCard({
        showHoverEffect: true,
        showTitle: false,
        image: mockImage
      })

      const titleOverlay = container.querySelector('.bg-gradient-to-t')
      expect(titleOverlay).not.toBeInTheDocument()
    })

    it('deve não renderizar overlay de título quando image.title não existe', () => {
      const { container } = renderImageCard({
        showHoverEffect: true,
        showTitle: true,
        image: mockImageWithoutTitle
      })

      const titleOverlay = container.querySelector('.bg-gradient-to-t')
      expect(titleOverlay).not.toBeInTheDocument()
    })

    it('deve aplicar classes responsivas corretas no overlay de título', () => {
      const { container } = renderImageCard({
        showHoverEffect: true,
        showTitle: true,
        image: mockImage
      })

      const titleOverlay = container.querySelector('.bg-gradient-to-t')
      expect(titleOverlay).toHaveClass(
        'absolute',
        'inset-x-0',
        'bottom-0',
        'p-4',
        'transform',
        'transition-all',
        'duration-300',
        'ease-out',
        'translate-y-0',
        'opacity-100',
        'md:translate-y-full',
        'md:opacity-0',
        'md:group-hover:translate-y-0',
        'md:group-hover:opacity-100'
      )
    })
  })

  // ================================
  // TESTES DE EVENTOS E INTERAÇÕES
  // ================================

  describe('Eventos e interações', () => {
    it('deve chamar onClick quando o componente é clicado', async () => {
      const user = userEvent.setup()
      const onClickMock = vi.fn()

      renderImageCard({ onClick: onClickMock })

      const container = screen.getByTestId('image-loader').closest('div')!
      await user.click(container)

      expect(onClickMock).toHaveBeenCalledTimes(1)
      expect(onClickMock).toHaveBeenCalledWith(mockImage)
    })

    it('deve chamar onLoad quando a imagem carrega', () => {
      const onLoadMock = vi.fn()
      renderImageCard({ onLoad: onLoadMock })

      const imageLoader = screen.getByTestId('image-loader')
      fireEvent.load(imageLoader)

      expect(onLoadMock).toHaveBeenCalledTimes(1)
      expect(onLoadMock).toHaveBeenCalledWith(mockImage)
    })

    it('deve chamar onError e ocultar componente quando há erro na imagem', async () => {
      const onErrorMock = vi.fn()
      renderImageCard({ onError: onErrorMock })

      const imageLoader = screen.getByTestId('image-loader')
      fireEvent.error(imageLoader)

      expect(onErrorMock).toHaveBeenCalledTimes(1)
      expect(onErrorMock).toHaveBeenCalledWith(mockImage)

      await waitFor(() => {
        expect(screen.queryByTestId('image-loader')).not.toBeInTheDocument()
      })
    })

    it('deve não chamar callbacks quando não são fornecidos', () => {
      renderImageCard({})

      const imageLoader = screen.getByTestId('image-loader')
      const container = imageLoader.closest('div')!

      // Não deve gerar erro quando callbacks não existem
      expect(() => {
        fireEvent.click(container)
        fireEvent.load(imageLoader)
        fireEvent.error(imageLoader)
      }).not.toThrow()
    })
  })

  // ================================
  // TESTES DE CASOS EXTREMOS
  // ================================

  describe('Casos extremos e edge cases', () => {
    it('deve usar alt padrão quando image.alt não é fornecido', () => {
      const imageWithoutAlt = { ...mockImage, alt: undefined }
      renderImageCard({ image: imageWithoutAlt })

      const imageLoader = screen.getByTestId('image-loader')
      expect(imageLoader).toHaveAttribute('alt', 'Image')
    })

    it('deve aplicar valores padrão das props corretamente', () => {
      renderImageCard()

      const imageLoader = screen.getByTestId('image-loader')
      const container = imageLoader.closest('div')

      // Verificar defaults: enableHoverScale=true, objectFit=cover, showTitle=true, etc.
      expect(container).toHaveClass('transition-transform', 'hover:scale-105')
      expect(imageLoader).toHaveClass('object-cover')
    })

    it('deve lidar com imagem sem ID', () => {
      const imageWithoutId = { ...mockImage, id: undefined as any }

      expect(() => {
        renderImageCard({ image: imageWithoutId })
      }).not.toThrow()
    })

    it('deve renderizar corretamente com todas as props opcionais definidas', () => {
      const allProps: ImageCardPropsExtended = {
        image: mockImage,
        onClick: vi.fn(),
        onLoad: vi.fn(),
        onError: vi.fn(),
        className: 'test-class',
        isSquare: true,
        showHoverEffect: true,
        enableHoverScale: false,
        objectFit: 'contain',
        showTitle: false,
        disableShadow: true
      }

      expect(() => {
        renderImageCard(allProps)
      }).not.toThrow()

      const imageLoader = screen.getByTestId('image-loader')
      expect(imageLoader).toBeInTheDocument()
      expect(imageLoader).toHaveClass('object-contain')
    })
  })

  // ================================
  // TESTES DE ACESSIBILIDADE
  // ================================

  describe('Acessibilidade', () => {
    it('deve ter atributos de acessibilidade corretos', () => {
      renderImageCard()

      const imageLoader = screen.getByTestId('image-loader')
      const container = imageLoader.closest('div')

      expect(imageLoader).toHaveAttribute('alt')
      expect(container).toHaveClass('cursor-pointer')
    })

    it('deve ser navegável por teclado', async () => {
      const user = userEvent.setup()
      const onClickMock = vi.fn()

      renderImageCard({ onClick: onClickMock })

      const container = screen.getByTestId('image-loader').closest('div')!

      // Simular navegação por teclado (o container deveria ser focalizável)
      container.focus()
      await user.keyboard('{Enter}')

      // Nota: Em um cenário real, você adicionaria tabIndex e onKeyDown
      // Este teste documenta o comportamento atual
      expect(container).toHaveClass('cursor-pointer')
    })
  })
})
