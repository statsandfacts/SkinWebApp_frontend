"use client";
import React from "react";

const testResults = [
  {
    testName: "Vitamin D 25 - Hydroxy",
    result: "9.18",
    unit: "ng/mL",
    lowRange: "20",
    highRange: "50",
    classification: "Low",
  },
  {
    testName: "Vitamin B12",
    result: "332.30",
    unit: "pg/mL",
    lowRange: "200",
    highRange: "900",
    classification: "Normal",
  },
  {
    testName: "Glucose",
    result: "100",
    unit: "mg/dL",
    lowRange: "70",
    highRange: "100",
    borderlineRange: "100-125",
    classification: "Borderline",
  },
  {
    testName: "Total Cholesterol",
    result: "172.10",
    unit: "mg/dL",
    lowRange: "125",
    highRange: "200",
    classification: "Normal",
  },
];

const DigitalLabReport = () => {
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-2 rounded-lg">
        <div>
          <h3 className="text-sm font-semibold text-gray-700">Name</h3>
          <p className="text-gray-600 text-sm"> Mr. SIDHARTH MOHANTY</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-700">Accession No</h3>
          <p className="text-gray-600 text-sm">2000C07920242200005</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-700">Basic Info</h3>
          <p className="text-gray-600 text-sm">34 Y | Male</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-700">Date of Test</h3>
          <p className="text-gray-600 text-sm">October 20, 2024</p>
        </div>
      </div>

      {/* Test Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-3">
        {testResults.map((test, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg shadow-md ${
              test.classification === "Low"
                ? "bg-red-100"
                : test.classification === "High"
                ? "bg-yellow-100"
                : test.classification === "Borderline"
                ? "bg-yellow-50"
                : "bg-green-100"
            }`}
          >
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              {test.testName}
            </h3>
            <p className="text-gray-600 text-sm mb-1">
              Result: <span className="font-medium">{test.result}</span>{" "}
              {test.unit}
            </p>
            <p className="text-gray-600 text-sm mb-1">
              Reference Range: {test.lowRange} - {test.highRange} {test.unit}
            </p>
            <p
              className={`text-sm font-medium ${
                test.classification === "Low"
                  ? "text-red-600"
                  : test.classification === "High"
                  ? "text-yellow-600"
                  : test.classification === "Borderline"
                  ? "text-yellow-600"
                  : "text-green-600"
              }`}
            >
              {test.classification}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DigitalLabReport;
