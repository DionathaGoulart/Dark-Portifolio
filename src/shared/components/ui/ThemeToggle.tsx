import React from 'react'
import { useTheme } from '../../contexts/ThemeContext'

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme()

  const handleClick = () => {
    toggleTheme()
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={handleClick}
        className="
          relative
          p-3
          rounded-full
          transition-all
          duration-300
          bg-primary-white
          dark:bg-primary-black
          border-2
          border-primary-black
          dark:border-primary-white
          hover:scale-105
          active:scale-95
          focus:outline-none
          focus:ring-2
          focus:ring-primary-black
          dark:focus:ring-primary-white
          focus:ring-offset-2
          focus:ring-offset-primary-white
          dark:focus:ring-offset-primary-black
        "
        aria-label={`Mudar para tema ${theme === 'light' ? 'escuro' : 'claro'}`}
      >
        <div className="relative w-5 h-5">
          {/* Ícone do Sol - Minimalista */}
          <svg
            className={`
              absolute
              inset-0
              w-5
              h-5
              text-primary-black
              transition-all
              duration-300
              ${
                theme === 'dark'
                  ? 'opacity-0 rotate-90 scale-0'
                  : 'opacity-100 rotate-0 scale-100'
              }
            `}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>

          {/* Ícone da Lua - Minimalista */}
          <svg
            className={`
              absolute
              inset-0
              w-5
              h-5
              text-primary-white
              transition-all
              duration-300
              ${
                theme === 'light'
                  ? 'opacity-0 -rotate-90 scale-0'
                  : 'opacity-100 rotate-0 scale-100'
              }
            `}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </div>
      </button>
    </div>
  )
}
