import PregnancyDueDateCalculator from "@/components/Calculator/PregnancyDueDateCalculator";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculate Your Pregnancy Due Date",
};

const PregnancyDueDateCalculatorPage = () => {
  return (
    <div>
      <PregnancyDueDateCalculator />
    </div>
  );
};

export default PregnancyDueDateCalculatorPage;
