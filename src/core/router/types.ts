import React from 'react'

export interface RouteConfig {
  path: string
  element: React.ComponentType
  layout?: React.ComponentType<{ children: React.ReactNode }>
  requiresAuth?: boolean
  roles?: string[]
  title?: string
}

export interface RouteGroup {
  prefix?: string
  layout?: React.ComponentType<{ children: React.ReactNode }>
  routes: RouteConfig[]
  requiresAuth?: boolean
  roles?: string[]
}

export interface AppRouterProps {
  routes: (RouteConfig | RouteGroup)[]
  fallback?: string
}
