import {
  DefaultError,
  queryOptions,
  UseMutationOptions,
} from '@tanstack/react-query';
import { createDraftUserListItem, UserInfo, UserListItem, UserRole } from '../../common/api';
import { queryClient } from './api';
import { createRequest } from './request';

export const request = createRequest();

export const mutationOptions = <
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TContext = unknown,
>(
  options: UseMutationOptions<TData, TError, TVariables, TContext>,
): UseMutationOptions<TData, TError, TVariables, TContext> => {
  return options;
};

export const getUserListApi = () =>
  queryOptions({
    queryKey: ['getUserListApi'],
    queryFn: () =>
      request<UserListItem[]>({
        method: 'get',
        endpoint: '/api/user/list',
      }),
  });

export const removeUserApi = (userId: number) =>
  mutationOptions({
    mutationKey: ['removeUserApi'],
    mutationFn: () =>
      request({
        method: 'delete',
        endpoint: `/api/user/${userId}`,
      }),
    onSuccess: () => {
      queryClient.setQueryData(getUserListApi().queryKey, (list) => {
        if (!list) return list;
        return list.filter((x) => x.id !== userId);
      });
    },
  });

export const addUserApi = () =>
  mutationOptions({
    mutationFn: () =>
      request<UserInfo>({
        method: 'post',
        endpoint: '/api/user',
      }),
    onSuccess: () => {
      queryClient.setQueryData(getUserListApi().queryKey, (list) => {
        if (!list) return list;
        return [...list, createDraftUserListItem()];
      });
      queryClient.invalidateQueries({ queryKey: getUserListApi().queryKey });
    },
  });

export const getUserApi = (userId: number) =>
  queryOptions({
    queryKey: ['getUserApi', userId],
    queryFn: async () => {
      const [info, roles] = await Promise.all([
        request<UserInfo>({
          method: 'get',
          endpoint: `/api/user/${userId}`,
        }),
        request<UserRole[]>({
          method: 'get',
          endpoint: `/api/user/${userId}/roles`,
        }),
      ]);
      return { info, roles };
    },
  });
