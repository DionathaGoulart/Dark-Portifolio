import React from 'react'

// ================================
// ROUTER SPECIFIC TYPES
// ================================
// Note: RouteConfig e RouteMeta foram movidos para Pages.types.ts para evitar conflitos

/**
 * Router state management
 */
export interface RouterState {
  currentPath: string
  previousPath: string | null
  isNavigating: boolean
  params: Record<string, string>
  query: Record<string, string>
  hash: string
  state: any
}

/**
 * Router context value
 */
export interface RouterContextValue {
  state: RouterState
  navigate: (path: string, options?: RouterNavigateOptions) => void
  goBack: () => void
  goForward: () => void
  replace: (path: string, options?: RouterNavigateOptions) => void
  push: (path: string, options?: RouterNavigateOptions) => void
  refresh: () => void
  block: (blocker: RouteBlocker) => () => void
}

/**
 * Router provider props
 */
export interface RouterProviderProps {
  children: React.ReactNode
  basename?: string
  initialPath?: string
  onRouteChange?: (path: string, previousPath: string | null) => void
  onNavigationStart?: (path: string) => void
  onNavigationEnd?: (path: string) => void
  onNavigationError?: (error: Error, path: string) => void
}

/**
 * Navigation options for router methods (renomeado para evitar conflito)
 */
export interface RouterNavigateOptions {
  replace?: boolean
  state?: any
  preventScrollReset?: boolean
  shallow?: boolean
  scroll?: boolean
}

/**
 * Route transition configuration
 */
export interface RouteTransition {
  duration: number
  ease: string
  type: 'fade' | 'slide' | 'scale' | 'none'
  direction?: 'left' | 'right' | 'up' | 'down'
}

/**
 * Router configuration for the application
 */
export interface RouterConfiguration {
  basename?: string
  mode?: 'history' | 'hash' | 'memory'
  scrollBehavior?: 'auto' | 'smooth' | 'instant'
  transitions?: RouteTransition
  preloadDelay?: number
  caseSensitive?: boolean
  trailingSlash?: 'always' | 'never' | 'preserve'
}

/**
 * Route guard function type
 */
export type RouteGuard = (
  to: string,
  from: string,
  params?: Record<string, string>
) => boolean | Promise<boolean> | string | Promise<string>

/**
 * Route blocker function type
 */
export type RouteBlocker = (
  location: RouterLocation,
  action: 'POP' | 'PUSH' | 'REPLACE'
) => boolean | string

/**
 * Router location object
 */
export interface RouterLocation {
  pathname: string
  search: string
  hash: string
  state: any
  key: string
}

/**
 * Route interceptor configuration
 */
export interface RouteInterceptor {
  beforeEnter?: RouteGuard
  beforeLeave?: RouteGuard
  onEnter?: (path: string, params?: Record<string, string>) => void
  onLeave?: (path: string, params?: Record<string, string>) => void
  onError?: (error: Error, path: string) => void
}

/**
 * Route matcher configuration
 */
export interface RouteMatcher {
  path: string
  exact?: boolean
  sensitive?: boolean
  strict?: boolean
}

/**
 * Route match result
 */
export interface RouteMatch {
  path: string
  url: string
  isExact: boolean
  params: Record<string, string>
}

/**
 * History entry
 */
export interface HistoryEntry {
  pathname: string
  search: string
  hash: string
  state: any
  key: string
  timestamp: number
}

/**
 * Router history management
 */
export interface RouterHistory {
  length: number
  action: 'POP' | 'PUSH' | 'REPLACE'
  location: RouterLocation
  entries: HistoryEntry[]
  index: number
  canGoBack: boolean
  canGoForward: boolean
}

/**
 * Route loader function type
 */
export type RouteLoader<T = any> = (params: {
  params: Record<string, string>
  request: Request
  context?: any
}) => T | Promise<T>

/**
 * Route action function type
 */
export type RouteAction<T = any> = (params: {
  params: Record<string, string>
  request: Request
  context?: any
}) => T | Promise<T>

/**
 * Route error boundary props
 */
export interface RouteErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error: Error; retry: () => void }>
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

/**
 * Link component props
 */
export interface LinkProps {
  to: string
  replace?: boolean
  state?: any
  target?: string
  rel?: string
  className?: string
  activeClassName?: string
  style?: React.CSSProperties
  activeStyle?: React.CSSProperties
  children: React.ReactNode
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

/**
 * NavLink component props
 */
export interface NavLinkProps extends LinkProps {
  activeClassName?: string
  activeStyle?: React.CSSProperties
  isActive?: (match: RouteMatch | null, location: RouterLocation) => boolean
  end?: boolean
}

/**
 * Redirect component props
 */
export interface RedirectProps {
  to: string
  push?: boolean
  from?: string
  exact?: boolean
  strict?: boolean
}

/**
 * Router hook return types
 */
export interface UseRouterReturn {
  navigate: RouterContextValue['navigate']
  location: RouterLocation
  params: Record<string, string>
  query: Record<string, string>
  hash: string
  state: any
  isNavigating: boolean
  canGoBack: boolean
  canGoForward: boolean
  goBack: () => void
  goForward: () => void
  refresh: () => void
}

/**
 * Route params hook return
 */
export interface UseParamsReturn {
  params: Record<string, string>
  getParam: (key: string, defaultValue?: string) => string | undefined
}

/**
 * Search params hook return
 */
export interface UseSearchParamsReturn {
  searchParams: URLSearchParams
  setSearchParams: (params: Record<string, string> | URLSearchParams) => void
  getSearchParam: (key: string, defaultValue?: string) => string | undefined
}

/**
 * Route preloader configuration
 */
export interface RoutePreloader {
  prefetch?: boolean
  preload?: boolean
  timeout?: number
  retries?: number
  priority?: 'high' | 'normal' | 'low'
}

// ================================
// COMPATIBILITY ALIASES
// ================================

/**
 * @deprecated Use RouterContextValue instead
 * Mantido apenas para compatibilidade durante migração
 */
export type RouterHook = RouterContextValue
