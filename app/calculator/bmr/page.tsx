import BMRCalculator from "@/components/Calculator/BMRCalculator";
import { siteConfig } from "@/config/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculate Your BMR - Understand Your Calorie Needs",
  description: siteConfig.bmrCalculator.description,
  keywords: siteConfig.bmrCalculator.keywords,
  openGraph: {
    title: "Calculate Your BMR - Understand Your Calorie Needs",
    description: siteConfig.bmrCalculator.description,
    url: "https://nextcare.life/calculator/bmr",
    siteName: siteConfig.name,
    images: [
      {
        url: "/vector/calculator_bmr.png",
        width: 1200,
        height: 630,
        alt: "BMR Calculator",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BMR Calculator - Calculate Your Basal Metabolic Rate",
    description:
      "Discover your Basal Metabolic Rate (BMR) and daily calorie needs. Use our free BMR Calculator for personalized health insights.",
    images: ["/vector/calculator_bmr.png"],
  },
};

const BMRCalculatorPage = () => {
  return (
    <div>
      <BMRCalculator />
    </div>
  );
};

export default BMRCalculatorPage;
