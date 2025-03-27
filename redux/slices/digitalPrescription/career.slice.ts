import {
  getAllCareerJobs,
  getCareerJobById,
} from "@/services/api.digitalPrescription.service";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface CareerState {
  data: any;
  loading: boolean;
  errorMessage: null | string;

  singleJobDtls: any;
  singleJobDtlsLoading: boolean;
  singleJobDtlsErrMsg: null | string;
}

export const fetchAllJobs = createAsyncThunk(
  "career/fetchAllJobs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllCareerJobs();
      console.log("response", response);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchJobDtls = createAsyncThunk(
  "career/fetchJobDtls",
  async (jobId: any, { rejectWithValue }) => {
    try {
      const response = await getCareerJobById(jobId);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState: CareerState = {
  data: [],
  loading: false,
  errorMessage: null,
  singleJobDtls: null,
  singleJobDtlsLoading: false,
  singleJobDtlsErrMsg: null,
};

const careerSlice = createSlice({
  name: "career",
  initialState,
  reducers: {
    setSingleJobDtls: (state, action: PayloadAction<any>) => {
      state.singleJobDtls = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllJobs.pending, (state) => {
        state.loading = true;
        state.errorMessage = null;
        state.data = null;
      })
      .addCase(fetchAllJobs.fulfilled, (state, action: PayloadAction<any>) => {
        state.data = action.payload;
        state.loading = false;
        state.errorMessage = null;
      })
      .addCase(fetchAllJobs.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.errorMessage = action.payload as string;
      })

      .addCase(fetchJobDtls.pending, (state) => {
        state.singleJobDtlsLoading = true;
        state.singleJobDtlsErrMsg = null;
        state.singleJobDtls = null;
      })
      .addCase(fetchJobDtls.fulfilled, (state, action: PayloadAction<any>) => {
        state.singleJobDtls = action.payload;
        state.singleJobDtlsLoading = false;
        state.singleJobDtlsErrMsg = null;
      })
      .addCase(fetchJobDtls.rejected, (state, action) => {
        state.singleJobDtlsLoading = false;
        state.singleJobDtlsErrMsg = action.payload as string;
        state.singleJobDtlsErrMsg = null;
      });
  },
});

export const { setSingleJobDtls } = careerSlice.actions;

export default careerSlice.reducer;
