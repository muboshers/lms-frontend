import { ErrorHandle } from 'src/utils/response';

import { baseApi } from '.';
import { PRODUCT } from './url';

export const ProductApiReq = baseApi.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getProduct: query({
      query: (arg) => {
        let url = `${PRODUCT.LIST}?page=${arg?.page}`;
        if (arg.query) url += arg.query;
        return url;
      },
      transformErrorResponse: (error) => ErrorHandle(error?.message),
      providesTags: ['PRODUCT'],
    }),

    createProduct: mutation({
      query: (formData) => ({
        url: PRODUCT.CREATE,
        method: 'POST',
        formData: true,
        body: formData,
      }),
      invalidatesTags: (_, error) => (error ? [] : ['PRODUCT']),
      transformErrorResponse: (error) => ErrorHandle(error?.message),
    }),

    updateProduct: mutation({
      query: (arg) => ({
        url: `${PRODUCT.CREATE}/${arg._id}`,
        method: 'PUT',
        body: { ...arg },
      }),
      invalidatesTags: (_, error) => (error ? [] : ['PRODUCT']),
      transformErrorResponse: (error) => ErrorHandle(error?.message),
    }),

    deleteProduct: mutation({
      query: (arg) => ({
        url: `${PRODUCT.DELETE}/${arg.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, error) => (error ? [] : ['PRODUCT']),
      transformErrorResponse: (error) => ErrorHandle(error?.message),
    }),
  }),
});

export const {
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = ProductApiReq;
