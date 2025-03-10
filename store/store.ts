import { configureStore } from "@reduxjs/toolkit";
import { blueprintApi } from "@/app/services/blueprint/blueprint-slice";
import { sitesApi } from "@/app/services/sites/sites-slice";
import { blockApi } from "@/app/services/block/block-slice";
import { pageApi } from "@/app/services/page/page-slice";

export const store = configureStore({
  reducer: {
    [blueprintApi.reducerPath]: blueprintApi.reducer,
    [sitesApi.reducerPath]: sitesApi.reducer,
    [blockApi.reducerPath]: blockApi.reducer,
    [pageApi.reducerPath]: pageApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      blueprintApi.middleware,
      sitesApi.middleware,
      blockApi.middleware,
      pageApi.middleware
    ),
});
