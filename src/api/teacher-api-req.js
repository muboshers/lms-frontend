import {ErrorHandle} from 'src/utils/response';

import {baseApi} from '.';
import {TEACHER} from './url';

export const teacherApiReq = baseApi.injectEndpoints({
    endpoints: ({query, mutation}) => ({
        getTeacherList: query({
            query: (arg) => {
                let url = `${TEACHER.GET_LIST}?`;
                if (arg?.page) url += `&page=${parseInt(arg?.page, 10) + 1}`
                if (arg?.limit) url += `&limit=${arg?.limit}`
                if (arg?.search !== "") url += `&search=${arg.search}`;
                return url;
            },
            transformErrorResponse: (error) => ErrorHandle(error),
            providesTags: ['TEACHER'],
        }),
        createTeacher: mutation({
            query: (arg) => ({
                url: TEACHER.CREATE,
                method: 'POST',
                body: {...arg},
            }),
            transformErrorResponse: (error) => ErrorHandle(error),
            invalidatesTags: (_, error) => (error ? [] : ['TEACHER']),
        }),
        updateTeacher: mutation({
            query: (arg) => ({
                url: `${TEACHER.UPDATE}/${arg.id}`,
                method: 'PATCH',
                body: {...arg},
            }),
            transformErrorResponse: (error) => ErrorHandle(error),
            invalidatesTags: (_, error) => (error ? [] : ['TEACHER']),
        }),
        deleteTeacher: mutation({
            query: (arg) => ({
                url: `${TEACHER.DELETE}/${arg.id}`,
                method: 'DELETE',
            }),
            transformErrorResponse: (error) => ErrorHandle(error),
            invalidatesTags: (_, error) => (error ? [] : ['TEACHER']),
        }),
    }),
});

export const {
    useGetTeacherListQuery,
    useCreateTeacherMutation,
    useDeleteTeacherMutation,
    useUpdateTeacherMutation
} = teacherApiReq;
