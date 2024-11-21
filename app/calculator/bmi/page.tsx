import BMICalculator from "@/components/Calculator/BMICalculator";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculate Your BMI",
};

const BMICalculatorPage = () => {
  return (
    <div>
      <BMICalculator />
    </div>
  );
};

export default BMICalculatorPage;
