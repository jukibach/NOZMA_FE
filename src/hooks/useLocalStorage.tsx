import { LocalDataClass } from '@data-class/LocalDataClass'
import { LocalStorageName } from '@data-class/LocalStorageClass'
import { useEffect, useState } from 'react'

export const useLocalStorage = <T = any,>(
  localStorageName: LocalStorageName
) => {
  const [state, setState] = useState(() => {
    if (localStorageName === 'LANG') {
      return LocalDataClass.language as T
    } else {
      const user = LocalDataClass.user
      return { ...user, isMaintained: false } as T
    }
  })

  useEffect(() => {
    window.addEventListener(
      'onChange' +
        localStorageName.charAt(0).toUpperCase() +
        localStorageName.slice(1),
      (e: any) => {
        setState(e.detail.value as T)
      }
    )
  }, [])

  return state
}
