import { ErrorHandle } from 'src/utils/response';

import { baseApi } from '.';
import { TEACHING_CENTER } from './url';

export const teachingCenterApiReq = baseApi.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    updateProfile: mutation({
      query: (arg) => ({
        url: TEACHING_CENTER.UPDATE_PROFILE_INFO,
        method: 'PATCH',
        body: { ...arg },
      }),
      invalidatesTags: (_, error) => (error ? [] : ['TEACHING_CENTER_PROFILE']),
      transformErrorResponse: (error) => ErrorHandle(error),
    }),
  }),
});

export const { useUpdateProfileMutation } = teachingCenterApiReq;
