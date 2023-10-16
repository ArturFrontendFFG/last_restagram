import { api } from "../api/api";

export const apiUser = api.injectEndpoints({
  endpoints: (builder) => ({
    addUser: builder.mutation({
      query: (data) => ({
        url: "/users",
        method: "POST",
        body: data,
      }),
    }),
    authUser: builder.query({
      query: (email, password) => `/users?email=${email}&password=${password}`,
      providesTags: () => [{ type: "users" }],
    }),
    getAllUsers: builder.query({
      query:() => "/users",
      providesTags: () => [{type: 'users'}]
    })
  }),
});
export const { useAddUserMutation, useAuthUserQuery, useGetAllUsersQuery} = apiUser;
