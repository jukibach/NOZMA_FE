import axios, { AxiosHeaders, AxiosResponse } from 'axios'
import { REACT_APP_BE_BASE_URL } from '@constants/constant'
import { LocalDataClass } from '@data-class/LocalDataClass'
import { API_URLS } from '@constants/API_URLS'
import { routers } from 'routes'

let timer: any = undefined
let sessionTimer: any = undefined

export const resetTimer = () => {
  clearTimeout(timer)
  clearTimeout(sessionTimer)
}

const events = ['load', 'mousemove', 'mousedown', 'click', 'scroll', 'keypress']

function resetWhenUserIsActive() {
  resetTimer()
  timer = setTimeout(() => {
    // clears any pending timer.
    // Listener clean up. Removes the existing event listener from the window
    Object.values(events).forEach((item) => {
      window.removeEventListener(item, resetTimer)
    })
    // logs out user

    LocalDataClass.user.authStatus === 'SUCCESS' && timeoutEventHandler()
  }, 60 * 60 * 1000) // 10000ms = 10secs. You can change the time.
}

export const timeoutEventHandler = () => {
  const user = LocalDataClass.user
  const profileToken = user.profileToken
  axios
    .post(REACT_APP_BE_BASE_URL + API_URLS.ACCOUNT_LOGOUT, profileToken, {
      headers: { 'Content-Type': 'text/plain' },
    })
    .then(() => {
      LocalDataClass.user = {
        ...user,
        profileToken: '',
        refreshToken: '',
        authStatus: 'SESSION_TIMEOUT',
      }
      routers.navigate('/session-timeout')
    })
}

export const addEvents = () => {
  sessionTimer = setTimeout(timeoutEventHandler, 60 * 60 * 1000)

  timer = Object.values(events).forEach((item) => {
    window.addEventListener(item, () => {
      resetTimer()
      resetWhenUserIsActive()
    })
  })
}
