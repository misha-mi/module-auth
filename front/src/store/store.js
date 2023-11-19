import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice.js';

export default configureStore({
  devTools: true,
  reducer: {
    user: userReducer,
  },
});
