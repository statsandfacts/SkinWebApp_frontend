import BloodPressureCalculator from "@/components/Calculator/BloodPressureCalculator";
import { siteConfig } from "@/config/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculate Your Blood Pressure Risk - Stay Healthy",
  description: siteConfig.bprCalculator.description,
  keywords: siteConfig.bprCalculator.keywords,
  openGraph: {
    title: "Calculate Your Blood Pressure Risk - Stay Healthy",
    description: siteConfig.bprCalculator.description,
    url: "https://nextcare.life/calculator/blood-pressure-risk-calculator",
    siteName: siteConfig.name,
    images: [
      {
        url: "/vector/calculator_blood_pressure_risk.png",
        width: 1200,
        height: 630,
        alt: "Blood Pressure Calculator",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blood Pressure Calculator - Assess Your Risk Today",
    description:
      "Find out your blood pressure risk and get helpful health tips. Start your journey to better health!",
    images: ["/vector/calculator_blood_pressure_risk.png"],
  },
};

const BloodPressureCalculatorPage = () => {
  return (
    <div>
      <BloodPressureCalculator />
    </div>
  );
};

export default BloodPressureCalculatorPage;
