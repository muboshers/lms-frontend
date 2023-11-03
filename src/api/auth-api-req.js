import { ErrorHandle } from "src/utils/response";

import { baseApi } from ".";
import { AUTH } from "./url";

export const authApiReq = baseApi.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    login: mutation({
      query: (arg) => ({
        url: `${AUTH.LOGIN}`,
        method: "POST",
        body: { ...arg },
      }),
      transformErrorResponse: (err) => ErrorHandle(err),
    }),

    getMeInfo: query({
      query: () => AUTH.GET_ME,
    }),
  }),
});

export const { useLoginMutation, useGetMeInfoQuery } = authApiReq;
