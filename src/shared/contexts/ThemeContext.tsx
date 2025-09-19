import React, { createContext, useContext, useEffect, useState } from 'react'

// ================================
// INTERFACES & TYPES
// ================================

export type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

interface ThemeProviderProps {
  children: React.ReactNode
}

// ================================
// CONSTANTS
// ================================

const STORAGE_KEY = 'theme'
const DEFAULT_THEME: Theme = 'dark'
const DARK_CLASS = 'dark'
const SUPPORTED_THEMES: Theme[] = ['light', 'dark']

// ================================
// HELPER FUNCTIONS
// ================================

/**
 * Validates if theme value is supported
 */
const isValidTheme = (theme: string): theme is Theme => {
  return SUPPORTED_THEMES.includes(theme as Theme)
}

/**
 * Safely gets theme from localStorage
 */
const getStoredTheme = (): Theme | null => {
  try {
    const savedTheme = localStorage.getItem(STORAGE_KEY)
    if (savedTheme && isValidTheme(savedTheme)) {
      return savedTheme
    }
  } catch (error) {
    console.warn('Could not access localStorage for theme:', error)
  }

  return null
}

/**
 * Gets initial theme from storage or returns default
 */
const getInitialTheme = (): Theme => {
  return getStoredTheme() || DEFAULT_THEME
}

/**
 * Safely saves theme to localStorage
 */
const saveThemeToStorage = (theme: Theme): void => {
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch (error) {
    console.warn('Could not save theme to localStorage:', error)
  }
}

/**
 * Applies theme to document root element
 */
const applyThemeToDOM = (theme: Theme): void => {
  try {
    const root = document.documentElement

    if (theme === 'dark') {
      root.classList.add(DARK_CLASS)
    } else {
      root.classList.remove(DARK_CLASS)
    }
  } catch (error) {
    console.warn('Could not apply theme to DOM:', error)
  }
}

// ================================
// CONTEXT
// ================================

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// ================================
// PROVIDER COMPONENT
// ================================

/**
 * Theme Provider that manages light/dark theme state
 * Automatically persists theme preference and applies to DOM
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme)

  // ================================
  // EFFECTS
  // ================================

  useEffect(() => {
    saveThemeToStorage(theme)
    applyThemeToDOM(theme)
  }, [theme])

  // ================================
  // HANDLERS
  // ================================

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
  }

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }

  // ================================
  // COMPUTED VALUES
  // ================================

  const contextValue: ThemeContextType = {
    theme,
    toggleTheme,
    setTheme
  }

  // ================================
  // RENDER
  // ================================

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  )
}

// ================================
// HOOKS
// ================================

/**
 * Hook to access theme context
 * Must be used within ThemeProvider
 */
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext)

  if (context === undefined) {
    throw new Error('useTheme deve ser usado dentro de um ThemeProvider')
  }

  return context
}
