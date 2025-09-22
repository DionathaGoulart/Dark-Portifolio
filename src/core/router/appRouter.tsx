import React, { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { RouteConfig } from './types'

// ================================
// INTERFACES E TIPOS
// ================================

/**
 * Interface de props para o componente AppRouter
 */
interface AppRouterProps {
  routes: RouteConfig[]
}

/**
 * Interface de props para o componente RouteRenderer
 */
interface RouteRendererProps {
  route: RouteConfig
}

// ================================
// COMPONENTES AUXILIARES
// ================================

/**
 * Componente RouteRenderer que lida com a renderização individual de rotas
 * e configuração do título do documento
 */
const RouteRenderer: React.FC<RouteRendererProps> = ({ route }) => {
  const { element: Element, title } = route

  // ================================
  // EFEITOS
  // ================================

  useEffect(() => {
    if (title) {
      document.title = title
    }
  }, [title])

  // ================================
  // RENDERIZAÇÃO
  // ================================

  return <Element />
}

// ================================
// COMPONENTE PRINCIPAL
// ================================

/**
 * Componente AppRouter que gerencia o roteamento da aplicação com rolagem automática
 * para o topo e configuração dinâmica do título do documento baseada na configuração da rota
 */
export const AppRouter: React.FC<AppRouterProps> = ({ routes }) => {
  // ================================
  // HOOKS
  // ================================

  const location = useLocation()

  // ================================
  // EFEITOS
  // ================================

  useEffect(() => {
    // Rola para o topo quando a rota muda
    window.scrollTo(0, 0)
  }, [location.pathname])

  // ================================
  // FUNÇÕES AUXILIARES DE RENDERIZAÇÃO
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
  // RENDERIZAÇÃO PRINCIPAL
  // ================================

  return (
    <Routes>
      {renderRoutes()}
      {renderFallbackRoute()}
    </Routes>
  )
}
