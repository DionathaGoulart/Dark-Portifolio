import React from 'react'
import { LayoutHeader } from './Header'
import { LayoutFooter } from './Footer'
import { MainLayoutProps } from './types'
import { ScrollToTopButton } from '../ui/ScroolOnTop'

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  header = { showNavigation: true },
  footer = { show: true },
  className = ''
}) => {
  return (
    <div
      className={`min-h-screen flex flex-col bg-primary-white dark:bg-primary-black transition-all duration-300 ${className}`}
    >
      {/* Header */}
      <LayoutHeader
        instagramUrl="https://www.instagram.com/darkning.art"
        youtubeUrl="https://www.youtube.com/@darkning_art"
        showNavigation={header.showNavigation}
      />

      {/* Main Content */}
      <main className="flex-1 bg-primary-white dark:bg-primary-black text-primary-black dark:text-primary-white transition-all duration-300">
        {children}
      </main>

      {/* Footer */}
      {footer.show && <LayoutFooter />}

      {/* Botão Scroll to Top - 👈 Adicione esta linha */}
      <ScrollToTopButton showAfter={300} smooth={true} />
    </div>
  )
}
