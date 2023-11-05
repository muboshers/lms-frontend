import { ErrorHandle } from "src/utils/response";

import { baseApi } from ".";
import { GROUP } from "./url";

export const groupApiReq = baseApi.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getGroupList: query({
      query: (arg) => {
        let url = `${GROUP.GET_LIST}?page=${arg.page}`;

        if (arg.search) url += `&search=${arg.search}`;

        return url;
      },
      transformErrorResponse: (error) => ErrorHandle(error),
    }),

    createGroup: mutation({
      query: (arg) => ({
        url: GROUP.CREATE,
        method: "POST",
        body: arg.body,
      }),
      transformErrorResponse: (error) => ErrorHandle(error),
    }),
  }),
});

export const { useGetGroupListQuery, useCreateGroupMutation } = groupApiReq;
