import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { RouteRenderer } from './components/RouteRenderer'
import { AppRouterProps, RouteConfig, RouteGroup } from './types'

export const AppRouter: React.FC<AppRouterProps> = ({
  routes,
  fallbackRoute = '/'
}) => {
  const renderRoutes = (
    routeConfigs: (RouteConfig | RouteGroup)[]
  ): React.ReactNode[] => {
    return routeConfigs.flatMap((config) => {
      // Se é um grupo de rotas
      if ('routes' in config) {
        const group = config as RouteGroup
        return group.routes.map((route) => {
          const fullPath = group.prefix
            ? `${group.prefix}${route.path}`
            : route.path
          const layout = route.layout || group.layout

          return (
            <Route
              key={fullPath}
              path={fullPath}
              element={
                <RouteRenderer route={{ ...route, path: fullPath, layout }} />
              }
            />
          )
        })
      }

      // Se é uma rota individual
      const route = config as RouteConfig
      return (
        <Route
          key={route.path}
          path={route.path}
          element={<RouteRenderer route={route} />}
        />
      )
    })
  }

  return (
    <Routes>
      {renderRoutes(routes)}
      {/* Rota de fallback */}
      <Route path="*" element={<Navigate to={fallbackRoute} replace />} />
    </Routes>
  )
}
