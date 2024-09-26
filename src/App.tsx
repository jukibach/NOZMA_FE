import { useState } from 'react'
import './App.css'
import { Notifications } from '@mantine/notifications'
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from '@contexts/AuthContext'
import { NotificationProvider } from '@contexts/NotificationContext'
import { RouterProvider } from 'react-router-dom'
import { routers } from 'routes'
function App() {
  const queryClient = new QueryClient()
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light')
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))

  return (
    <NotificationProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <ColorSchemeProvider
            colorScheme={colorScheme}
            toggleColorScheme={toggleColorScheme}
          >
            <MantineProvider withGlobalStyles withNormalizeCSS>
              <Notifications position='top-right' />
              <RouterProvider router={routers} />
            </MantineProvider>
          </ColorSchemeProvider>
        </QueryClientProvider>
      </AuthProvider>
    </NotificationProvider>
  )
}

export default App
