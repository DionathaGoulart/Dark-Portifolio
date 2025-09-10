import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useGoogleAnalytics } from '@/features/trafego/hooks/useGoogleAnalytics'
import { RouteConfig } from '../types'
import { AuthGuard } from '../guards/AuthGuard'

interface Props {
  route: RouteConfig
}

export const RouteRenderer: React.FC<Props> = ({ route }) => {
  const { element: Element, layout: Layout, title, requiresAuth, roles } = route
  const location = useLocation()

  useGoogleAnalytics()

  // Scroll to top sempre que a rota mudar
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  // Set document title
  useEffect(() => {
    if (title) document.title = title
  }, [title])

  const content = (
    <AuthGuard requiresAuth={requiresAuth} roles={roles}>
      <Element />
    </AuthGuard>
  )

  return Layout ? <Layout>{content}</Layout> : content
}
