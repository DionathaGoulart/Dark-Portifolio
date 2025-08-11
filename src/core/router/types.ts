import React from 'react'

// Configuração individual de uma rota
export interface RouteConfig {
  path: string // Caminho da rota ("/", "/about", "/users/:id")
  element: React.ComponentType // Componente a ser renderizado
  layout?: React.ComponentType<{ children: React.ReactNode }> // Layout opcional para a rota
  meta?: {
    // Metadados da rota
    title?: string // Título da página
    requiresAuth?: boolean // Se requer autenticação
    roles?: string[] // Roles permitidas
    description?: string // Descrição para SEO
    keywords?: string[] // Keywords para SEO
  }
}

// Grupo de rotas com configurações compartilhadas
export interface RouteGroup {
  prefix?: string // Prefixo comum ("/admin", "/dashboard")
  layout?: React.ComponentType<{ children: React.ReactNode }> // Layout compartilhado
  routes: RouteConfig[] // Array de rotas do grupo
  meta?: {
    // Meta compartilhada
    requiresAuth?: boolean // Auth para todo o grupo
    roles?: string[] // Roles para todo o grupo
  }
}

// Props do componente AppRouter
export interface AppRouterProps {
  routes: (RouteConfig | RouteGroup)[] // Array misto de rotas e grupos
  fallbackRoute?: string // Rota padrão para 404
  loading?: React.ComponentType // Componente de loading
}

// Props do RouteRenderer
export interface RouteRendererProps {
  route: RouteConfig
}

// Props do AuthGuard
export interface AuthGuardProps {
  children: React.ReactNode
  requiresAuth?: boolean
  roles?: string[]
  fallbackPath?: string // Para onde redirecionar se não autorizado
}

// Interface para o contexto de autenticação (mock)
export interface AuthContext {
  isAuthenticated: boolean
  user?: {
    id: string
    name: string
    email: string
    roles: string[]
  } | null
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => void
}

// Credenciais de login
export interface LoginCredentials {
  email: string
  password: string
}
