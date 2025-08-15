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
            query: () => ({
                url: '/division',
                method: 'GET',
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