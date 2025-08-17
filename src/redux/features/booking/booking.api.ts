import { baseApi } from "@/redux/baseApi";

const bookingApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createBooking: builder.mutation({
            query: (bookingData) => ({
                url: '/booking/',
                method: 'POST',
                data: bookingData
            })
        })
    })
})

export const {useCreateBookingMutation} = bookingApi