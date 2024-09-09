import { createContext, ReactNode } from 'react'
import { LocalAccount, LocalDataClass } from '../data-class/LocalDataClass'

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
  const user = LocalDataClass.user

  const logout = () => {
    try {
      LocalDataClass.user = {
        ...user,
        profileToken: '',
        refreshToken: '',
        authStatus: 'LOGOUT',
      }
      return
    } catch (err: any) {
      console.log(err)
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
