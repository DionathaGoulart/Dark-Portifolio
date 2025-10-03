import React from 'react'

import { useAnalytics } from '@/features/analytics'
import { MainLayout, ThemeProvider } from '@/shared'
import { AppRouter, appRoutes } from './routing'

// ================================
// COMPONENTE PRINCIPAL
// ================================

/**
 * Componente raiz da aplicação
 * Configura provedores globais e roteamento principal
 */
const App: React.FC = () => {
  useAnalytics()

  return (
    <ThemeProvider>
      <MainLayout>
        <AppRouter routes={appRoutes} />
      </MainLayout>
    </ThemeProvider>
  )
}

export default App
