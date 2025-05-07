"use client";
import Link from "next/link";
import React from "react";

export const SLRDtls = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-8">
      <h1 className="text-4xl md:text-5xl font-extrabold text-primary">
        Smart Lab Reports
      </h1>
      <p className="text-xl text-gray-600 font-medium">
        Your Health, Smarter. Simpler. Sooner.
      </p>

      <p className="text-md text-gray-700 max-w-2xl mx-auto">
        Welcome to the future of medical diagnostics. <br />
        <span className="font-medium text-gray-800">
          Smart Lab Reports
        </span>{" "}
        transforms complex lab data into clear, personalized insights — so you
        can understand your health like never before.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 text-left">
        <div className="flex items-start space-x-3 bg-blue-50 p-4 rounded-xl shadow-sm">
          <span className="text-2xl">🔬</span>
          <p className="font-semibold text-blue-900">AI-Powered Analysis</p>
        </div>
        <div className="flex items-start space-x-3 bg-indigo-50 p-4 rounded-xl shadow-sm">
          <span className="text-2xl">📊</span>
          <p className="font-semibold text-indigo-900">Visualized Reports</p>
        </div>
        <div className="flex items-start space-x-3 bg-green-50 p-4 rounded-xl shadow-sm">
          <span className="text-2xl">💡</span>
          <p className="font-semibold text-green-900">
            Actionable Recommendations
          </p>
        </div>
        <div className="flex items-start space-x-3 bg-purple-50 p-4 rounded-xl shadow-sm">
          <span className="text-2xl">📱</span>
          <p className="font-semibold text-purple-900">
            Accessible Anywhere, Anytime
          </p>
        </div>
      </div>

      <p className="text-md text-gray-700 max-w-2xl mx-auto pt-4">
        Whether you&apos;re a{" "}
        <span className="font-medium text-gray-800">patient</span>,{" "}
        <span className="font-medium text-gray-800">doctor</span>, or{" "}
        <span className="font-medium text-gray-800">health provider</span>,
        Smart Lab Reports is here to simplify medical data and empower better
        decisions.
      </p>

      {/* <div className="pt-6">
        <p className="text-lg font-semibold text-red-600 animate-pulse">
          🚀 Launching Soon!
        </p>
        <p className="text-gray-600">
          We’re almost ready to change the way you experience lab reports.
          <br />
          <span className="font-medium text-gray-800">
            Stay tuned — something smart is coming your way!
          </span>
        </p>
      </div> */}
      <div className="pt-8">
        <Link href="/upload-prescription" passHref>
          <div className="inline-block bg-primary text-white text-lg font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-primary-dark transition duration-300 cursor-pointer">
            🚀 Try Smart Lab Reports Now
          </div>
        </Link>
        <p className="text-sm text-gray-500 mt-2">
          Experience a smarter, clearer view of your health data today.
        </p>
      </div>
    </div>
  );
};
