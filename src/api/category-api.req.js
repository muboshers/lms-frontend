import { ErrorHandle } from 'src/utils/response';

import { baseApi } from '.';
import { CATEGORY } from './url';

export const CATEGORYApiReq = baseApi.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getCategory: query({
      query: (arg) => {
        let url = CATEGORY.LIST;
        if (arg.id) url += `/get/${arg.id}`;
        return url;
      },
      transformErrorResponse: (error) => ErrorHandle(error?.message),
      providesTags: ['CATEGORY'],
    }),

    createCategory: mutation({
      query: (arg) => ({
        url: CATEGORY.CREATE,
        method: 'POST',
        body: { ...arg },
      }),
      invalidatesTags: (_, error) => (error ? [] : ['CATEGORY']),
      transformErrorResponse: (error) => ErrorHandle(error?.message),
    }),

    updateCategory: mutation({
      query: (arg) => ({
        url: `${CATEGORY.CREATE}/${arg._id}`,
        method: 'PUT',
        body: { ...arg },
      }),
      invalidatesTags: (_, error) => (error ? [] : ['CATEGORY']),
      transformErrorResponse: (error) => ErrorHandle(error?.message),
    }),

    deleteCategory: mutation({
      query: (arg) => ({
        url: `${CATEGORY.DELETE}/${arg.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, error) => (error ? [] : ['CATEGORY']),
      transformErrorResponse: (error) => ErrorHandle(error?.message),
    }),
  }),
});

export const {
  useGetCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = CATEGORYApiReq;
