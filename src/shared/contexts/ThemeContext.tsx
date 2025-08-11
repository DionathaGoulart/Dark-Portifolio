import React, { createContext, useContext, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const savedTheme = localStorage.getItem('theme') as Theme
      if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
        return savedTheme
      }
    } catch (error) {}
    return 'dark'
  })

  useEffect(() => {
    try {
      // Salva no localStorage
      localStorage.setItem('theme', theme)

      // Controla APENAS a classe 'dark' no HTML
      const root = document.documentElement

      if (theme === 'dark') {
        root.classList.add('dark')
      } else {
        root.classList.remove('dark')
      }
    } catch (error) {}
  }, [theme])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)

  if (context === undefined) {
    throw new Error('useTheme deve ser usado dentro de um ThemeProvider')
  }

  return context
}
