interface TestTypeObject {
  docType: string;
  images: any;
}
export interface DigitalPrescriptionState {
  prescriptionFor: string;
  patientName: string;
  uploadImages: TestTypeObject[];
  singlePrescriptionDetails: object;
  isViewImageModal: boolean;
  isViewPrescriptionDetailsModal: boolean;
}
