import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

const PulseOximeterBlog: React.FC = () => {
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
        Pulse Oximeter: Your Complete Guide
      </h1>

      <div className="flex flex-col sm:flex-row items-center sm:items-start mb-6 gap-6">
        <p className="sm:w-2/3 mb-4 sm:mb-6 text-gray-700 text-justify leading-relaxed">
          A Pulse Oximeter is a small non-invasive device designed to measure
          the oxygen saturation level (SpO2) in your blood and your heart rate.
          It&apos;s a critical tool used in healthcare settings and by individuals at
          home to monitor respiratory and cardiovascular health. Whether you&apos;re
          managing a chronic health condition or looking to keep tabs on your
          wellness, a pulse oximeter can be an essential part of your toolkit.
        </p>

        {/* Image on the right side for larger screens */}
        <div className="sm:w-1/3 flex justify-center sm:justify-end">
          <Image
            src={"/digitalPrescription/oxymeter.jpeg"}
            alt="Pulse Oximeter"
            width={300} // Adjust width as needed
            height={300} // Adjust height as needed
            className="rounded-lg shadow-md"
          />
        </div>
      </div>

      <section className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-gray-800">
          What is a Pulse Oximeter?
        </h2>
        <p className="text-gray-700 mb-4 sm:mb-6 leading-relaxed text-justify">
          A Pulse Oximeter is a clip-like device typically placed on a finger,
          toe, or earlobe. It shines light through your skin to measure how much
          oxygen your blood is carrying. The device detects changes in blood
          oxygen levels and your pulse rate, providing instant feedback on your
          overall health.
        </p>
      </section>

      <section className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-gray-800">
          Test Preparation
        </h2>
        <ul className="list-disc pl-4 sm:pl-6 text-gray-700 space-y-2 leading-relaxed">
          <li>Stay Still: Movement can interfere with the reading.</li>
          <li>
            Warm Fingers: Cold hands may affect the accuracy of the reading.
          </li>
          <li>
            Avoid Nail Polish: Remove dark nail polish or artificial nails as
            they can distort results.
          </li>
        </ul>
      </section>

      <section className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-gray-800">
          Understanding the Pulse Oximeter
        </h2>
        <p className="text-gray-700 mb-4 sm:mb-6 leading-relaxed text-justify">
          A pulse oximeter works using light wavelengths that pass through your
          skin and blood. It measures how oxygenated and deoxygenated blood
          absorb light. Based on this, it estimates your blood oxygen saturation
          and pulse rate, which are critical indicators of how well oxygen is
          being transported throughout your body.
        </p>

        <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-800">
          Blood Oxygen Saturation (SpO2)
        </h3>
        <p className="text-gray-700 mb-4 leading-relaxed text-justify">
          SpO2 refers to the percentage of oxygen-carrying red blood cells in
          your bloodstream. A typical reading is between 95% and 100%. Lower
          levels may indicate insufficient oxygen.
        </p>

        <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-800">
          Pulse Rate
        </h3>
        <p className="text-gray-700 leading-relaxed text-justify">
          It measures your heart rate, providing insights into cardiovascular
          health.
        </p>
      </section>

      <section className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-gray-800">
          Uses of a Pulse Oximeter
        </h2>
        <ul className="list-disc pl-4 sm:pl-6 text-gray-700 space-y-2 leading-relaxed">
          <li>Chronic Respiratory Conditions (COPD, asthma, etc.)</li>
          <li>Sleep Apnea</li>
          <li>COVID-19 Monitoring</li>
          <li>Post-Surgical Monitoring</li>
          <li>High-Altitude Fitness</li>
        </ul>
      </section>

      <section className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-gray-800">
          What Does a Pulse Oximeter Measure?
        </h2>
        <ul className="list-disc pl-4 sm:pl-6 text-gray-700 space-y-2 leading-relaxed">
          <li>
            <strong>Oxygen Saturation (SpO2):</strong> Gauges how much oxygen is
            in your bloodstream. Readings below 90% may require medical
            attention.
          </li>
          <li>
            <strong>Pulse Rate:</strong> The number of heartbeats per minute,
            offering real-time monitoring.
          </li>
        </ul>
      </section>

      <section className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-gray-800">
          FAQ
        </h2>
        <ul className="list-disc pl-4 sm:pl-6 text-gray-700 space-y-2 leading-relaxed">
          <li>
            <strong>What is a normal oxygen saturation level?</strong> Normal
            levels fall between 95% and 100%. Levels below 90% require medical
            attention.
          </li>
          <li>
            <strong>How accurate is a pulse oximeter?</strong> Typically
            accurate within a 2% margin of error. Factors like cold hands or
            nail polish may affect accuracy.
          </li>
          <li>
            <strong>Can I use a pulse oximeter at home?</strong> Yes, they are
            commonly used for monitoring chronic conditions or respiratory
            illnesses.
          </li>
          <li>
            <strong>What should I do if my oxygen level is low?</strong> If
            readings fall below 90%, seek medical help immediately.
          </li>
          <li>
            <strong>Can a pulse oximeter replace a doctor&apos;s diagnosis?</strong>{" "}
            No, it is a helpful tool but does not replace professional medical
            advice.
          </li>
        </ul>
      </section>

      <section className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-gray-800">
          Conclusion
        </h2>
        <p className="text-gray-700 leading-relaxed text-justify">
          A pulse oximeter is a valuable tool for tracking your blood oxygen
          levels and heart rate, especially for those with chronic conditions.
          It&apos;s simple, non-invasive, and offers real-time insights into your
          health.
        </p>
      </section>
    </div>
  );
};

export default PulseOximeterBlog;
