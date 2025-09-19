import { useLocation } from 'react-router-dom'

// ================================
// INTERFACES & TYPES
// ================================

interface UseActiveRouteReturn {
  currentPath: string
  isActive: (href: string) => boolean
}

// ================================
// CONSTANTS
// ================================

const HOME_ROUTE = '/' as const

// ================================
// HELPER FUNCTIONS
// ================================

/**
 * Checks if a route is the home route
 */
const isHomeRoute = (href: string): boolean => {
  return href === HOME_ROUTE
}

/**
 * Checks if current path matches home route exactly
 */
const isHomeRouteActive = (currentPath: string): boolean => {
  return currentPath === HOME_ROUTE
}

/**
 * Checks if current path matches non-home route exactly or as parent
 */
const isNonHomeRouteActive = (currentPath: string, href: string): boolean => {
  return currentPath === href || currentPath.startsWith(href + '/')
}

/**
 * Determines if a route is currently active based on current path
 */
const checkRouteActive = (currentPath: string, href: string): boolean => {
  if (isHomeRoute(href)) {
    return isHomeRouteActive(currentPath)
  }

  return isNonHomeRouteActive(currentPath, href)
}

// ================================
// MAIN HOOK
// ================================

/**
 * Hook to detect active route with React Router
 * Provides exact matching for home route and parent/child matching for other routes
 */
export const useActiveRoute = (): UseActiveRouteReturn => {
  const location = useLocation()

  // ================================
  // COMPUTED VALUES
  // ================================

  const currentPath = location.pathname

  // ================================
  // HANDLERS
  // ================================

  const isActive = (href: string): boolean => {
    return checkRouteActive(currentPath, href)
  }

  // ================================
  // RETURN
  // ================================

  return {
    currentPath,
    isActive
  }
}
