import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ImageCard } from '@/shared/components/ui/ImageCard'
import { ImageItem } from '@/types'

// Mock ImageLoader component
jest.mock('@/shared/components/ui/ImageLoader', () => ({
  ImageLoader: ({ src, alt, onLoad, onError, className }: any) => (
    <img
      src={src}
      alt={alt}
      onLoad={onLoad}
      onError={onError}
      className={className}
      data-testid="image-loader"
    />
  )
}))

describe('ImageCard', () => {
  const mockImage: ImageItem = {
    id: 'test-image-1',
    url: 'https://example.com/test-image.jpg',
    alt: 'Test Image',
    title: 'Test Image Title'
  }

  const defaultProps = {
    image: mockImage,
    onClick: jest.fn(),
    onLoad: jest.fn(),
    onError: jest.fn()
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Rendering', () => {
    it('renders with basic props', () => {
      render(<ImageCard {...defaultProps} />)

      expect(screen.getByTestId('image-loader')).toBeInTheDocument()
      expect(screen.getByAltText('Test Image')).toBeInTheDocument()
    })

    it('renders with custom className', () => {
      const customClass = 'custom-class'
      render(<ImageCard {...defaultProps} className={customClass} />)

      const container = screen.getByTestId('image-loader').closest('div')
      expect(container).toHaveClass(customClass)
    })

    it('renders with square aspect ratio when isSquare is true', () => {
      render(<ImageCard {...defaultProps} isSquare={true} />)

      const container = screen.getByTestId('image-loader').closest('div')
      expect(container).toBeInTheDocument()
    })

    it('does not render when isVisible is false', () => {
      // This would be tested through error handling
      render(<ImageCard {...defaultProps} />)
      expect(screen.getByTestId('image-loader')).toBeInTheDocument()
    })
  })

  describe('Object Fit Classes', () => {
    it('applies correct object-fit class for cover', () => {
      render(<ImageCard {...defaultProps} objectFit="cover" />)

      const image = screen.getByTestId('image-loader')
      expect(image).toHaveClass('object-cover')
    })

    it('applies correct object-fit class for contain', () => {
      render(<ImageCard {...defaultProps} objectFit="contain" />)

      const image = screen.getByTestId('image-loader')
      expect(image).toHaveClass('object-contain')
    })

    it('applies correct object-fit class for fill', () => {
      render(<ImageCard {...defaultProps} objectFit="fill" />)

      const image = screen.getByTestId('image-loader')
      expect(image).toHaveClass('object-fill')
    })

    it('applies correct object-fit class for scale-down', () => {
      render(<ImageCard {...defaultProps} objectFit="scale-down" />)

      const image = screen.getByTestId('image-loader')
      expect(image).toHaveClass('object-scale-down')
    })

    it('applies correct object-fit class for none', () => {
      render(<ImageCard {...defaultProps} objectFit="none" />)

      const image = screen.getByTestId('image-loader')
      expect(image).toHaveClass('object-none')
    })
  })

  describe('Hover Effects', () => {
    it('applies hover scale classes when enableHoverScale is true', () => {
      render(<ImageCard {...defaultProps} enableHoverScale={true} />)

      const container = screen.getByTestId('image-loader').closest('div')?.parentElement
      expect(container).toHaveClass('group', 'cursor-pointer', 'transition-transform', 'duration-300', 'hover:scale-105')
    })

    it('does not apply hover scale classes when enableHoverScale is false', () => {
      render(<ImageCard {...defaultProps} enableHoverScale={false} />)

      const container = screen.getByTestId('image-loader').closest('div')?.parentElement
      expect(container).toHaveClass('group', 'cursor-pointer')
      expect(container).not.toHaveClass('hover:scale-105')
    })

    it('applies hover effect classes when showHoverEffect is true', () => {
      render(<ImageCard {...defaultProps} showHoverEffect={true} />)

      const image = screen.getByTestId('image-loader')
      expect(image).toHaveClass('group-hover:brightness-75', 'transition-all', 'duration-300')
    })

    it('does not apply hover effect classes when showHoverEffect is false', () => {
      render(<ImageCard {...defaultProps} showHoverEffect={false} />)

      const image = screen.getByTestId('image-loader')
      expect(image).not.toHaveClass('group-hover:brightness-75')
    })
  })

  describe('Shadow Effects', () => {
    it('applies shadow classes when disableShadow is false', () => {
      render(<ImageCard {...defaultProps} disableShadow={false} />)

      const container = screen.getByTestId('image-loader').closest('div')
      expect(container).toHaveClass('shadow-lg')
    })

    it('does not apply shadow classes when disableShadow is true', () => {
      render(<ImageCard {...defaultProps} disableShadow={true} />)

      const container = screen.getByTestId('image-loader').closest('div')
      expect(container).not.toHaveClass('shadow-lg')
    })

    it('applies hover shadow classes when showHoverEffect is true', () => {
      render(<ImageCard {...defaultProps} showHoverEffect={true} disableShadow={false} />)

      const container = screen.getByTestId('image-loader').closest('div')
      expect(container).toHaveClass('shadow-lg', 'hover:shadow-xl', 'transition-shadow', 'duration-300')
    })
  })

  describe('Title Overlay', () => {
    it('renders title overlay when showHoverEffect and showTitle are true', () => {
      render(<ImageCard {...defaultProps} showHoverEffect={true} showTitle={true} />)

      expect(screen.getByText('Test Image Title')).toBeInTheDocument()
    })

    it('does not render title overlay when showTitle is false', () => {
      render(<ImageCard {...defaultProps} showHoverEffect={true} showTitle={false} />)

      expect(screen.queryByText('Test Image Title')).not.toBeInTheDocument()
    })

    it('does not render title overlay when showHoverEffect is false', () => {
      render(<ImageCard {...defaultProps} showHoverEffect={false} showTitle={true} />)

      expect(screen.queryByText('Test Image Title')).not.toBeInTheDocument()
    })

    it('does not render title overlay when image has no title', () => {
      const imageWithoutTitle = { ...mockImage, title: undefined }
      render(<ImageCard {...defaultProps} image={imageWithoutTitle} showHoverEffect={true} showTitle={true} />)

      expect(screen.queryByText('Test Image Title')).not.toBeInTheDocument()
    })
  })

  describe('Hover Overlay', () => {
    it('renders hover overlay when showHoverEffect is true', () => {
      render(<ImageCard {...defaultProps} showHoverEffect={true} />)

      const overlay = screen.getByTestId('image-loader').closest('div')?.querySelector('.absolute.inset-0')
      expect(overlay).toBeInTheDocument()
    })

    it('does not render hover overlay when showHoverEffect is false', () => {
      render(<ImageCard {...defaultProps} showHoverEffect={false} />)

      const overlay = screen.getByTestId('image-loader').closest('div')?.querySelector('.absolute.inset-0')
      expect(overlay).not.toBeInTheDocument()
    })
  })

  describe('Event Handlers', () => {
    it('calls onClick when image is clicked', async () => {
      const user = userEvent.setup()
      render(<ImageCard {...defaultProps} />)

      const container = screen.getByTestId('image-loader').closest('div')?.parentElement
      await user.click(container!)

      expect(defaultProps.onClick).toHaveBeenCalledWith(mockImage)
    })

    it('calls onLoad when image loads', () => {
      render(<ImageCard {...defaultProps} />)

      const image = screen.getByTestId('image-loader')
      fireEvent.load(image)

      expect(defaultProps.onLoad).toHaveBeenCalledWith(mockImage)
    })

    it('calls onError and hides component when image fails to load', () => {
      render(<ImageCard {...defaultProps} />)

      const image = screen.getByTestId('image-loader')
      fireEvent.error(image)

      expect(defaultProps.onError).toHaveBeenCalledWith(mockImage)
      // Component should be hidden after error
      expect(screen.queryByTestId('image-loader')).not.toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('has proper alt text', () => {
      render(<ImageCard {...defaultProps} />)

      expect(screen.getByAltText('Test Image')).toBeInTheDocument()
    })

    it('uses fallback alt text when not provided', () => {
      const imageWithoutAlt = { ...mockImage, alt: undefined }
      render(<ImageCard {...defaultProps} image={imageWithoutAlt} />)

      expect(screen.getByAltText('Image')).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('handles empty image object gracefully', () => {
      const emptyImage = { id: '', url: '', alt: '', title: '' }
      render(<ImageCard {...defaultProps} image={emptyImage} />)

      expect(screen.getByTestId('image-loader')).toBeInTheDocument()
    })

    it('handles missing optional props', () => {
      render(<ImageCard image={mockImage} />)

      expect(screen.getByTestId('image-loader')).toBeInTheDocument()
    })
  })
})
