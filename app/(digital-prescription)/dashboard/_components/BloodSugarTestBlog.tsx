"use client";
import { ChevronLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const BloodSugarTestBlog = () => {
  const router = useRouter();
  return (
    <div className="md:max-w-4xl xl:max-w-6xl mx-auto bg-white p-6 md:p-10 ">
      <div>
        <button
          onClick={() => router.back()}
          className="flex justify-center items-center text-slate-600 mb-2 transition ease-in-out duration-200 hover:text-sky-700 hover:translate-x-1"
        >
          <ChevronLeftIcon className="h-4 w-4 transition-transform duration-200 ease-in-out group-hover:-translate-x-1" />
          Back
        </button>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-sky-800 mb-6 text-center">
        Blood Sugar Test Guide
      </h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          What is Diabetes?
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Diabetes is a chronic condition that affects how your body processes
          blood sugar (glucose). High blood sugar levels can lead to serious
          health issues like heart disease, kidney failure, and nerve damage.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Blood Sugar Tests: FBS & PPBS
        </h2>
        <ul className="list-disc pl-5 text-gray-600 space-y-2">
          <li>
            <strong>Fasting Blood Sugar (FBS):</strong> Measures blood sugar
            after an 8-hour fast. Normal:{" "}
            <span className="text-green-500">below 100 mg/dL</span>, Diabetes:
            <span className="text-red-500"> 126 mg/dL or higher</span>.
          </li>
          <li>
            <strong>Postprandial Blood Sugar (PPBS):</strong> Measures blood
            sugar 2 hours after a meal. Normal:{" "}
            <span className="text-green-500">below 140 mg/dL</span>, Diabetes:
            <span className="text-red-500"> above 200 mg/dL</span>.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Test Preparation Tips
        </h2>
        <ul className="list-disc pl-5 text-gray-600 space-y-2">
          <li>
            FBS: Fast for at least 8 hours before the test (only water allowed).
          </li>
          <li>PPBS: Eat a normal meal and test exactly 2 hours later.</li>
          <li>Avoid caffeine, alcohol, and smoking before the test.</li>
          <li>Stay relaxed and stress-free before testing.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Understanding Diabetes Types
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-blue-100 p-4 rounded-md">
            <h3 className="font-semibold text-blue-600">Type 1 Diabetes</h3>
            <p className="text-gray-600 text-sm">
              An autoimmune condition where the body doesn’t produce insulin.
            </p>
          </div>
          <div className="bg-green-100 p-4 rounded-md">
            <h3 className="font-semibold text-green-600">Type 2 Diabetes</h3>
            <p className="text-gray-600 text-sm">
              The most common type, where the body doesn’t use insulin
              effectively.
            </p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-md">
            <h3 className="font-semibold text-yellow-600">
              Gestational Diabetes
            </h3>
            <p className="text-gray-600 text-sm">
              Develops during pregnancy and usually resolves after childbirth.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <div className="bg-gray-100 p-4 rounded-md">
            <h3 className="font-semibold text-gray-800">
              Can diabetes be cured?
            </h3>
            <p className="text-gray-600">
              No, but it can be managed with diet, exercise, and medication.
            </p>
          </div>
          <div className="bg-gray-100 p-4 rounded-md">
            <h3 className="font-semibold text-gray-800">
              What lifestyle changes help?
            </h3>
            <p className="text-gray-600">
              Eat a low-carb diet, exercise regularly, manage stress, and
              control weight.
            </p>
          </div>
          <div className="bg-gray-100 p-4 rounded-md">
            <h3 className="font-semibold text-gray-800">
              Is diabetes hereditary?
            </h3>
            <p className="text-gray-600">
              Yes, genetics can increase the risk of developing diabetes.
            </p>
          </div>
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Conclusion
        </h2>
        <p className="text-gray-600">
          Diabetes is a lifelong condition, but with regular monitoring and
          lifestyle changes, it can be managed effectively. FBS and PPBS tests
          help track blood sugar levels and prevent complications. Work with
          your healthcare provider for the best management plan!
        </p>
      </section>
    </div>
  );
};

export default BloodSugarTestBlog;
