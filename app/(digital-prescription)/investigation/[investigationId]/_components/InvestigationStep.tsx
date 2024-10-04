"use client";

import { useParams } from "next/navigation";
import PulseOximeterBlog from "./PulseOximeterBlog";
import BMIInfo from "./BMIInfo";
import HypertensionGuide from "./HypertensionGuide";

const InvestigationStep = () => {
  const { investigationId } = useParams();
  const renderComponent = (investigationId: string | string[]) => {
    if (investigationId === "oxymeter") {
      return <PulseOximeterBlog />;
    } else if (investigationId === "bmi") {
      return <BMIInfo />;
    } else if (investigationId === "hypertension") {
      return <HypertensionGuide />;
    }
  };
  return <div className="p-6">{renderComponent(investigationId)}</div>;
};

export default InvestigationStep;
