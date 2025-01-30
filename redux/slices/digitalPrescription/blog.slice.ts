import {
  getAllBlogs,
  getAllBlogsByCategory,
  getAllCategories,
  getBlogDtls,
  getBlogDtlsBySlug,
} from "@/services/api.digitalPrescription.service";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface BlogState {
  singleBlog: any;
  sbLoading: boolean;
  sbErrorMessage: null | string;

  data: any;
  loading: boolean;
  errorMessage: null | string;

  comments: {
    data: any;
    loading: boolean;
    errorMessage: null | string;
  };

  categories: {
    data: any;
    loading: boolean;
    errorMessage: null | string;
  };

  allBlogsByCategories: {
    data: any;
    loading: boolean;
    errorMessage: null | string;
  };

  reduxCatData: any;
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

export const fetchAllBlogsByCategory = createAsyncThunk(
  "blog/fetchAllBlogsByCategory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllBlogsByCategory();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchBlogDtls = createAsyncThunk(
  "blog/fetchBlogDetails",
  async (blogId: any, { rejectWithValue }) => {
    try {
      const response = await getBlogDtlsBySlug(blogId);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchComments = createAsyncThunk(
  "blog/fetchComments",
  async (blogId: any, { rejectWithValue }) => {
    try {
      const response = await getBlogDtlsBySlug(blogId);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchAllCategories = createAsyncThunk(
  "blog/fetchAllCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllCategories();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState: BlogState = {
  singleBlog: null,
  sbLoading: false,
  sbErrorMessage: null,

  data: [],
  loading: false,
  errorMessage: null,

  allBlogsByCategories: {
    data: [],
    errorMessage: null,
    loading: false,
  },

  comments: {
    data: [],
    errorMessage: null,
    loading: false,
  },

  categories: {
    data: [],
    errorMessage: null,
    loading: false,
  },

  reduxCatData: null,
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setABlog: (state, action: PayloadAction<any>) => {
      state.singleBlog = action.payload;
      state.sbLoading = false;
      state.sbErrorMessage = null;
      state.comments.data = action.payload?.comments;
    },

    setReduxCatData: (state, action: PayloadAction<any>) => {
      state.reduxCatData = action.payload;
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
      })

      .addCase(fetchBlogDtls.pending, (state) => {
        state.sbLoading = true;
        state.sbErrorMessage = null;
        state.comments.data = null;
        state.comments.loading = false;
        state.comments.errorMessage = null;
      })
      .addCase(fetchBlogDtls.fulfilled, (state, action: PayloadAction<any>) => {
        state.singleBlog = action.payload;
        state.sbLoading = false;
        state.sbErrorMessage = null;
        state.comments.data = action.payload?.comments;
        state.comments.loading = false;
        state.comments.errorMessage = null;
      })
      .addCase(fetchBlogDtls.rejected, (state, action) => {
        state.sbLoading = false;
        state.sbErrorMessage = action.payload as string;
        state.comments.loading = false;
        state.comments.errorMessage = null;
      })

      .addCase(fetchComments.pending, (state) => {
        state.comments.loading = true;
        state.comments.errorMessage = null;
        state.comments.data = null;
      })
      .addCase(fetchComments.fulfilled, (state, action: PayloadAction<any>) => {
        state.comments.loading = false;
        state.comments.errorMessage = null;
        state.comments.data = action.payload?.comments;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.comments.loading = false;
        state.comments.errorMessage = action.payload as string;
      })

      // Categories data
      .addCase(fetchAllCategories.pending, (state) => {
        state.categories.loading = true;
        state.categories.errorMessage = null;
        state.categories.data = null;
      })
      .addCase(
        fetchAllCategories.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.categories.loading = false;
          state.categories.errorMessage = null;
          state.categories.data = action.payload ?? [];
        }
      )
      .addCase(fetchAllCategories.rejected, (state, action) => {
        state.categories.loading = false;
        state.categories.errorMessage = action.payload as string;
      })

      // Blogs data by id
      .addCase(fetchAllBlogsByCategory.pending, (state) => {
        state.allBlogsByCategories.loading = true;
        state.allBlogsByCategories.errorMessage = null;
        state.allBlogsByCategories.data = null;
      })
      .addCase(
        fetchAllBlogsByCategory.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.allBlogsByCategories.loading = false;
          state.allBlogsByCategories.errorMessage = null;
          state.allBlogsByCategories.data = action.payload ?? [];
        }
      )
      .addCase(fetchAllBlogsByCategory.rejected, (state, action) => {
        state.allBlogsByCategories.loading = false;
        state.allBlogsByCategories.errorMessage = action.payload as string;
      });
  },
});

export const { setABlog, setReduxCatData } = blogSlice.actions;

export default blogSlice.reducer;
