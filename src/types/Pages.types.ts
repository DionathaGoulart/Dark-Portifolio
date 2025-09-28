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
// ROUTING TYPES
// ================================

/**
 * Route metadata configuration
 */
export interface RouteMeta {
  title?: string
  description?: string
  keywords?: string[]
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  canonical?: string
}

/**
 * Individual route configuration
 */
export interface RouteConfig {
  /** Identificador único da rota */
  id?: string
  /** O caminho da URL para a rota */
  path: string
  /** Componente React a ser renderizado para esta rota */
  element: React.ComponentType<any>
  /** Título opcional para a rota (ex: para título da página ou navegação) */
  title?: string
  /** Se a rota requer autenticação */
  requiresAuth?: boolean
  /** Meta informações da rota */
  meta?: RouteMeta
  /** Rota pai (para rotas aninhadas) */
  parent?: string
  /** Se deve fazer preload do componente */
  preload?: boolean
  /** Se a rota é visível na navegação */
  showInNavigation?: boolean
  /** Ícone da rota (para navegação) */
  icon?: React.ComponentType | string
  /** Rotas filhas */
  children?: RouteConfig[]
  /** Se a rota deve ter match exato */
  exact?: boolean
}

/**
 * Route group with shared layout
 */
export interface RouteGroup {
  layout: React.ComponentType<any>
  routes: RouteConfig[]
}

// ================================
// ROUTER COMPONENT TYPES
// ================================

/**
 * Props for the AppRouter component
 */
export interface AppRouterProps {
  routes: RouteConfig[]
  fallback?: React.ComponentType
  loading?: React.ComponentType
  onRouteChange?: (route: RouteConfig) => void
  basename?: string
}

/**
 * Props for the RouteRenderer component
 */
export interface RouteRendererProps {
  route: RouteConfig
  isLoading?: boolean
  error?: Error | null
}

/**
 * Interface for navigation configuration
 */
export interface NavigationConfig {
  /** Rotas visíveis na navegação */
  visibleRoutes: RouteConfig[]
  /** Configurações de menu mobile */
  mobileMenu?: {
    showOverlay: boolean
    closeOnNavigate: boolean
  }
}

/**
 * Interface for router hook return
 */
export interface RouterHookReturn {
  currentRoute: RouteConfig | null
  navigate: (path: string) => void
  goBack: () => void
  isLoading: boolean
}

/**
 * Navigation options for routes
 */
export interface RouteNavigateOptions {
  replace?: boolean
  state?: any
  preventScrollReset?: boolean
}

/**
 * Props for route-based navigation component
 */
export interface RouteNavigationProps {
  routes: RouteConfig[]
  currentPath: string
  onNavigate?: (route: RouteConfig) => void
  className?: string
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
      title: string
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
