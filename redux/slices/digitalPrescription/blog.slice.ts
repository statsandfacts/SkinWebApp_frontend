import { getAllBlogs } from "@/services/api.digitalPrescription.service";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface BlogState {
  singleBlog: any;
  data: any;
  loading: boolean;
  errorMessage: null | string;
}

export const fetchAllBlogs = createAsyncThunk(
  "blog/fetchAllBlogs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllBlogs();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState: BlogState = {
  singleBlog: null,
  data: [],
  loading: false,
  errorMessage: null,
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setABlog: (state, action: PayloadAction<any>) => {
      state.singleBlog = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBlogs.pending, (state) => {
        state.loading = true;
        state.errorMessage = null;
      })
      .addCase(fetchAllBlogs.fulfilled, (state, action: PayloadAction<any>) => {
        state.data = action.payload;
        state.loading = false;
        state.errorMessage = null;
      })
      .addCase(fetchAllBlogs.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload as string;
      });
  },
});

export const { setABlog } = blogSlice.actions;

export default blogSlice.reducer;
