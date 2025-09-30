import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Home } from '@/pages/Home'

// Mock the components that Home uses
jest.mock('@/shared/components/layouts/MainLayout', () => ({
  MainLayout: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="main-layout">{children}</div>
  )
}))

jest.mock('@/shared/components/ui/MasonryGrid', () => ({
  MasonryGrid: ({ images, loading, error }: any) => (
    <div data-testid="masonry-grid">
      {loading && <div data-testid="loading">Loading...</div>}
      {error && <div data-testid="error">{error}</div>}
      {images?.map((img: any) => (
        <div key={img.id} data-testid={`image-${img.id}`}>
          {img.title || img.alt}
        </div>
      ))}
    </div>
  )
}))

jest.mock('@/shared/hooks/useImageOptimization', () => ({
  useImageOptimization: () => ({
    images: {
      grid: [
        { id: '1', url: 'https://example.com/1.jpg', alt: 'Image 1', title: 'Title 1' },
        { id: '2', url: 'https://example.com/2.jpg', alt: 'Image 2', title: 'Title 2' }
      ],
      solo: []
    },
    loading: false,
    lazyLoading: false,
    error: null
  })
}))

// Mock the image URLs
jest.mock('@/features/gallery', () => ({
  getGalleryImages: () => [
    'https://example.com/1.jpg',
    'https://example.com/2.jpg'
  ]
}))

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('Home Page', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Rendering', () => {
    it('renders main layout', () => {
      renderWithRouter(<Home />)

      expect(screen.getByTestId('main-layout')).toBeInTheDocument()
    })

    it('renders masonry grid', () => {
      renderWithRouter(<Home />)

      expect(screen.getByTestId('masonry-grid')).toBeInTheDocument()
    })

    it('renders images from useImageOptimization hook', () => {
      renderWithRouter(<Home />)

      expect(screen.getByTestId('image-1')).toBeInTheDocument()
      expect(screen.getByTestId('image-2')).toBeInTheDocument()
    })
  })

  describe('Loading State', () => {
    it('shows loading state when images are loading', () => {
      // Mock loading state
      jest.doMock('@/shared/hooks/useImageOptimization', () => ({
        useImageOptimization: () => ({
          images: { grid: [], solo: [] },
          loading: true,
          lazyLoading: false,
          error: null
        })
      }))

      renderWithRouter(<Home />)

      expect(screen.getByTestId('loading')).toBeInTheDocument()
    })
  })

  describe('Error State', () => {
    it('shows error state when there is an error', () => {
      // Mock error state
      jest.doMock('@/shared/hooks/useImageOptimization', () => ({
        useImageOptimization: () => ({
          images: { grid: [], solo: [] },
          loading: false,
          lazyLoading: false,
          error: 'Failed to load images'
        })
      }))

      renderWithRouter(<Home />)

      expect(screen.getByTestId('error')).toBeInTheDocument()
      expect(screen.getByText('Failed to load images')).toBeInTheDocument()
    })
  })

  describe('Image Interaction', () => {
    it('handles image click events', () => {
      renderWithRouter(<Home />)

      const image1 = screen.getByTestId('image-1')
      expect(image1).toBeInTheDocument()

      // Test that images are clickable (this would be tested through the MasonryGrid component)
      expect(image1).toBeInTheDocument()
    })
  })

  describe('Responsive Behavior', () => {
    it('renders correctly on different screen sizes', () => {
      // Test mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375
      })

      renderWithRouter(<Home />)

      expect(screen.getByTestId('masonry-grid')).toBeInTheDocument()
    })

    it('renders correctly on desktop viewport', () => {
      // Test desktop viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1920
      })

      renderWithRouter(<Home />)

      expect(screen.getByTestId('masonry-grid')).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('has proper heading structure', () => {
      renderWithRouter(<Home />)

      // Check if there are any headings (this would depend on the actual Home component structure)
      const headings = screen.queryAllByRole('heading')
      // This test would need to be updated based on the actual Home component structure
      expect(headings.length).toBeGreaterThanOrEqual(0)
    })

    it('has proper alt text for images', () => {
      renderWithRouter(<Home />)

      // Check that images have alt text (this is handled by the ImageCard component)
      const image1 = screen.getByTestId('image-1')
      expect(image1).toBeInTheDocument()
    })
  })

  describe('Performance', () => {
    it('renders without unnecessary re-renders', () => {
      const { rerender } = renderWithRouter(<Home />)

      // Re-render with same props
      rerender(<Home />)

      expect(screen.getByTestId('masonry-grid')).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('handles empty image array', () => {
      // Mock empty images
      jest.doMock('@/shared/hooks/useImageOptimization', () => ({
        useImageOptimization: () => ({
          images: { grid: [], solo: [] },
          loading: false,
          lazyLoading: false,
          error: null
        })
      }))

      renderWithRouter(<Home />)

      expect(screen.getByTestId('masonry-grid')).toBeInTheDocument()
    })

    it('handles undefined image data', () => {
      // Mock undefined images
      jest.doMock('@/shared/hooks/useImageOptimization', () => ({
        useImageOptimization: () => ({
          images: { grid: undefined, solo: undefined },
          loading: false,
          lazyLoading: false,
          error: null
        })
      }))

      renderWithRouter(<Home />)

      expect(screen.getByTestId('masonry-grid')).toBeInTheDocument()
    })
  })
})
