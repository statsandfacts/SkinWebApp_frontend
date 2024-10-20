"use client";
import React from "react";

const testResults = [
  {
    testName: "Vitamin D 25 - Hydroxy",
    result: "9.18",
    unit: "ng/mL",
    lowRange: "20",
    highRange: "50",
    classification: "Abnormal", // Below 20 ng/mL is considered low, so this is abnormal.
  },
  {
    testName: "Vitamin B12",
    result: "332.30",
    unit: "pg/mL",
    lowRange: "200",
    highRange: "900",
    classification: "Normal", // 332.30 pg/mL is within the normal range.
  },
  {
    testName: "Glucose",
    result: "100",
    unit: "mg/dL",
    lowRange: "70",
    highRange: "100",
    borderlineRange: "100-125", // 100-125 mg/dL is prediabetic.
    classification: "Borderline", // Exactly 100 mg/dL, so it's borderline.
  },
  {
    testName: "Total Cholesterol",
    result: "172.10",
    unit: "mg/dL",
    lowRange: "125",
    highRange: "200",
    classification: "Normal", // 172.10 mg/dL is within normal range.
  },
  {
    testName: "Triglycerides",
    result: "138.40",
    unit: "mg/dL",
    lowRange: "0",
    highRange: "150",
    classification: "Normal", // Normal range: < 150 mg/dL.
  },
  {
    testName: "LDL Cholesterol",
    result: "116.70",
    unit: "mg/dL",
    lowRange: "0",
    highRange: "100",
    borderlineRange: "100-129",
    classification: "Borderline", // 100-129 mg/dL is borderline high.
  },
  {
    testName: "HDL Cholesterol",
    result: "43.90",
    unit: "mg/dL",
    lowRange: "40",
    highRange: "60",
    classification: "Normal", // 43.90 mg/dL is within normal range.
  },
  {
    testName: "VLDL Cholesterol",
    result: "27.68",
    unit: "mg/dL",
    lowRange: "5",
    highRange: "40",
    classification: "Normal", // Normal VLDL range: 5-40 mg/dL.
  },
  {
    testName: "HDL Cholesterol",
    result: "128.20",
    unit: "mg/dL",
    lowRange: "40",
    highRange: "60",
    classification: "Abnormal", // > 60 mg/dL is considered protective, but 128.20 is very high.
  },
  {
    testName: "Total Cholesterol",
    result: "3.92",
    unit: "mg/dL",
    lowRange: "125",
    highRange: "200",
    classification: "Abnormal", // Extremely low, outside normal range.
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
      <div className="max-h-[340px] overflow-y-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-3">
          {testResults.map((test, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg shadow-md h-full flex flex-col justify-between ${
                test.classification === "Abnormal"
                  ? "bg-red-100"
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
                Reference Range:
                <span className="font-medium ml-1">
                  {test.lowRange} - {test.highRange} {test.unit}
                </span>
              </p>

              <p
                className={`text-sm font-medium ${
                  test.classification === "Abnormal"
                    ? "text-red-600"
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
    </div>
  );
};

export default DigitalLabReport;
