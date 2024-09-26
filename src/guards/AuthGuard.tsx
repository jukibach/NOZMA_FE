import { AuthContext } from '@contexts/AuthContext'
import { LocalDataClass } from '@data-class/LocalDataClass'
import { useContext, useEffect } from 'react'
import {
  Navigate,
  Outlet,
  replace,
  useLocation,
  useNavigate,
} from 'react-router-dom'

export function AuthGuard() {
  // const user = LocalDataClass.user
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)!
  const { pathname, state } = useLocation()

  useEffect(() => {
    if (user?.isMaintained) {
      navigate('/maintenance', { replace: true })
      return
    }
    if (user?.authStatus === 'SUCCESS') {
      navigate('/', { replace: true, state })
    }
    if (user?.authStatus === 'LOGIN') navigate('/', { replace: true })
    if (user?.authStatus === 'LOGOUT') {
      navigate('/logout', { replace: true })
    }
    if (user?.authStatus === 'SESSION_TIMEOUT') {
      navigate('/session-timeout', { replace: true })
    }
  }, [user?.authStatus, pathname, user?.isMaintained])

  return <Outlet />
}
