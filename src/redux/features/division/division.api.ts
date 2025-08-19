import { baseApi } from "@/redux/baseApi";

const divisionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addDivision: builder.mutation({
            query: (divisionData) => ({
                url: '/division/create',
                method: 'POST',
                data: divisionData
            }),
            invalidatesTags: ['DIVISION']
        }),
        allDivisions: builder.query({
            query: (params) => ({
                url: '/division',
                method: 'GET',
                params
            }),
            providesTags: ['DIVISION']
        }),
        deleteDivision: builder.mutation({
            query: (divisionId) => ({
                url: `/division/${divisionId}`,
                method: 'DELETE',
                data: divisionId
            }),
            invalidatesTags: ['DIVISION']
        }),
    })
})

export const { useAddDivisionMutation, useAllDivisionsQuery, useDeleteDivisionMutation } = divisionApi