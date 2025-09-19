import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { NavItem } from '../layouts/types'
import { useActiveRoute } from '../../hooks/useActiveRoute'

// ================================
// INTERFACES & TYPES
// ================================

interface NavigationProps {
  items: NavItem[]
  className?: string
}

// ================================
// CONSTANTS
// ================================

const MOBILE_BREAKPOINT = 768

const linkBaseClasses = [
  'relative',
  'font-medium',
  'text-base',
  'tracking-wide',
  'transition-all',
  'duration-300',
  'pb-2',
  "before:content-['']",
  'before:absolute',
  'before:bottom-0',
  'before:left-1/2',
  'before:w-0',
  'before:h-0.5',
  'before:transition-all',
  'before:duration-300',
  'before:ease-out',
  'before:-translate-x-1/2',
  'before:bg-primary-black',
  'dark:before:bg-primary-white'
].join(' ')

// ================================
// HELPER FUNCTIONS
// ================================

/**
 * Gets appropriate classes for desktop navigation links
 */
const getDesktopLinkClasses = (
  href: string,
  isActive: (href: string) => boolean
): string => {
  const activeClasses = isActive(href)
    ? 'text-primary-black dark:text-primary-white before:w-full'
    : 'text-primary-black/60 dark:text-primary-white/60 hover:text-primary-black dark:hover:text-primary-white hover:before:w-full'

  return `${linkBaseClasses} ${activeClasses}`
}

/**
 * Gets appropriate classes for mobile navigation links
 */
const getMobileLinkClasses = (
  href: string,
  isActive: (href: string) => boolean
): string => {
  const baseClasses =
    'block text-xl font-medium py-3 border-b border-primary-black/20 dark:border-primary-white/20 transition-all duration-300'

  const activeClasses = isActive(href)
    ? 'text-primary-black dark:text-primary-white border-primary-black dark:border-primary-white'
    : 'text-primary-black/60 dark:text-primary-white/60 hover:text-primary-black dark:hover:text-primary-white hover:border-primary-black/40 dark:hover:border-primary-white/40'

  return `${baseClasses} ${activeClasses}`
}

/**
 * Gets classes for hamburger menu lines
 */
const getHamburgerLineClasses = (
  isOpen: boolean,
  lineType: 'top' | 'middle' | 'bottom'
): string => {
  const baseClasses =
    'block w-6 h-0.5 bg-primary-black dark:bg-primary-white transition-all duration-300'

  const variations = {
    top: isOpen ? 'origin-center rotate-45 translate-y-2' : '',
    middle: isOpen ? 'opacity-0' : 'opacity-100',
    bottom: isOpen ? 'origin-center -rotate-45 -translate-y-2' : ''
  }

  return `${baseClasses} ${variations[lineType]}`
}

// ================================
// SUB COMPONENTS
// ================================

/**
 * Desktop navigation component
 */
const DesktopNavigation: React.FC<{
  items: NavItem[]
  isActive: (href: string) => boolean
}> = ({ items, isActive }) => (
  <nav className="hidden md:flex items-center space-x-8">
    {items.map((item) => (
      <Link
        key={item.label}
        to={item.href}
        onClick={item.onClick}
        className={getDesktopLinkClasses(item.href, isActive)}
      >
        {item.label}
      </Link>
    ))}
  </nav>
)

/**
 * Mobile menu hamburger button
 */
const MobileMenuButton: React.FC<{ isOpen: boolean; onClick: () => void }> = ({
  isOpen,
  onClick
}) => (
  <button
    onClick={onClick}
    className="md:hidden relative z-50 w-8 h-8 flex flex-col justify-center items-center space-y-1.5 focus:outline-none"
    aria-label="Toggle menu"
  >
    <span className={getHamburgerLineClasses(isOpen, 'top')} />
    <span className={getHamburgerLineClasses(isOpen, 'middle')} />
    <span className={getHamburgerLineClasses(isOpen, 'bottom')} />
  </button>
)

/**
 * Mobile navigation overlay
 */
const MobileOverlay: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null

  return (
    <div
      className="md:hidden fixed inset-0 z-40 bg-primary-black bg-opacity-50"
      onClick={onClose}
    />
  )
}

/**
 * Mobile navigation menu
 */
const MobileNavigation: React.FC<{
  items: NavItem[]
  isOpen: boolean
  isActive: (href: string) => boolean
  onLinkClick: () => void
}> = ({ items, isOpen, isActive, onLinkClick }) => {
  const navClasses = [
    'md:hidden fixed top-0 right-0 z-40 h-full w-80 max-w-[80vw]',
    'bg-primary-white dark:bg-primary-black border-l border-primary-black dark:border-primary-white',
    'transform transition-transform duration-300 ease-in-out',
    isOpen ? 'translate-x-0' : 'translate-x-full'
  ].join(' ')

  return (
    <nav className={navClasses}>
      <div className="pt-24 px-8">
        <div className="space-y-6">
          {items.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              onClick={onLinkClick}
              className={getMobileLinkClasses(item.href, isActive)}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="absolute bottom-8 left-8 right-8">
          <div className="text-sm text-primary-black/50 dark:text-primary-white/50 text-center">
            Menu
          </div>
        </div>
      </div>
    </nav>
  )
}

// ================================
// MAIN COMPONENT
// ================================

/**
 * Responsive navigation component with desktop and mobile layouts
 * Features hamburger menu for mobile and underline animations for desktop
 */
export const Navigation: React.FC<NavigationProps> = ({
  items,
  className = ''
}) => {
  const { isActive } = useActiveRoute()
  const [isOpen, setIsOpen] = useState(false)

  // ================================
  // EFFECTS
  // ================================

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= MOBILE_BREAKPOINT) {
        setIsOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // ================================
  // HANDLERS
  // ================================

  const handleMenuToggle = () => {
    setIsOpen(!isOpen)
  }

  const handleLinkClick = () => {
    setIsOpen(false)
  }

  const handleOverlayClick = () => {
    setIsOpen(false)
  }

  // ================================
  // RENDER
  // ================================

  return (
    <div className={className}>
      <DesktopNavigation items={items} isActive={isActive} />

      <MobileMenuButton isOpen={isOpen} onClick={handleMenuToggle} />

      <MobileOverlay isOpen={isOpen} onClose={handleOverlayClick} />

      <MobileNavigation
        items={items}
        isOpen={isOpen}
        isActive={isActive}
        onLinkClick={handleLinkClick}
      />
    </div>
  )
}
