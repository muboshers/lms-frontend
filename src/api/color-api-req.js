import { ErrorHandle } from 'src/utils/response';

import { baseApi } from '.';
import { COLORS } from './url';

export const colorApiReq = baseApi.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getColors: query({
      query: (arg) => {
        let url = COLORS.LIST;
        if (arg?.id) url += `/${arg.id}`;
        return url;
      },
      transformErrorResponse: (error) => ErrorHandle(error?.message),
      providesTags: ['COLORS'],
    }),

    createColor: mutation({
      query: (arg) => ({
        url: COLORS.CREATE,
        method: 'POST',
        body: { ...arg },
      }),
      invalidatesTags: (_, error) => (error ? [] : ['COLORS']),
      transformErrorResponse: (error) => ErrorHandle(error?.message),
    }),

    updateColor: mutation({
      query: (arg) => ({
        url: `${COLORS.UPDATE}/${arg._id}`,
        method: 'PATCH',
        body: { ...arg },
      }),
      invalidatesTags: (_, error) => (error ? [] : ['COLORS']),
      transformErrorResponse: (error) => ErrorHandle(error?.message),
    }),

    deleteColors: mutation({
      query: (arg) => ({
        url: `${COLORS.DELETE}/${arg.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, error) => (error ? [] : ['COLORS']),
      transformErrorResponse: (error) => ErrorHandle(error?.message),
    }),
  }),
});

export const {
  useGetColorsQuery,
  useCreateColorMutation,
  useUpdateColorMutation,
  useDeleteColorsMutation,
} = colorApiReq;
