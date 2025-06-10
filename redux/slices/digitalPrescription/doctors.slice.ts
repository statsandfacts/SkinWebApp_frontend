import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getAllDoctors } from "@/services/api.digitalPrescription.service";

// 1. Async thunk to fetch doctors
export const fetchDoctors = createAsyncThunk(
  "doctors/fetchAll",
  async () => {
    const response: any[] = await getAllDoctors();
    return (response || []).map(doc => ({
      id: doc.doctor_id,
      name: doc.name,
      specialization: doc.doctor_specialization,
      price: Number(doc.doctor_consulting_price),
    }));
  }
);

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  price: number;
}

interface DoctorsState {
  list: Doctor[];
  loading: boolean;
  error?: string;
}

const initialState: DoctorsState = {
  list: [],
  loading: false,
  error: undefined,
};

const doctorsSlice = createSlice({
  name: "doctors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctors.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchDoctors.fulfilled, (state, action: PayloadAction<Doctor[]>) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default doctorsSlice.reducer;
