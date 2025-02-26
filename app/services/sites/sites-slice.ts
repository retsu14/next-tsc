import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { create } from "domain";

interface Site {
  _id: string;
  name: string;
  domain: string;
  hook: string;
  createdAt?: string;
  updatedAt?: string;
  __v: number;
}

interface CreateSiteBody {
  name: string;
  domain: string;
  hook: string;
}

export const sitesApi = createApi({
  reducerPath: "sitesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL + "/sites",
    credentials: "include",
  }),
  tagTypes: ["Site"],
  endpoints: (builder) => ({
    getSites: builder.query<Site[], void>({
      query: () => "/",
      providesTags: ["Site"],
    }),
    createSite: builder.mutation<Site, CreateSiteBody>({
      query: (body) => ({
        url: "/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Site"],
    }),
    deleteSite: builder.mutation<void, string>({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Site"],
    }),
    updatedBySite: builder.mutation<Site, { id: string; body: CreateSiteBody }>(
      {
        query: ({ id, body }) => ({
          url: `/update/${id}`,
          method: "PUT",
          body,
        }),
        invalidatesTags: ["Site"],
      }
    ),
  }),
});

export const {
  useGetSitesQuery,
  useCreateSiteMutation,
  useDeleteSiteMutation,
  useUpdatedBySiteMutation,
} = sitesApi;
