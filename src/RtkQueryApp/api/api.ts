import { configureStore } from '@reduxjs/toolkit';
import { api } from './endpoints';

const reducer = {
  [api.reducerPath]: api.reducer,
};
export const apiStore = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
