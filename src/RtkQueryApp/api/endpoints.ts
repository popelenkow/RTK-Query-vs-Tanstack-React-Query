import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UserInfo, UserListItem, UserRole } from '../../common/api';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery(),
  endpoints: (builder) => ({
    getUserList: builder.query<UserListItem[], void>({
      query: () => ({
        url: '/api/user/list',
        method: 'get',
      }),
    }),
    removeUser: builder.mutation<void, number>({
      query: (userId) => ({
        url: `/api/user/${userId}`,
        method: 'delete',
      }),
      onQueryStarted: async (userId, { dispatch, queryFulfilled }) => {
        await queryFulfilled;
        dispatch(
          api.util.updateQueryData('getUserList', undefined, (draft) => {
            draft.splice(
              draft.findIndex((user) => user.id === userId),
              1,
            );
          }),
        );
      },
    }),
    addUser: builder.mutation<void, void>({
      query: () => ({
        url: '/api/user',
        method: 'post',
      }),
    }),
    getUser: builder.query<{ info: UserInfo; roles: UserRole[] }, number>({
      async queryFn(userId, _queryApi, _extraOptions, fetchBQ) {
        const [info, roles] = await Promise.all([
          fetchBQ(`/api/user/${userId}`),
          fetchBQ(`/api/user/${userId}/roles`),
        ]);
        if (info.error) {
          return { error: info.error };
        }
        if (roles.error) {
          return { error: roles.error };
        }
        return {
          data: {
            // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
            info: info.data as UserInfo,
            // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
            roles: roles.data as UserRole[],
          },
        };
      },
    }),
  }),
});
