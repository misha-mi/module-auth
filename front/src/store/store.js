import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/userSlice.js';
import chatsReducer from './slice/chatsSlice.js';

export default configureStore({
  devTools: true,
  reducer: {
    user: userReducer,
    chats: chatsReducer,
  },
});
