import React from 'react'
import { AppRouter, appRoutes } from '@core/router'

import { useAnalytics } from '@/features/ga'
import { ThemeProvider } from '@/shared/contexts'
import { MainLayout } from '@/shared/components/layouts'

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
