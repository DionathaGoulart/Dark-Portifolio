import React from 'react'
import { AppRouter, appRoutes } from '@core/router'
import { MainLayout, ThemeProvider } from '@shared'
import { useAnalytics } from '@/features/ga'

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
