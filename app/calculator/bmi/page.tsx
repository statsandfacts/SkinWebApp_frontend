import BMICalculator from "@/components/Calculator/BMICalculator";
import CommonHeroSection from "@/components/common/CommonHeroSection";
import { siteConfig } from "@/config/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculate Your BMI - Track Your Health",
  description: siteConfig.bmiCalculator.description,
  keywords: siteConfig.bmiCalculator.keywords,
  openGraph: {
    title: "Calculate Your BMI - Track Your Health",
    description: siteConfig.bmiCalculator.description,
    url: "https://nextcare.life/calculator/bmi",
    siteName: siteConfig.name,
    // images: [
    //   {
    //     url: "/vector/calculator_bmi.png",
    //     width: 1200,
    //     height: 630,
    //     alt: "BMI Calculator",
    //   },
    // ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BMI Calculator - Check Your Body Mass Index Today",
    description:
      "Easily calculate your Body Mass Index (BMI) and learn about your health. Use our free BMI Calculator for quick and accurate results.",
    // images: ["/vector/calculator_bmi.png"],
  },
};

const BMICalculatorPage = () => {
  return (
    <>
      <CommonHeroSection
        key={"bmi-calc-hero"}
        title="BMI Calculator"
        subtitle="Calculate your Body Mass Index and learn about your health category."
      />
      <BMICalculator />
    </>
  );
};

export default BMICalculatorPage;
