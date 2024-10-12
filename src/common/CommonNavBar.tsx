import { NavLink, Navbar } from '@mantine/core'
import MainLinks from './MainLinks'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { LocalDataClass } from '../data-class/LocalDataClass'
import { useCustomPostMutation } from '@query/useCustomMutation'
import { API_URLS } from '@constants/API_URLS'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import { NotificationContext } from '@contexts/NotificationContext'
import { LuLogOut } from 'react-icons/lu'

export function CommonNavBar() {
  const { addMessage } = useContext(NotificationContext)!
  const navigate: NavigateFunction = useNavigate()
  const { logout } = useContext(AuthContext)!
  const user = LocalDataClass.user
  const widthStyles = {
    lg: 200,
    sm: 200,
    xl: 200,
    md: 200,
    xs: 200,
  }

  const triggerLogout = useCustomPostMutation<string>(API_URLS.ACCOUNT_LOGOUT, {
    onSuccess(result) {
      if (result.data.status === 'OK') {
        logout()
        navigate('/logout', {
          replace: true,
          state: {},
        })
        addMessage('Successful', result.data.message)
      }
    },
  })
  const handleLogout = () => {
    triggerLogout.mutateAsync(user.profileToken)
  }

  const displayLogout = () => {
    if (user.profileToken) {
      return (
        <Navbar.Section>
          <NavLink
            label='Log out'
            fw={700}
            style={{ color: 'red' }}
            component='a'
            onClick={handleLogout}
            icon={<LuLogOut />}
          ></NavLink>
        </Navbar.Section>
      )
    }
    return undefined
  }

  return (
    <Navbar width={widthStyles} p='xs'>
      <Navbar.Section grow mt='md'>
        <MainLinks />
      </Navbar.Section>
      {displayLogout()}
    </Navbar>
  )
}
