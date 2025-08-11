import { useLocation } from 'react-router-dom'

// Hook personalizado para detectar rota ativa com React Router
export const useActiveRoute = () => {
  const location = useLocation()
  const currentPath = location.pathname

  const isActive = (href: string) => {
    // Rota home precisa ser exata
    if (href === '/') {
      return currentPath === '/'
    }

    // Outras rotas podem usar startsWith para sub-rotas
    return currentPath === href || currentPath.startsWith(href + '/')
  }

  return { currentPath, isActive }
}
