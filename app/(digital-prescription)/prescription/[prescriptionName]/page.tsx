import PrescriptionOverview from "@/components/DigitalPrescription/PrescriptionOverview/PrescriptionOverview";
import type { Metadata } from "next";

function capitalizeWords(str: string) {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
}

export async function generateMetadata({
  params,
}: {
  params: { prescriptionName: string };
}): Promise<Metadata> {
  const { prescriptionName } = params;

  return {
    title: `${capitalizeWords(prescriptionName)}`,
  };
}

const PrescriptionOverViewPage = ({
  params,
}: {
  params: { prescriptionName: string };
}) => {
  const { prescriptionName } = params;

  return (
    <div>
      <PrescriptionOverview medicineName={prescriptionName} />
    </div>
  );
};

export default PrescriptionOverViewPage;
