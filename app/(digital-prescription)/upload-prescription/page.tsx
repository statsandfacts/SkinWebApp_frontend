import type { Metadata } from 'next'
import { UploadPrescription } from "@/components/DigitalPrescription";

export const metadata: Metadata = {
  title: "Digital Prescription"
};

const UploadPrescriptionPage = () => {
  return <div>
    <UploadPrescription />
  </div>;
};

export default UploadPrescriptionPage;
