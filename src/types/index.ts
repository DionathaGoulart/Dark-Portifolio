import React from 'react'

// ================================
// SHARED METADATA TYPES
// ================================

/**
 * Shared metadata interface for projects and folders
 * Allows for extensible metadata with type safety
 */
export interface Metadata {
  type: string
  createdAt: string
  [key: string]: any // Allows for additional, less strict metadata
}

// ================================
// PROJECT RELATED TYPES
// ================================

/**
 * Statistics for individual projects
 */
export interface ProjectStats {
  lines: string
  commits: number
  stars: number
  forks: number
}

/**
 * External links for projects
 */
export interface ProjectLinks {
  live?: string
  github?: string
  figma?: string
}

/**
 * Detailed project item interface
 * Used in ProjectDetail.tsx and project-related components
 */
export interface ProjectItem {
  id: string
  title: string
  subtitle: string
  description: string
  coverImage: string
  gallery: string[]
  technologies: string[]
  features: string[]
  metadata: {
    type: string
    createdAt: string
    updatedAt: string
    status: string
    team: string[]
    duration: string
    client: string
  }
  links: ProjectLinks
  stats: ProjectStats
}

/**
 * Props for ProjectDetail page component
 */
export interface ProjectDetailProps {
  projectId?: string
}

// ================================
// FOLDER RELATED TYPES
// ================================

/**
 * Folder item interface for folder grids and cards
 */
export interface FolderItem {
  id: string
  title: string
  description?: string
  coverImage?: string
  path?: string // Optional path for navigation
  itemCount?: number
  metadata?: Metadata
  showTitleBelow?: boolean // Added based on FolderCard.tsx usage
}

/**
 * Props for FolderCard component
 */
export interface FolderCardProps {
  folder: FolderItem
  onClick?: (folder: FolderItem) => void
  onImageLoad?: (folder: FolderItem) => void
  onImageError?: (folder: FolderItem) => void
}

/**
 * Props for FolderGrid component with responsive column configuration
 */
export interface FolderGridProps {
  folders: FolderItem[]
  columnCount?: {
    sm: number
    md: number
    lg: number
    xl: number
  }
  gap?: number
  className?: string
  onFolderClick?: (folder: FolderItem) => void
  onImageLoad?: (folder: FolderItem) => void
  onImageError?: (folder: FolderItem) => void
  loading?: boolean
  error?: string | null
}

// ================================
// ROUTING TYPES
// ================================

/**
 * Route metadata configuration
 */
export interface RouteMeta {
  title: string
  [key: string]: any
}

/**
 * Individual route configuration
 */
export interface RouteConfig {
  path: string
  element: React.ComponentType<any>
  meta?: RouteMeta
}

/**
 * Route group with shared layout
 */
export interface RouteGroup {
  layout: React.ComponentType<any>
  routes: RouteConfig[]
}

// ================================
// INTERNATIONALIZATION TYPES
// ================================

/**
 * Supported languages
 */
export type Language = 'pt' | 'en'

/**
 * Complete translation interface structure
 * Covers all application text content
 */
export interface Translation {
  nav: {
    home: string
    about: string
    projects: string
    contact: string
    prints: string
  }
  pages: {
    home: {
      title: string
    }
    about: {
      title: string
      description: string
      content: string
    }
    projects: {
      title: string
      description: string
    }
    contact: {
      title: string
      subtitle: string
      info: {
        description: string
      }
      form: {
        name: string
        email: string
        message: string
        send: string
        sending: string
        namePlaceholder: string
        emailPlaceholder: string
        messagePlaceholder: string
        successTitle: string
        successMessage: string
        sendAnother: string
        errorMessage: string
      }
    }
    prints: {
      links: {
        redbubble: string
        inprnt: string
        displate: string
        portfolio: string
        donate: string
      }
    }
  }
  footer: {
    rights: string
    language: string
  }
  common: {
    loading: string
    error: string
    noImages: string
  }
}
