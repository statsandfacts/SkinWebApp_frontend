import PrescriptionDetailPage from "@/components/DigitalPrescription/Details/PrescriptionDetailsPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Dashboard",
};

const Prescriptions = () => {
  return (
    <div>
      <PrescriptionDetailPage />
    </div>
  );
};

export default Prescriptions;
