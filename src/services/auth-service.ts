import axios from 'axios'
import { API_URLS } from '../constants/API_URLS'
import { REACT_APP_BE_BASE_URL } from '../constants/constant'
import { RegisterRequest, RegisterResponse } from '../interfaces/RegisterType'
import { LocalAccount, LocalDataClass } from '../data-class/LocalDataClass'
import { AppAxios } from '../utils/axios'
import { LoginRequest, LoginResponse } from '../interfaces/Authentication'
import { ApiResponse } from '../interfaces/ExerciseTableResponse'

export const logout = async () => {
  const profileToken = LocalDataClass.user.profileToken
  if (!profileToken) throw new TypeError('Error message')
  const response = await AppAxios().post(API_URLS.ACCOUNT_LOGOUT, {
    profileToken,
  })
  return response.data as ApiResponse<null>
}

export const register = async ({ ...request }: RegisterRequest) => {
  const { ...values } = request

  const response = await axios.post(
    REACT_APP_BE_BASE_URL + API_URLS.ACCOUNT_USER_REGISTER,
    {
      ...values,
    }
  )
  if (response.data.result.profileToken) {
    LocalDataClass.user = {
      ...(response.data.result as LocalAccount),
      authStatus: 'FIRST_GENERATED_PASSWORD',
    }
  }
  return response.data as ApiResponse<RegisterResponse>
}
