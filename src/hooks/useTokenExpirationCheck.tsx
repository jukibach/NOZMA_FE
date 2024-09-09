import { LocalDataClass } from '@data-class/LocalDataClass'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function useTokenExpirationCheck() {
  //   const navigate = useNavigate()
  //   useEffect(() => {
  //     const checkTokenExpiration = () => {
  //       const user = LocalDataClass.user // Get the token from localStorage
  //       if (user.authStatus === 'SESSION_TIMEOUT') {
  //         // If token is expired, remove it and redirect to logout
  //         localStorage.removeItem('token') // Clear the token
  //         navigate('/logout') // Navigate to logout page
  //       }
  //     }
  //     checkTokenExpiration() // Check on component mount
  //     const interval = setInterval(checkTokenExpiration, 60000) // Check every 1 minute
  //     return () => clearInterval(interval) // Clear interval on component unmount
  //   }, [navigate])
}
