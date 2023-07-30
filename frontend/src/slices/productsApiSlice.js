import { PRODUCT_URL } from "../constant";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: PRODUCT_URL,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Product"],
    }),
    getOneProduct: builder.query({
      query: ({ id }) => ({
        url: `${PRODUCT_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Product"],
    }),
  }),
});

export const { useGetProductsQuery, useGetOneProductQuery } = productsApiSlice;
