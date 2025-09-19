// ================================
// Layout Types and Interfaces
// ================================

/**
 * Type definitions for layout components and configurations
 * Defines interfaces for headers, footers, navigation, and main layout
 */

// ================================
// Base Layout Types
// ================================

/** Base props for layout components */
export interface LayoutProps {
  /** Child components to render */
  children: React.ReactNode
}

/** Navigation item configuration */
export interface NavItem {
  /** Display text for the navigation item */
  label: string
  /** URL or route path */
  href: string
  /** Optional click handler for custom navigation logic */
  onClick?: () => void
}

// ================================
// Header Configuration
// ================================

/** Header component configuration options */
export interface HeaderConfig {
  /** Logo image source URL */
  logoSrc?: string
  /** Logo image alt text for accessibility */
  logoAlt?: string
  /** Whether to show the main navigation menu */
  showNavigation?: boolean
  /** Custom navigation items array */
  customNav?: NavItem[]
  /** Instagram profile URL for social link */
  instagramUrl?: string
  /** YouTube channel URL for social link */
  youtubeUrl?: string
}

// ================================
// Footer Configuration
// ================================

/** Footer component configuration options */
export interface FooterConfig {
  /** Whether to display the footer */
  show?: boolean
  /** Custom footer content */
  content?: React.ReactNode
}

// ================================
// Main Layout Configuration
// ================================

/** Props for the main layout wrapper component */
export interface MainLayoutProps {
  /** Child components to render in the main content area */
  children: React.ReactNode
  /** Header configuration options */
  header?: {
    /** Whether to show navigation in header */
    showNavigation?: boolean
    /** Logo image source URL */
    logoSrc?: string
    /** Logo image alt text */
    logoAlt?: string
    /** Instagram profile URL */
    instagramUrl?: string
    /** YouTube channel URL */
    youtubeUrl?: string
  }
  /** Footer configuration options */
  footer?: {
    /** Whether to display the footer */
    show?: boolean
  }
  /** Additional CSS classes for the layout container */
  className?: string
}
