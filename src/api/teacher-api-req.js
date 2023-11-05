import { ErrorHandle } from "src/utils/response";

import { baseApi } from ".";
import { TEACHER } from "./url";

export const teacherApiReq = baseApi.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getTeacherList: query({
      query: (arg) => {
        let url = `${TEACHER.GET_LIST}?page=${arg.page}`;
        if (arg.search) url += `&search=${arg.search}`;
        return url;
      },
      transformErrorResponse: (error) => ErrorHandle(error),
    }),
  }),
});

export const { useGetTeacherListQuery } = teacherApiReq;
