import { renderHook, waitFor } from '@testing-library/react'
import { useImageOptimization } from '@/shared/hooks/useImageOptimization'

// Mock the batchPreloadImages function
jest.mock('@/shared/utils/imageUtils', () => ({
  batchPreloadImages: jest.fn()
}))

import { batchPreloadImages } from '@/shared/utils/imageUtils'

const mockBatchPreloadImages = batchPreloadImages as jest.MockedFunction<typeof batchPreloadImages>

describe('useImageOptimization', () => {
  const mockUrls = [
    'https://res.cloudinary.com/test/image/upload/v1/test1.jpg',
    'https://res.cloudinary.com/test/image/upload/v1/test2.jpg',
    'https://res.cloudinary.com/test/image/upload/v1/test3.jpg'
  ]

  const mockImageItems = [
    { id: 'img-1', url: mockUrls[0], alt: 'Test Image 1', title: 'Test Image 1' },
    { id: 'img-2', url: mockUrls[1], alt: 'Test Image 2', title: 'Test Image 2' },
    { id: 'img-3', url: mockUrls[2], alt: 'Test Image 3', title: 'Test Image 3' }
  ]

  beforeEach(() => {
    jest.clearAllMocks()
    mockBatchPreloadImages.mockResolvedValue(mockImageItems)
  })

  describe('Initial State', () => {
    it('returns initial loading state', () => {
      const { result } = renderHook(() => useImageOptimization(mockUrls, 'en'))

      expect(result.current.loading).toBe(true)
      expect(result.current.lazyLoading).toBe(true)
      expect(result.current.error).toBe(null)
      expect(result.current.images.grid).toEqual([])
      expect(result.current.images.solo).toEqual([])
    })
  })

  describe('Image Loading', () => {
    it('loads images successfully', async () => {
      const { result } = renderHook(() => useImageOptimization(mockUrls, 'en'))

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      expect(result.current.lazyLoading).toBe(false)
      expect(result.current.error).toBe(null)
      expect(result.current.images.grid).toHaveLength(3)
      expect(result.current.images.solo).toHaveLength(3)
    })

    it('loads priority images first', async () => {
      const { result } = renderHook(() =>
        useImageOptimization(mockUrls, 'en', 2)
      )

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      // Should call batchPreloadImages twice - once for priority, once for remaining
      expect(mockBatchPreloadImages).toHaveBeenCalledTimes(2)
    })

    it('handles empty URLs array', async () => {
      const { result } = renderHook(() => useImageOptimization([], 'en'))

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      expect(result.current.images.grid).toEqual([])
      expect(result.current.images.solo).toEqual([])
    })
  })

  describe('Error Handling', () => {
    it('handles batchPreloadImages error', async () => {
      mockBatchPreloadImages.mockRejectedValue(new Error('Network error'))

      const { result } = renderHook(() => useImageOptimization(mockUrls, 'en'))

      await waitFor(() => {
        expect(result.current.error).toBe('Falha ao carregar imagens.')
      })

      expect(result.current.loading).toBe(false)
      expect(result.current.lazyLoading).toBe(false)
    })

    it('handles partial loading failure', async () => {
      // Mock first call to succeed, second to fail
      mockBatchPreloadImages
        .mockResolvedValueOnce([mockImageItems[0]])
        .mockRejectedValueOnce(new Error('Network error'))

      const { result } = renderHook(() =>
        useImageOptimization(mockUrls, 'en', 1)
      )

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      // Should still have the priority image
      expect(result.current.images.grid).toHaveLength(1)
      expect(result.current.images.solo).toHaveLength(1)
    })
  })

  describe('URL Optimization', () => {
    it('optimizes Cloudinary URLs correctly', async () => {
      const cloudinaryUrls = [
        'https://res.cloudinary.com/test/image/upload/v1/test1.jpg',
        'https://res.cloudinary.com/test/image/upload/v1/test2.jpg'
      ]

      const { result } = renderHook(() =>
        useImageOptimization(cloudinaryUrls, 'en')
      )

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      // Check that batchPreloadImages was called with optimized URLs
      expect(mockBatchPreloadImages).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.stringContaining('w_1400'),
          expect.stringContaining('q_95'),
          expect.stringContaining('f_webp')
        ])
      )
    })

    it('handles non-Cloudinary URLs', async () => {
      const nonCloudinaryUrls = [
        'https://example.com/image1.jpg',
        'https://example.com/image2.jpg'
      ]

      const { result } = renderHook(() =>
        useImageOptimization(nonCloudinaryUrls, 'en')
      )

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      // Should call with original URLs
      expect(mockBatchPreloadImages).toHaveBeenCalledWith(nonCloudinaryUrls)
    })
  })

  describe('Cache Busting', () => {
    it('adds cache busting parameters in development', async () => {
      const { result } = renderHook(() =>
        useImageOptimization(mockUrls, 'en', 5, true)
      )

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      // Check that URLs have cache busting parameters
      expect(mockBatchPreloadImages).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.stringMatching(/\?t=\d+&i=\d+/)
        ])
      )
    })

    it('does not add cache busting in production', async () => {
      const { result } = renderHook(() =>
        useImageOptimization(mockUrls, 'en', 5, false)
      )

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      // Check that URLs don't have cache busting parameters
      expect(mockBatchPreloadImages).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.not.stringMatching(/\?t=\d+&i=\d+/)
        ])
      )
    })
  })

  describe('Dependency Changes', () => {
    it('reloads images when URLs change', async () => {
      const { result, rerender } = renderHook(
        ({ urls }) => useImageOptimization(urls, 'en'),
        { initialProps: { urls: mockUrls } }
      )

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      const newUrls = ['https://example.com/new1.jpg', 'https://example.com/new2.jpg']
      rerender({ urls: newUrls })

      expect(result.current.loading).toBe(true)

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })
    })

    it('reloads images when language changes', async () => {
      const { result, rerender } = renderHook(
        ({ language }) => useImageOptimization(mockUrls, language),
        { initialProps: { language: 'en' } }
      )

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      rerender({ language: 'pt' })

      expect(result.current.loading).toBe(true)

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })
    })

    it('reloads images when priorityCount changes', async () => {
      const { result, rerender } = renderHook(
        ({ priorityCount }) => useImageOptimization(mockUrls, 'en', priorityCount),
        { initialProps: { priorityCount: 2 } }
      )

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      rerender({ priorityCount: 1 })

      expect(result.current.loading).toBe(true)

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })
    })
  })

  describe('Generated URLs', () => {
    it('generates optimized URLs for different sizes', async () => {
      const { result } = renderHook(() =>
        useImageOptimization(mockUrls, 'en')
      )

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      const image = result.current.images.grid[0] as any
      expect(image.urls).toBeDefined()
      expect(image.urls.small).toContain('w_800')
      expect(image.urls.medium).toContain('w_1400')
      expect(image.urls.large).toContain('w_2000')
      expect(image.urls.main).toContain('w_1200')
    })

    it('generates alt text for images', async () => {
      const { result } = renderHook(() =>
        useImageOptimization(mockUrls, 'en')
      )

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      const image = result.current.images.grid[0] as any
      expect(image.alt).toMatch(/Design de imagem \d+/)
    })
  })

  describe('Edge Cases', () => {
    it('handles very large priority count', async () => {
      const { result } = renderHook(() =>
        useImageOptimization(mockUrls, 'en', 100)
      )

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      expect(result.current.images.grid).toHaveLength(3)
      expect(result.current.images.solo).toHaveLength(3)
    })

    it('handles zero priority count', async () => {
      const { result } = renderHook(() =>
        useImageOptimization(mockUrls, 'en', 0)
      )

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      expect(result.current.images.grid).toHaveLength(3)
      expect(result.current.images.solo).toHaveLength(3)
    })

    it('handles negative priority count', async () => {
      const { result } = renderHook(() =>
        useImageOptimization(mockUrls, 'en', -1)
      )

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      expect(result.current.images.grid).toHaveLength(3)
      expect(result.current.images.solo).toHaveLength(3)
    })
  })
})
