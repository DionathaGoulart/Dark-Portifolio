import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MasonryGrid } from '@/shared/components/ui/MasonryGrid'
import { ImageItem } from '@/types'

// Mock ImageCard component
jest.mock('@/shared/components/ui/ImageCard', () => ({
  ImageCard: ({ image, onClick, onLoad, onError, isSquare, showHoverEffect, objectFit }: any) => (
    <div
      data-testid={`image-card-${image.id}`}
      onClick={() => onClick?.(image)}
      onLoad={() => onLoad?.(image)}
      onError={() => onError?.(image)}
      data-is-square={isSquare}
      data-show-hover={showHoverEffect}
      data-object-fit={objectFit}
    >
      {image.title || image.alt}
    </div>
  )
}))

describe('MasonryGrid', () => {
  const mockImages: ImageItem[] = [
    { id: '1', url: 'https://example.com/1.jpg', alt: 'Image 1', title: 'Title 1' },
    { id: '2', url: 'https://example.com/2.jpg', alt: 'Image 2', title: 'Title 2' },
    { id: '3', url: 'https://example.com/3.jpg', alt: 'Image 3', title: 'Title 3' },
    { id: '4', url: 'https://example.com/4.jpg', alt: 'Image 4', title: 'Title 4' },
    { id: '5', url: 'https://example.com/5.jpg', alt: 'Image 5', title: 'Title 5' }
  ]

  const defaultProps = {
    images: mockImages,
    onImageClick: jest.fn(),
    onImageLoad: jest.fn(),
    onImageError: jest.fn()
  }

  beforeEach(() => {
    jest.clearAllMocks()
    // Mock window.innerWidth
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024
    })
  })

  describe('Rendering', () => {
    it('renders with images', () => {
      render(<MasonryGrid {...defaultProps} />)

      expect(screen.getByTestId('image-card-1')).toBeInTheDocument()
      expect(screen.getByTestId('image-card-2')).toBeInTheDocument()
      expect(screen.getByTestId('image-card-3')).toBeInTheDocument()
    })

    it('renders with custom className', () => {
      const customClass = 'custom-masonry'
      render(<MasonryGrid {...defaultProps} className={customClass} />)

      const container = screen.getByTestId('image-card-1').closest('.w-full')
      expect(container).toHaveClass(customClass)
    })

    it('renders with empty images array', () => {
      render(<MasonryGrid {...defaultProps} images={[]} />)

      expect(screen.getByText('📷 Nenhuma imagem disponível')).toBeInTheDocument()
    })

    it('renders error state', () => {
      const errorMessage = 'Failed to load images'
      render(<MasonryGrid {...defaultProps} error={errorMessage} />)

      expect(screen.getByText('⚠️ Erro ao carregar imagens')).toBeInTheDocument()
      expect(screen.getByText(errorMessage)).toBeInTheDocument()
    })
  })

  describe('Column Distribution', () => {
    it('distributes images across columns correctly', () => {
      render(<MasonryGrid {...defaultProps} columnCount={{ sm: 1, md: 2, lg: 3, xl: 4 }} />)

      // With 5 images and 3 columns, should distribute as: [1,4], [2,5], [3]
      const columns = screen.getAllByTestId(/image-card-\d+/)
      expect(columns).toHaveLength(5)
    })

    it('handles single column layout', () => {
      render(<MasonryGrid {...defaultProps} columnCount={{ sm: 1, md: 1, lg: 1, xl: 1 }} />)

      const columns = screen.getAllByTestId(/image-card-\d+/)
      expect(columns).toHaveLength(5)
    })

    it('handles zero columns gracefully', () => {
      render(<MasonryGrid {...defaultProps} columnCount={{ sm: 0, md: 0, lg: 0, xl: 0 }} />)

      expect(screen.queryByTestId(/image-card-\d+/)).not.toBeInTheDocument()
    })
  })

  describe('Responsive Behavior', () => {
    it('updates columns on window resize', async () => {
      const { rerender } = render(<MasonryGrid {...defaultProps} />)

      // Simulate window resize
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 500
      })

      fireEvent(window, new Event('resize'))

      await waitFor(() => {
        // Should still render images
        expect(screen.getByTestId('image-card-1')).toBeInTheDocument()
      })
    })

    it('handles undefined window', () => {
      // Mock window as undefined (SSR)
      const originalWindow = global.window
      // @ts-ignore
      delete global.window

      render(<MasonryGrid {...defaultProps} />)

      expect(screen.getByTestId('image-card-1')).toBeInTheDocument()

      // Restore window
      global.window = originalWindow
    })
  })

  describe('Gap Configuration', () => {
    it('applies correct gap classes', () => {
      render(<MasonryGrid {...defaultProps} gap={8} />)

      const container = screen.getByTestId('image-card-1').closest('.flex')
      expect(container).toHaveClass('-m-8')
    })

    it('applies default gap when not specified', () => {
      render(<MasonryGrid {...defaultProps} />)

      const container = screen.getByTestId('image-card-1').closest('.flex')
      expect(container).toHaveClass('-m-4')
    })
  })

  describe('Image Card Props', () => {
    it('passes isSquare prop to ImageCard', () => {
      render(<MasonryGrid {...defaultProps} isSquareGrid={true} />)

      const imageCard = screen.getByTestId('image-card-1')
      expect(imageCard).toHaveAttribute('data-is-square', 'true')
    })

    it('passes showHoverEffect prop to ImageCard', () => {
      render(<MasonryGrid {...defaultProps} showHoverEffect={true} />)

      const imageCard = screen.getByTestId('image-card-1')
      expect(imageCard).toHaveAttribute('data-show-hover', 'true')
    })

    it('passes objectFit prop to ImageCard', () => {
      render(<MasonryGrid {...defaultProps} objectFit="contain" />)

      const imageCard = screen.getByTestId('image-card-1')
      expect(imageCard).toHaveAttribute('data-object-fit', 'contain')
    })
  })

  describe('Event Handlers', () => {
    it('calls onImageClick when image is clicked', async () => {
      const user = userEvent.setup()
      render(<MasonryGrid {...defaultProps} />)

      const imageCard = screen.getByTestId('image-card-1')
      await user.click(imageCard)

      expect(defaultProps.onImageClick).toHaveBeenCalledWith(mockImages[0])
    })

    it('calls onImageLoad when image loads', () => {
      render(<MasonryGrid {...defaultProps} />)

      const imageCard = screen.getByTestId('image-card-1')
      fireEvent.load(imageCard)

      expect(defaultProps.onImageLoad).toHaveBeenCalledWith(mockImages[0])
    })

    it('calls onImageError and removes image from grid', () => {
      render(<MasonryGrid {...defaultProps} />)

      const imageCard = screen.getByTestId('image-card-1')
      fireEvent.error(imageCard)

      expect(defaultProps.onImageError).toHaveBeenCalledWith(mockImages[0])
      // Image should be removed from grid
      expect(screen.queryByTestId('image-card-1')).not.toBeInTheDocument()
    })
  })

  describe('Loading State', () => {
    it('shows empty state when loading is false and no images', () => {
      render(<MasonryGrid {...defaultProps} images={[]} loading={false} />)

      expect(screen.getByText('📷 Nenhuma imagem disponível')).toBeInTheDocument()
    })

    it('does not show empty state when loading is true', () => {
      render(<MasonryGrid {...defaultProps} images={[]} loading={true} />)

      expect(screen.queryByText('📷 Nenhuma imagem disponível')).not.toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('handles images with missing properties', () => {
      const incompleteImages = [
        { id: '1', url: 'https://example.com/1.jpg' },
        { id: '2', url: 'https://example.com/2.jpg', alt: 'Image 2' }
      ]

      render(<MasonryGrid {...defaultProps} images={incompleteImages} />)

      expect(screen.getByTestId('image-card-1')).toBeInTheDocument()
      expect(screen.getByTestId('image-card-2')).toBeInTheDocument()
    })

    it('handles rapid image updates', () => {
      const { rerender } = render(<MasonryGrid {...defaultProps} images={[]} />)

      expect(screen.getByText('📷 Nenhuma imagem disponível')).toBeInTheDocument()

      rerender(<MasonryGrid {...defaultProps} images={mockImages} />)

      expect(screen.getByTestId('image-card-1')).toBeInTheDocument()
    })

    it('handles duplicate image IDs', () => {
      const duplicateImages = [
        { id: '1', url: 'https://example.com/1.jpg', alt: 'Image 1' },
        { id: '1', url: 'https://example.com/2.jpg', alt: 'Image 2' }
      ]

      render(<MasonryGrid {...defaultProps} images={duplicateImages} />)

      // Should render both images (React will use array index as key)
      const imageCards = screen.getAllByTestId('image-card-1')
      expect(imageCards).toHaveLength(2)
    })
  })

  describe('Accessibility', () => {
    it('maintains proper structure for screen readers', () => {
      render(<MasonryGrid {...defaultProps} />)

      const container = screen.getByTestId('image-card-1').closest('.w-full')
      expect(container).toBeInTheDocument()
    })

    it('handles error state accessibility', () => {
      render(<MasonryGrid {...defaultProps} error="Test error" />)

      expect(screen.getByText('⚠️ Erro ao carregar imagens')).toBeInTheDocument()
      expect(screen.getByText('Test error')).toBeInTheDocument()
    })
  })
})
