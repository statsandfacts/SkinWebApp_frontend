import { Metadata } from "next";
import SLRModalContent from "@/components/DigitalPrescription/Details/Report/SLRModalContent";

export const metadata: Metadata = {
  title: "Smart Lab Report",
};

const ReportDetailsPage = () => {
  return (
    <div>
      <SLRModalContent />
    </div>
  );
};

export default ReportDetailsPage;
