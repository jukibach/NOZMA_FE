import { useEffect, useState } from 'react'
import './App.css'
import ILoginResponse from './types/LoginResponse'
import * as AuthService from './services/auth-service'
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core'
import AllRoutes from './routes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

function App() {
  const [currentUser, setCurrentUser] = useState<ILoginResponse | undefined>(
    undefined
  )
  const queryClient = new QueryClient()
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light')
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))

  useEffect(() => {
    const user = AuthService.getCurrentUser()
    if (user) {
      setCurrentUser(user)
    }
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider withGlobalStyles withNormalizeCSS>
          <AllRoutes />
        </MantineProvider>
      </ColorSchemeProvider>
    </QueryClientProvider>
  )
}

export default App
