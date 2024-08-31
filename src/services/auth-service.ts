import axios from 'axios'
import { API_URLS } from '../constants/API_URLS'
import { REACT_APP_BE_BASE_URL } from '../constants/constant'

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

export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user')
  if (userStr) return JSON.parse(userStr)

  return null
}
