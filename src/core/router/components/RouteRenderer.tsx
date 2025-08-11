// src/core/components/RouteRenderer.tsx
import React from 'react'
import { AuthGuard } from '../guards/AuthGuard'
import { RouteConfig } from '../types'
import { useGoogleAnalytics } from '@/features/trafego/hooks/useGoogleAnalytics'

interface RouteRendererProps {
  route: RouteConfig
}

export const RouteRenderer: React.FC<RouteRendererProps> = ({ route }) => {
  const { element: Element, layout: Layout, meta } = route

  // Rastrear mudanças de rota
  useGoogleAnalytics()

  // Atualizar título da página
  React.useEffect(() => {
    if (meta?.title) {
      document.title = meta.title
    }
  }, [meta?.title])

  const content = (
    <AuthGuard requiresAuth={meta?.requiresAuth} roles={meta?.roles}>
      <Element />
    </AuthGuard>
  )

  if (Layout) {
    return <Layout>{content}</Layout>
  }

  return content
}
