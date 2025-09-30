import {
  generateImageId,
  isValidImageUrl,
  createImageFromUrl,
  createImagesFromUrls,
  getImageDimensions,
  preloadImage,
  batchPreloadImages
} from '@/shared/utils/imageUtils'

// Mock Image constructor
const mockImage = {
  onload: null as (() => void) | null,
  onerror: null as (() => void) | null,
  src: '',
  naturalWidth: 0,
  naturalHeight: 0
}

// Mock global Image
global.Image = jest.fn(() => mockImage) as any

describe('imageUtils', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockImage.onload = null
    mockImage.onerror = null
    mockImage.src = ''
    mockImage.naturalWidth = 0
    mockImage.naturalHeight = 0
  })

  describe('generateImageId', () => {
    it('generates unique IDs', () => {
      const id1 = generateImageId('test.jpg')
      const id2 = generateImageId('test.jpg')

      expect(id1).toMatch(/^img-0-\d+-[a-z0-9]+$/)
      expect(id2).toMatch(/^img-0-\d+-[a-z0-9]+$/)
      expect(id1).not.toBe(id2)
    })

    it('includes index in ID when provided', () => {
      const id = generateImageId('test.jpg', 5)

      expect(id).toMatch(/^img-5-\d+-[a-z0-9]+$/)
    })

    it('uses 0 as default index', () => {
      const id = generateImageId('test.jpg')

      expect(id).toMatch(/^img-0-\d+-[a-z0-9]+$/)
    })
  })

  describe('isValidImageUrl', () => {
    it('validates HTTP URLs', () => {
      expect(isValidImageUrl('http://example.com/image.jpg')).toBe(true)
      expect(isValidImageUrl('http://example.com/image.png')).toBe(true)
      expect(isValidImageUrl('http://example.com/image.gif')).toBe(true)
    })

    it('validates HTTPS URLs', () => {
      expect(isValidImageUrl('https://example.com/image.jpg')).toBe(true)
      expect(isValidImageUrl('https://example.com/image.png')).toBe(true)
      expect(isValidImageUrl('https://example.com/image.gif')).toBe(true)
    })

    it('rejects invalid URLs', () => {
      expect(isValidImageUrl('ftp://example.com/image.jpg')).toBe(false)
      expect(isValidImageUrl('file:///path/to/image.jpg')).toBe(false)
      expect(isValidImageUrl('not-a-url')).toBe(false)
      expect(isValidImageUrl('')).toBe(false)
    })

    it('handles malformed URLs', () => {
      expect(isValidImageUrl('http://')).toBe(false)
      expect(isValidImageUrl('https://')).toBe(false)
      expect(isValidImageUrl('://example.com')).toBe(false)
    })
  })

  describe('createImageFromUrl', () => {
    it('creates ImageItem with correct properties', () => {
      const image = createImageFromUrl('https://example.com/test.jpg', 2)

      expect(image).toEqual({
        id: expect.stringMatching(/^img-2-\d+-[a-z0-9]+$/),
        url: 'https://example.com/test.jpg',
        alt: 'Imagem 3',
        title: 'Imagem 3',
        urls: undefined
      })
    })

    it('uses 0 as default index', () => {
      const image = createImageFromUrl('https://example.com/test.jpg')

      expect(image.id).toMatch(/^img-0-\d+-[a-z0-9]+$/)
      expect(image.alt).toBe('Imagem 1')
      expect(image.title).toBe('Imagem 1')
    })

    it('handles different file extensions', () => {
      const jpgImage = createImageFromUrl('https://example.com/test.jpg')
      const pngImage = createImageFromUrl('https://example.com/test.png')
      const gifImage = createImageFromUrl('https://example.com/test.gif')

      expect(jpgImage.url).toBe('https://example.com/test.jpg')
      expect(pngImage.url).toBe('https://example.com/test.png')
      expect(gifImage.url).toBe('https://example.com/test.gif')
    })
  })

  describe('createImagesFromUrls', () => {
    it('creates ImageItems from valid URLs', () => {
      const urls = [
        'https://example.com/image1.jpg',
        'https://example.com/image2.png',
        'https://example.com/image3.gif'
      ]

      const images = createImagesFromUrls(urls)

      expect(images).toHaveLength(3)
      expect(images[0].url).toBe('https://example.com/image1.jpg')
      expect(images[1].url).toBe('https://example.com/image2.png')
      expect(images[2].url).toBe('https://example.com/image3.gif')
    })

    it('filters out invalid URLs', () => {
      const urls = [
        'https://example.com/image1.jpg',
        'ftp://example.com/image2.jpg',
        'https://example.com/image3.png',
        'not-a-url',
        'https://example.com/image4.gif'
      ]

      const images = createImagesFromUrls(urls)

      expect(images).toHaveLength(3)
      expect(images[0].url).toBe('https://example.com/image1.jpg')
      expect(images[1].url).toBe('https://example.com/image3.png')
      expect(images[2].url).toBe('https://example.com/image4.gif')
    })

    it('filters out empty strings', () => {
      const urls = [
        'https://example.com/image1.jpg',
        '',
        '   ',
        'https://example.com/image2.png'
      ]

      const images = createImagesFromUrls(urls)

      expect(images).toHaveLength(2)
      expect(images[0].url).toBe('https://example.com/image1.jpg')
      expect(images[1].url).toBe('https://example.com/image2.png')
    })

    it('trims whitespace from URLs', () => {
      const urls = [
        '  https://example.com/image1.jpg  ',
        'https://example.com/image2.png'
      ]

      const images = createImagesFromUrls(urls)

      expect(images).toHaveLength(2)
      expect(images[0].url).toBe('https://example.com/image1.jpg')
      expect(images[1].url).toBe('https://example.com/image2.png')
    })

    it('handles empty array', () => {
      const images = createImagesFromUrls([])

      expect(images).toEqual([])
    })
  })

  describe('getImageDimensions', () => {
    it('resolves with correct dimensions on successful load', async () => {
      mockImage.naturalWidth = 800
      mockImage.naturalHeight = 600

      const promise = getImageDimensions('https://example.com/test.jpg')

      // Simulate successful load
      setTimeout(() => {
        if (mockImage.onload) {
          mockImage.onload()
        }
      }, 0)

      const dimensions = await promise

      expect(dimensions).toEqual({
        width: 800,
        height: 600
      })
    })

    it('rejects on image load error', async () => {
      const promise = getImageDimensions('https://example.com/invalid.jpg')

      // Simulate load error
      setTimeout(() => {
        if (mockImage.onerror) {
          mockImage.onerror()
        }
      }, 0)

      await expect(promise).rejects.toBeUndefined()
    })

    it('sets correct src on image', () => {
      getImageDimensions('https://example.com/test.jpg')

      expect(mockImage.src).toBe('https://example.com/test.jpg')
    })
  })

  describe('preloadImage', () => {
    it('resolves to true on successful load', async () => {
      const promise = preloadImage('https://example.com/test.jpg')

      // Simulate successful load
      setTimeout(() => {
        if (mockImage.onload) {
          mockImage.onload()
        }
      }, 0)

      const result = await promise

      expect(result).toBe(true)
    })

    it('resolves to false on load error', async () => {
      const promise = preloadImage('https://example.com/invalid.jpg')

      // Simulate load error
      setTimeout(() => {
        if (mockImage.onerror) {
          mockImage.onerror()
        }
      }, 0)

      const result = await promise

      expect(result).toBe(false)
    })

    it('resolves to false on timeout', async () => {
      // Mock setTimeout to immediately resolve
      jest.spyOn(global, 'setTimeout').mockImplementation((callback: any) => {
        callback()
        return 1 as any
      })

      const promise = preloadImage('https://example.com/slow.jpg')

      const result = await promise

      expect(result).toBe(false)

      // Restore setTimeout
      jest.restoreAllMocks()
    })

    it('sets correct src on image', () => {
      preloadImage('https://example.com/test.jpg')

      expect(mockImage.src).toBe('https://example.com/test.jpg')
    })
  })

  describe('batchPreloadImages', () => {
    it('returns successfully loaded images', async () => {
      // Mock successful loads
      jest.spyOn(global, 'setTimeout').mockImplementation((callback: any) => {
        setTimeout(() => {
          if (mockImage.onload) {
            mockImage.onload()
          }
        }, 0)
        return 1 as any
      })

      const urls = [
        'https://example.com/image1.jpg',
        'https://example.com/image2.jpg',
        'https://example.com/image3.jpg'
      ]

      const result = await batchPreloadImages(urls)

      expect(result).toHaveLength(3)
      expect(result[0].url).toBe('https://example.com/image1.jpg')
      expect(result[1].url).toBe('https://example.com/image2.jpg')
      expect(result[2].url).toBe('https://example.com/image3.jpg')

      // Restore setTimeout
      jest.restoreAllMocks()
    })

    it('filters out failed images', async () => {
      let callCount = 0
      jest.spyOn(global, 'setTimeout').mockImplementation((callback: any) => {
        setTimeout(() => {
          callCount++
          if (callCount === 1 && mockImage.onload) {
            mockImage.onload() // First image succeeds
          } else if (callCount === 2 && mockImage.onerror) {
            mockImage.onerror() // Second image fails
          } else if (callCount === 3 && mockImage.onload) {
            mockImage.onload() // Third image succeeds
          }
        }, 0)
        return 1 as any
      })

      const urls = [
        'https://example.com/image1.jpg',
        'https://example.com/invalid.jpg',
        'https://example.com/image3.jpg'
      ]

      const result = await batchPreloadImages(urls)

      expect(result).toHaveLength(2)
      expect(result[0].url).toBe('https://example.com/image1.jpg')
      expect(result[1].url).toBe('https://example.com/image3.jpg')

      // Restore setTimeout
      jest.restoreAllMocks()
    })

    it('handles empty URLs array', async () => {
      const result = await batchPreloadImages([])

      expect(result).toEqual([])
    })

    it('handles all images failing', async () => {
      jest.spyOn(global, 'setTimeout').mockImplementation((callback: any) => {
        setTimeout(() => {
          if (mockImage.onerror) {
            mockImage.onerror()
          }
        }, 0)
        return 1 as any
      })

      const urls = [
        'https://example.com/invalid1.jpg',
        'https://example.com/invalid2.jpg'
      ]

      const result = await batchPreloadImages(urls)

      expect(result).toEqual([])

      // Restore setTimeout
      jest.restoreAllMocks()
    })

    it('assigns correct indices to images', async () => {
      jest.spyOn(global, 'setTimeout').mockImplementation((callback: any) => {
        setTimeout(() => {
          if (mockImage.onload) {
            mockImage.onload()
          }
        }, 0)
        return 1 as any
      })

      const urls = [
        'https://example.com/image1.jpg',
        'https://example.com/image2.jpg'
      ]

      const result = await batchPreloadImages(urls)

      expect(result[0].alt).toBe('Imagem 1')
      expect(result[1].alt).toBe('Imagem 2')

      // Restore setTimeout
      jest.restoreAllMocks()
    })
  })

  describe('Edge Cases', () => {
    it('handles very long URLs', () => {
      const longUrl = 'https://example.com/' + 'a'.repeat(1000) + '.jpg'

      expect(isValidImageUrl(longUrl)).toBe(true)

      const image = createImageFromUrl(longUrl)
      expect(image.url).toBe(longUrl)
    })

    it('handles URLs with special characters', () => {
      const specialUrl = 'https://example.com/image%20with%20spaces.jpg'

      expect(isValidImageUrl(specialUrl)).toBe(true)

      const image = createImageFromUrl(specialUrl)
      expect(image.url).toBe(specialUrl)
    })

    it('handles URLs with query parameters', () => {
      const urlWithParams = 'https://example.com/image.jpg?v=1&size=large'

      expect(isValidImageUrl(urlWithParams)).toBe(true)

      const image = createImageFromUrl(urlWithParams)
      expect(image.url).toBe(urlWithParams)
    })
  })
})
