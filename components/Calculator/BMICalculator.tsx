"use client";
import React, { useState } from "react";
import CustomHeader from "../Header/PublicLayoutHeader";
import { useRouter } from "next/navigation";
import CalculatorFAQ from "./Faqs";
import { bmiData } from "@/utils/calculatorsFaqs";
import BackButton from "../common/BackButton";
import Image from "next/image";
import RelatedKeyword from "./RelatedKeyword";

const BMICalculator: React.FC = () => {
  const router = useRouter();
  const [weight, setWeight] = useState<string>("");
  const [heightFeet, setHeightFeet] = useState<string>("");
  const [heightInches, setHeightInches] = useState<string>("");
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState<string>("");

  const calculateBMI = (weight: number, heightInMeters: number) => {
    const bmiValue = weight / (heightInMeters * heightInMeters);
    return parseFloat(bmiValue.toFixed(2));
  };

  const getCategory = (bmi: number): string => {
    if (bmi < 18.5) return "Underweight";
    if (bmi >= 18.5 && bmi < 24.9) return "Normal weight";
    if (bmi >= 25 && bmi < 29.9) return "Overweight";
    return "Obese";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const weightNum = parseFloat(weight);
    const feetNum = parseFloat(heightFeet);
    const inchesNum = parseFloat(heightInches);

    if (!weightNum || weightNum <= 0) {
      alert("Please enter a valid weight in kilograms.");
      return;
    }

    if ((!feetNum && feetNum !== 0) || (!inchesNum && inchesNum !== 0)) {
      alert("Please enter a valid height in feet and inches.");
      return;
    }

    const totalHeightInMeters = (feetNum * 12 + inchesNum) * 0.0254;

    if (totalHeightInMeters <= 0) {
      alert("Height must be greater than zero.");
      return;
    }

    const calculatedBMI = calculateBMI(weightNum, totalHeightInMeters);
    setBmi(calculatedBMI);
    setCategory(getCategory(calculatedBMI));
  };

  const resetForm = () => {
    setWeight("");
    setHeightFeet("");
    setHeightInches("");
    setBmi(null);
    setCategory("");
  };

  const bmiImages: { [key: string]: string } = {
    Underweight: "/calculator/Under_Weight.png",
    "Normal weight": "/calculator/Normal_weight.png",
    Overweight: "/calculator/Overweight_image.png",
    Obese: "/calculator/Obesity.png",
  };

  return (
    <div className="p-10 md:px-40">
      <BackButton />
      <section className="mt-6 animate-slide-up">
        <p className="text-gray-600 text-center md:text-left">
          Body Mass Index (BMI) is a way to measure body fat using your height
          and weight. It works for adult men and women.
        </p>
        <button
          className="text-sky-600 hover:text-sky-700 hover:underline text-sm"
          onClick={() => router.push("/investigation/bmi")}
        >
          View more
        </button>

        {/* Main Calculator Section */}
        <div className="mt-10 flex flex-col md:flex-row md:space-x-8">
          <div className="bg-white shadow-lg rounded-lg p-6 w-full md:w-1/2">
            <h2 className="text-xl font-bold text-gray-800 mb-4 text-center md:text-left">
              Discover Your BMI: Input Your Weight and Height Below
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="weight"
                  className="block text-gray-700 font-medium"
                >
                  Weight (kg)
                </label>
                <input
                  type="number"
                  id="weight"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="Enter your weight"
                  className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="heightFeet"
                  className="block text-gray-700 font-medium"
                >
                  Height (feet and inches)
                </label>
                <div className="flex space-x-2 mt-2">
                  <input
                    type="number"
                    id="heightFeet"
                    value={heightFeet}
                    onChange={(e) => setHeightFeet(e.target.value)}
                    placeholder="Feet"
                    className="w-1/2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                  <input
                    type="number"
                    id="heightInches"
                    value={heightInches}
                    onChange={(e) => setHeightInches(e.target.value)}
                    placeholder="Inches"
                    className="w-1/2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-sky-700 text-white py-2 px-4 rounded-md hover:bg-sky-900 transition duration-200"
              >
                Calculate BMI
              </button>
            </form>
          </div>

          {/* Result Section */}
          <div className="bg-gray-50 shadow-lg rounded-lg p-6 w-full md:w-1/2 mt-6 md:mt-0">
            <h2 className="text-xl font-bold text-gray-800 mb-4 text-center md:text-left">
              Your BMI Result
            </h2>
            {bmi !== null ? (
              <div className="text-center md:text-left">
                <p className="text-lg font-medium">
                  Your BMI: <span className="text-sky-700">{bmi}</span>
                </p>
                <p className="text-sm text-gray-700 mt-2">
                  Category: {category}
                </p>

                {category && bmiImages[category] && (
                  <Image
                    src={bmiImages[category]}
                    alt={category}
                    width={260}
                    height={260}
                    className="mx-auto mt-4"
                  />
                )}

                <button
                  onClick={resetForm}
                  className="mt-4 bg-gray-200 text-gray-700 py-1 px-3 rounded-md hover:bg-gray-300 transition duration-200"
                >
                  Reset
                </button>
              </div>
            ) : (
              <p className="text-gray-600 text-center md:text-left">
                Enter your details to see the result.
              </p>
            )}
          </div>
        </div>
      </section>
      <RelatedKeyword keyword="bmi" />
      <CalculatorFAQ faqs={bmiData} />
    </div>
  );
};

export default BMICalculator;
