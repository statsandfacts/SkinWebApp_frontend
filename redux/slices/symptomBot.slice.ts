import ExplanationModal from '@/app/test-bot/components/ExplanationModal';
import { createSlice } from '@reduxjs/toolkit';

interface symptombotInitialState {
    isModalOpen: boolean;
    ExplanationData: {
        header: string;
        content: string[];
        colors: string[];
    }
}

export const symptomBotSlice = createSlice({
  name: 'symptombot',
  initialState: {
    isModalOpen: false,
    ExplanationData: null,
  },
  reducers: {
    setExplanationModal: (state, action) => {
        state.isModalOpen = action.payload;
    },
    setExplanationData: (state, action) => {
        state.ExplanationData = action.payload;
    },
  },
});

export const { setExplanationModal, setExplanationData } = symptomBotSlice.actions;
export default symptomBotSlice.reducer;
