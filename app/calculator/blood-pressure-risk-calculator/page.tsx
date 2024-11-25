import BloodPressureCalculator from "@/components/Calculator/BloodPressureCalculator";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculate Your Blood Pressure Risk",
};

const BloodPressureCalculatorPage = () => {
  return (
    <div>
      <BloodPressureCalculator />
    </div>
  );
};

export default BloodPressureCalculatorPage;
