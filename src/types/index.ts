export type {ISendOtp} from './auth.type'
export type {ILogin} from './auth.type'
export type {IRegistration} from './auth.type'

// OTP Response types
export interface IOtpResponse<T>{
  statusCode: number
  success: boolean
  message: string
  data: T
}


// Login Response types
export interface ILoginResponse {
  statusCode: number
  success: boolean
  message: string
  data: LoginResData
}

export interface LoginResData {
  accessToken: string
  refreshToken: string
  user: LoginResUser
}

export interface LoginResUser {
  _id: string
  name: string
  email: string
  role: string
  isDeleted: boolean
  isActive: string
  isVerified: boolean
  auths: Auth[]
  createdAt: string
  updatedAt: string
  phone: string
  address: string
}

export interface Auth {
  provider: string
  providerId: string
}


// Registration Response types
export interface IRegistrationResponse {
  statusCode: number
  success: boolean
  message: string
  data: RegistrationResData
}

export interface RegistrationResData {
  name: string
  email: string
  password: string
  role: string
  isDeleted: boolean
  isActive: string
  isVerified: boolean
  auths: Auth[]
  _id: string
  createdAt: string
  updatedAt: string
}

export interface Auth {
  provider: string
  providerId: string
}
