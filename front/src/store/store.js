import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice.js';
import chatsReducer from './chatsSlice.js';

export default configureStore({
  devTools: true,
  reducer: {
    user: userReducer,
    chats: chatsReducer,
  },
});
