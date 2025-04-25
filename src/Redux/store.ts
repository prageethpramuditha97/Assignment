import { configureStore } from '@reduxjs/toolkit';
import albumReducer from './albumSlice';
import imageReducer from './imageSlice';

const store = configureStore({
  reducer: {
    albums: albumReducer,
    images: imageReducer,
  },
});

export default store;
