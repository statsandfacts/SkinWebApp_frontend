import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'loginModal',
  initialState: {
    isModalOpen: false,
  },
  reducers: {
    setLoginModal: (state, action) => {
      state.isModalOpen = action.payload;
    },
  },
});

export const { setLoginModal } = counterSlice.actions;
export default counterSlice.reducer;
