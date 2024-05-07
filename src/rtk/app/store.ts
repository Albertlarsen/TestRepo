import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';

import { ChooseApi } from '../features/ChooseApi/ChooseApi';

const store = configureStore({
  reducer: {
    [ChooseApi.reducerPath]: ChooseApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ChooseApi.middleware),
});

setupListeners(store.dispatch);

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
