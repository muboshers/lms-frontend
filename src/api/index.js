import axios from "axios";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

import {baseURL} from "src/contants";

export const axiosInstance = axios.create({
    baseURL,
});

axiosInstance.interceptors.request.use((req) => {
    const info = JSON.parse(localStorage.getItem("user"));
    const token = info?.data?.token || null;
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
});

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: fetchBaseQuery({
        baseUrl: baseURL,
        prepareHeaders: (headers) => {
            const info = JSON.parse(localStorage.getItem("user"));
            const token = info?.data?.token || null;
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ["GROUP", "TOPIC", "GROUP_BY_ID","TEACHING_CENTER_PROFILE"],
    endpoints: () => ({}),
});
