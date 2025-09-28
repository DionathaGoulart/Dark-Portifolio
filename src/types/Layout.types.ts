import React from 'react'

// ================================
// TIPOS BASE COMPARTILHADOS
// ================================

/** Props base com children para componentes container */
export interface BaseContainerProps {
  children: React.ReactNode
  className?: string
}

/** Props base para componentes com estilização customizável */
export interface BaseStyledProps {
  className?: string
}

/** Configuração de URLs para redes sociais */
export interface SocialUrls {
  instagramUrl?: string
  youtubeUrl: string
}

/** Configuração de comportamento de scroll */
export interface ScrollConfig {
  showAfter?: number
  smooth?: boolean
}

// ================================
// NAVEGAÇÃO
// ================================

/** Item de navegação com ação customizável */
export interface NavItem {
  label: string
  href: string
  onClick?: () => void
}

/** Props para componente de navegação */
export interface NavigationProps extends BaseStyledProps {
  items: NavItem[]
}

/** Retorno do hook de rota ativa */
export interface ActiveRouteHook {
  isActive: (href: string) => boolean
}

// ================================
// SCROLL TO TOP
// ================================

/** Props para botões de scroll to top */
export interface ScrollToTopProps extends BaseStyledProps, ScrollConfig {}

/** Informações de estado do scroll */
export interface ScrollInfo {
  isVisible: boolean
  scrollProgress: number
}

/** Retorno do hook de scroll to top */
export interface ScrollToTopHook {
  isVisible: boolean
  scrollToTop: (smooth?: boolean) => void
}

// ================================
// HEADER/CABEÇALHO
// ================================

/** Configuração completa do header */
export interface HeaderConfig extends SocialUrls {
  logoSrc?: string
  logoAlt?: string
  showNavigation?: boolean
  customNav?: NavItem[]
}

/** Props do componente LayoutHeader */
export interface LayoutHeaderProps extends HeaderConfig {}

// ================================
// FOOTER/RODAPÉ
// ================================

/** Configuração do footer */
export interface FooterConfig {
  show?: boolean
  content?: React.ReactNode
}

/** Props do componente LayoutFooter */
export interface LayoutFooterProps extends BaseStyledProps {}

// ================================
// LAYOUT PRINCIPAL
// ================================

/** Configuração simplificada do header no MainLayout */
export interface MainLayoutHeaderConfig {
  showNavigation?: boolean
  logoSrc?: string
  logoAlt?: string
  instagramUrl?: string
  youtubeUrl?: string
}

/** Configuração simplificada do footer no MainLayout */
export interface MainLayoutFooterConfig {
  show?: boolean
}

/** Props do componente MainLayout */
export interface MainLayoutProps extends BaseContainerProps {
  header?: MainLayoutHeaderConfig
  footer?: MainLayoutFooterConfig
}

// ================================
// COMPONENTES DE NAVEGAÇÃO ESPECÍFICOS
// ================================

/** Props para navegação desktop */
export interface DesktopNavigationProps {
  items: NavItem[]
  isActive: (href: string) => boolean
}

/** Props para botão do menu mobile */
export interface MobileMenuButtonProps {
  isOpen: boolean
  onClick: () => void
}

/** Props para overlay mobile */
export interface MobileOverlayProps {
  isOpen: boolean
  onClose: () => void
}

/** Props para navegação mobile */
export interface MobileNavigationProps extends DesktopNavigationProps {
  isOpen: boolean
  onLinkClick: () => void
}

// ================================
// COMPONENTES DE SCROLL ESPECÍFICOS
// ================================

/** Props para ícone de seta */
export interface ArrowUpIconProps extends BaseStyledProps {}

/** Props para círculo de progresso */
export interface ProgressCircleProps {
  progress: number
}

// ================================
// CONSTANTES DE TIPOS
// ================================

/** Tipos de linha do menu hambúrguer */
export type HamburgerLineType = 'top' | 'middle' | 'bottom'

// ================================
// TIPOS DE UTILITÁRIOS
// ================================

/** Função para obter classes CSS condicionalmente */
export type ClassNameGetter = (...args: any[]) => string

/** Configuração de breakpoints */
export interface Breakpoints {
  mobile: number
  tablet: number
  desktop: number
}

// ================================
// EXTENSÕES PARA CASOS ESPECÍFICOS
// ================================

/** Props estendidas para componentes que precisam de controle de tema */
export interface ThemedComponentProps extends BaseStyledProps {
  darkMode?: boolean
}

/** Props para componentes com animações */
export interface AnimatedComponentProps extends BaseStyledProps {
  duration?: number
  easing?: string
}

// ================================
// TIPOS DE EVENTOS
// ================================

/** Handlers de eventos comuns */
export interface EventHandlers {
  onClick?: () => void
  onToggle?: (isOpen: boolean) => void
  onClose?: () => void
}

// ================================
// CONFIGURAÇÕES PADRÃO (TIPOS)
// ================================

/** Configurações padrão do layout */
export interface DefaultLayoutConfig {
  social: SocialUrls
  scroll: ScrollConfig
  breakpoints: Breakpoints
}
