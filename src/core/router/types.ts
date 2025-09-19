// ================================
// External Imports
// ================================
import React from 'react'

// ================================
// Route Configuration Interface
// ================================

/**
 * Configuration interface for application routes
 * @interface RouteConfig
 */
export interface RouteConfig {
  /** The URL path for the route */
  path: string

  /** React component to render for this route */
  element: React.ComponentType

  /** Optional title for the route (e.g., for page title or navigation) */
  title?: string
}
