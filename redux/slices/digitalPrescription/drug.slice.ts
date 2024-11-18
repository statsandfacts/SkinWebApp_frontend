import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchDrugDetails,
  fetchInvestigationDetails,
} from "@/services/api.digitalPrescription.service";
import { AxiosError } from "axios";
import { transformDataToArray } from "@/helper/objectHelper";

interface DrugState {
  data: any;
  loading: boolean;
  error: string | null;
  subGroupData: any;
  isReminderModalOpen: boolean;
  isSearchReportModalOpen: boolean;

  reminderMedicineDtls: any;
  reminderActionKey: null | string;
}

const initialState: DrugState = {
  data: null,
  loading: false,
  error: null,
  subGroupData: null,
  isReminderModalOpen: false,
  isSearchReportModalOpen: false,
  reminderMedicineDtls: null,
  reminderActionKey: null,
};

export const getDrugDetails = createAsyncThunk<
  any, // Adjust the return type according to the expected data from API
  any, // The argument type (drug_id)
  { rejectValue: string } // The error type
>("drug/getDrugDetails", async (drug_id, { rejectWithValue }) => {
  try {
    const data = await fetchDrugDetails(drug_id);
    return data;
  } catch (err) {
    const error = err as AxiosError;

    if (
      error.response &&
      error.response.data &&
      (error.response.data as any).message
    ) {
      return rejectWithValue((error.response.data as any).message);
    }

    return rejectWithValue("Something went wrong");
  }
});

export const getInvestigationDetails = createAsyncThunk<
  any,
  string | number | null,
  { rejectValue: string }
>(
  "investigation/getInvestigationDetails",
  async (investigation_id, { rejectWithValue }) => {
    try {
      const data = await fetchInvestigationDetails(investigation_id);
      return data;
    } catch (err) {
      const error = err as AxiosError;

      if (
        error.response &&
        error.response.data &&
        (error.response.data as any).message
      ) {
        return rejectWithValue((error.response.data as any).message);
      }

      return rejectWithValue("Something went wrong");
    }
  }
);

const drugSlice = createSlice({
  name: "drug",
  initialState,
  reducers: {
    setSubGroupDetail: (state, action) => {
      state.subGroupData = transformDataToArray(action.payload);
    },
    setIsReminderModal: (state, action: PayloadAction<boolean>) => {
      state.isReminderModalOpen = action.payload;
    },
    setReminderDetails: (state, action: PayloadAction<any>) => {
      state.reminderMedicineDtls = action.payload;
    },
    setReminderActionKey: (state, action: PayloadAction<string | null>) => {
      state.reminderActionKey = action.payload;
    },
    setIsTestSearchModal: (state, action: PayloadAction<boolean>) => {
      state.isSearchReportModalOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDrugDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getDrugDetails.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = transformDataToArray(action.payload);
        }
      )
      .addCase(getDrugDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Handle investigation details
      .addCase(getInvestigationDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getInvestigationDetails.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = transformDataToArray(action.payload);
        }
      )
      .addCase(getInvestigationDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setSubGroupDetail,
  setIsReminderModal,
  setIsTestSearchModal,
  setReminderDetails,
  setReminderActionKey,
} = drugSlice.actions;

export default drugSlice.reducer;
