import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Image {
    album_id: number;
    img: string;
}

interface ImageState {
  imageList: Image[];
}

const initialState: ImageState = {
  imageList: [],
};

const imageSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    setImageList(state, action: PayloadAction<Image[]>) {
      state.imageList = action.payload;
    },
    addImageToAlbum(state, action: PayloadAction<Image>) {
      state.imageList.push(action.payload); // Add image to the imageList
    },
  },
});

export const { setImageList, addImageToAlbum } = imageSlice.actions;
export default imageSlice.reducer;
