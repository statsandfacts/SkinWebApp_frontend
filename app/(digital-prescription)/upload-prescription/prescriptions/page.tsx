import PrescriptionDetailPage from "@/components/DigitalPrescription/Details/PrescriptionDetailsPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prescriptions",
};

const Prescriptions = () => {
  return (
    <>
      <PrescriptionDetailPage />
    </>
  );
};

export default Prescriptions;
