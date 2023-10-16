import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";

const DEFAULT_URL = "http://localhost:3000";

axios.defaults.baseURL = DEFAULT_URL;

export const api = createApi({
  reducerPath: "api",
  tagTypes: ["Posts"],
  baseQuery: fetchBaseQuery({
    baseUrl: DEFAULT_URL,
  }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/publications",
      providesTags: () => [{ type: "Posts" }],
    }),
  }),
});

export const { useGetPostsQuery } = api;
