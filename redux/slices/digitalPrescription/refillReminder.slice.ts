import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchRefillReminders } from "@/services/api.digitalPrescription.service";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export interface RefillReminderType {
  medicine_name: string;
  medicine_o_id: string;
  dosage: string;
  start_date: string;
  days: string;
  user_id: string;
  created_at?: string | null;
  created_by?: string | null;
  end_date?: string | null;
  id?: string | null;
  is_active?: boolean;
  updated_at?: string | null;
  updated_by?: string | null;
}

export const fetchRefillRemindersApi = createAsyncThunk<
  any, // Adjust the return type according to the expected data from API
  any, // The argument type (drug_id)
  { rejectValue: string } // The error type
>("refillReminder/getRefillReminders", async (userId, { rejectWithValue }) => {
  try {
    const data = await fetchRefillReminders(userId);
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

// Define the shape of the state
interface RefillReminderState {
  isRefillReminderOpen: boolean;
  refillReminderActionKey: "create" | "edit" | "view" | null;
  refillReminderData: RefillReminderType | null;

  rr_error: string | null;
  rr_loading: boolean;
  rr_data: RefillReminderType[] | null;
}

const initialState: RefillReminderState = {
  isRefillReminderOpen: false,
  refillReminderActionKey: null,
  refillReminderData: null,

  rr_error: null,
  rr_loading: false,
  rr_data: null,
};

const refillReminderSlice = createSlice({
  name: "refillReminder",
  initialState,
  reducers: {
    setIsRefillReminderOpen(state, action: PayloadAction<boolean>) {
      state.isRefillReminderOpen = action.payload;
    },
    setRefillReminderActionKey(
      state,
      action: PayloadAction<"create" | "edit" | "view" | null>
    ) {
      state.refillReminderActionKey = action.payload;
    },
    setRefillReminderData(
      state,
      action: PayloadAction<RefillReminderType | null>
    ) {
      state.refillReminderData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRefillRemindersApi.pending, (state) => {
        state.rr_loading = true;
        state.rr_error = null;
        state.rr_data = null;
      })
      .addCase(
        fetchRefillRemindersApi.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.rr_loading = false;
          state.rr_error = null;
          state.rr_data = action.payload;
        }
      )
      .addCase(fetchRefillRemindersApi.rejected, (state, action) => {
        state.rr_loading = false;
        state.rr_error = action.payload as string;
        state.rr_data = null;
      });
  },
});

export const {
  setIsRefillReminderOpen,
  setRefillReminderActionKey,
  setRefillReminderData,
} = refillReminderSlice.actions;

export default refillReminderSlice.reducer;
