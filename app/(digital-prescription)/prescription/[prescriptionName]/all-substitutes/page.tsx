import ViewAllSubstitutes from "@/components/DigitalPrescription/PrescriptionOverview/ViewAllSubstitutes";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Substitute Medicines",
};

const Page = () => {
  return <ViewAllSubstitutes />;
};

export default Page;
