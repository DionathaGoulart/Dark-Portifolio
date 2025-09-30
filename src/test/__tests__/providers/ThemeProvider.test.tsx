import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeProvider, useTheme } from '@/core/providers/ThemeProvider'

const TestComponent = () => {
  const { theme, toggleTheme, setTheme } = useTheme()

  return (
    <div>
      <span data-testid="current-theme">{theme}</span>
      <button data-testid="toggle-theme" onClick={toggleTheme}>
        Toggle Theme
      </button>
      <button data-testid="set-light" onClick={() => setTheme('light')}>
        Set Light
      </button>
      <button data-testid="set-dark" onClick={() => setTheme('dark')}>
        Set Dark
      </button>
    </div>
  )
}

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  it('should provide default dark theme', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )

    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark')
  })

  it('should toggle theme from dark to light', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )

    const toggleButton = screen.getByTestId('toggle-theme')
    fireEvent.click(toggleButton)

    expect(screen.getByTestId('current-theme')).toHaveTextContent('light')
  })

  it('should toggle theme from light to dark', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )

    const setLightButton = screen.getByTestId('set-light')
    fireEvent.click(setLightButton)
    expect(screen.getByTestId('current-theme')).toHaveTextContent('light')

    const toggleButton = screen.getByTestId('toggle-theme')
    fireEvent.click(toggleButton)

    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark')
  })

  it('should set theme to light', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )

    const setLightButton = screen.getByTestId('set-light')
    fireEvent.click(setLightButton)

    expect(screen.getByTestId('current-theme')).toHaveTextContent('light')
  })

  it('should set theme to dark', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )

    const setDarkButton = screen.getByTestId('set-dark')
    fireEvent.click(setDarkButton)

    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark')
  })

  it('should persist theme in localStorage', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )

    const setLightButton = screen.getByTestId('set-light')
    fireEvent.click(setLightButton)

    expect(localStorage.getItem('theme')).toBe('light')
  })

  it('should load theme from localStorage', () => {
    localStorage.setItem('theme', 'light')

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )

    expect(screen.getByTestId('current-theme')).toHaveTextContent('light')
  })

  it('should apply dark class to document element', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )

    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('should remove dark class when theme is light', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )

    const setLightButton = screen.getByTestId('set-light')
    fireEvent.click(setLightButton)

    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('should throw error when useTheme is used outside provider', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => {
      render(<TestComponent />)
    }).toThrow('useTheme deve ser usado dentro de um ThemeProvider')

    consoleSpy.mockRestore()
  })
})
