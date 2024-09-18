import type { Metadata } from 'next'
import { UploadPrescription } from "@/components/DigitalPrescription";

export const metadata: Metadata = {
  title: "Digital Prescription"
};

const UploadPrescriptionPage = () => {
  return <>
    <UploadPrescription />
  </>;
};

export default UploadPrescriptionPage;
