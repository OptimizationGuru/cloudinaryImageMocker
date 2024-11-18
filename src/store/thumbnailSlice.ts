import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ThumbnailData {
  type: string; // Set the default value to an empty string
  title: string;
  position: number;
  publicId: string;
}

export interface ThumbnailState {
  thumbnails: ThumbnailData[];
  currentThumbnail: ThumbnailData;
}

const initialState: ThumbnailState = {
  thumbnails: [],
  currentThumbnail: {
    type: '',
    title: '',
    position: 0,
    publicId: '',
  },
};

const thumbnailSlice = createSlice({
  name: 'thumbnails',
  initialState,
  reducers: {
    addNewThumbnail: (state, action: PayloadAction<ThumbnailData[]>) => {
      const uniqueThumbnails = action.payload.filter((newThumbnail) => {
        return !state.thumbnails.some(
          (existingThumbnail) =>
            existingThumbnail.publicId === newThumbnail.publicId
        );
      });

      state.thumbnails = [...state.thumbnails, ...uniqueThumbnails];
    },

    setCurrentThumbnail: (state, action: PayloadAction<ThumbnailData>) => {
      state.currentThumbnail = action.payload;
    },
  },
});

export const { addNewThumbnail, setCurrentThumbnail } = thumbnailSlice.actions;

export default thumbnailSlice.reducer;
