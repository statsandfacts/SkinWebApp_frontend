import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UploadImage {
  selectedFile: File | any;
  url: any;
  report_type: any;
}

interface SingleDocumentDetails {
  selectedType: string;
  selectedSubType: string | null;
  subTypes: string[];
  uploadImages: UploadImage[];
}

interface StepManagementState {
  step: number;
  documentDetails: any[];
  singleDocumentDetails: SingleDocumentDetails;
  isFirstScreenNextPopoverOpen: boolean;
  isFirstScreenNoPopoverOpen: boolean;
  isTestReportPopoverOpen: boolean;
  isThirdScreenNextPopoverOpen: boolean;
  isUploadMoreReportsPopoverOpen: boolean;
  isSubmitDocumentsPopoverOpen: boolean;
  isViewImagesModal: boolean;
}

const initialState: StepManagementState = {
  step: 0,
  documentDetails: [],
  singleDocumentDetails: {
    selectedType: "Prescription",
    selectedSubType: null,
    subTypes: ["Prescription"],
    uploadImages: [],
  },
  isFirstScreenNextPopoverOpen: false,
  isFirstScreenNoPopoverOpen: false,
  isTestReportPopoverOpen: false,
  isThirdScreenNextPopoverOpen: false,
  isUploadMoreReportsPopoverOpen: false,
  isSubmitDocumentsPopoverOpen: false,
  isViewImagesModal: false
};

const stepManagementSlice = createSlice({
  name: "stepManagement",
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },
    setDocumentDetails: (state, action: PayloadAction<any[]>) => {
      state.documentDetails = action.payload;
    },
    setFirstScreenNextPopoverOpen: (state, action: PayloadAction<boolean>) => {
      state.isFirstScreenNextPopoverOpen = action.payload;
    },
    setFirstScreenNoPopoverOpen: (state, action: PayloadAction<boolean>) => {
      state.isFirstScreenNoPopoverOpen = action.payload;
    },
    setIsTestReportPopoverOpen: (state, action: PayloadAction<boolean>) => {
      state.isTestReportPopoverOpen = action.payload;
    },
    setThirdScreenNextPopoverOpen: (state, action: PayloadAction<boolean>) => {
      state.isThirdScreenNextPopoverOpen = action.payload;
    },
    setUploadMoreReportsPopoverOpen: (state, action: PayloadAction<boolean>) => {
      state.isUploadMoreReportsPopoverOpen = action.payload;
    },
    setSubmitDocumentsPopoverOpen: (state, action: PayloadAction<boolean>) => {
      state.isSubmitDocumentsPopoverOpen = action.payload;
    },
    setViewImagesModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isViewImagesModal = action.payload;
    },
    setSingleDocumentDetails: (state, action: PayloadAction<{ docType: string; data: any }>) => {
      const { docType, data } = action.payload;
      if (docType === "selectType") {
        state.singleDocumentDetails.selectedType = data.label;
        state.singleDocumentDetails.subTypes = data.subtypes;
      } else {
        state.singleDocumentDetails.selectedSubType = data;
      }
    },
    addImageToUploadImages: (state, action: PayloadAction<UploadImage>) => {
      state.singleDocumentDetails.uploadImages.push(action.payload);
    },
    removeImageFromUploadImages: (state, action: PayloadAction<string>) => {
      state.singleDocumentDetails.uploadImages = state.singleDocumentDetails.uploadImages.filter(
        image => image.url !== action.payload
      );
    },

    resetDetailsAfterSubmit: (state) => {
      state.singleDocumentDetails = initialState.singleDocumentDetails
      state.step = initialState.step
    },
  },
});

export const {
  setStep,
  setSingleDocumentDetails,
  setFirstScreenNextPopoverOpen,
  setFirstScreenNoPopoverOpen,
  setIsTestReportPopoverOpen,
  setThirdScreenNextPopoverOpen,
  setUploadMoreReportsPopoverOpen,
  setSubmitDocumentsPopoverOpen,
  setViewImagesModalOpen,
  addImageToUploadImages,
  removeImageFromUploadImages,
  resetDetailsAfterSubmit,
} = stepManagementSlice.actions;

export default stepManagementSlice.reducer;