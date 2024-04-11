import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CounterState {
  currentStep: number;
  answers: any;
  disableNext: boolean;
  photoUploadEnable: boolean;
  uploadImages: String[];
}

const initialState: CounterState = {
  currentStep: 0,
  answers: {},
  disableNext: true,
  photoUploadEnable: false,
  uploadImages: [],
};

export const counterSlice = createSlice({
  name: 'questionary',
  initialState,
  reducers: {
    increaseStep: (state) => {
      state.currentStep += 1;
    },
    decreaseStep: (state) => {
      state.currentStep -= 1;
    },
    setAnswers: (state, action: PayloadAction<any>) => {
      state.answers[action.payload.id] = action.payload.value;
    },
    setDisableNext: (state, action: PayloadAction<boolean>) => {
      state.disableNext = action.payload;
    },
    setPhotoUploadEnable: (state, action: PayloadAction<boolean>) => {
      state.photoUploadEnable = action.payload;
    },
    uploadImages: (state, action: PayloadAction<any>) => {
      state.uploadImages.push(action.payload);
    },
    deleteImages: (state, action: PayloadAction<string>) => {
      const imageName = action.payload;

      // Find image index by name
      const imageIndex = state.uploadImages.findIndex(
        (image) => image === imageName
      );

      // Check if image exists
      if (imageIndex === -1) {
        console.warn(`Image with name: ${imageName} not found.`);
        return state;
      }

      // Remove image using filter method (immutable update)
      const newImages = state.uploadImages.filter(
        (image, index) => index !== imageIndex
      );
      return { ...state, uploadImages: newImages };
    },
    resetQuestions: (state) => {
      state.currentStep = 0;
      state.answers = {};
      state.disableNext = true;
      state.photoUploadEnable = false;
      state.uploadImages = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  increaseStep,
  decreaseStep,
  setAnswers,
  setDisableNext,
  setPhotoUploadEnable,
  uploadImages,
  deleteImages,
  resetQuestions,
} = counterSlice.actions;

export default counterSlice.reducer;
