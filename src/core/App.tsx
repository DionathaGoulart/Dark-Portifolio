import React from 'react'
import { useAnalytics } from '@/features/ga'
import { AppRouter, appRoutes } from './router'
import { MainLayout, ThemeProvider } from '@/shared'

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
