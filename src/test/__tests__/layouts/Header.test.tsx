import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LayoutHeader } from '@/shared/components/layouts/Header/Header'

// Mock the shared components
vi.mock('@/shared', () => ({
  useI18n: () => ({
    t: {
      nav: {
        home: 'Home',
        about: 'About',
        projects: 'Projects',
        contact: 'Contact',
        prints: 'Prints'
      }
    }
  }),
  LanguageSwitch: () => <div data-testid="language-switch">Language Switch</div>,
  ThemeToggle: () => <div data-testid="theme-toggle">Theme Toggle</div>,
  Logo: ({ src, alt }: { src?: string; alt?: string }) => (
    <img src={src} alt={alt} data-testid="logo" />
  ),
  Navigation: ({ items }: { items: any[] }) => (
    <nav data-testid="navigation">
      {items.map((item, index) => (
        <a key={index} href={item.href} data-testid={`nav-${item.label}`}>
          {item.label}
        </a>
      ))}
    </nav>
  )
}))

describe('LayoutHeader', () => {
  it('should render header with logo', () => {
    render(
      <LayoutHeader
        logoSrc="/test-logo.png"
        logoAlt="Test Logo"
        youtubeUrl="https://youtube.com"
      />
    )

    expect(screen.getByTestId('logo')).toBeInTheDocument()
    expect(screen.getByTestId('logo')).toHaveAttribute('src', '/test-logo.png')
    expect(screen.getByTestId('logo')).toHaveAttribute('alt', 'Test Logo')
  })

  it('should render navigation when showNavigation is true', () => {
    render(
      <LayoutHeader
        logoSrc="/test-logo.png"
        showNavigation={true}
        youtubeUrl="https://youtube.com"
      />
    )

    expect(screen.getAllByTestId('navigation')).toHaveLength(2) // Desktop and mobile
    expect(screen.getAllByTestId('nav-Home')).toHaveLength(2) // Desktop and mobile
    expect(screen.getAllByTestId('nav-About')).toHaveLength(2) // Desktop and mobile
    expect(screen.getAllByTestId('nav-Projects')).toHaveLength(2) // Desktop and mobile
    expect(screen.getAllByTestId('nav-Contact')).toHaveLength(2) // Desktop and mobile
    expect(screen.getAllByTestId('nav-Prints')).toHaveLength(2) // Desktop and mobile
  })

  it('should not render navigation when showNavigation is false', () => {
    render(
      <LayoutHeader
        logoSrc="/test-logo.png"
        showNavigation={false}
        youtubeUrl="https://youtube.com"
      />
    )

    expect(screen.queryByTestId('navigation')).not.toBeInTheDocument()
  })

  it('should render theme toggle and language switch', () => {
    render(
      <LayoutHeader
        logoSrc="/test-logo.png"
        showNavigation={true}
        youtubeUrl="https://youtube.com"
      />
    )

    expect(screen.getAllByTestId('theme-toggle')).toHaveLength(2) // Desktop and mobile
    expect(screen.getAllByTestId('language-switch')).toHaveLength(2) // Desktop and mobile
  })

  it('should render social links with default URLs', () => {
    render(
      <LayoutHeader
        logoSrc="/test-logo.png"
        showNavigation={true}
        youtubeUrl="https://youtube.com"
      />
    )

    const instagramLink = screen.getByLabelText('Instagram')
    const youtubeLink = screen.getByLabelText('YouTube')

    expect(instagramLink).toBeInTheDocument()
    expect(instagramLink).toHaveAttribute('href', 'https://instagram.com')
    expect(youtubeLink).toBeInTheDocument()
    expect(youtubeLink).toHaveAttribute('href', 'https://youtube.com')
  })

  it('should render social links with custom URLs', () => {
    render(
      <LayoutHeader
        logoSrc="/test-logo.png"
        showNavigation={true}
        instagramUrl="https://custom-instagram.com"
        youtubeUrl="https://custom-youtube.com"
      />
    )

    const instagramLink = screen.getByLabelText('Instagram')
    const youtubeLink = screen.getByLabelText('YouTube')

    expect(instagramLink).toHaveAttribute('href', 'https://custom-instagram.com')
    expect(youtubeLink).toHaveAttribute('href', 'https://custom-youtube.com')
  })

  it('should return null when no logo and no navigation', () => {
    const { container } = render(
      <LayoutHeader
        showNavigation={false}
        youtubeUrl="https://youtube.com"
      />
    )

    expect(container.firstChild).toBeNull()
  })

  it('should have correct CSS classes for styling', () => {
    render(
      <LayoutHeader
        logoSrc="/test-logo.png"
        showNavigation={true}
        youtubeUrl="https://youtube.com"
      />
    )

    const header = screen.getByRole('banner')
    expect(header).toHaveClass('relative', 'w-full', 'bg-primary-white', 'dark:bg-primary-black')
  })
})
