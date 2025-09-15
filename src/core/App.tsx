import React from 'react'
import { AppRouter, appRoutes } from '@core/router'
import { MainLayout, ThemeProvider } from '@shared'

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <MainLayout>
        <AppRouter routes={appRoutes} />
      </MainLayout>
    </ThemeProvider>
  )
}

export default App
