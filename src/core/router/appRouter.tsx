import React, { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { RouteConfig } from './types'

interface AppRouterProps {
  routes: RouteConfig[]
}

const RouteRenderer: React.FC<{ route: RouteConfig }> = ({ route }) => {
  const { element: Element, title } = route

  // Set document title
  useEffect(() => {
    if (title) document.title = title
  }, [title])

  return <Element />
}

export const AppRouter: React.FC<AppRouterProps> = ({ routes }) => {
  const location = useLocation()

  // Scroll to top quando a rota mudar
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <Routes>
      {routes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={<RouteRenderer route={route} />}
        />
      ))}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
