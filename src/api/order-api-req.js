import { ErrorHandle } from 'src/utils/response';

import { baseApi } from '.';
import { ORDER } from './url';

export const OrderApiReq = baseApi.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getOrderList: query({
      query: (arg) => {
        let url = `${ORDER.LIST}?page=${arg.page + 1}`;
        if (arg.search !== '') url += `&search=${arg.search}`;
        return url;
      },
      transformErrorResponse: (error) => ErrorHandle(error?.message),
      providesTags: ['ORDER'],
    }),

    getOrderReportExcel: mutation({
      query: () => ({
        url: ORDER.REPORT_EXCEL,
        method: 'GET',
      }),
      transformErrorResponse: (error) => ErrorHandle(error?.message),
    }),

    updateOrderStatus: mutation({
      query: (arg) => ({
        url: `${ORDER.STATUS}${arg.id}`,
        method: 'PATCH',
        body: { ...arg },
      }),
      invalidatesTags: (_, error) => (error ? [] : ['ORDER']),
      transformErrorResponse: (error) => ErrorHandle(error?.message),
    }),

    // updateOrder: mutation({
    //   query: (arg) => ({
    //     url: `${OrderS.UPDATE}/${arg.id}`,
    //     method: 'PATCH',
    //     body: { ...arg },
    //   }),
    //   invalidatesTags: (_, error) => (error ? [] : ['OrderS']),
    //   transformErrorResponse: (error) => ErrorHandle(error?.message),
    // }),

    // deleteOrders: mutation({
    //   query: (arg) => ({
    //     url: `${OrderS.DELETE}/${arg.id}`,
    //     method: 'DELETE',
    //   }),
    //   invalidatesTags: (_, error) => (error ? [] : ['OrderS']),
    //   transformErrorResponse: (error) => ErrorHandle(error?.message),
    // }),
  }),
});

export const {
  useGetOrderListQuery,
  useUpdateOrderStatusMutation,
  useGetOrderReportExcelMutation,
} = OrderApiReq;
