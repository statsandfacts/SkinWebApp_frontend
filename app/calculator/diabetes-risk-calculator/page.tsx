import DiabetesRiskCalculator from "@/components/Calculator/DiabetesRiskCalculator";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculate Your Diabetes Risk",
};

const DiabetesRiskCalculatorPage = () => {
  return (
    <div>
      <DiabetesRiskCalculator />
    </div>
  );
};

export default DiabetesRiskCalculatorPage;
