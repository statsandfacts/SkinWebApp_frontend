import InvestigationStep from "./_components/InvestigationStep";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { investigationId: string | number };
}): Promise<Metadata> {
  const { investigationId } = params;

  return {
    title: `${investigationId}`,
  };
}

const InvestigationDetailPage = ({
  params,
}: {
  params: { investigationId: string | number };
}) => {
  const { investigationId } = params;

  return (
    <div>
      <InvestigationStep investigationId={investigationId} />
    </div>
  );
};

export default InvestigationDetailPage;
