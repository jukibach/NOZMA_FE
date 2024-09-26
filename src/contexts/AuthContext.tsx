import { createContext, ReactNode } from 'react'
import { LocalAccount, LocalDataClass } from '../data-class/LocalDataClass'
import { useLocalStorage } from 'hooks/useLocalStorage'

// Define the shape of the Auth context
interface AuthContextType {
  user: LocalAccount
  logout: () => void
  backToLogin: () => void
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const user = useLocalStorage<LocalAccount>('LOCAL_USER')

  const logout = async () => {
    try {
      LocalDataClass.user = {
        ...user,
        profileToken: '',
        refreshToken: '',
        authStatus: 'LOGOUT',
      }
      return
    } catch (err: any) {
      console.error(err)
    }
  }

  const backToLogin = () => {
    LocalDataClass.user = {
      ...user,
      authStatus: 'LOGIN',
    }
  }
  return (
    <AuthContext.Provider value={{ user, logout, backToLogin }}>
      {children}
    </AuthContext.Provider>
  )
}
