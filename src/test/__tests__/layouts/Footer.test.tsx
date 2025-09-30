import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LayoutFooter } from '@/shared/components/layouts/Footer/Footer'

vi.mock('@/shared', () => ({
  useI18n: () => ({
    t: {
      footer: {
        rights: 'All rights reserved'
      }
    }
  })
}))

describe('LayoutFooter', () => {
  it('should render footer with copyright text', () => {
    render(<LayoutFooter />)

    expect(screen.getByText('All rights reserved')).toBeInTheDocument()
  })

  it('should apply custom className when provided', () => {
    const { container } = render(
      <LayoutFooter className="custom-footer-class" />
    )

    const footer = container.querySelector('footer')
    expect(footer).toHaveClass('custom-footer-class')
  })

  it('should have correct CSS classes for styling', () => {
    render(<LayoutFooter />)

    const footer = screen.getByRole('contentinfo')
    expect(footer).toHaveClass(
      'bg-primary-white',
      'dark:bg-primary-black',
      'transition-all',
      'duration-300'
    )
  })

  it('should render footer content in centered layout', () => {
    render(<LayoutFooter />)

    const footer = screen.getByRole('contentinfo')
    const content = footer.querySelector('.flex.flex-col.items-center')
    expect(content).toBeInTheDocument()
  })

  it('should have proper text styling', () => {
    render(<LayoutFooter />)

    const text = screen.getByText('All rights reserved')
    expect(text).toHaveClass('font-medium', 'tracking-wide')
  })
})
