// store/symptomsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SymptomsState {
  symptoms: string[];
}

const initialState: SymptomsState = {
  symptoms: [],
};

const symptomsSlice = createSlice({
  name: "symptoms",
  initialState,
  reducers: {
    addSymptom: (state, action: PayloadAction<string>) => {
      if (!state.symptoms.includes(action.payload)) {
        state.symptoms.push(action.payload);
      }
    },
    clearSymptoms: (state) => {
      state.symptoms = [];
    },
  },
});

export const { addSymptom, clearSymptoms } = symptomsSlice.actions;

export default symptomsSlice.reducer;
