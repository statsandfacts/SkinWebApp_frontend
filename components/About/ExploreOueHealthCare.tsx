"use client";
import React from "react";
import Image from "next/image";

const healthCalculators = [
  {
    imageSrc: "/aboutus/bmi.png",
    title: "BMI Calculator",
    description:
      "Calculate your Body Mass Index (BMI) to understand your ideal weight range.",
  },
  {
    imageSrc: "/aboutus/bmr.png",
    title: "Calorie Calculator",
    description:
      "Estimate your daily calorie needs based on activity level and goals.",
  },
  {
    imageSrc: "/aboutus/blood-pressure.png",
    title: "Heart Health Check",
    description:
      "Evaluate your heart health risk based on key indicators and lifestyle.",
  },
  {
    imageSrc: "/aboutus/dibatis.png",
    title: "Blood Pressure Monitor",
    description: "Track and analyze your blood pressure readings over time.",
  },
  {
    imageSrc: "/aboutus/pregancydue.png",
    title: "Pregnancy Due Date",
    description:
      "Predict your baby’s due date based on your last menstrual period.",
  },
];

const ExploreOurHealthCare = () => {
  return (
    <div className="text-center p-10">
      <h1 className="text-4xl font-bold mb-10">
        Explore Our Health Calculators
      </h1>

      {/* Grid Layout */}
      <div className="grid grid-cols-3 gap-6 justify-center items-center">
        {healthCalculators.slice(0, 3).map((calculator, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="bg-[#B4DFE9] shadow-lg p-6 rounded-[30px] flex flex-col items-center text-center w-[320px] h-[250px]">
              <Image
                src={calculator.imageSrc}
                alt={calculator.title}
                width={60}
                height={60}
                className="mb-4"
              />
              <h2 className="text-xl font-bold">{calculator.title}</h2>
              <h3 className="text-lg mt-2">{calculator.description}</h3>
            </div>
            <div className="mt-4">
              <button className="bg-[#B4DFE9] text-black font-semibold py-2 px-6 rounded-[30px] w-[250px] h-[50px] mt-2">
                Calculate Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Centered Second Row */}
      <div className="grid grid-cols-3 justify-center items-center mt-6">
        <div className="col-span-3 flex justify-center gap-6">
          {healthCalculators.slice(3, 5).map((calculator, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="bg-[#B4DFE9] shadow-lg p-6 rounded-[30px] flex flex-col items-center text-center w-[320px] h-[250px]">
                <Image
                  src={calculator.imageSrc}
                  alt={calculator.title}
                  width={60}
                  height={60}
                  className="mb-4"
                />
                <h2 className="text-xl font-bold">{calculator.title}</h2>
                <h3 className="text-lg mt-2">{calculator.description}</h3>
              </div>
              <div className="mt-4">
                <button className="bg-[#B4DFE9] text-black font-semibold py-2 px-6 rounded-[30px] w-[250px] h-[50px] mt-2">
                  Calculate Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExploreOurHealthCare;
