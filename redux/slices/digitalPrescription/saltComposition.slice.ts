// redux/slices/saltComposition.slice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchSaltComposition } from '@/services/api.digitalPrescription.service';
import { AxiosError } from 'axios';

interface SaltCompositionState {
  data: any;
  loading: boolean;
  error: string | null;
}

const initialState: SaltCompositionState = {
  data: null,
  loading: false,
  error: null,
};

export const getSaltComposition = createAsyncThunk<
  any, // Replace with appropriate type for salt composition data
  string, // The argument type (drugId)
  { rejectValue: string }
>('saltComposition/getSaltComposition', async (Id, { rejectWithValue }) => {
  try {
    const data = await fetchSaltComposition(Id);
    return data;
  } catch (err) {
    const error = err as AxiosError;
    if (error.response && error.response.data) {
      return rejectWithValue((error.response.data as any).message);
    }
    return rejectWithValue('Something went wrong');
  }
});

const saltCompositionSlice = createSlice({
  name: 'saltComposition',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSaltComposition.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSaltComposition.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getSaltComposition.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default saltCompositionSlice.reducer;
