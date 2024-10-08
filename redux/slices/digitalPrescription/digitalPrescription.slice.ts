import { DigitalPrescriptionState } from "@/types/digitalPrescription/image";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: DigitalPrescriptionState = {
  prescriptionFor: "forMe",
  patientName: "",
  uploadImages: [],
  singlePrescriptionDetails: {},
  singleCaseDetails: {},
  isViewImageModal: false,
  isViewReportModal: false,
  isReuploadModal: false,
  isViewPrescriptionDetailsModal: false,
};

const digitalPrescriptionSlice = createSlice({
  name: "digitalPrescription",
  initialState,
  reducers: {
    uploadImage: (
      state,
      action: PayloadAction<{ docType: string; image: [] }>
    ) => {
      const { docType, image } = action.payload;
      const testTypeObject = state.uploadImages.find(
        (item) => item.docType === docType
      );

      if (testTypeObject) {
        testTypeObject.images = [...testTypeObject.images, ...image];
      } else {
        state.uploadImages.push({ docType, images: image });
      }
    },
    clearImages: (state, action) => {
      state.uploadImages = action.payload;
    },

    deleteImage: (
      state,
      action: PayloadAction<{ docType: string; imageName: string }>
    ) => {
      // const { docType, imageName } = action.payload;
      // const testTypeObject = state.uploadImages.find(
      //   (item) => item.docType === docType
      // );

      // if (testTypeObject) {
      //   testTypeObject.images = testTypeObject.images.filter(
      //     (img: any) => img.name !== imageName
      //   );
      // }
    },
    updatePatientFor: (
      state,
      action: PayloadAction<{ prescriptionFor: string }>
    ) => {
      const { prescriptionFor } = action.payload;
      state.prescriptionFor = prescriptionFor;
    },
    updatePatientDetail: (
      state,
      action: PayloadAction<{ patientName: string }>
    ) => {
      const { patientName } = action.payload;
      state.patientName = patientName;
    },
    setViewOriginalImageModal: (state, action) => {
      state.isViewImageModal = action.payload;
    },
    setViewUploadedReportModal: (state, action) => {
      state.isViewReportModal = action.payload;
    },
    setReuploadModal: (state, action) => {
      state.isReuploadModal = action.payload;
    },
    setViewPrescriptionDetailsModal: (state, action) => {
      state.isViewPrescriptionDetailsModal = action.payload;
    },
    setSingleCaseDetails: (state, action) => {
      state.singleCaseDetails = action.payload;
    },
    setSinglePrescriptionDetails: (state, action) => {
      state.singlePrescriptionDetails = action.payload;
    },

    resetPrescription: (state) => {
      state.uploadImages = initialState.uploadImages;
      state.prescriptionFor = initialState.prescriptionFor;
      state.patientName = initialState.patientName;
    },
  },
});

export const {
  uploadImage,
  clearImages,
  deleteImage,
  updatePatientFor,
  updatePatientDetail,
  resetPrescription,
  setViewOriginalImageModal,
  setViewPrescriptionDetailsModal,
  setSinglePrescriptionDetails,
  setViewUploadedReportModal,
  setReuploadModal,
  setSingleCaseDetails,
} = digitalPrescriptionSlice.actions;

export default digitalPrescriptionSlice.reducer;
