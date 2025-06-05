import DiabetesRiskCalculator from "@/components/Calculator/DiabetesRiskCalculator";
import CommonHeroSection from "@/components/common/CommonHeroSection";
import { siteConfig } from "@/config/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Diabetes Risk Calculator - Assess Your Risk Today",
  description: siteConfig.drCalculator.description,
  keywords: siteConfig.drCalculator.keywords,
  openGraph: {
    title: "Diabetes Risk Calculator - Assess Your Risk Today",
    description: siteConfig.drCalculator.description,
    url: "https://nextcare.life/calculator/diabetes-risk-calculator",
    siteName: siteConfig.name,
    // images: [
    //   {
    //     url: "/vector/calculator_diabetes_risk.png",
    //     width: 1200,
    //     height: 630,
    //     alt: "Diabetes Risk Calculator",
    //   },
    // ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Diabetes Risk Calculator - Know Your Health Status",
    description:
      "Find out your risk for developing diabetes with our free Diabetes Risk Calculator. Get personalized insights and tips to manage your health effectively.",
    // images: ["/vector/calculator_diabetes_risk.png"],
  },
};

const DiabetesRiskCalculatorPage = () => {
  return (
    <>
      <CommonHeroSection
        key={"dr-calc-hero"}
        title="Diabetes Risk Calculator"
        subtitle="Assess your risk for developing Type 2 diabetes based on common risk factors."
      />
      <DiabetesRiskCalculator />
    </>
  );
};

export default DiabetesRiskCalculatorPage;
