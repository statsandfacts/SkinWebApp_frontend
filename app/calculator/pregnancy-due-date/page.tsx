import PregnancyDueDateCalculator from "@/components/Calculator/PregnancyDueDateCalculator";
import { siteConfig } from "@/config/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pregnancy Due Date Calculator - Know Your Baby's Arrival Date",
  description: siteConfig.pddCalculator.description,
  keywords: siteConfig.pddCalculator.keywords,
  openGraph: {
    title: "Pregnancy Due Date Calculator - Plan for Your Baby's Arrival",
    description: siteConfig.pddCalculator.description,
    url: "https://nextcare.life/calculator/pregnancy-due-date",
    siteName: siteConfig.name,
    images: [
      {
        url: "/vector/calculator_pregnancy_due_date.png",
        width: 1200,
        height: 630,
        alt: "Pregnancy Due Date Calculator",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pregnancy Due Date Calculator - Know Your Baby's Due Date",
    description:
      "Easily calculate your baby's due date with our free Pregnancy Due Date Calculator. Plan for the exciting journey ahead with accurate results.",
    images: ["/vector/calculator_pregnancy_due_date.png"],
  },
};

const PregnancyDueDateCalculatorPage = () => {
  return (
    <div>
      <PregnancyDueDateCalculator />
    </div>
  );
};

export default PregnancyDueDateCalculatorPage;
