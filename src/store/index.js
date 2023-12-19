import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { baseApi } from "../api";
import authReducer from "./auth.reducer";
import sectionReducer from "./section.reducer";

const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    teachingCenter: authReducer,
    section: sectionReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      baseApi.middleware
    ),
  devTools: true,
});

setupListeners(store.dispatch);

export { store };
