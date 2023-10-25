import { ErrorHandle } from 'src/utils/response';

import { baseApi } from '.';
import { NOTIFICATION } from './url';

export const NotificationApiReq = baseApi.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getNotificationList: query({
      query: (arg) => `${NOTIFICATION.LIST}`,
      transformErrorResponse: (error) => ErrorHandle(error?.message),
    }),

    updateNotificationToRead: mutation({
      query: (arg) => ({
        url: `${NOTIFICATION.UPDATE_TO_READ}/${arg.id}`,
        method: 'PATCH',
      }),
    }),
  }),
});

export const { useGetNotificationListQuery, useUpdateNotificationToReadMutation } =
  NotificationApiReq;
