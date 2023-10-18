import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseURL } from 'src/contants';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers) => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user?.token) {
        headers.set('Authorization', `Bearer ${user?.token}`);
      }

      return headers;
    },
  }),
  tagTypes: ['CATEGORY', 'PRODUCT'],
  endpoints: () => ({}),
});
