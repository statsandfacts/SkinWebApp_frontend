"use client";

import React, { useState } from "react";
import Image from "next/image";
import CustomHeader from "../Header/PublicLayoutHeader";
import CalculatorFAQ from "./Faqs";
import { faqHypertension } from "@/utils/calculatorsFaqs";
import BackButton from "../common/BackButton";
import RelatedKeyword from "./RelatedKeyword";

const BloodPressureCalculator: React.FC = () => {
  const [systolic, setSystolic] = useState<string>("");
  const [diastolic, setDiastolic] = useState<string>("");
  const [riskCategory, setRiskCategory] = useState<string>("");
  const [imageURL, setImageURL] = useState<string>("");

  const getRiskCategory = (systolic: number, diastolic: number): string => {
    if (systolic < 90 && diastolic < 60) {
      setImageURL("/calculator/lowbp_image.png");
      return "Low Blood Pressure (Hypotension)";
    } else if (systolic < 120 && diastolic < 80) {
      setImageURL("/calculator/normalbp_image.png");
      return "Normal Blood Pressure";
    } else if (systolic >= 120 && systolic <= 129 && diastolic < 80) {
      setImageURL("/calculator/normalbp_image.png");
      return "Elevated Blood Pressure";
    } else if (
      (systolic >= 130 && systolic <= 139) ||
      (diastolic >= 80 && diastolic <= 89)
    ) {
      setImageURL("/calculator/hypertension_stage1and2.png");
      return "Hypertension Stage 1";
    } else if (systolic >= 140 || diastolic >= 90) {
      setImageURL("/calculator/hypertension_stage1and2.png");
      return "Hypertension Stage 2";
    } else if (systolic >= 180 || diastolic >= 120) {
      setImageURL("/calculator/hypertensive_crisis.png");
      return "Hypertensive Crisis (Seek Emergency Care)";
    }
    return "Invalid Readings";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const systolicNum = parseFloat(systolic);
    const diastolicNum = parseFloat(diastolic);

    if (isNaN(systolicNum) || systolicNum <= 0) {
      alert("Please enter a valid systolic pressure.");
      return;
    }

    if (isNaN(diastolicNum) || diastolicNum <= 0) {
      alert("Please enter a valid diastolic pressure.");
      return;
    }

    const category = getRiskCategory(systolicNum, diastolicNum);
    setRiskCategory(category);
  };

  const resetForm = () => {
    setSystolic("");
    setDiastolic("");
    setRiskCategory("");
    setImageURL("");
  };

  return (
    <div className="p-10 md:px-40">
      <BackButton />

      <section className="mt-6 animate-slide-up">
        <p className="text-gray-600 text-center md:text-left">
          Blood pressure is a vital indicator of your cardiovascular health. Use
          this calculator to determine your risk category based on systolic and
          diastolic pressure readings.
        </p>

        <div className="mt-10 flex flex-col md:flex-row md:space-x-8">
          {/* Form Section */}
          <div className="bg-white shadow-lg rounded-lg p-6 w-full md:w-1/2">
            <h2 className="text-xl font-bold text-gray-800 mb-4 text-center md:text-left">
              Enter Your Blood Pressure Readings
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="systolic"
                  className="block text-gray-700 font-medium"
                >
                  Systolic Pressure (mmHg)
                </label>
                <input
                  type="number"
                  id="systolic"
                  value={systolic}
                  onChange={(e) => setSystolic(e.target.value)}
                  placeholder="Enter systolic pressure"
                  className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="diastolic"
                  className="block text-gray-700 font-medium"
                >
                  Diastolic Pressure (mmHg)
                </label>
                <input
                  type="number"
                  id="diastolic"
                  value={diastolic}
                  onChange={(e) => setDiastolic(e.target.value)}
                  placeholder="Enter diastolic pressure"
                  className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
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
              Your Risk Category
            </h2>

            {riskCategory ? (
              <div className="text-center md:text-left" aria-live="polite">
                <p className="text-lg font-medium text-sky-700">
                  {riskCategory}
                </p>
                {/* Centered Image */}
                {imageURL && (
                  <div className="flex justify-center">
                    <Image
                      src={imageURL}
                      alt={riskCategory}
                      width={300}
                      height={200}
                      priority
                      className="mx-auto"
                    />
                  </div>
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
                Enter your blood pressure readings to see your risk category.
              </p>
            )}
          </div>
        </div>
      </section>
      <RelatedKeyword keyword="blood_pressure_risk" />
      <CalculatorFAQ faqs={faqHypertension} />
    </div>
  );
};

export default BloodPressureCalculator;
