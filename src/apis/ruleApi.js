import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ruleApi = createApi({
  reducerPath: 'ruleApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
  }),
  tagTypes: ['Rule'],
  endpoints: (builder) => ({
    postRule: builder.mutation({
        query: (model) => ({
            url: '/rule',
            method: 'POST',
            body: model
        }),
        invalidatesTags: ['Rule'],
    }),
    getRules: builder.query({
        query: (model) => '/rule',
        providesTags: ['Rule']
    }),
    getRule: builder.query({
        query: (id) => `/rule/${id}`,
    }),
    deleteRule: builder.mutation({
        query: (id) => ({
            url: `/rule/delete/${id}`,
            method: 'DELETE'
        }),
        invalidatesTags: ['Rule'],
    })
  })
});

export const {
    usePostRuleMutation,
    useGetRulesQuery,
    useGetRuleQuery,
    useDeleteRuleMutation
} = ruleApi;