// Shared metadata for projects and folders
export interface Metadata {
  type: string
  createdAt: string
  [key: string]: any // Allows for additional, less strict metadata
}

// Type for individual project stats
export interface ProjectStats {
  lines: string
  commits: number
  stars: number
  forks: number
}

// Type for project links
export interface ProjectLinks {
  live?: string
  github?: string
  figma?: string
}

// Detailed Project Item (used in ProjectDetail.tsx)
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

// Type for FolderCardProps and FolderGrid
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

// Props for FolderCard component
export interface FolderCardProps {
  folder: FolderItem
  onClick?: (folder: FolderItem) => void
  onImageLoad?: (folder: FolderItem) => void
  onImageError?: (folder: FolderItem) => void
}

// Props for FolderGrid component
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

// Props for ProjectDetail page
export interface ProjectDetailProps {
  projectId?: string
}

// Route configuration types
export interface RouteMeta {
  title: string
  [key: string]: any
}

export interface RouteConfig {
  path: string
  element: React.ComponentType<any>
  meta?: RouteMeta
}

export interface RouteGroup {
  layout: React.ComponentType<any>
  routes: RouteConfig[]
}

// Language and Translation types (simplified)
export type Language = 'pt' | 'en'

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
      subtitle: string
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
