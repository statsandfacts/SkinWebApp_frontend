"use client";
import React, { useState } from "react";
import CustomHeader from "../Header/PublicLayoutHeader";
import { toast } from "react-toastify";
import CalculatorFAQ from "./Faqs";
import { bmrData } from "@/utils/calculatorsFaqs";
import BackButton from "../common/BackButton";
import Image from "next/image";
import RelatedKeyword from "./RelatedKeyword";

const BMRCalculator: React.FC = () => {
  const [weight, setWeight] = useState<string>("");
  const [heightFeet, setHeightFeet] = useState<string>("");
  const [heightInches, setHeightInches] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [gender, setGender] = useState<string>("male");
  const [bmr, setBmr] = useState<number | null>(null);

  const calculateBMR = (
    weight: number,
    heightInMeters: number,
    age: number,
    gender: string
  ) => {
    // Convert weight to kg, height to cm, and calculate BMR using Mifflin-St Jeor Equation
    const heightInCm = heightInMeters * 100;
    if (gender === "male") {
      return Math.round(10 * weight + 6.25 * heightInCm - 5 * age + 5);
    } else {
      return Math.round(10 * weight + 6.25 * heightInCm - 5 * age - 161);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const weightNum = parseFloat(weight);
    const feetNum = parseFloat(heightFeet);
    const inchesNum = parseFloat(heightInches);
    const ageNum = parseInt(age, 10);

    // Validation
    if (!weightNum || weightNum <= 0) {
      toast.error("Please enter a valid weight in kilograms.");
      return;
    }

    if ((!feetNum && feetNum !== 0) || (!inchesNum && inchesNum !== 0)) {
      toast.error("Please enter a valid height in feet and inches.");
      return;
    }

    if (!ageNum || ageNum <= 0) {
      toast.error("Please enter a valid age.");
      return;
    }

    const totalHeightInMeters = (feetNum * 12 + inchesNum) * 0.0254;

    if (totalHeightInMeters <= 0) {
      toast.error("Height must be greater than zero.");
      return;
    }

    const calculatedBMR = calculateBMR(
      weightNum,
      totalHeightInMeters,
      ageNum,
      gender
    );
    setBmr(calculatedBMR);
  };

  const resetForm = () => {
    setWeight("");
    setHeightFeet("");
    setHeightInches("");
    setAge("");
    setGender("male");
    setBmr(null);
  };

  return (
    <div className="p-10 md:px-40">
      <BackButton />
      <CustomHeader
        header="BMR Calculator"
        subHeader="Calculate your Basal Metabolic Rate to understand your body's energy needs."
        imageURL="/calculator/bmrcalculator_headerimage.png"
      />

      <section className="mt-6 animate-slide-up">
        <p className="text-gray-600 text-center md:text-left">
          Basal Metabolic Rate (BMR) represents the number of calories your body
          needs to maintain basic functions like breathing and circulation.
        </p>

        <div className="mt-10 flex flex-col md:flex-row md:space-x-8">
          <div className="bg-white shadow-lg rounded-lg p-6 w-full md:w-1/2">
            <h2 className="text-xl font-bold text-gray-800 mb-4 text-center md:text-left">
              Calculate Your BMR
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
              <div>
                <label
                  htmlFor="age"
                  className="block text-gray-700 font-medium"
                >
                  Age (years)
                </label>
                <input
                  type="number"
                  id="age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Enter your age"
                  className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="gender"
                  className="block text-gray-700 font-medium"
                >
                  Gender
                </label>
                <select
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-sky-700 text-white py-2 px-4 rounded-md hover:bg-sky-900 transition duration-200"
              >
                Calculate BMR
              </button>
            </form>
          </div>

          {/* Result Section */}
          <div className="bg-gray-50 shadow-lg rounded-lg p-6 w-full md:w-1/2 mt-6 md:mt-0">
            <h2 className="text-xl font-bold text-gray-800 mb-4 text-center md:text-left">
              Your BMR Result
            </h2>
            {bmr !== null ? (
              <div className="text-center md:text-left">
                <p className="text-lg font-medium">
                  Your BMR: <span className="text-sky-700">{bmr} kcal/day</span>
                </p>

                <Image
                  src="/calculator/bmrcalculator_image.png"
                  alt="BMR Result"
                  width={328} // Adjust based on your needs
                  height={328} // Adjust based on your needs
                  className="mx-auto flex justify-center items-center"
                />

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
      <RelatedKeyword keyword="bmr" />
      <CalculatorFAQ faqs={bmrData} />
    </div>
  );
};

export default BMRCalculator;
