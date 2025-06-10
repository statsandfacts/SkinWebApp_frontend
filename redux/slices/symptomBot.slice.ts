import ExplanationModal from '@/app/test-bot/components/ExplanationModal';
import { createSlice } from '@reduxjs/toolkit';

interface symptombotInitialState {
    isModalOpen: boolean;
    ExplanationData: {
        header: string;
        content: string[];
        colors: string[];
    }
    BmiResponseData: string;
    symptHistoryVisible: boolean;
    messageModalVisible: boolean;
    RedflagQuestion: boolean;
}

export const symptomBotSlice = createSlice({
  name: 'symptombot',
  initialState: {
    isModalOpen: false,
    ExplanationData: null,
    BmiResponseData: '',
    symptHistoryVisible: false,
    RedflagQuestion: false,
    messageModalVisible: false,
    errorMessageForRedFlag: false,
  },
  reducers: {
    setModalVisible: (state, action) => {
        state.isModalOpen = action.payload;
    },
    setExplanationData: (state, action) => {
        state.ExplanationData = action.payload;
    },
    setSymptHistoryVisible: (state, action) => {
        state.symptHistoryVisible = action.payload;
    },
    setRedflagQuestion: (state, action) => {
      state.RedflagQuestion = action.payload;
    },
    setMessageModalVisible: (state, action) => {
      state.messageModalVisible = action.payload;
    },
    setErrorMessageForRedFlag: (state, action) => {
      state.errorMessageForRedFlag = action.payload;
    },
  },
});

export const { setModalVisible, setExplanationData, setSymptHistoryVisible, setRedflagQuestion, setMessageModalVisible, setErrorMessageForRedFlag } = symptomBotSlice.actions;
export default symptomBotSlice.reducer;
