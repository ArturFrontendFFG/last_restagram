import { api } from "../api/api";



export const postApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: (data) => ({
        url: "/publications",
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: data,
      }),
      invalidatesTags: () => [{ type: "Posts" }],
    }),
  }),
});

export const { useCreatePostMutation } = postApi;
