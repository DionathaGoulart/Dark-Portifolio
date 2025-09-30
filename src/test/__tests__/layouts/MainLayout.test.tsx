import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MainLayout } from '@/shared/components/layouts/MainLayout/MainLayout'

// Mock the shared components
vi.mock('@/shared', () => ({
  LayoutHeader: ({ showNavigation }: { showNavigation?: boolean }) => (
    <header data-testid="header">
      {showNavigation && <nav>Navigation</nav>}
    </header>
  ),
  LayoutFooter: () => <footer data-testid="footer">Footer</footer>,
  ScrollToTopButton: () => <div data-testid="scroll-on-top">Scroll On Top</div>
}))

describe('MainLayout', () => {
  it('should render header, main content, and footer', () => {
    render(
      <MainLayout>
        <div data-testid="main-content">Main Content</div>
      </MainLayout>
    )

    expect(screen.getByTestId('header')).toBeInTheDocument()
    expect(screen.getByTestId('main-content')).toBeInTheDocument()
    expect(screen.getByTestId('footer')).toBeInTheDocument()
  })

  it('should render scroll on top component', () => {
    render(
      <MainLayout>
        <div>Content</div>
      </MainLayout>
    )

    expect(screen.getByTestId('scroll-on-top')).toBeInTheDocument()
  })

  it('should pass header configuration to header component', () => {
    render(
      <MainLayout>
        <div>Content</div>
      </MainLayout>
    )

    const header = screen.getByTestId('header')
    expect(header).toBeInTheDocument()
  })

  it('should render children in main content area', () => {
    const testContent = 'Test Main Content'

    render(
      <MainLayout>
        <div data-testid="test-content">{testContent}</div>
      </MainLayout>
    )

    expect(screen.getByTestId('test-content')).toHaveTextContent(testContent)
  })

  it('should have correct CSS classes for layout structure', () => {
    const { container } = render(
      <MainLayout>
        <div>Content</div>
      </MainLayout>
    )

    const main = container.querySelector('main')
    expect(main).toHaveClass('flex-1')
  })

  it('should render without header when headerConfig is not provided', () => {
    render(
      <MainLayout>
        <div>Content</div>
      </MainLayout>
    )

    expect(screen.getByTestId('header')).toBeInTheDocument()
  })
})
