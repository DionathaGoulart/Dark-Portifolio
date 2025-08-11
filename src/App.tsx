import React from 'react'
import { AppRouter } from '@core'
import { appRoutes } from '@routes'
import { ThemeProvider } from '@shared'

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppRouter routes={appRoutes} fallbackRoute="/" />
    </ThemeProvider>
  )
}

export default App
