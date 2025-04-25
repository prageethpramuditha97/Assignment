import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Album {
  id : number ;
  Name : string;
}

interface AlbumState {
  albumList: Album[];
  selectedAlbumId: number | null;
}

const initialState: AlbumState = {
  albumList: [],
  selectedAlbumId: null,
};

const albumSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {
    setSelectedAlbum(state, action: PayloadAction<number>) {
        state.selectedAlbumId = action.payload;
    },
    setAlbumList(state, action: PayloadAction<Album[]>) {
      state.albumList = action.payload;
    },
    addAlbum(state, action: PayloadAction<Album>) {
      state.albumList.push(action.payload); // Add new album to the list
    },
  },
});

export const { setSelectedAlbum , setAlbumList, addAlbum } = albumSlice.actions;
export default albumSlice.reducer;
