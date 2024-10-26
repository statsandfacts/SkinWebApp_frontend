import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface BlogState {
    singleBlog: any;
}

const initialState: BlogState = {
  singleBlog: null,
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setABlog: (state, action: PayloadAction<any>) => {
      state.singleBlog = action.payload;
    },
  },
});

export const { setABlog } = blogSlice.actions;

export default blogSlice.reducer;
