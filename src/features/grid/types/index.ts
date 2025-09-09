import { ReactNode } from 'react'

export interface ImageItem {
  urls: any
  id: string
  url: string
  alt?: string
  title?: string | ReactNode
  description?: string
  width?: number
  height?: number
  linkTo?: string
}

export interface GridConfig {
  images: ImageItem[]
  columnCount?: {
    sm: number
    md: number
    lg: number
    xl: number
  }
  gap?: number
  className?: string
  onImageClick?: (image: ImageItem) => void
  onImageLoad?: (image: ImageItem) => void
  onImageError?: (image: ImageItem) => void
}

export interface ImageCardProps {
  image: ImageItem
  onClick?: (image: ImageItem) => void
  onLoad?: (image: ImageItem) => void
  onError?: (image: ImageItem) => void
  className?: string
  isSquare?: boolean
  showHoverEffect?: boolean
}

export interface MasonryGridProps extends GridConfig {
  loading?: boolean
  error?: string | null
  isSquareGrid?: boolean
  showHoverEffect?: boolean
}

export interface ImageLoaderProps {
  src: string
  alt?: string
  className?: string
  onLoad?: () => void
  onError?: () => void
  fallback?: React.ReactNode
}

export interface FolderItem {
  id: string
  title?: string
  description?: string
  coverImage?: string // URL da imagem de capa
  itemCount?: number // Número de itens dentro da pasta
  path?: string // Caminho/rota para navegação
  showTitleBelow?: boolean // Se deve mostrar título abaixo da imagem
  metadata?: {
    createdAt?: string
    updatedAt?: string
    size?: string
    type?: string
  }
}

export interface ColumnCount {
  sm: number
  md: number
  lg: number
  xl: number
}

export interface FolderGridProps {
  folders: FolderItem[]
  columnCount?: ColumnCount
  gap?: number
  className?: string
  loading?: boolean
  error?: string | null
  onFolderClick?: (folder: FolderItem) => void
  onImageLoad?: (folder: FolderItem) => void
  onImageError?: (folder: FolderItem) => void
}

export interface FolderCardProps {
  folder: FolderItem
  onClick?: (folder: FolderItem) => void
  onImageLoad?: (folder: FolderItem) => void
  onImageError?: (folder: FolderItem) => void
}

// Exemplo de uso dos tipos
export interface GridLoadingSkeletonProps {
  count?: number
  aspectRatio?: 'square' | 'rectangle'
  className?: string
}
