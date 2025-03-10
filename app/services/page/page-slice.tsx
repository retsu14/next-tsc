import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Page {
  name: string;
  url: string;
  visibility: string;
  sites: string;
  block: string;
}

export const pageApi = createApi({
  reducerPath: "pageApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL + "/pages",
    credentials: "include",
  }),
  tagTypes: ["Page"],
  endpoints: (builder) => ({
    getPage: builder.query<Page[], void>({
      query: () => "/",
      providesTags: ["Page"],
    }),

    createPage: builder.mutation<Page, FormData>({
      query: (body) => ({
        url: "/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Page"],
    }),

    deletePage: builder.mutation<void, string>({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Page"],
    }),

    updatePage: builder.mutation<
      Page,
      {
        id: string;
        body: FormData;
      }
    >({
      query: ({ id, body }) => ({
        url: `/update/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Page"],
    }),
  }),
});

export const {
  useGetPageQuery,
  useCreatePageMutation,
  useDeletePageMutation,
  useUpdatePageMutation,
} = pageApi;
