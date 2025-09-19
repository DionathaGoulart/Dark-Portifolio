import React from 'react'
import { LayoutHeader } from './Header'
import { LayoutFooter } from './Footer'
import { MainLayoutProps } from './types'
import { ScrollToTopButton } from '../ui/ScroolOnTop'

// ================================
// CONSTANTS
// ================================

const DEFAULT_SOCIAL_URLS = {
  instagram: 'https://www.instagram.com/darkning.art',
  youtube: 'https://www.youtube.com/@darkning_art'
} as const

const DEFAULT_SCROLL_CONFIG = {
  showAfter: 300,
  smooth: true
} as const

// ================================
// MAIN COMPONENT
// ================================

/**
 * Main layout wrapper with header, footer, and scroll-to-top functionality
 * Provides the base structure for all application pages
 */
export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  header = { showNavigation: true },
  footer = { show: true },
  className = ''
}) => {
  // ================================
  // COMPUTED VALUES
  // ================================

  const containerClasses = [
    'min-h-screen flex flex-col bg-primary-white dark:bg-primary-black transition-all duration-300',
    className
  ]
    .filter(Boolean)
    .join(' ')

  // ================================
  // RENDER
  // ================================

  return (
    <div className={containerClasses}>
      <LayoutHeader
        instagramUrl={DEFAULT_SOCIAL_URLS.instagram}
        youtubeUrl={DEFAULT_SOCIAL_URLS.youtube}
        showNavigation={header.showNavigation}
      />

      <main className="flex-1 bg-primary-white dark:bg-primary-black text-primary-black dark:text-primary-white transition-all duration-300">
        {children}
      </main>

      {footer.show && <LayoutFooter />}

      <ScrollToTopButton
        showAfter={DEFAULT_SCROLL_CONFIG.showAfter}
        smooth={DEFAULT_SCROLL_CONFIG.smooth}
      />
    </div>
  )
}
