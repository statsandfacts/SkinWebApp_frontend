import CasesDetails from "@/components/DigitalPrescription/PrescriptionOverview/CasesDetails";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { prescriptionStatus: string };
}): Promise<Metadata> {
  const { prescriptionStatus } = params;

  return {
    title: `${prescriptionStatus} Cases`,
  };
}

const GetDataThroughStatus = ({
  params,
}: {
  params: { prescriptionStatus: string };
}) => {
  const { prescriptionStatus } = params;

  return (
    <div>
      <CasesDetails />
    </div>
  );
};

export default GetDataThroughStatus;
