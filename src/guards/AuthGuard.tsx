import { AuthContext } from '@contexts/AuthContext'
import { LocalDataClass } from '@data-class/LocalDataClass'
import { useContext, useEffect } from 'react'
import { Navigate, Outlet, replace, useNavigate } from 'react-router-dom'

export function AuthGuard() {
  const user = LocalDataClass.user
  const navigate = useNavigate()
  const auth = useContext(AuthContext)
  debugger
  // useEffect(() => {
  if (user.authStatus === 'SUCCESS') return <Navigate to='/' replace={true} />
  if (user.authStatus === 'LOGIN') return <Navigate to='/' replace={true} />
  if (user.authStatus === 'SESSION_TIMEOUT') {
    LocalDataClass.user = {
      ...user,
      authStatus: 'LOGIN',
    }
    return <Navigate to='/login' replace={true} />
  }
  // }, [user.authStatus])

  return <Outlet />
}
