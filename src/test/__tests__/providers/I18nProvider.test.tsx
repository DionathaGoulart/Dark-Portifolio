import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { I18nProvider, useI18n } from '@/core/providers/I18nProvider'

const TestComponent = () => {
  const { language, setLanguage, t } = useI18n()

  return (
    <div>
      <span data-testid="current-language">{language}</span>
      <span data-testid="translation">{t.nav.home}</span>
      <button data-testid="set-pt" onClick={() => setLanguage('pt')}>
        Set Portuguese
      </button>
      <button data-testid="set-en" onClick={() => setLanguage('en')}>
        Set English
      </button>
    </div>
  )
}

describe('I18nProvider', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  it('should provide default language based on browser', () => {
    Object.defineProperty(navigator, 'language', {
      value: 'pt-BR',
      writable: true
    })

    render(
      <I18nProvider>
        <TestComponent />
      </I18nProvider>
    )

    expect(screen.getByTestId('current-language')).toHaveTextContent('pt')
  })

  it('should provide English as default for unsupported languages', () => {
    Object.defineProperty(navigator, 'language', {
      value: 'fr-FR',
      writable: true
    })

    render(
      <I18nProvider>
        <TestComponent />
      </I18nProvider>
    )

    expect(screen.getByTestId('current-language')).toHaveTextContent('en')
  })

  it('should change language to Portuguese', () => {
    render(
      <I18nProvider>
        <TestComponent />
      </I18nProvider>
    )

    const setPtButton = screen.getByTestId('set-pt')
    fireEvent.click(setPtButton)

    expect(screen.getByTestId('current-language')).toHaveTextContent('pt')
  })

  it('should change language to English', () => {
    render(
      <I18nProvider>
        <TestComponent />
      </I18nProvider>
    )

    const setEnButton = screen.getByTestId('set-en')
    fireEvent.click(setEnButton)

    expect(screen.getByTestId('current-language')).toHaveTextContent('en')
  })

  it('should persist language in localStorage', () => {
    render(
      <I18nProvider>
        <TestComponent />
      </I18nProvider>
    )

    const setPtButton = screen.getByTestId('set-pt')
    fireEvent.click(setPtButton)

    expect(localStorage.getItem('app-language')).toBe('pt')
  })

  it('should load language from localStorage', () => {
    localStorage.setItem('app-language', 'en')

    render(
      <I18nProvider>
        <TestComponent />
      </I18nProvider>
    )

    expect(screen.getByTestId('current-language')).toHaveTextContent('en')
  })

  it('should provide translations for current language', () => {
    render(
      <I18nProvider>
        <TestComponent />
      </I18nProvider>
    )

    expect(screen.getByTestId('translation')).toHaveTextContent('Home')
  })

  it('should update translations when language changes', () => {
    render(
      <I18nProvider>
        <TestComponent />
      </I18nProvider>
    )

    const setEnButton = screen.getByTestId('set-en')
    fireEvent.click(setEnButton)

    expect(screen.getByTestId('translation')).toHaveTextContent('Home')
  })

  it('should throw error when useI18n is used outside provider', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => {
      render(<TestComponent />)
    }).toThrow('useI18n deve ser usado dentro de um I18nProvider')

    consoleSpy.mockRestore()
  })
})
