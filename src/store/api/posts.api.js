import { api } from "./api";

export const postsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    postDetails: builder.query({
      query: (postId) => ({
        url: `/publications/${postId}`,
        method: "GET",
      }),
      providesTags: () => [{ type: "SinglePost" }],
    }),
  }),
});
export const { usePostDetailsQuery } = postsApi;
