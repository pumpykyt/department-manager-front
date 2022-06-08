import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const reportApi = createApi({
  reducerPath: 'reportApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
  }),
  tagTypes: ['Report'],
  endpoints: (builder) => ({
    postReport: builder.mutation({
        query: (model) => ({
            url: '/report',
            method: 'POST',
            body: model
        }),
        invalidatesTags: ['Report'],
    }),
    getReports: builder.query({
        query: (id) => `/report/${id}`,
        providesTags: ['Report']
    }),
    getApartmentReportsByUserId: builder.query({
        query: (userId) => `/report/user/${userId}`
    })
  })
});

export const {
    usePostReportMutation,
    useGetReportsQuery,
    useGetApartmentReportsByUserIdQuery
} = reportApi;