export interface LayoutProps {
  children: React.ReactNode
}

export interface HeaderConfig {
  logoSrc?: string
  logoAlt?: string
  showNavigation?: boolean
  customNav?: NavItem[]
  instagramUrl?: string
  youtubeUrl?: string
}

export interface FooterConfig {
  show?: boolean
  content?: React.ReactNode
}

export interface MainLayoutProps {
  children: React.ReactNode
  header?: {
    showNavigation?: boolean
    logoSrc?: string
    logoAlt?: string
    instagramUrl?: string
    youtubeUrl?: string
  }
  footer?: {
    show?: boolean
  }
  className?: string
}

export interface NavItem {
  label: string
  href: string
  onClick?: () => void
}
