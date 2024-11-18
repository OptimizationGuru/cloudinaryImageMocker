import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface ThumbnailData {
  type: string;
  title: string;
  position: number;
  publicId: string;
}

export interface ThumbnailState {
  thumbnails: ThumbnailData[];
  currentThumbnail: ThumbnailData;
  isLoading: boolean;
}

const initialState: ThumbnailState = {
  thumbnails: [],
  currentThumbnail: {
    type: '',
    title: '',
    position: 0,
    publicId: '',
  },
  isLoading: false,
};

export const addNewThumbnail = createAsyncThunk(
  'thumbnails/addNewThumbnail',
  async (newThumbnails: ThumbnailData[], { getState }) => {
    const state = getState() as { thumbnail: ThumbnailState };

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const uniqueThumbnails = newThumbnails.filter((newThumbnail) => {
      return !state.thumbnail.thumbnails.some(
        (existingThumbnail) =>
          existingThumbnail.publicId === newThumbnail.publicId
      );
    });

    return uniqueThumbnails;
  }
);

const thumbnailSlice = createSlice({
  name: 'thumbnails',
  initialState,
  reducers: {
    setCurrentThumbnail: (state, action: PayloadAction<ThumbnailData>) => {
      state.currentThumbnail = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addNewThumbnail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        addNewThumbnail.fulfilled,
        (state, action: PayloadAction<ThumbnailData[]>) => {
          state.thumbnails = [...state.thumbnails, ...action.payload];
          state.isLoading = false;
        }
      )
      .addCase(addNewThumbnail.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setCurrentThumbnail } = thumbnailSlice.actions;

export default thumbnailSlice.reducer;
