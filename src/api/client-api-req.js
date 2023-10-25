import { ErrorHandle } from 'src/utils/response';

import { baseApi } from '.';
import { CLIENT } from './url';

export const CATEGORYApiReq = baseApi.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getClientList: query({
      query: (arg) => `${CLIENT.LIST}?page=${arg.page + 1}`,
      transformErrorResponse: (error) => ErrorHandle(error?.message),
    }),
  }),
});

export const { useGetClientListQuery } = CATEGORYApiReq;
