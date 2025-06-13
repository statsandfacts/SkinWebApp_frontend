import ExplanationModal from '@/components/SymptomBot/ExplanationModal';
import { createSlice } from '@reduxjs/toolkit';

interface symptomBotInitialState {
    isModalOpen: boolean;
    ExplanationData: any;
    BmiResponseData: string;
    symptomHistoryVisible: boolean;
    messageModalVisible: boolean;
    redFlagQuestion: boolean;
    errorMessageForRedFlag: boolean;
}

export const symptomBotSlice = createSlice({
  name: 'symptomBot',
  initialState: {
    isModalOpen: false,
    ExplanationData: null,
    BmiResponseData: '',
    symptomHistoryVisible: false,
    redFlagQuestion: false,
    messageModalVisible: false,
    errorMessageForRedFlag: false,
    symptomId: null,
  },
  reducers: {
    setModalVisible: (state, action) => {
        state.isModalOpen = action.payload;
    },
    setExplanationData: (state, action) => {
        state.ExplanationData = action.payload;
    },
    setSymptomHistoryVisible: (state, action) => {
        state.symptomHistoryVisible = action.payload;
    },
    setRedFlagQuestion: (state, action) => {
      state.redFlagQuestion = action.payload;
    },
    setMessageModalVisible: (state, action) => {
      state.messageModalVisible = action.payload;
    },
    setErrorMessageForRedFlag: (state, action) => {
      state.errorMessageForRedFlag = action.payload;
    },
    setSymptomId: (state, action) => {
      state.symptomId = action.payload;
    },
  },
});

export const { setModalVisible, setExplanationData, setSymptomHistoryVisible, setRedFlagQuestion, setMessageModalVisible, setErrorMessageForRedFlag, setSymptomId } = symptomBotSlice.actions;
export default symptomBotSlice.reducer;
