import axios from 'axios'
import { API_URLS } from '../constants/API_URLS'
import { REACT_APP_BE_BASE_URL } from '../constants/constant'
import authHeader from './auth-header'
import ILoginResponse from '../types/LoginResponse'
import { RegisterRequest } from '../types/RegisterType'

export const login = async (accountName: string, password: string) => {
  const response = await axios.post(
    REACT_APP_BE_BASE_URL + API_URLS.ACCOUNT_LOGIN,
    {
      accountName,
      password,
    }
  )
  if (response.data.result.profileToken) {
    localStorage.setItem('user', JSON.stringify(response.data.result))
  }
  return response.data
}

export const logout = async (profileToken: string | null) => {
  if (!profileToken) throw new TypeError('Error message')
  const response = await axios.post(
    REACT_APP_BE_BASE_URL + API_URLS.ACCOUNT_LOGOUT,
    {
      profileToken,
    },
    {
      headers: authHeader(),
    }
  )
  if (response.data.code === 'OK') {
    localStorage.removeItem('user')
    window.location.reload()
  }
  return response.data
}

export const register = async (request: RegisterRequest) => {
  const response = await axios.post(
    REACT_APP_BE_BASE_URL + API_URLS.ACCOUNT_USER_REGISTER,
    {
      request,
    }
  )
  if (response.data.result.profileToken) {
    localStorage.setItem('user', JSON.stringify(response.data.result))
    window.location.reload()
  }
  return response.data
}

export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user')
  if (userStr) return JSON.parse(userStr) as ILoginResponse

  return null
}
