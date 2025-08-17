import { baseApi } from "@/redux/baseApi";
import type { ILogin, ILoginResponse, IRegistration, IRegistrationResponse, IResponse, ISendOtp } from "@/types";
import type { IVerifyOtp } from "@/types/auth.type";


export const authApi = baseApi.injectEndpoints({
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
            }),
            invalidatesTags: ['USER']
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            })
        }),
        userInfo: builder.query({
            query: () => ({
                url: '/user/me',
                method: 'GET',
            }),
            providesTags: ['USER']
        }),
        sendOtp: builder.mutation<IResponse<null>, ISendOtp>({
            query: (otpInfo) => ({
                url: '/otp/send',
                method: 'POST',
                data: otpInfo
            })
        }),
        verifyOtp: builder.mutation<IResponse<null>, IVerifyOtp>({
            query: (otpInfo) => ({
                url: '/otp/verify',
                method: 'POST',
                data: otpInfo
            })
        })
    })
})

export const { useRegisterMutation, useLoginMutation, useSendOtpMutation, useVerifyOtpMutation, useUserInfoQuery, useLogoutMutation} = authApi