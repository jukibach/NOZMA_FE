import axios, { AxiosHeaders, AxiosResponse } from 'axios'
import { REACT_APP_BE_BASE_URL } from '@constants/constant'
import { LocalDataClass } from '@data-class/LocalDataClass'
import { useCustomPostMutation } from '@query/useCustomMutation'
import {
  ReissueTokenPayload,
  ReissueTokenResponse,
} from '@interfaces/Authentication'
import { API_URLS } from '@constants/API_URLS'

const timeoutEventHandler = () => {
  const user = LocalDataClass.user
  user.authStatus = 'SESSION_TIMEOUT'
  LocalDataClass.user = user
}
let sessionTimer: any = undefined

export const AppAxios = () => {
  const axiosInstance = axios.create()

  axiosInstance.defaults.baseURL = REACT_APP_BE_BASE_URL

  const ignoredURLs = ['login', 'register', 'guest']
  // const getRefreshToken = useCustomPostMutation<
  //   ReissueTokenPayload,
  //   ReissueTokenResponse
  // >(API_URLS.REISSUE_TOKEN)
  const runInterceptor = () => {
    axiosInstance.interceptors.request.use(
      async (config) => {
        const user = LocalDataClass.user
        config.headers.Accept = '*/*'
        if (ignoredURLs.some((url) => config.url?.includes(url)))
          delete config.headers.Authorization
        else
          (config.headers as AxiosHeaders).set(
            'Authorization',
            `Bearer ${user.profileToken}`
          )
        return config
      },
      (error) => Promise.reject(error)
    )

    axiosInstance.interceptors.response.use(
      async (response: AxiosResponse<ResponseType>) => {
        clearTimeout(sessionTimer)
        const localUser = LocalDataClass.user
        if (localUser.authStatus !== 'LOGIN')
          sessionTimer = setTimeout(timeoutEventHandler, 360000)
        LocalDataClass.user = localUser
        return response
      }
      // ,
      // async (error) => {
      //   const originalRequest = error.config
      //   if (error.response.data.code === 'E107' && !originalRequest._retry) {
      //     originalRequest._retry = true
      //     try {
      //       const response = await getRefreshToken.mutateAsync({
      //         refreshToken: LocalDataClass.user.refreshToken,
      //         accountId: LocalDataClass.user.accountId,
      //       })
      //       const { profileToken, refreshToken } = response.data.result
      //       originalRequest.headers.Authorization = `Bearer ${profileToken}`
      //       LocalDataClass.user = {
      //         ...LocalDataClass.user,
      //         profileToken,
      //         refreshToken,
      //       }
      //       return axios(originalRequest)
      //     } catch (error) {
      //       // Handle refresh token error or redirect to login
      //     }
      //   }
      // }
    )
  }

  runInterceptor()
  return axiosInstance
}
