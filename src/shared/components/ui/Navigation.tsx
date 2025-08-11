import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { NavItem } from '../layouts/types'
import { useActiveRoute } from '../../hooks/useActiveRoute'

export const Navigation: React.FC<{ items: NavItem[] }> = ({ items }) => {
  const { isActive } = useActiveRoute()
  const [isOpen, setIsOpen] = useState(false)

  // Fecha o menu quando a tela ficar grande
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Fecha o menu quando clicar em um link
  const handleLinkClick = () => {
    setIsOpen(false)
  }

  // Classe base para os links
  const linkBaseClasses = `
    relative
    font-medium
    text-base
    tracking-wide
    transition-all
    duration-300
    pb-2
    before:content-['']
    before:absolute
    before:bottom-0
    before:left-1/2
    before:w-0
    before:h-0.5
    before:transition-all
    before:duration-300
    before:ease-out
    before:-translate-x-1/2
    before:bg-primary-black
    dark:before:bg-primary-white
  `

  const getLinkClasses = (href: string) => {
    const baseClasses = linkBaseClasses
    const activeClasses = isActive(href)
      ? 'text-primary-black dark:text-primary-white before:w-full'
      : 'text-primary-black/60 dark:text-primary-white/60 hover:text-primary-black dark:hover:text-primary-white hover:before:w-full'

    return `${baseClasses} ${activeClasses}`
  }

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-8">
        {items.map((item) => (
          <Link
            key={item.label}
            to={item.href}
            onClick={item.onClick}
            className={getLinkClasses(item.href)}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden relative z-50 w-8 h-8 flex flex-col justify-center items-center space-y-1.5 focus:outline-none"
        aria-label="Toggle menu"
      >
        <span
          className={`
            block w-6 h-0.5 bg-primary-black dark:bg-primary-white transition-all duration-300 origin-center
            ${isOpen ? 'rotate-45 translate-y-2' : ''}
          `}
        />
        <span
          className={`
            block w-6 h-0.5 bg-primary-black dark:bg-primary-white transition-all duration-300
            ${isOpen ? 'opacity-0' : 'opacity-100'}
          `}
        />
        <span
          className={`
            block w-6 h-0.5 bg-primary-black dark:bg-primary-white transition-all duration-300 origin-center
            ${isOpen ? '-rotate-45 -translate-y-2' : ''}
          `}
        />
      </button>

      {/* Mobile Navigation Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-primary-black bg-opacity-50"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Navigation Menu */}
      <nav
        className={`
          md:hidden fixed top-0 right-0 z-40 h-full w-80 max-w-[80vw]
          bg-primary-white dark:bg-primary-black border-l border-primary-black dark:border-primary-white
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className="pt-24 px-8">
          {/* Menu Items */}
          <div className="space-y-6">
            {items.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                onClick={handleLinkClick}
                className={`
                  block text-xl font-medium py-3 border-b border-primary-black/20 dark:border-primary-white/20
                  transition-all duration-300
                  ${
                    isActive(item.href)
                      ? 'text-primary-black dark:text-primary-white border-primary-black dark:border-primary-white'
                      : 'text-primary-black/60 dark:text-primary-white/60 hover:text-primary-black dark:hover:text-primary-white hover:border-primary-black/40 dark:hover:border-primary-white/40'
                  }
                `}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Footer do menu mobile */}
          <div className="absolute bottom-8 left-8 right-8">
            <div className="text-sm text-primary-black/50 dark:text-primary-white/50 text-center">
              Menu
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
