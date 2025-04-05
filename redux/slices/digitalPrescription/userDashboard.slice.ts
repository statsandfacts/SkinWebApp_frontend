import {
  getPatientDashboard,
  getProfileCompletionPercentage,
} from "@/services/api.digitalPrescription.service";
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
  isUpdateHcrModal: boolean;
  profileCompletionData: {
    loading: boolean;
    error: string | null;
    profileCompletionPercentage: number | null;
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
  isUpdateHcrModal: false,
  profileCompletionData: {
    loading: false,
    error: null,
    profileCompletionPercentage: null,
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

export const fetchProfileCompletionPercentage = createAsyncThunk<
  any,
  any,
  { rejectValue: string }
>(
  "userDashboard/fetchProfileCompletionPercentage",
  async (patient_user_id: string | null, { rejectWithValue }) => {
    try {
      const data = await getProfileCompletionPercentage(patient_user_id);
      return data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(
          error.response.data.message || "Failed to fetch percentage data"
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
    setIsUpdateHCRModal: (state, action) => {
      state.isUpdateHcrModal = action.payload;
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
      )

      .addCase(fetchProfileCompletionPercentage.pending, (state) => {
        state.profileCompletionData.loading = true;
        state.profileCompletionData.error = null;
        state.profileCompletionData.profileCompletionPercentage = null;
      })
      .addCase(
        fetchProfileCompletionPercentage.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.profileCompletionData.loading = false;
          state.profileCompletionData.error = null;
          state.profileCompletionData.profileCompletionPercentage =
            action.payload?.completion_percentage || null;
        }
      )
      .addCase(
        fetchProfileCompletionPercentage.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.profileCompletionData.loading = false;
          state.profileCompletionData.error = null;
          state.profileCompletionData.profileCompletionPercentage = null;
        }
      );
  },
});

export const {
  setDashboardTab,
  setUpdateHealthIndicatorModal,
  setIsUpdateHCRModal,
} = userDashboardSlice.actions;
export default userDashboardSlice.reducer;
