import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AboutPage } from '@/pages/About'

vi.mock('@/shared', () => ({
  useDocumentTitle: vi.fn(),
  useI18n: () => ({
    t: {
      pages: {
        about: {
          title: 'About Me',
          description: 'This is a test description about the artist.',
          content: '5 years of experience in digital art. Digital painting, 3D modeling, concept art.'
        }
      }
    },
    language: 'en'
  })
}))

vi.mock('@/features/analytics', () => ({
  trackEvent: vi.fn()
}))

describe('AboutPage Integration', () => {
  it('should render about page title', () => {
    render(<AboutPage />)

    expect(screen.getByText('About Me')).toBeInTheDocument()
  })

  it('should render about content sections', () => {
    render(<AboutPage />)

    expect(screen.getByText('This is a test description about the artist.')).toBeInTheDocument()
    expect(screen.getByText('5 years of experience in digital art. Digital painting, 3D modeling, concept art.')).toBeInTheDocument()
  })

  it('should have proper heading structure', () => {
    render(<AboutPage />)

    const mainHeading = screen.getByRole('heading', { level: 1 })
    expect(mainHeading).toHaveTextContent('About Me')
  })

  it('should render with default styling', () => {
    const { container } = render(<AboutPage />)

    expect(container.firstChild).toHaveClass('max-w-7xl', 'mx-auto', 'px-4')
  })

  it('should have correct CSS classes for styling', () => {
    const { container } = render(<AboutPage />)

    // Check the outermost container div
    expect(container.firstChild).toHaveClass('max-w-7xl', 'mx-auto', 'px-4')
  })
})
