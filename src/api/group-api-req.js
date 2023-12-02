import { ErrorHandle } from 'src/utils/response';

import { baseApi } from '.';
import { GROUP } from './url';

export const groupApiReq = baseApi.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getGroupList: query({
      query: (arg) => {
        let url = `${GROUP.GET_LIST}?page=${arg.page}`;

        if (arg.search) url += `&search=${arg.search}`;

        return url;
      },
      transformErrorResponse: (error) => ErrorHandle(error),
      providesTags: ['GROUP'],
    }),

    getGroupById: query({
      query: (arg) => `${GROUP.GET_BY_ID}/${arg.id}`,
      transformErrorResponse: (error) => ErrorHandle(error),
      providesTags: ['GROUP_BY_ID'],
    }),
    createGroup: mutation({
      query: (arg) => ({
        url: GROUP.CREATE,
        method: 'POST',
        body: arg.body,
      }),
      transformErrorResponse: (error) => ErrorHandle(error),
      invalidatesTags: (success, error) => (error ? [] : ['GROUP']),
    }),

    deleteGroup: mutation({
      query: (arg) => ({
        url: `${GROUP.DELETE}/${arg.id}`,
        method: 'DELETE',
      }),
      transformErrorResponse: (error) => ErrorHandle(error),
      invalidatesTags: (success, error) => (error ? [] : ['GROUP']),
    }),
  }),
});

export const {
  useGetGroupListQuery,
  useCreateGroupMutation,
  useDeleteGroupMutation,
  useGetGroupByIdQuery,
} = groupApiReq;
