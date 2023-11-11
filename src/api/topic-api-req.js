import {ErrorHandle} from "src/utils/response";

import {baseApi} from ".";
import {TOPIC} from "./url";

export const topicApiReq = baseApi.injectEndpoints({
    endpoints: ({query, mutation}) => ({
        createTopic: mutation({
            query: (arg) => ({
                url: TOPIC.CREATE,
                method: "POST",
                body: {...arg},
            }),
            transformErrorResponse: (error) => ErrorHandle(error),
            invalidatesTags: (_, error) => error ? [] : ['GROUP_BY_ID']
        }),
    }),
});

export const {
    useCreateTopicMutation,
} = topicApiReq;
