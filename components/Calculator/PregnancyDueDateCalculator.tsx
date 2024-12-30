"use client";
import React, { useState } from "react";
import CustomHeader from "../Header/PublicLayoutHeader";
import CalculatorFAQ from "./Faqs";
import { faqPregnancyDueDate } from "@/utils/calculatorsFaqs";

const PregnancyDueDateCalculator: React.FC = () => {
  const [lmp, setLmp] = useState<string>(""); // Last Menstrual Period
  const [dueDate, setDueDate] = useState<string>("");

  const calculateDueDate = (lmpDate: Date): string => {
    // Add 280 days (40 weeks) to the LMP date
    const dueDate = new Date(lmpDate);
    dueDate.setDate(dueDate.getDate() + 280);
    return dueDate.toDateString();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!lmp) {
      alert("Please select your Last Menstrual Period (LMP) date.");
      return;
    }

    const lmpDate = new Date(lmp);
    if (isNaN(lmpDate.getTime())) {
      alert("Please enter a valid date.");
      return;
    }

    const estimatedDueDate = calculateDueDate(lmpDate);
    setDueDate(estimatedDueDate);
  };

  const resetForm = () => {
    setLmp("");
    setDueDate("");
  };

  return (
    <div className="p-10 md:px-40">
      <CustomHeader
        header="Pregnancy Due Date Calculator"
        subHeader="Estimate your baby's due date using your Last Menstrual Period (LMP)."
        imageURL="/vector/calculator_pregnancy_due_date.png"
      />

      <section className="mt-6 animate-slide-up">
        <p className="text-gray-600 text-center md:text-left">
          Your estimated due date is 40 weeks (280 days) from the first day of
          your last menstrual period (LMP). This calculation assumes a regular
          28-day menstrual cycle.
        </p>

        <div className="mt-10 flex flex-col md:flex-row md:space-x-8">
          <div className="bg-white shadow-lg rounded-lg p-6 w-full md:w-1/2">
            <h2 className="text-xl font-bold text-gray-800 mb-4 text-center md:text-left">
              Enter Your Last Menstrual Period (LMP)
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="lmp"
                  className="block text-gray-700 font-medium"
                >
                  Last Menstrual Period (LMP)
                </label>
                <input
                  type="date"
                  id="lmp"
                  value={lmp}
                  onChange={(e) => setLmp(e.target.value)}
                  className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-sky-700 text-white py-2 px-4 rounded-md hover:bg-sky-900 transition duration-200"
              >
                Calculate Due Date
              </button>
            </form>
          </div>

          {/* Result Section */}
          <div className="bg-gray-50 shadow-lg rounded-lg p-6 w-full md:w-1/2 mt-6 md:mt-0">
            <h2 className="text-xl font-bold text-gray-800 mb-4 text-center md:text-left">
              Your Estimated Due Date
            </h2>
            {dueDate ? (
              <div className="text-center md:text-left">
                <p className="text-lg font-medium">
                  Your Due Date: <span className="text-sky-700">{dueDate}</span>
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
                Enter your Last Menstrual Period (LMP) to calculate your due
                date.
              </p>
            )}
          </div>
        </div>
      </section>

      <CalculatorFAQ faqs={faqPregnancyDueDate} />
    </div>
  );
};

export default PregnancyDueDateCalculator;
