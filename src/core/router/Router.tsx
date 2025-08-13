import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AppRouterProps, RouteConfig, RouteGroup } from './types'
import { RouteRenderer } from './components/RouteRenderer'

const processRoutes = (configs: (RouteConfig | RouteGroup)[]) => {
  return configs.flatMap((config) => {
    if ('routes' in config) {
      return config.routes.map((route) => ({
        ...route,
        path: (config.prefix || '') + route.path,
        layout: route.layout || config.layout,
        requiresAuth: route.requiresAuth ?? config.requiresAuth,
        roles: route.roles || config.roles
      }))
    }
    return config
  })
}

export const AppRouter: React.FC<AppRouterProps> = ({
  routes,
  fallback = '/'
}) => {
  const processedRoutes = processRoutes(routes)

  return (
    <Routes>
      {processedRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={<RouteRenderer route={route} />}
        />
      ))}
      <Route path="*" element={<Navigate to={fallback} replace />} />
    </Routes>
  )
}
