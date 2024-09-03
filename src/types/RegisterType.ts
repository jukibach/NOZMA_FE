export interface RegisterRequest {
  accountName: string
  password: string
  confirmedPassword: string
  email: string
  firstName: string
  middleName: string
  lastName: string
  phoneNumber: string
  birthDate: string
}

export interface RegisterResponse {
  accountName: string
  email: string
  profileToken: string
  refreshToken: string
  roles: string
}

export interface AuthContextType {
  token: any
  loginAction: (accountName: string, password: string) => void
  logOut: () => void
}


