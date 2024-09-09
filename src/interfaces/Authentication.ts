export interface LoginResponse {
  accountId: number
  accountName: string
  email: string
  profileToken: string
  refreshToken: string
  role: string
}

export interface LoginRequest {
  accountName: string
  password: string
}

export interface ReissueTokenResponse {
  profileToken: string
  refreshToken: string
}

export interface ReissueTokenPayload {
  accountId: number
  refreshToken: string
}
