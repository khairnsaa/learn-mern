import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL, PRODUCT_URL } from "../constant";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      headers.set("Access-Control-Allow-Origin", "*");
      return headers;
    },
  }),
  tagTypes: ["Product", "Order", "User"],
  endpoints: (builder) => ({}),
});
