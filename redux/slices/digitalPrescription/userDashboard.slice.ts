import { getPatientDashboard } from "@/services/api.digitalPrescription.service";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface UserDashboardState {
  selectedTab: string;
  dashboardData: any;
  loading: boolean;
  error: string | null;
  isUpdateHealthIndicatorModal: boolean;
}

const initialState: UserDashboardState = {
  selectedTab: "Prescriptions",
  dashboardData: null,
  loading: false,
  error: null,
  isUpdateHealthIndicatorModal: false,
};

export const fetchPatientDashboard = createAsyncThunk<
  any,
  any,
  { rejectValue: string }
>(
  "userDashboard/fetchPatientDashboard",
  async (patient_user_id: string | null, { rejectWithValue }) => {
    try {
      const data = await getPatientDashboard(patient_user_id);
      return data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(
          error.response.data.message || "Failed to fetch data"
        );
      }
      return rejectWithValue(error.message || "Network Error");
    }
  }
);

const userDashboardSlice = createSlice({
  name: "userDashboard",
  initialState,
  reducers: {
    setDashboardTab: (state, action) => {
      state.selectedTab = action.payload;
    },
    setUpdateHealthIndicatorModal: (state, action) => {
      state.isUpdateHealthIndicatorModal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatientDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchPatientDashboard.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.dashboardData = action.payload;
        }
      )
      .addCase(
        fetchPatientDashboard.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Unknown error occurred";
        }
      );
  },
});

export const { setDashboardTab, setUpdateHealthIndicatorModal } = userDashboardSlice.actions;
export default userDashboardSlice.reducer;
