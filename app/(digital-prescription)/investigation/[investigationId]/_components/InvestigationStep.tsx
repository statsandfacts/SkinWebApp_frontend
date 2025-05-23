"use client";

import PulseOximeterBlog from "./PulseOximeterBlog";
import BMIInfo from "./BMIInfo";
import HypertensionGuide from "./HypertensionGuide";
import InvestigationOverview from "./InvestigationOverview";
import ParameterMapping from "./ParameterMapping";

interface InvestigationStepProps {
  investigationId: string | number;
}

const InvestigationStep = ({ investigationId }: InvestigationStepProps) => {
  const renderComponent = (investigationId: string | number) => {
    if (investigationId === "oxymeter") {
      return <PulseOximeterBlog />;
    } else if (investigationId === "bmi") {
      return <BMIInfo />;
    } else if (investigationId === "hypertension") {
      return <HypertensionGuide />;
    } else if (investigationId === "view-more") {
      return <ParameterMapping />;
    } else {
      return <InvestigationOverview />;
    }
  };

  return <div className="p-6">{renderComponent(investigationId)}</div>;
};

export default InvestigationStep;
