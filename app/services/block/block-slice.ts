import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Block {
  message: string;
  block: object;
}

interface CreateBlockBody {
  name: string;
  component: string;
  blueprint: string;
  image: string | undefined;
  site: string;
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

    createBlock: builder.mutation<Block, CreateBlockBody>({
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

    updateBlock: builder.mutation<Block, { id: string; body: CreateBlockBody }>(
      {
        query: ({ id, body }) => ({
          url: `/update/${id}`,
          method: "PUT",
          body,
        }),
        invalidatesTags: ["Block"],
      }
    ),
  }),
});

export const {
  useGetBlocksQuery,
  useCreateBlockMutation,
  useDeleteBlockMutation,
  useUpdateBlockMutation,
} = blockApi;
