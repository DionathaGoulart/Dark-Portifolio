// ================================
// Tipos e Interfaces de Layout
// ================================

/**
 * Definições de tipos para componentes de layout e configurações
 * Define interfaces para cabeçalhos, rodapés, navegação e layout principal
 */

// ================================
// Tipos Base de Layout
// ================================

/** Props base para componentes de layout */
export interface LayoutProps {
  /** Componentes filhos para renderizar */
  children: React.ReactNode
}

/** Configuração do item de navegação */
export interface NavItem {
  /** Texto de exibição para o item de navegação */
  label: string
  /** URL ou caminho da rota */
  href: string
  /** Manipulador de clique opcional para lógica de navegação customizada */
  onClick?: () => void
}

// ================================
// Configuração do Cabeçalho
// ================================

/** Opções de configuração do componente de cabeçalho */
export interface HeaderConfig {
  /** URL da fonte da imagem do logo */
  logoSrc?: string
  /** Texto alternativo da imagem do logo para acessibilidade */
  logoAlt?: string
  /** Se deve mostrar o menu de navegação principal */
  showNavigation?: boolean
  /** Array de itens de navegação customizados */
  customNav?: NavItem[]
  /** URL do perfil do Instagram para link social */
  instagramUrl?: string
  /** URL do canal do YouTube para link social */
  youtubeUrl?: string
}

// ================================
// Configuração do Rodapé
// ================================

/** Opções de configuração do componente de rodapé */
export interface FooterConfig {
  /** Se deve exibir o rodapé */
  show?: boolean
  /** Conteúdo customizado do rodapé */
  content?: React.ReactNode
}

// ================================
// Configuração do Layout Principal
// ================================

/** Props para o componente wrapper de layout principal */
export interface MainLayoutProps {
  /** Componentes filhos para renderizar na área de conteúdo principal */
  children: React.ReactNode
  /** Opções de configuração do cabeçalho */
  header?: {
    /** Se deve mostrar navegação no cabeçalho */
    showNavigation?: boolean
    /** URL da fonte da imagem do logo */
    logoSrc?: string
    /** Texto alternativo da imagem do logo */
    logoAlt?: string
    /** URL do perfil do Instagram */
    instagramUrl?: string
    /** URL do canal do YouTube */
    youtubeUrl?: string
  }
  /** Opções de configuração do rodapé */
  footer?: {
    /** Se deve exibir o rodapé */
    show?: boolean
  }
  /** Classes CSS adicionais para o contêiner do layout */
  className?: string
}
