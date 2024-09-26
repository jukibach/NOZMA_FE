import axios, { AxiosHeaders, AxiosResponse } from 'axios'
import { REACT_APP_BE_BASE_URL } from '@constants/constant'
import { LocalDataClass } from '@data-class/LocalDataClass'
import { API_URLS } from '@constants/API_URLS'
import { routers } from 'routes'
import { addEvents, resetTimer, timeoutEventHandler } from './trackMovement'

// let timer: any = undefined
// let sessionTimer: any = undefined

// export const resetTimer = () => {
//   clearTimeout(timer)
//   clearTimeout(sessionTimer)
// }

// const events = ['load', 'mousemove', 'mousedown', 'click', 'scroll', 'keypress']

// function resetWhenUserIsActive() {
//   setTimeout(() => {
//     // clears any pending timer.
//     // Listener clean up. Removes the existing event listener from the window
//     Object.values(events).forEach((item) => {
//       console.log('XXXXXXXXXXXXXXX', item)

//       window.removeEventListener(item, resetTimer)
//     })
//     // logs out user
//     resetTimer()

//     LocalDataClass.user.authStatus === 'SUCCESS' && timeoutEventHandler()
//   }, 1000) // 10000ms = 10secs. You can change the time.
// }

// export const timeoutEventHandler = () => {
//   const user = LocalDataClass.user
//   const profileToken = user.profileToken
//   axios
//     .post(REACT_APP_BE_BASE_URL + API_URLS.ACCOUNT_LOGOUT, profileToken, {
//       headers: { 'Content-Type': 'text/plain' },
//     })
//     .then(() => {
//       LocalDataClass.user = {
//         ...user,
//         profileToken: '',
//         refreshToken: '',
//         authStatus: 'SESSION_TIMEOUT',
//       }
//       routers.navigate('/session-timeout')
//     })
// }

export const AppAxios = () => {
  const axiosInstance = axios.create()

  axiosInstance.defaults.baseURL = REACT_APP_BE_BASE_URL

  const ignoredURLs = ['login', 'register', 'guest', 'reissue-token', 'logout']
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
        resetTimer()
        const localUser = LocalDataClass.user
        if (
          localUser.authStatus === 'SUCCESS' &&
          !ignoredURLs.some((url) => response.config.url?.includes(url))
        ) {
          addEvents()
        }
        LocalDataClass.user = {
          ...LocalDataClass.user,
          isMaintained: false,
        }
        return response
      },
      async (error) => {
        try {
          debugger

          const data = await fetch(
            axiosInstance.defaults.baseURL + '/actuator/health'
          )
          if (!data?.ok) {
            debugger
            const user = LocalDataClass.user
            user.isMaintained = true
            LocalDataClass.user = user
            routers.navigate('/maintenance')
          }
        } catch (error) {
          debugger
          const user = LocalDataClass.user
          user.isMaintained = true
          LocalDataClass.user = user
          routers.navigate('/maintenance')
        }

        if (
          error?.response?.config.url === API_URLS.REISSUE_TOKEN &&
          error?.response?.data.code === 'E107'
        ) {
          timeoutEventHandler()
        }

        const originalRequest = error?.config
        if (error?.response?.data.code === 'E107' && !originalRequest._retry) {
          originalRequest._retry = true
          try {
            const response = await axiosInstance.post(API_URLS.REISSUE_TOKEN, {
              refreshToken: LocalDataClass.user.refreshToken,
              accountId: LocalDataClass.user.accountId,
            })

            const { profileToken, refreshToken } = response.data.result
            originalRequest.headers.Authorization = `Bearer ${profileToken}`
            LocalDataClass.user = {
              ...LocalDataClass.user,
              profileToken,
              refreshToken,
            }
            return axiosInstance.request(originalRequest)
          } catch (error: any) {
            // Handle refresh token error or redirect to login
          }
        } else {
          return Promise.reject(error)
        }
      }
    )
  }

  runInterceptor()
  window.addEventListener('load', () => {
    runInterceptor()
  })
  return axiosInstance
}
