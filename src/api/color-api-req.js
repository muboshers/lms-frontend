import { ErrorHandle } from 'src/utils/response';

import { baseApi } from '.';
import { COLORS } from './url';

export const colorApiReq = baseApi.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getColors: query({
      query: (arg) => {
        let url = COLORS.LIST;
        if (arg.id) url += `/${arg.id}`;
        return url;
      },
      transformErrorResponse: (error) => ErrorHandle(error?.message),
      providesTags: ['COLORS'],
    }),

    // createCategory: mutation({
    //   query: (arg) => ({
    //     url: color.CREATE,
    //     method: 'POST',
    //     body: { ...arg },
    //   }),
    //   invalidatesTags: (_, error) => (error ? [] : ['CATEGORY']),
    //   transformErrorResponse: (error) => ErrorHandle(error?.message),
    // }),

    // updateCategory: mutation({
    //   query: (arg) => ({
    //     url: `${CATEGORY.CREATE}/${arg._id}`,
    //     method: 'PUT',
    //     body: { ...arg },
    //   }),
    //   invalidatesTags: (_, error) => (error ? [] : ['CATEGORY']),
    //   transformErrorResponse: (error) => ErrorHandle(error?.message),
    // }),

    // deleteCategory: mutation({
    //   query: (arg) => ({
    //     url: `${CATEGORY.DELETE}/${arg.id}`,
    //     method: 'DELETE',
    //   }),
    //   invalidatesTags: (_, error) => (error ? [] : ['CATEGORY']),
    //   transformErrorResponse: (error) => ErrorHandle(error?.message),
    // }),
  }),
});

export const { useGetColorsQuery } = colorApiReq;
