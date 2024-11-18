import { configureStore } from '@reduxjs/toolkit';
import thumbnailReducer from './thumbnailSlice';

const store = configureStore({
  reducer: {
    thumbnail: thumbnailReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
