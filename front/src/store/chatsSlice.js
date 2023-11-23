import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  chats: [],
  messages: [],
  socket: null,
  openChat: {},
};

const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    setChats: (state, action) => {
      state.chats = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    setSocket: (state, action) => {
      state.socket = action.payload;
    },
    setOpenChat: (state, action) => {
      state.openChat = action.payload;
    },
    pushMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
});

export const { setChats, setMessages, socket, setOpenChat, pushMessage } = chatsSlice.actions;

export default chatsSlice.reducer;
