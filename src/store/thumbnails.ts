import { configureStore } from '@reduxjs/toolkit';
import thumbnailReducer from './thumbnailSlice'; // Adjust path according to your file structure

// Create the Redux store
const store = configureStore({
  reducer: {
    // Add the thumbnail slice to the store
    thumbnail: thumbnailReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>; // To get the RootState type
export type AppDispatch = typeof store.dispatch; // To get the dispatch type

export default store;
