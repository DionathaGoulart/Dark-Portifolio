// ================================
// External Imports
// ================================
import { ReactNode } from 'react'

// ================================
// Base Types
// ================================

/** Column count configuration for responsive grid layouts */
export interface ColumnCount {
  sm: number
  md: number
  lg: number
  xl: number
}

// ================================
// Image-Related Types
// ================================

/** Core image item interface */
export interface ImageItem {
  /** Optimized URLs for different screen sizes */
  urls: any
  /** Unique identifier */
  id: string
  /** Main image URL */
  url: string
  /** Alternative text for accessibility */
  alt?: string
  /** Image title (can be string or React component) */
  title?: string | ReactNode
  /** Detailed description */
  description?: string
  /** Image width in pixels */
  width?: number
  /** Image height in pixels */
  height?: number
  /** Navigation link URL */
  linkTo?: string
}

/** Props for individual image card components */
export interface ImageCardProps {
  /** Image data */
  image: ImageItem
  /** Click handler */
  onClick?: (image: ImageItem) => void
  /** Load success handler */
  onLoad?: (image: ImageItem) => void
  /** Load error handler */
  onError?: (image: ImageItem) => void
  /** Additional CSS classes */
  className?: string
  /** Force square aspect ratio */
  isSquare?: boolean
  /** Enable hover effects */
  showHoverEffect?: boolean
  /** Enable scale animation on hover */
  enableHoverScale?: boolean
  /** CSS object-fit property value */
  objectFit?: 'cover' | 'contain' | 'fill' | 'scale-down' | 'none'
  /** Show image title overlay */
  showTitle?: boolean
}

/** Props for image loader component */
export interface ImageLoaderProps {
  /** Image source URL */
  src: string
  /** Alternative text */
  alt?: string
  /** CSS classes */
  className?: string
  /** Load success callback */
  onLoad?: () => void
  /** Load error callback */
  onError?: () => void
  /** Fallback content for failed loads */
  fallback?: React.ReactNode
}

// ================================
// Grid Configuration Types
// ================================

/** Base grid configuration */
export interface GridConfig {
  /** Array of images to display */
  images: ImageItem[]
  /** Responsive column count configuration */
  columnCount?: ColumnCount
  /** Gap between grid items in pixels */
  gap?: number
  /** Additional CSS classes */
  className?: string
  /** Image click handler */
  onImageClick?: (image: ImageItem) => void
  /** Image load success handler */
  onImageLoad?: (image: ImageItem) => void
  /** Image load error handler */
  onImageError?: (image: ImageItem) => void
}

/** Props for masonry grid component */
export interface MasonryGridProps extends GridConfig {
  /** Loading state indicator */
  loading?: boolean
  /** Error message */
  error?: string | null
  /** Force square grid layout */
  isSquareGrid?: boolean
  /** Enable hover effects on cards */
  showHoverEffect?: boolean
  /** CSS object-fit property for images */
  objectFit?: 'cover' | 'contain' | 'fill' | 'scale-down' | 'none'
}

// ================================
// Folder-Related Types
// ================================

/** Folder item interface for folder grid displays */
export interface FolderItem {
  /** Unique identifier */
  id: string
  /** Folder title */
  title?: string
  /** Folder description */
  description?: string
  /** Cover image URL */
  coverImage?: string
  /** Number of items in folder */
  itemCount?: number
  /** Navigation path/route */
  path?: string
  /** Show title below image */
  showTitleBelow?: boolean
  /** Additional metadata */
  metadata?: {
    createdAt?: string
    updatedAt?: string
    size?: string
    type?: string
  }
}

/** Props for folder grid component */
export interface FolderGridProps {
  /** Array of folders to display */
  folders: FolderItem[]
  /** Responsive column configuration */
  columnCount?: ColumnCount
  /** Gap between items */
  gap?: number
  /** Additional CSS classes */
  className?: string
  /** Loading state */
  loading?: boolean
  /** Error message */
  error?: string | null
  /** Folder click handler */
  onFolderClick?: (folder: FolderItem) => void
  /** Folder image load handler */
  onImageLoad?: (folder: FolderItem) => void
  /** Folder image error handler */
  onImageError?: (folder: FolderItem) => void
}

/** Props for individual folder card component */
export interface FolderCardProps {
  /** Folder data */
  folder: FolderItem
  /** Click handler */
  onClick?: (folder: FolderItem) => void
  /** Image load success handler */
  onImageLoad?: (folder: FolderItem) => void
  /** Image load error handler */
  onImageError?: (folder: FolderItem) => void
}

// ================================
// UI Component Types
// ================================

/** Props for grid loading skeleton component */
export interface GridLoadingSkeletonProps {
  /** Number of skeleton items to show */
  count?: number
  /** Aspect ratio of skeleton items */
  aspectRatio?: 'square' | 'rectangle'
  /** Additional CSS classes */
  className?: string
}
