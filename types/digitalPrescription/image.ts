interface TestTypeObject {
  docType: string;
  images: any;
}
export interface DigitalPrescriptionState {
  prescriptionFor: string;
  patientName: string;
  uploadImages: TestTypeObject[];
  singlePrescriptionDetails: object;
  singleCaseDetails: object;
  isViewImageModal: boolean;
  isViewPrescriptionDetailsModal: boolean;
  isViewReportModal: boolean;
  isReuploadModal: boolean;
  viewSmartLabReportModal: boolean;
}
