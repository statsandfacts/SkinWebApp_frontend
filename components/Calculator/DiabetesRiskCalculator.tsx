"use client";
import React, { useState } from "react";
import CustomHeader from "../Header/PublicLayoutHeader";

const DiabetesRiskCalculator: React.FC = () => {
  const [age, setAge] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [heightFeet, setHeightFeet] = useState<string>("");
  const [heightInches, setHeightInches] = useState<string>("");
  const [physicalActivity, setPhysicalActivity] = useState<string>("Yes");
  const [familyHistory, setFamilyHistory] = useState<string>("No");
  const [risk, setRisk] = useState<string>("");

  const calculateBMI = (weight: number, heightInMeters: number) => {
    return weight / (heightInMeters * heightInMeters);
  };

  const calculateRisk = (
    bmi: number,
    age: number,
    activity: string,
    family: string
  ): string => {
    let riskScore = 0;

    // Age-based risk
    if (age >= 45) riskScore += 2;

    // BMI-based risk
    if (bmi >= 25 && bmi < 30) riskScore += 2; // Overweight
    if (bmi >= 30) riskScore += 4; // Obese

    // Physical activity risk
    if (activity === "No") riskScore += 1;

    // Family history risk
    if (family === "Yes") riskScore += 3;

    // Determine risk category
    if (riskScore >= 6) return "High Risk";
    if (riskScore >= 3) return "Moderate Risk";
    return "Low Risk";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const weightNum = parseFloat(weight);
    const feetNum = parseFloat(heightFeet);
    const inchesNum = parseFloat(heightInches);
    const ageNum = parseInt(age);

    if (!ageNum || ageNum <= 0) {
      alert("Please enter a valid age.");
      return;
    }

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

    const bmi = calculateBMI(weightNum, totalHeightInMeters);
    const calculatedRisk = calculateRisk(
      bmi,
      ageNum,
      physicalActivity,
      familyHistory
    );
    setRisk(calculatedRisk);
  };

  const resetForm = () => {
    setAge("");
    setWeight("");
    setHeightFeet("");
    setHeightInches("");
    setPhysicalActivity("Yes");
    setFamilyHistory("No");
    setRisk("");
  };

  return (
    <div className="p-10 md:px-40">
      <CustomHeader
        header="Diabetes Risk Calculator"
        subHeader="Assess your risk for developing Type 2 diabetes based on common risk factors."
        imageURL="/vector/calculator_diabetes_risk.png"
      />

      <section className="mt-6 animate-slide-up">
        <p className="text-gray-600 text-center md:text-left">
          This tool provides an estimate of your risk for developing Type 2
          diabetes based on factors such as age, BMI, physical activity, and
          family history.
        </p>

        <div className="mt-10 flex flex-col md:flex-row md:space-x-8">
          {/* Input Section */}
          <div className="bg-white shadow-lg rounded-lg p-6 w-full md:w-1/2">
            <h2 className="text-xl font-bold text-gray-800 mb-4 text-center md:text-left">
              Enter Your Details
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
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
                <label className="block text-gray-700 font-medium">
                  Physical Activity
                </label>
                <select
                  value={physicalActivity}
                  onChange={(e) => setPhysicalActivity(e.target.value)}
                  className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium">
                  Family History of Diabetes
                </label>
                <select
                  value={familyHistory}
                  onChange={(e) => setFamilyHistory(e.target.value)}
                  className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-sky-700 text-white py-2 px-4 rounded-md hover:bg-sky-900 transition duration-200"
              >
                Calculate Risk
              </button>
            </form>
          </div>

          {/* Result Section */}
          <div className="bg-gray-50 shadow-lg rounded-lg p-6 w-full md:w-1/2 mt-6 md:mt-0">
            <h2 className="text-xl font-bold text-gray-800 mb-4 text-center md:text-left">
              Your Risk Level
            </h2>
            {risk ? (
              <div className="text-center md:text-left">
                <p className="text-lg font-medium">
                  Risk Category: <span className="text-sky-700">{risk}</span>
                </p>
                <button
                  onClick={resetForm}
                  className="mt-4 bg-gray-200 text-gray-700 py-1 px-3 rounded-md hover:bg-gray-300 transition duration-200"
                >
                  Reset
                </button>
              </div>
            ) : (
              <p className="text-gray-600 text-center md:text-left">
                Fill in your details to assess your diabetes risk level.
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DiabetesRiskCalculator;
