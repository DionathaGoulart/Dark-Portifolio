import React from 'react'
import { Instagram, Youtube } from 'lucide-react'
import { Logo } from '../ui/Logo'
import { Navigation } from '../ui/Navigation'
import { ThemeToggle } from '../ui/ThemeToggle'
import { LanguageSwitch } from '../ui/LanguageSwitch'
import { HeaderConfig } from './types'
import { useI18n } from '@/shared/contexts/I18nContext'

export const LayoutHeader: React.FC<HeaderConfig> = ({
  logoSrc,
  logoAlt = 'Logo',
  showNavigation = true,
  instagramUrl = 'https://instagram.com',
  youtubeUrl = 'https://youtube.com'
}) => {
  const { t } = useI18n()

  // Create nav items with translations e tracking
  const navItems = [
    {
      label: t.nav.home,
      href: '/'
    },
    {
      label: t.nav.about,
      href: '/about'
    },
    {
      label: t.nav.projects,
      href: '/projects'
    },
    {
      label: t.nav.contact,
      href: '/contact'
    },
    {
      label: t.nav.prints,
      href: '/prints'
    }
  ]

  if (!showNavigation && !logoSrc) return null

  return (
    <header className="relative w-full bg-primary-white dark:bg-primary-black transition-all duration-300 z-30">
      <div className="px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20 sm:h-24">
          {/* Logo à esquerda */}
          <div className="flex-shrink-0">
            <Logo src={logoSrc} alt={logoAlt} />
          </div>

          {/* Navigation - Desktop centralizada, Mobile no canto */}
          {showNavigation && (
            <>
              {/* Desktop: Navigation centralizada */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
                <Navigation items={navItems} />
              </div>
              {/* Mobile: Navigation à direita */}
              <div className="md:hidden flex items-center space-x-3">
                <LanguageSwitch />
                <ThemeToggle />
                <Navigation
                  items={navItems.map((item) => ({
                    ...item
                  }))}
                />
              </div>
            </>
          )}

          {/* Theme Toggle e Language Switch - Desktop à direita */}
          <div className="hidden md:flex items-center space-x-3 flex-shrink-0">
            <LanguageSwitch />
            <ThemeToggle />
          </div>
        </div>

        {/* Redes Sociais - Com rastreamento */}
        <div className="flex justify-center items-center pb-4 space-x-3">
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-pink-500 dark:text-gray-400 dark:hover:text-pink-400 transition-colors duration-200 flex items-center h-6"
            aria-label="Instagram"
          >
            <Instagram size={24} />
          </a>
          <a
            href={youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors duration-200 flex items-center h-6"
            aria-label="YouTube"
          >
            <Youtube size={30} />
          </a>
        </div>
      </div>
    </header>
  )
}
