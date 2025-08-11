import React from 'react'
import { Navigate } from 'react-router-dom'
import { AuthGuardProps } from '../types'

// Mock auth - substitua pela sua lógica de autenticação
const useAuth = () => {
  return {
    isAuthenticated: true, // Sua lógica aqui
    user: { roles: ['user'] } // Sua lógica aqui
  }
}

export const AuthGuard: React.FC<AuthGuardProps> = ({
  children,
  requiresAuth = false,
  roles = []
}) => {
  const { isAuthenticated, user } = useAuth()

  if (requiresAuth && !isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (roles.length > 0 && !roles.some((role) => user?.roles?.includes(role))) {
    return <Navigate to="/unauthorized" replace />
  }

  return <>{children}</>
}
