import React from 'react'
import logoOptimized from '@assets/logo.webp'

// ================================
// INTERFACES E TIPOS
// ================================

interface LogoProps {
  src?: string
  alt?: string
  invertOnDark?: boolean
  className?: string
}

// ================================
// COMPONENTE PRINCIPAL
// ================================

/**
 * Componente de logo com inversão opcional para modo escuro
 * Exibe logo otimizado com dimensionamento responsivo
 */
export const Logo: React.FC<LogoProps> = ({
  src,
  alt = 'Logo Escuro',
  invertOnDark = true,
  className = ''
}) => {
  // ================================
  // VALORES COMPUTADOS
  // ================================

  const logoSrc = src || logoOptimized

  const imageClasses = [
    'h-14 sm:h-16 w-auto object-contain transition-all duration-300',
    invertOnDark ? 'invert dark:filter-none' : ''
  ]
    .filter(Boolean)
    .join(' ')

  const containerClasses = ['flex items-center', className]
    .filter(Boolean)
    .join(' ')

  // ================================
  // RENDERIZAÇÃO
  // ================================

  return (
    <div className={containerClasses}>
      <img
        src={logoSrc}
        alt={alt}
        className={imageClasses}
        decoding="async"
        fetchPriority="high"
      />
    </div>
  )
}
