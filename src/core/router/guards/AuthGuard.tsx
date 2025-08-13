import React from 'react'
import { Navigate } from 'react-router-dom'

const useAuth = () => ({
  isAuthenticated: true,
  roles: ['user']
})

interface AuthGuardProps {
  children: React.ReactNode
  requiresAuth?: boolean
  roles?: string[]
}

export const AuthGuard: React.FC<AuthGuardProps> = ({
  children,
  requiresAuth,
  roles = []
}) => {
  const { isAuthenticated, roles: userRoles } = useAuth()

  if (requiresAuth && !isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (roles.length && !roles.some((role) => userRoles.includes(role))) {
    return <Navigate to="/unauthorized" replace />
  }

  return <>{children}</>
}
