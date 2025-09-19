import React, { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { RouteConfig } from './types'

// ================================
// INTERFACES & TYPES
// ================================

/**
 * Props interface for AppRouter component
 */
interface AppRouterProps {
  routes: RouteConfig[]
}

/**
 * Props interface for RouteRenderer component
 */
interface RouteRendererProps {
  route: RouteConfig
}

// ================================
// HELPER COMPONENTS
// ================================

/**
 * RouteRenderer component that handles individual route rendering and document title setting
 */
const RouteRenderer: React.FC<RouteRendererProps> = ({ route }) => {
  const { element: Element, title } = route

  // ================================
  // EFFECTS
  // ================================

  useEffect(() => {
    if (title) {
      document.title = title
    }
  }, [title])

  // ================================
  // RENDER
  // ================================

  return <Element />
}

// ================================
// MAIN COMPONENT
// ================================

/**
 * AppRouter component that manages application routing with automatic scroll-to-top
 * and dynamic document title setting based on route configuration
 */
export const AppRouter: React.FC<AppRouterProps> = ({ routes }) => {
  // ================================
  // HOOKS
  // ================================

  const location = useLocation()

  // ================================
  // EFFECTS
  // ================================

  useEffect(() => {
    // Scroll to top when route changes
    window.scrollTo(0, 0)
  }, [location.pathname])

  // ================================
  // RENDER HELPERS
  // ================================

  const renderRoutes = () =>
    routes.map((route) => (
      <Route
        key={route.path}
        path={route.path}
        element={<RouteRenderer route={route} />}
      />
    ))

  const renderFallbackRoute = () => (
    <Route path="*" element={<Navigate to="/" replace />} />
  )

  // ================================
  // MAIN RENDER
  // ================================

  return (
    <Routes>
      {renderRoutes()}
      {renderFallbackRoute()}
    </Routes>
  )
}
