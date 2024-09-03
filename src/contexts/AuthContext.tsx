import { useContext, createContext, ReactNode, useState } from 'react'
import { login, logout } from '../services/auth-service'
import { MantineTheme, useMantineTheme } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import ILoginResponse from '../types/LoginResponse'
import { ApiResponse } from '../types/ExerciseTableResponse'

// Define the shape of the Auth context
interface AuthContextType {
  token: any
  logOut: () => void
}

interface AuthProviderProps {
  children: ReactNode
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const theme = useMantineTheme()
  const [token, setToken] = useState('')

  const logOut = () => {
    
  }

  return (
    <AuthContext.Provider value={{ token, logOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}

// const PrivateRoute = () => {
//   const auth = useAuth()
//   if (!auth?.token) return <Navigate to='/login' />
//   return <Outlet />
// }

// export default PrivateRoute
