import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

const HypertensionGuide: React.FC = () => {
  const router = useRouter();
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white shadow-md rounded-lg">
      <button
        onClick={() => router.back()}
        className="flex items-center mb-4 text-blue-600 focus:outline-none"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-1" aria-hidden="true" />
        Back
      </button>
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center text-blue-600">
        Hypertension: A Comprehensive Guide
      </h1>

      <section className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-gray-800">
          What is Hypertension?
        </h2>
        <div className="flex flex-col sm:flex-row gap-6 mb-6">
          <div className="sm:w-2/3">
            <p className="text-gray-700 mb-4 sm:mb-6 leading-relaxed text-justify">
              Hypertension, commonly known as high blood pressure, refers to the
              force exerted by blood against the walls of your arteries. When
              this pressure is consistently high, it strains the heart and blood
              vessels, increasing the risk of heart disease, stroke, and other
              serious health complications.
            </p>
          </div>

          {/* Image on the right side */}
          <div className="sm:w-1/3 flex justify-center sm:justify-end">
            <Image
              src="/digitalPrescription/bp.jpeg"
              alt="Blood Pressure"
              width={300} // Adjust width as needed
              height={300} // Adjust height as needed
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
        <div className="text-gray-700 mb-4 sm:mb-6 leading-relaxed text-justify">
          Blood pressure is measured in millimeters of mercury (mmHg) and is
          represented by two numbers:
        </div>
        <ul className="list-disc pl-4 sm:pl-6 text-gray-700 space-y-2">
          <li>
            <strong>Systolic Pressure:</strong> The top number, which measures
            the pressure in your arteries when your heart beats.
          </li>
          <li>
            <strong>Diastolic Pressure:</strong> The bottom number, which
            measures the pressure in your arteries when your heart rests between
            beats.
          </li>
        </ul>
        <p className="text-gray-700 leading-relaxed text-justify">
          Normal blood pressure is typically below 120/80 mmHg, while
          hypertension is diagnosed when readings consistently exceed 130/80
          mmHg.
        </p>
      </section>

      <section className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-gray-800">
          Test Preparation for Hypertension
        </h2>
        <ul className="list-disc pl-4 sm:pl-6 text-gray-700 space-y-2 leading-relaxed">
          <li>
            Avoid caffeine, alcohol, and smoking at least 30 minutes before your
            test.
          </li>
          <li>
            Use the restroom before the test, as a full bladder can raise blood
            pressure.
          </li>
          <li>
            Sit quietly for 5 minutes before the measurement to stay calm.
          </li>
          <li>Wear loose, comfortable clothing for easy cuff placement.</li>
        </ul>
      </section>

      <section className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-gray-800">
          What You Need to Provide to Your Healthcare Provider
        </h2>
        <ul className="list-disc pl-4 sm:pl-6 text-gray-700 space-y-2 leading-relaxed">
          <li>
            <strong>Medical history:</strong> Share any family history of
            hypertension, heart disease, or related conditions.
          </li>
          <li>
            <strong>Medications and supplements:</strong> List all medications,
            including over-the-counter drugs and supplements.
          </li>
          <li>
            <strong>Lifestyle information:</strong> Discuss your diet, exercise
            habits, and smoking or alcohol consumption.
          </li>
          <li>
            <strong>Symptoms:</strong> Report any symptoms such as headaches,
            dizziness, or chest pain.
          </li>
        </ul>
      </section>

      <section className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-gray-800">
          Understanding Hypertension
        </h2>
        <p className="text-gray-700 mb-4 sm:mb-6 leading-relaxed text-justify">
          Hypertension is often referred to as the &quot;silent killer&quot; because it
          typically has no noticeable symptoms but can lead to serious health
          issues. There are two types:
        </p>
        <ul className="list-disc pl-4 sm:pl-6 text-gray-700 space-y-2">
          <li>
            <strong>Primary Hypertension:</strong> The most common type,
            developing gradually over many years without a clear cause.
          </li>
          <li>
            <strong>Secondary Hypertension:</strong> Caused by an underlying
            condition such as kidney disease or thyroid problems.
          </li>
        </ul>
        <p className="text-gray-700 leading-relaxed text-justify">
          Untreated hypertension can lead to heart disease, stroke, kidney
          damage, vision problems, and cognitive decline.
        </p>
      </section>

      <section className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-gray-800">
          What Does a Hypertension Test Measure?
        </h2>
        <ul className="list-disc pl-4 sm:pl-6 text-gray-700 space-y-2 leading-relaxed">
          <li>
            <strong>Systolic Pressure:</strong> The force your blood exerts
            against artery walls when the heart contracts.
          </li>
          <li>
            <strong>Diastolic Pressure:</strong> The force exerted when the
            heart is at rest between beats.
          </li>
        </ul>
        <p className="text-gray-700 leading-relaxed text-justify">
          Hypertension is classified into stages, with readings of 130-139/80-89
          mmHg being Stage 1 Hypertension, and readings of 140/90 mmHg or higher
          considered Stage 2. A hypertensive crisis occurs when readings exceed
          180/120 mmHg and requires immediate medical attention.
        </p>
      </section>

      <section className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-gray-800">
          FAQ
        </h2>
        <ul className="list-disc pl-4 sm:pl-6 text-gray-700 space-y-2 leading-relaxed">
          <li>
            <strong>Can hypertension be cured?</strong> No, but it can be
            managed with lifestyle changes and medication.
          </li>
          <li>
            <strong>What lifestyle changes help reduce hypertension?</strong>{" "}
            Healthy diet, reducing salt, regular exercise, and managing stress
            can help.
          </li>
          <li>
            <strong>How often should I check my blood pressure?</strong> For
            most adults, annual screenings are enough, but more frequent checks
            may be needed for those with hypertension.
          </li>
          <li>
            <strong>Is hypertension hereditary?</strong> Yes, genetics play a
            role in developing high blood pressure.
          </li>
        </ul>
      </section>

      <section className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-gray-800">
          Conclusion
        </h2>
        <p className="text-gray-700 leading-relaxed text-justify">
          Hypertension is a serious condition, but with regular monitoring,
          treatment, and lifestyle changes, you can manage it effectively. Make
          sure to have regular check-ups and work with your healthcare provider
          to keep your blood pressure under control.
        </p>
      </section>
    </div>
  );
};

export default HypertensionGuide;
