import {ErrorHandle} from 'src/utils/response';

import {baseApi} from '.';
import {PUPILS} from './url';

export const pupilsApiReq = baseApi.injectEndpoints({
    endpoints: ({query, mutation}) => ({
        getPupilsList: query({
            query: (arg) => {
                let url = `${PUPILS.GET_LIST}?`;
                if (arg?.page) url += `&page=${parseInt(arg?.page, 10) + 1}`
                if (arg?.limit) url += `&limit=${arg?.limit}`
                if (arg?.search !== "") url += `&search=${arg.search}`;
                return url;
            },
            transformErrorResponse: (error) => ErrorHandle(error),
            providesTags: ['PUPILS'],
        }),
        createPupils: mutation({
            query: (arg) => ({
                url: PUPILS.CREATE,
                method: 'POST',
                body: {...arg},
            }),
            transformErrorResponse: (error) => ErrorHandle(error),
            invalidatesTags: (_, error) => (error ? [] : ['PUPILS']),
        }),
        updatePupils: mutation({
            query: (arg) => ({
                url: `${PUPILS.UPDATE}/${arg.id}`,
                method: 'PATCH',
                body: {...arg},
            }),
            transformErrorResponse: (error) => ErrorHandle(error),
            invalidatesTags: (_, error) => (error ? [] : ['PUPILS']),
        }),
        deletePupils: mutation({
            query: (arg) => ({
                url: `${PUPILS.DELETE}/${arg.id}`,
                method: 'DELETE',
            }),
            transformErrorResponse: (error) => ErrorHandle(error),
            invalidatesTags: (_, error) => (error ? [] : ['PUPILS']),
        }),
    }),
});

export const {
    useGetPupilsListQuery,
    useCreatePupilsMutation,
    useDeletePupilsMutation,
    useUpdatePupilsMutation
} = pupilsApiReq;

