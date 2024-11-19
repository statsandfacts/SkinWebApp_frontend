import { getPatientDashboard } from "@/services/api.digitalPrescription.service";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface UserDashboardState {
  selectedTab: string;
  dashboardData: any;
  loading: boolean;
  error: string | null;
  isUpdateHealthIndicatorModal: boolean;
  prescriptionCases: {
    approved: any[];
    conditionallyApproved: any[];
    inProgress: any[];
    reUpload: any[];
  };
}

const initialState: UserDashboardState = {
  selectedTab: "Prescriptions",
  dashboardData: null,
  loading: false,
  error: null,
  isUpdateHealthIndicatorModal: false,
  prescriptionCases: {
    approved: [],
    conditionallyApproved: [],
    inProgress: [],
    reUpload: [],
  },
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
        state.prescriptionCases.approved = [];
        state.prescriptionCases.conditionallyApproved = [];
        state.prescriptionCases.inProgress = [];
        state.prescriptionCases.reUpload = [];
      })
      .addCase(
        fetchPatientDashboard.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.dashboardData = action.payload;
          state.prescriptionCases.approved =
            action.payload?.patient_case_dtls?.filter(
              (item: any) => item?.status === "approve"
            );
          state.prescriptionCases.reUpload =
            action.payload?.patient_case_dtls?.filter(
              (item: any) => item?.status === "reupload"
            );
          state.prescriptionCases.conditionallyApproved =
            action.payload?.patient_case_dtls?.filter(
              (item: any) => item?.status === "conditionally-approve"
            );
          state.prescriptionCases.inProgress =
            action.payload?.patient_case_dtls?.filter(
              (item: any) => item?.status === "In progress"
            );
        }
      )
      .addCase(
        fetchPatientDashboard.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Unknown error occurred";
          state.prescriptionCases.approved = [];
          state.prescriptionCases.conditionallyApproved = [];
          state.prescriptionCases.inProgress = [];
          state.prescriptionCases.reUpload = [];
        }
      );
  },
});

export const { setDashboardTab, setUpdateHealthIndicatorModal } =
  userDashboardSlice.actions;
export default userDashboardSlice.reducer;
