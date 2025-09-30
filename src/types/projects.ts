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
