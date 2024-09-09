export interface RegisterRequest {
  accountName: string
  password: string
  confirmedPassword: string
  email: string
  firstName: string
  middleName: string
  lastName: string
  phoneNumber: string
  birthdate: string
}

export interface RegisterResponse {
  accountName: string
  email: string
  profileToken: string
  refreshToken: string
  role: string
}
