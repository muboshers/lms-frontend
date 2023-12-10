import { ErrorHandle } from 'src/utils/response';

import { baseApi } from '.';
import { TEACHER } from './url';

export const teacherApiReq = baseApi.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getTeacherList: query({
      query: (arg) => {
        let url = `${TEACHER.GET_LIST}?page=${arg?.page}`;
        if (arg?.search) url += `&search=${arg.search}`;
        return url;
      },
      transformErrorResponse: (error) => ErrorHandle(error),
      providesTags: ['TEACHER'],
    }),
    createTeacher: mutation({
      query: (arg) => ({
        url: TEACHER.CREATE,
        method: 'POST',
        body: { ...arg },
      }),
      transformErrorResponse: (error) => ErrorHandle(error),
      invalidatesTags: (_, error) => (error ? [] : ['TEACHER']),
    }),
  }),
});

export const { useGetTeacherListQuery, useCreateTeacherMutation } = teacherApiReq;
