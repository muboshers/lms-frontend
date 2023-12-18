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
        getSectionsListByTopicId: query({
            query: (arg) => {
                let url = `${TOPIC.GET_SECTIONS_BY_TOPIC_ID}${arg.id}?`;
                if (arg?.page) url += `&page=${parseInt(arg?.page, 10)}`
                if (arg?.limit) url += `&limit=${arg?.limit}`
                if (arg.search && arg?.search !== "") url += `&search=${arg?.search}`;
                return url;
            },
            transformErrorResponse: (error) => ErrorHandle(error),
            providesTags: ['TOPIC_SECTIONS'],
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
        createSectionToTopic: mutation({
            query: (arg) => ({
                url: `${TOPIC.ADD_SECTION_TOPIC}${arg.topic_id}`,
                method: 'POST',
                body: {...arg.body},
            }),
            invalidatesTags: (_, error) => (error ? [] : ['TOPIC_SECTIONS']),
        }),
        updateSectionToTopic: mutation({
            query: (arg) => ({
                url: `${TOPIC.UPDATE_SECTION_TOPIC}${arg.section_id}`,
                method: 'PATCH',
                body: {...arg.body},
            }),
            invalidatesTags: (_, error) => (error ? [] : ['TOPIC_SECTIONS']),
        }),
        deleteSectionToTopic: mutation({
            query: (arg) => ({
                url: `${TOPIC.DELETE_SECTION_TOPIC}${arg.section_id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (_, error) => (error ? [] : ['TOPIC_SECTIONS']),
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
    useGetPupilsListByTopicIdQuery,
    useGetSectionsListByTopicIdQuery,
    useCreateSectionToTopicMutation,
    useUpdateSectionToTopicMutation,
    useDeleteSectionToTopicMutation,
} = topicApiReq;
