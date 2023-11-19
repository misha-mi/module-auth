import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {},
  isAuth: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setIsAuth: (state, action) => {
      state.isAuth = action.payload;
    },
    logout: (state) => {
      state = { user: {}, isAuth: true };
    },
  },
});

export const { setUser, setIsAuth, logout } = userSlice.actions;

export default userSlice.reducer;
