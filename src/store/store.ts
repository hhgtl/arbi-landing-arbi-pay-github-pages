import { configureStore } from "@reduxjs/toolkit";

import { arbiPayApi } from "../lib/arbiPayApi";

export const store = configureStore({
  reducer: {
    [arbiPayApi.reducerPath]: arbiPayApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(arbiPayApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
