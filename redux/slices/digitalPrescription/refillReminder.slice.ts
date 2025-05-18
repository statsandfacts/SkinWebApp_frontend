import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchRefillReminders } from "@/services/api.digitalPrescription.service";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";


// Define a type for a single refill reminder item
export interface RefillReminderType {
  medicine_name: string;
  medicine_o_id: string;
  dosage: string;
  start_date: string;
  days: string;
  user_id: string;
}


// export const fetchRefillRemindersApi = createAsyncThunk(
//   "refillReminder/fetchRefillReminders",
//   async (userId: string, thunkAPI) => {
//     try {
//       const data = await fetchRefillReminders (userId); // your existing API function
//       return data;
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(error?.response?.data || "Something went wrong");
//     }
//   }
// );

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
}

const initialState: RefillReminderState = {
  isRefillReminderOpen: false,
  refillReminderActionKey: null,
  refillReminderData: null,
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
});

export const {
  setIsRefillReminderOpen,
  setRefillReminderActionKey,
  setRefillReminderData,
} = refillReminderSlice.actions;

export default refillReminderSlice.reducer;
