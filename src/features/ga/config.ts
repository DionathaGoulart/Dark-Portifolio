import { validateAnalyticsEnv } from '@/shared/utils/envValidation'
import { AnalyticsConfig } from './types'

// ================================
// CONFIGURAÇÃO
// ================================

/**
 * Configuração do Google Analytics usando variáveis de ambiente
 * Garante que nenhuma informação sensível seja exposta no código
 */
export const ANALYTICS_CONFIG: AnalyticsConfig = {
  measurementId: import.meta.env.VITE_GA_MEASUREMENT_ID,
  enabled: import.meta.env.PROD && validateAnalyticsEnv()
}

// ================================
// FUNÇÕES AUXILIARES
// ================================

/**
 * Valida se as variáveis de ambiente necessárias estão definidas
 * @returns {boolean} True se o ambiente de analytics estiver configurado corretamente
 */
export const validateAnalyticsConfig = (): boolean => {
  return validateAnalyticsEnv()
}
