import { LocalStorageClass } from './LocalStorageClass'

export type AuthenticationStatus =
  | 'LOGIN'
  | 'SUCCESS'
  | 'MUST_CHANGE_PASSWORD'
  | 'SHOULD_CHANGE_PASSWORD'
  | 'FIRST_GENERATED_PASSWORD'
  | 'SESSION_TIMEOUT'
  | 'LOGOUT'

export interface LocalAccount {
  accountId: number
  accountName: string
  email: string
  profileToken: string
  refreshToken: string
  role: string
  authStatus: AuthenticationStatus
}

export const DefaultLocalAccount: LocalAccount = {
  accountId: 0,
  accountName: '',
  email: '',
  profileToken: '',
  refreshToken: '',
  role: 'ROLE_USER',
  authStatus: 'LOGIN',
}

export type Language = 'en' | 'fr'
export class LocalDataClass {
  static LocalDataClass: {}
  static get user() {
    return LocalStorageClass.getStorage(
      'LOCAL_USER',
      DefaultLocalAccount
    ) as LocalAccount
  }

  static set user(value: LocalAccount) {
    LocalStorageClass.setStorage('LOCAL_USER', value)
  }

  static removeUser() {
    LocalStorageClass.removeStorage('LOCAL_USER')
  }

  static get language() {
    return LocalStorageClass.getStorage('LANG', 'en') as Language
  }

  static set language(value: Language) {
    LocalStorageClass.setStorage('LANG', value)
  }
}
