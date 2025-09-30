import { ReactNode } from 'react'

// ================================
// Tipos Base
// ================================

/** Configuração de contagem de colunas para layouts de grade responsivos */
export interface ColumnCount {
  sm: number
  md: number
  lg: number
  xl: number
}

// ================================
// Tipos Relacionados a Imagens
// ================================

/** Interface principal do item de imagem */
export interface ImageItem {
  /** URLs otimizadas para diferentes tamanhos de tela */
  urls: any
  /** Identificador único */
  id: string
  /** URL principal da imagem */
  url: string
  /** Texto alternativo para acessibilidade */
  alt?: string
  /** Título da imagem (pode ser string ou componente React) */
  title?: string | ReactNode
  /** Descrição detalhada */
  description?: string
  /** Largura da imagem em pixels */
  width?: number
  /** Altura da imagem em pixels */
  height?: number
  /** URL do link de navegação */
  linkTo?: string
}

/** Props para componentes individuais de cartão de imagem */
export interface ImageCardProps {
  /** Dados da imagem */
  image: ImageItem
  /** Manipulador de clique */
  onClick?: (image: ImageItem) => void
  /** Manipulador de sucesso de carregamento */
  onLoad?: (image: ImageItem) => void
  /** Manipulador de erro de carregamento */
  onError?: (image: ImageItem) => void
  /** Classes CSS adicionais */
  className?: string
  /** Forçar proporção quadrada */
  isSquare?: boolean
  /** Habilitar efeitos de hover */
  showHoverEffect?: boolean
  /** Habilitar animação de escala no hover */
  enableHoverScale?: boolean
  /** Valor da propriedade CSS object-fit */
  objectFit?: 'cover' | 'contain' | 'fill' | 'scale-down' | 'none'
  /** Mostrar sobreposição do título da imagem */
  showTitle?: boolean
}

/** Props para componente carregador de imagem */
export interface ImageLoaderProps {
  /** URL da fonte da imagem */
  src: string
  /** Texto alternativo */
  alt?: string
  /** Classes CSS */
  className?: string
  /** Callback de sucesso de carregamento */
  onLoad?: () => void
  /** Callback de erro de carregamento */
  onError?: () => void
  /** Conteúdo de fallback para carregamentos que falharam */
  fallback?: React.ReactNode
}

// ================================
// Tipos de Configuração da Grade
// ================================

/** Configuração base da grade */
export interface GridConfig {
  /** Array de imagens para exibir */
  images: ImageItem[]
  /** Configuração de contagem de colunas responsiva */
  columnCount?: ColumnCount
  /** Espaçamento entre itens da grade em pixels */
  gap?: number
  /** Classes CSS adicionais */
  className?: string
  /** Manipulador de clique da imagem */
  onImageClick?: (image: ImageItem) => void
  /** Manipulador de sucesso de carregamento da imagem */
  onImageLoad?: (image: ImageItem) => void
  /** Manipulador de erro de carregamento da imagem */
  onImageError?: (image: ImageItem) => void
}

/** Props para componente de grade masonry */
export interface MasonryGridProps extends GridConfig {
  /** Indicador de estado de carregamento */
  loading?: boolean
  /** Mensagem de erro */
  error?: string | null
  /** Forçar layout de grade quadrada */
  isSquareGrid?: boolean
  /** Habilitar efeitos de hover nos cartões */
  showHoverEffect?: boolean
  /** Propriedade CSS object-fit para imagens */
  objectFit?: 'cover' | 'contain' | 'fill' | 'scale-down' | 'none'
}

// ================================
// Tipos Relacionados a Pastas
// ================================

/** Interface do item de pasta para exibições de grade de pastas */
export interface FolderItem {
  /** Identificador único */
  id: string
  /** Título da pasta */
  title?: string
  /** Descrição da pasta */
  description?: string
  /** URL da imagem de capa */
  coverImage?: string
  /** Número de itens na pasta */
  itemCount?: number
  /** Caminho/rota de navegação */
  path?: string
  /** Mostrar título abaixo da imagem */
  showTitleBelow?: boolean
  /** Metadados adicionais */
  metadata?: {
    createdAt?: string
    updatedAt?: string
    size?: string
    type?: string
  }
}

/** Props para componente de grade de pastas */
export interface FolderGridProps {
  /** Array de pastas para exibir */
  folders: FolderItem[]
  /** Configuração de colunas responsiva */
  columnCount?: ColumnCount
  /** Espaçamento entre itens */
  gap?: number
  /** Classes CSS adicionais */
  className?: string
  /** Estado de carregamento */
  loading?: boolean
  /** Mensagem de erro */
  error?: string | null
  /** Manipulador de clique da pasta */
  onFolderClick?: (folder: FolderItem) => void
  /** Manipulador de carregamento de imagem da pasta */
  onImageLoad?: (folder: FolderItem) => void
  /** Manipulador de erro de imagem da pasta */
  onImageError?: (folder: FolderItem) => void
}

/** Props para componente individual de cartão de pasta */
export interface FolderCardProps {
  /** Dados da pasta */
  folder: FolderItem
  /** Manipulador de clique */
  onClick?: (folder: FolderItem) => void
  /** Manipulador de sucesso de carregamento de imagem */
  onImageLoad?: (folder: FolderItem) => void
  /** Manipulador de erro de carregamento de imagem */
  onImageError?: (folder: FolderItem) => void
}

// ================================
// Tipos de Componentes de UI
// ================================

/** Props para componente skeleton de carregamento da grade */
export interface GridLoadingSkeletonProps {
  /** Número de itens skeleton para mostrar */
  count?: number
  /** Proporção dos itens skeleton */
  aspectRatio?: 'square' | 'rectangle'
  /** Classes CSS adicionais */
  className?: string
}
