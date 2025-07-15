import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SymptomBotInitialState {
  isModalOpen: boolean;
  ExplanationData: any;
  BmiResponseData: string;
  symptomHistoryVisible: boolean;
  redFlagQuestion: boolean;
  messageModalVisible: boolean;
  errorMessageForRedFlag: boolean;
  symptomId: number | null;
  noOfConsecutiveQuestions: number | null;
  consecutiveQuestions: any[] | null;
  multipleQuestions: any[];
  multipleQuestionsCompleted: boolean;
  currentQuestionIndex: number | null;
}

const initialState: SymptomBotInitialState = {
  isModalOpen: false,
  ExplanationData: null,
  BmiResponseData: "",
  symptomHistoryVisible: false,
  redFlagQuestion: false,
  messageModalVisible: false,
  errorMessageForRedFlag: false,
  symptomId: null,
  noOfConsecutiveQuestions: null,
  consecutiveQuestions: null,
  multipleQuestions: [],
  multipleQuestionsCompleted: false,
  currentQuestionIndex: 0,
};

export const symptomBotSlice = createSlice({
  name: "symptomBot",
  initialState,
  reducers: {
    setModalVisible: (state, action: PayloadAction<boolean>) => {
      state.isModalOpen = action.payload;
    },
    setExplanationData: (state, action: PayloadAction<any>) => {
      state.ExplanationData = action.payload;
    },
    setSymptomHistoryVisible: (state, action: PayloadAction<boolean>) => {
      state.symptomHistoryVisible = action.payload;
    },
    setRedFlagQuestion: (state, action: PayloadAction<boolean>) => {
      state.redFlagQuestion = action.payload;
    },
    setMessageModalVisible: (state, action: PayloadAction<boolean>) => {
      state.messageModalVisible = action.payload;
    },
    setErrorMessageForRedFlag: (state, action: PayloadAction<boolean>) => {
      state.errorMessageForRedFlag = action.payload;
    },
    setSymptomId: (state, action: PayloadAction<number | null>) => {
      state.symptomId = action.payload;
    },
    setConsecutiveQuestions: (state, action: PayloadAction<any[] | null>) => {
      state.consecutiveQuestions = action.payload;
    },
    setNoOfConsecutiveQuestions: (
      state,
      action: PayloadAction<number | null>
    ) => {
      state.noOfConsecutiveQuestions = action.payload;
    },

    setMultipleQuestions: (state, action: PayloadAction<any[]>) => {
      state.multipleQuestions = action.payload;
    },
    setMultipleQuestionsCompleted: (state, action) => {
      state.multipleQuestionsCompleted = action.payload;
    },
    setCurrentQuestionIndex:(state, action) => {
      state.currentQuestionIndex = action.payload;
    },
    setAnsweredIndexes:(state, action) => {
      state.currentQuestionIndex = action.payload;
    },
  },
});

export const {
  setModalVisible,
  setExplanationData,
  setSymptomHistoryVisible,
  setRedFlagQuestion,
  setMessageModalVisible,
  setErrorMessageForRedFlag,
  setSymptomId,
  setConsecutiveQuestions,
  setNoOfConsecutiveQuestions,
  setMultipleQuestions,
  setMultipleQuestionsCompleted,
  setCurrentQuestionIndex
} = symptomBotSlice.actions;

export default symptomBotSlice.reducer;
