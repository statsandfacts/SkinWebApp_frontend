"use client";
import React from "react";
import Image from "next/image";

const healthCalculators = [
  {
    imageSrc: "/aboutus/bmi.png",
    title: "BMI Calculator",
    description:
      "Calculate your Body Mass Index (BMI) to understand your ideal weight range.",
    link: "/calculator/bmi",
  },
  {
    imageSrc: "/aboutus/bmr.png",
    title: "Calorie Calculator",
    description:
      "Estimate your daily calorie needs based on activity level and goals.",
    link: "/calculator/bmr",
  },
  {
    imageSrc: "/aboutus/blood-pressure.png",
    title: "Heart Health Check",
    description:
      "Evaluate your heart health risk based on key indicators and lifestyle.",
    link: "/calculator/blood-pressure-risk-calculator",
  },
  {
    imageSrc: "/aboutus/dibatis.png",
    title: "Blood Pressure Monitor",
    description: "Track and analyze your blood pressure readings over time.",
    link: "/calculator/pregnancy-due-date",
  },
  {
    imageSrc: "/aboutus/pregancydue.png",
    title: "Pregnancy Due Date",
    description:
      "Predict your baby’s due date based on your last menstrual period.",
    link: "/calculator/diabetes-risk-calculator",
  },
];

const ExploreOurHealthCare = () => {
  return (
    <div className="text-center p-10">
      <h1 className="text-4xl font-bold mb-10">
        Explore Our Health Calculators
      </h1>

      <div className="grid grid-cols-3 gap-6 justify-center items-center">
        {healthCalculators.slice(0, 3).map((calculator, index) => (
          <HealthCalculatorCard
            key={index}
            description={calculator.description}
            imageSrc={calculator.imageSrc}
            title={calculator.title}
          />
        ))}
      </div>

      <div className="flex justify-center gap-6 mt-7">
        {healthCalculators.slice(3, 5).map((calculator, index) => (
          <HealthCalculatorCard
            key={index}
            description={calculator.description}
            imageSrc={calculator.imageSrc}
            title={calculator.title}
          />
        ))}
      </div>
    </div>
  );
};

export default ExploreOurHealthCare;

interface CalculatorProps {
  imageSrc: string;
  title: string;
  description: string;
}

const HealthCalculatorCard: React.FC<CalculatorProps> = ({
  imageSrc,
  title,
  description,
}) => {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-primary-mute shadow-lg p-6 rounded-[30px] flex flex-col items-center text-center w-[320px] h-[250px]">
        <Image
          src={imageSrc}
          alt={title}
          width={60}
          height={60}
          className="mb-4"
        />
        <h2 className="text-xl font-bold">{title}</h2>
        <h3 className="text-lg mt-2">{description}</h3>
      </div>
      <div className="mt-4">
        <button className="bg-primary-lite text-black font-semibold py-2 px-6 rounded-[30px] w-[250px] h-[50px] mt-2">
          Calculate Now
        </button>
      </div>
    </div>
  );
};
