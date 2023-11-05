import { ErrorHandle } from "src/utils/response";

import { baseApi } from ".";
import { FILE } from "./url";

export const fileApiReq = baseApi.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    uploadFile: mutation({
      query: (arg) => ({
        url: `${FILE.SINGLE_UPLOAD}`,
        method: "POST",
        formData: true,
        body: arg.formData  ,
      }),
      transformErrorResponse: (err) => ErrorHandle(err),
    }),
  }),
});

export const { useUploadFileMutation } = fileApiReq;
