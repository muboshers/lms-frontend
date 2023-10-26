import axios from 'axios';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseURL } from 'src/contants';

export const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user?.token) {
    req.headers.Authorization = `Bearer ${user?.token}`;
  }

  return req;
});

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
  tagTypes: ['CATEGORY', 'PRODUCT', 'COLORS', 'ORDERS'],
  endpoints: () => ({}),
});
