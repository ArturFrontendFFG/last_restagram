import { api } from "../api/api";

const putPost = api.injectEndpoints({
  endpoints: (builder) => ({
    putPost: builder.mutation({
      query: (data) => ({
        url: `/publications/${data.id}`,
        method: "PUT",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: () => [{ type: "Posts" }, { type: "SinglePost" }],
    }),
  }),
});

export const { usePutPostMutation } = putPost;
