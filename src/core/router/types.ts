// ================================
// Importações Externas
// ================================
import React from 'react'

// ================================
// Interface de Configuração de Rota
// ================================

/**
 * Interface de configuração para rotas da aplicação
 * @interface RouteConfig
 */
export interface RouteConfig {
  /** O caminho da URL para a rota */
  path: string

  /** Componente React a ser renderizado para esta rota */
  element: React.ComponentType

  /** Título opcional para a rota (ex: para título da página ou navegação) */
  title?: string
}
