import { baseApi } from "@/redux/baseApi";
import type { ILogin, ILoginResponse, IOtpResponse, IRegistration, IRegistrationResponse, ISendOtp } from "@/types";
import type { IVerifyOtp } from "@/types/auth.type";


const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation<IRegistrationResponse, IRegistration>({
            query: (userInfo) => ({
                url: '/user/register',
                method: 'POST',
                data: userInfo
            })
        }),
        login: builder.mutation<ILoginResponse, ILogin>({
            query: (userInfo) => ({
                url: '/auth/login',
                method: 'POST',
                data: userInfo
            })
        }),
        sendOtp: builder.mutation<IOtpResponse<null>, ISendOtp>({
            query: (otpInfo) => ({
                url: '/otp/send',
                method: 'POST',
                data: otpInfo
            })
        }),
        verifyOtp: builder.mutation<IOtpResponse<null>, IVerifyOtp>({
            query: (otpInfo) => ({
                url: '/otp/verify',
                method: 'POST',
                data: otpInfo
            })
        })
    })
})

export const {useRegisterMutation, useLoginMutation, useSendOtpMutation, useVerifyOtpMutation} = authApi