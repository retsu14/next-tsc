import { configureStore } from "@reduxjs/toolkit";
import { blueprintApi } from "@/app/services/blueprint/blueprint-slice";
import { sitesApi } from "@/app/services/sites/sites-slice";

export const store = configureStore({
  reducer: {
    [blueprintApi.reducerPath]: blueprintApi.reducer,
    [sitesApi.reducerPath]: sitesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(blueprintApi.middleware, sitesApi.middleware),
});
