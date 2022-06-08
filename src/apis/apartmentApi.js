import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apartmentApi = createApi({
  reducerPath: 'apartmentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
  }),
  tagTypes: ['Apartment'],
  endpoints: (builder) => ({
    postApartment: builder.mutation({
        query: (model) => ({
            url: '/apartment',
            method: 'POST',
            body: model
        }),
        invalidatesTags: ['Apartment'],
    }),
    addUserToAppartment: builder.mutation({
        query: (model) => ({
            url: `/apartment`,
            method: 'PUT',
            body: model
        }),
        invalidatesTags: ['Apartment']
    }),
    getApartments: builder.query({
        query: (model) => '/apartment',
        providesTags: ['Apartment']
    }),
    getApartment: builder.query({
        query: (id) => `/apartment/${id}`,
    }),
    getApartmentByUserId: builder.query({
        query: (userId) => `/apartment/user/${userId}`,
    }),
    deleteUserFromApartment: builder.mutation({
        query: (userId) => ({
            url: `/apartment/user/${userId}`,
            method: 'DELETE'
        }),
        invalidatesTags: ['Apartment'],
    }),
    deleteApartment: builder.mutation({
        query: (id) => ({
            url: `/apartment/delete/${id}`,
            method: 'DELETE'
        }),
        invalidatesTags: ['Apartment'],
    })
  })
});

export const {
    usePostApartmentMutation,
    useGetApartmentsQuery,
    useGetApartmentQuery,
    useDeleteApartmentMutation,
    useAddUserToAppartmentMutation,
    useGetApartmentByUserIdQuery,
    useDeleteUserFromApartmentMutation
} = apartmentApi;