import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ThumbnailData {
  type: string;
  title: string;
  position: number;
  publicId: string;
}

export interface ThumbnailState {
  thumbnails: ThumbnailData[];
  loading: boolean;
  error: string | null;
}

const initialState: ThumbnailState = {
  thumbnails: [],
  loading: false,
  error: null,
};

const thumbnailSlice = createSlice({
  name: 'thumbnails',
  initialState,
  reducers: {
    addNewThumbnail: (state, action: PayloadAction<ThumbnailData[]>) => {
      state.thumbnails = [...state.thumbnails, ...action.payload];
    },

    loadThumbnails: (state) => {
      state.loading = false;
    },

    fetchThumbnails: (state) => {
      state.loading = true;
    },

    fetchThumbnailsSuccess: (state, action: PayloadAction<ThumbnailData[]>) => {
      state.thumbnails = action.payload;
      state.loading = false;
    },

    fetchThumbnailsFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  addNewThumbnail,
  fetchThumbnails,
  fetchThumbnailsSuccess,
  fetchThumbnailsFailure,
  loadThumbnails,
} = thumbnailSlice.actions;

export default thumbnailSlice.reducer;
