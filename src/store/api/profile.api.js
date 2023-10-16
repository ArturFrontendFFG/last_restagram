import { api } from "./api";

export const profileUser = api.injectEndpoints({
    endpoints: builder => ({
        getUserProfile: builder.query({
            query: (userId) => ({
                url: `/users/${userId}`,
                method: 'GET',
                timeout: 8000
            }),
            // invalidatesTags: () => [{
            //     type: 'Posts', //можно обновить еще что нибудь
            // }]
        })
    })
})

export const {useGetUserProfileQuery} = profileUser