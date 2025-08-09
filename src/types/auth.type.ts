
export interface ISendOtp{
    email: string
}

export interface IVerifyOtp{
    otp: string,
    email: string
}

export interface ILogin{
    email: string,
    password: string
}

export interface IRegistration{
    name: string,
    email: string,
    password: string
}