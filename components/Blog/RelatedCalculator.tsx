"use client";

import React from "react";
import Link from "next/link";

const calculatorMap: {
  [key: string]: { label: string; href: string; r_key: string };
} = {
  bmi: {
    label: "BMI Calculator",
    href: "/calculator/bmi",
    r_key: "bmi",
  },
  bmr: {
    label: "BMR Calculator",
    href: "/calculator/bmr",
    r_key: "bmr",
  },
  blood_pressure: {
    label: "Blood Pressure Risk Calculator",
    href: "/calculator/blood-pressure-risk-calculator",
    r_key: "blood_pressure_risk",
  },
  pregnancy: {
    label: "Pregnancy Due Date Calculator",
    href: "/calculator/pregnancy-due-date",
    r_key: "pregnancy_due_date",
  },
  diabetes: {
    label: "Diabetes Risk Calculator",
    href: "/calculator/diabetes-risk-calculator",
    r_key: "diabetes_risk",
  },
};

const RelatedCalculator = ({ keywords }: { keywords: string[] }) => {
  const matchedCalculators = keywords.flatMap((keyword) => {
    const match = Object.values(calculatorMap).find(
      (item) =>
        item.r_key === keyword.trim() ||
        item.label.toLowerCase().includes(keyword.trim().toLowerCase())
    );
    return match ? [match] : [];
  });

  if (matchedCalculators.length === 0) return null;

  return (
    <div className="border rounded-lg p-4 mt-6">
      <h2 className="text-lg font-semibold text-center text-slate-700 mb-4">
        Related Calculators
      </h2>
      <div className="flex flex-col items-center gap-2">
        {matchedCalculators.map((calc, index) => (
          <Link
            key={index}
            href={calc.href}
            className="text-sky-700 hover:underline"
          >
            {calc.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedCalculator;
