import {ErrorHandle} from 'src/utils/response';

import {baseApi} from '.';
import {TOPIC, PUPILS} from './url';

export const topicApiReq = baseApi.injectEndpoints({
    endpoints: ({query, mutation}) => ({
        getPupilsListByTopicId: query({
            query: (arg) => {
                let url = `${PUPILS.GET_PUPILS_BY_TOPIC_ID}${arg.id}?`;
                if (arg?.page) url += `&page=${parseInt(arg?.page, 10) + 1}`
                if (arg?.limit) url += `&limit=${arg?.limit}`
                if (arg.search && arg?.search !== "") url += `&search=${arg?.search}`;
                return url;
            },
            transformErrorResponse: (error) => ErrorHandle(error),
            providesTags: ['PUPILS_BY_TOPIC_ID'],
        }),
        createTopic: mutation({
            query: (arg) => ({
                url: TOPIC.CREATE,
                method: 'POST',
                body: {...arg},
            }),
            transformErrorResponse: (error) => ErrorHandle(error),
            invalidatesTags: (_, error) => (error ? [] : ['GROUP_BY_ID']),
        }),
        updateTopic: mutation({
            query: (arg) => ({
                url: `${TOPIC.UPDATE}/${arg.id}`,
                method: 'PATCH',
                body: {...arg.body},
            }),
            transformErrorResponse: (error) => ErrorHandle(error),
            invalidatesTags: (_, error) => (error ? [] : ['GROUP_BY_ID']),
        }),
        deleteTopic: mutation({
            query: (arg) => ({
                url: `${TOPIC.DELETE}/${arg.id}`,
                method: 'DELETE',
            }),
            transformErrorResponse: (error) => ErrorHandle(error),
            invalidatesTags: (_, error) => (error ? [] : ['GROUP_BY_ID']),
        }),
    }),
});

export const {
    useCreateTopicMutation,
    useDeleteTopicMutation,
    useUpdateTopicMutation,
    useGetPupilsListByTopicIdQuery
} =
    topicApiReq;
