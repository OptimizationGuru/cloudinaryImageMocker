import { configureStore } from '@reduxjs/toolkit';
import thumbnailSlice, { ThumbnailState } from './thumbnailSlice';
import throttle from 'lodash/throttle';
import { delay, newthumbnailImages } from '../constants';

export interface RootState {
  thumbnail: ThumbnailState;
}

const loadState = (): RootState => {
  try {
    const serializedState = localStorage.getItem(newthumbnailImages);
    if (serializedState) {
      return JSON.parse(serializedState) as RootState;
    } else {
      return {
        thumbnail: {
          thumbnails: [],
          loading: false,
          error: null,
        },
      };
    }
  } catch (err) {
    console.error('Failed to load state from local storage:', err);
    return {
      thumbnail: {
        thumbnails: [],
        loading: false,
        error: null,
      },
    };
  }
};

const saveState = throttle((state: RootState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(newthumbnailImages, serializedState);
  } catch (err) {
    console.error('Failed to save state to local storage:', err);
  }
}, delay);

const store = configureStore({
  reducer: {
    thumbnail: thumbnailSlice,
  },
  preloadedState: loadState(),
});

store.subscribe(() => {
  saveState(store.getState());
});

export type AppDispatch = typeof store.dispatch;
export default store;
