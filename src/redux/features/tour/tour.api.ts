import { baseApi } from "@/redux/baseApi";
import type { IResponse, ITourType } from "@/types";

export const tourApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addTour: builder.mutation({
            query: (tourData) => ({
                url: '/tour/create',
                method: 'POST',
                data: tourData
            }),
            invalidatesTags: ['TOUT_TYPES']
        }),
        addTourType: builder.mutation({
            query: (tourTypeName) => ({
                url: '/tour/create-tour-type',
                method: 'POST',
                data: tourTypeName
            }),
            invalidatesTags: ['TOUT_TYPES']
        }),
        getTours: builder.query<ITourType[], unknown>({
            query: (params) => ({
                url: '/tour',
                method: 'GET',
                params
            }),
            transformResponse: (res: IResponse<ITourType[]>) => res.data,
            providesTags: ['TOUR']
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

export const { useGetTourTypesQuery, useAddTourTypeMutation, useDeleteTourTypeMutation, useAddTourMutation, useGetToursQuery } = tourApi