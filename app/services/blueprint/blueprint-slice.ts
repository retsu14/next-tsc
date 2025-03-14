import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Blueprint {
  _id: string;
  user: string;
  title: string;
  data: Record<string, any>;
  flag: boolean;
  createdAt?: string;
  updatedAt?: string;
  message: string;
  __v: number;
}

interface CreateBlueprintBody {
  title: string;
  data: object;
}

export const blueprintApi = createApi({
  reducerPath: "blueprintApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL + "/blueprints",
    credentials: "include",
  }),
  tagTypes: ["Blueprint"],
  endpoints: (builder) => ({
    getBlueprints: builder.query<Blueprint[], void>({
      query: () => "/",
      providesTags: ["Blueprint"],
    }),

    createBlueprint: builder.mutation<Blueprint, CreateBlueprintBody>({
      query: (body) => ({
        url: "/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Blueprint"],
    }),

    deleteBlueprint: builder.mutation<void, string>({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Blueprint"],
    }),

    updateBlueprint: builder.mutation<
      Blueprint,
      { id: string; body: CreateBlueprintBody }
    >({
      query: ({ id, body }) => ({
        url: `/update/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Blueprint"],
    }),
  }),
});

export const {
  useGetBlueprintsQuery,
  useCreateBlueprintMutation,
  useDeleteBlueprintMutation,
  useUpdateBlueprintMutation,
} = blueprintApi;
