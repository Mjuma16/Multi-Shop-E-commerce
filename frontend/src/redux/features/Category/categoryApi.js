import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/",
    credentials: "include", //use this statement when when u getting cors error again
  }),
  tagTypes: ["Category"], //type of tages can be of any name, where we want to validate cache.
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => `/categories`,
      providesTags: ["Category"], //ProvideTags means I want caching for this particular end-point /categories. we use provideTags only when we perform query.
    }),
    getCategoryById: builder.query({
      query: (id) => `/category/${id}`,
    }),
    addNewCategory: builder.mutation({
      query: (data) => ({
        url: `/new/category`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Category"], //we will use invalidatesTages only when we perform mutation and want to invalidate cache.
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAllCategoriesQuery,
  useGetCategoryByIdQuery,
  useAddNewCategoryMutation,
} = categoryApi;
