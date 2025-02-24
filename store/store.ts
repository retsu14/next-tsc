import { configureStore } from "@reduxjs/toolkit";
import { blueprintApi } from "@/app/services/blueprint/blueprint-slice";

export const store = configureStore({
  reducer: {
    [blueprintApi.reducerPath]: blueprintApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(blueprintApi.middleware),
});
