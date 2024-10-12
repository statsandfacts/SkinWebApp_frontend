import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchDrugDetails } from "@/services/api.digitalPrescription.service";
import { AxiosError } from "axios";
import { transformDataToArray } from "@/helper/objectHelper";

interface DrugState {
  data: any;
  loading: boolean;
  error: string | null;
}

const initialState: DrugState = {
  data: null,
  loading: false,
  error: null,
};

export const getDrugDetails = createAsyncThunk<
  any, // Adjust the return type according to the expected data from API
  string | null, // The argument type (drug_id)
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

// Create the slice
const drugSlice = createSlice({
  name: "drug",
  initialState,
  reducers: {},
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
      });
  },
});

export default drugSlice.reducer;
