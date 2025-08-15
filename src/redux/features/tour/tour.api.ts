import { baseApi } from "@/redux/baseApi";

export const tourApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addTourType: builder.mutation({
            query: (tourTypeName) => ({
                url: '/tour/create-tour-type',
                method: 'POST',
                data: tourTypeName
            }),
            invalidatesTags: ['TOUT_TYPES']
        }),
        getTourTypes: builder.query({
            query: () => ({
                url: '/tour/tour-types',
                method: 'GET'
            }),
            transformResponse: (res) => res.data,
            providesTags: ['TOUT_TYPES']
        }),
        deleteTourType: builder.mutation({
            query: (tourTypeId) => ({
                url: `/tour/tour-types/${tourTypeId}`,
                method: 'DELETE',
                data: tourTypeId
            }),
            invalidatesTags: ['TOUT_TYPES']
        }),

    })
})

export const { useGetTourTypesQuery, useAddTourTypeMutation, useDeleteTourTypeMutation } = tourApi