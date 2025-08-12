import { baseApi } from "@/redux/baseApi";

export const tourApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addTourType: builder.mutation({
            query: (tourTypeName) => ({
                url: '/tour/tour-type',
                method: 'POST',
                data: tourTypeName
            })
        }),
        getTourTypes: builder.query({
            query: () => ({
                url: '/tour/tour-types',
                method: 'GET'
            }),
            transformResponse: (res) => res.data
        })
    })
})

export const {useGetTourTypesQuery} = tourApi