import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { PrintsPage } from '@/pages/Prints'

vi.mock('@/shared', () => ({
  useDocumentTitle: vi.fn(),
  useI18n: () => ({
    t: {
      pages: {
        prints: {
          links: {
            redbubble: 'redbubble',
            inprnt: 'inprnt',
            displate: 'displate'
          }
        }
      }
    },
    language: 'en'
  })
}))

vi.mock('@/features/analytics', () => ({
  trackEvent: vi.fn()
}))

describe('PrintsPage Integration', () => {
  it('should render store links', () => {
    render(<PrintsPage />)

    expect(screen.getByText('redbubble')).toBeInTheDocument()
    expect(screen.getByText('inprnt')).toBeInTheDocument()
    expect(screen.getByText('displate')).toBeInTheDocument()
  })

  it('should render store links with correct URLs', () => {
    render(<PrintsPage />)

    const redbubbleLink = screen.getByText('redbubble')
    const inprntLink = screen.getByText('inprnt')
    const displateLink = screen.getByText('displate')

    expect(redbubbleLink.closest('a')).toHaveAttribute('href', 'http://GoodDark.redbubble.com')
    expect(inprntLink.closest('a')).toHaveAttribute('href', 'https://www.inprnt.com/gallery/darkning/')
    expect(displateLink.closest('a')).toHaveAttribute('href', 'https://displate.com/Darkning?art=683cd403062f7')
  })

  it('should have external links with proper attributes', () => {
    render(<PrintsPage />)

    const links = screen.getAllByRole('link')

    links.forEach(link => {
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })

  it('should have proper CSS classes for styling', () => {
    const { container } = render(<PrintsPage />)

    expect(container.firstChild).toHaveClass('max-w-7xl', 'mx-auto', 'px-4')
  })

  it('should render store cards with proper styling', () => {
    render(<PrintsPage />)

    const storeCards = screen.getAllByRole('link')

    storeCards.forEach(card => {
      expect(card).toHaveClass('block', 'w-full', 'p-4', 'mb-4', 'bg-white', 'dark:bg-black')
    })
  })
})
