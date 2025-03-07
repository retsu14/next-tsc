import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Block {
  message: string;
  block: object;
}

export const blockApi = createApi({
  reducerPath: "blockApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL + "/blocks",
    credentials: "include",
  }),
  tagTypes: ["Block"],
  endpoints: (builder) => ({
    getBlocks: builder.query<Block[], void>({
      query: () => "/",
      providesTags: ["Block"],
    }),

    createBlock: builder.mutation<Block, FormData>({
      query: (body) => ({
        url: "/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Block"],
    }),

    deleteBlock: builder.mutation<void, string>({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Block"],
    }),

    updateBlock: builder.mutation<Block, { id: string; body: FormData }>({
      query: ({ id, body }) => ({
        url: `/update/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Block"],
    }),
  }),
});

export const {
  useGetBlocksQuery,
  useCreateBlockMutation,
  useDeleteBlockMutation,
  useUpdateBlockMutation,
} = blockApi;
