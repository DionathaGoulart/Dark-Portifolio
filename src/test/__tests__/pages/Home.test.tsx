import { describe, it, expect, vi } from 'vitest'

// Mock everything before importing
vi.mock('@/features/gallery', () => ({
  batchPreloadImages: vi.fn().mockResolvedValue([])
}))

vi.mock('@/features/analytics', () => ({
  trackEvent: vi.fn()
}))

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
  BrowserRouter: ({ children }: any) => children
}))

vi.mock('@/shared', () => ({
  useDocumentTitle: vi.fn(),
  useI18n: () => ({
    t: { common: { noImages: 'No images', error: 'Error' } },
    language: 'en'
  }),
  MasonryGrid: () => <div data-testid="masonry-grid" />,
  ModalZoom: () => <div data-testid="modal-zoom" />
}))

describe('HomePage Integration', () => {
  it('should import HomePage without errors', async () => {
    const { HomePage } = await import('@/pages/Home')
    expect(HomePage).toBeDefined()
    expect(typeof HomePage).toBe('function')
  })

  it('should have correct component name', async () => {
    const { HomePage } = await import('@/pages/Home')
    expect(HomePage.name).toBe('HomePage')
  })

  it('should be a React component', async () => {
    const { HomePage } = await import('@/pages/Home')
    expect(HomePage).toBeDefined()
    expect(typeof HomePage).toBe('function')
  })
})
