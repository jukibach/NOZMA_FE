export type AuthenticationStatus =
  | 'LOGIN'
  | 'SUCCESS'
  | 'MUST_CHANGE_PASSWORD'
  | 'SHOULD_CHANGE_PASSWORD'
  | 'FIRST_GENERATED_PASSWORD'
  | 'SESSION_TIMEOUT'
  | 'LOGOUT'

export interface LocalAccount {
  accountName: string
  email: string
  profileToken: string
  refreshToken: string
  role: string
  authStatus: AuthenticationStatus
}
