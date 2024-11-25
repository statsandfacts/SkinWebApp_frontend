import BMRCalculator from "@/components/Calculator/BMRCalculator";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculate Your BMR",
};

const BMRCalculatorPage = () => {
  return (
    <div>
      <BMRCalculator />
    </div>
  );
};

export default BMRCalculatorPage;
