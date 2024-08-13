import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const productApi = createApi({
  reducerPath: "prodductApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/",
    credentials: "include", //use this statement when when u getting cors error again
  }),
  tagTypes: ["Products", "Product"],
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => `/products`,
      providesTags: ["Products"],
    }),
    getProductById: builder.query({
      query: (id) => `/product/${id}`,
      providesTags: "Products",
    }),
    addNewProduct: builder.mutation({
      query: (data) => ({
        url: `/new/product`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useAddNewProductMutation,
} = productApi;
