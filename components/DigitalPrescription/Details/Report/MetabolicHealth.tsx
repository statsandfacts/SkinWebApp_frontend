import React from 'react';
import { CircleAlert } from "lucide-react";

// Define allowed marker status values
type MarkerStatus = "Normal" | "Borderline" | "Abnormal" | "Very abnormal";

// Marker type definition
type Marker = {
  name: string;
  value: string;
  unit: string;
  status: MarkerStatus;
  type: string;
};

// Markers data (typed)
const markers: Marker[] = [
  {
    name: "Morning Cortisol",
    value: "12",
    unit: "mg/dl",
    status: "Normal",
    type: 'Stress response indicator',
  },
  {
    name: "% Haemoglobin A1C",
    value: "5.3%",
    unit: "mg/dl",
    status: "Normal",
    type: 'Long-term blood sugar check',
  },
  {
    name: "High- sensitivity CRP",
    value: "0.64",
    unit: "mg/dl",
    status: "Normal",
    type: 'Inflammation indicator',
  },
  {
    name: "C-Peptide",
    value: "1.74",
    unit: "mg/dl",
    status: "Normal",
    type: 'Insulin production marker',
  },
  {
    name: "Triglycerides: HDL ratio",
    value: "3.21",
    unit: "mg/dl",
    status: "Borderline",
    type: 'Insulin resistance indicator',
  },
  {
    name: "TSH",
    value: "2.21",
    unit: "mg/dl",
    status: "Normal",
    type: 'Metabolism regulator',
  },
  {
    name: "Albumin",
    value: "4.2",
    unit: "mg/dl",
    status: "Normal",
    type: 'Liver function indicator',
  },
];

// Status to color mapping with strict type
const statusColors: Record<MarkerStatus, string> = {
  Normal: "bg-green-600",
  Borderline: "bg-yellow-400",
  Abnormal: "bg-orange-400",
  "Very abnormal": "bg-red-500",
};

export default function MetabolicHealth() {
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold text-center text-blue-900 mb-4 flex items-center justify-center gap-2">
        Metabolic Health <CircleAlert className="w-5 h-5 text-blue-700" />
      </h1>

      <div className="bg-red-100 p-4 rounded-2xl shadow text-gray-800 border border-red-200">
        <p><span className="font-bold text-blue-800 text-lg">Nextcare says</span></p>
        <p className="mt-1 text-base">
          In terms of metabolic health, your Morning Cortisol level is 12 ug/dl. and remains optimal, suggesting good adrenal function. Hemoglobin A1C has worsened to 5.3%, indicating a slight increase in blood sugar levels, yet still within a healthy range. C-Peptide has improved to 1.74 ng/mL, reflecting better insulin production. The Triglycerides:HDL Ratio is stable at 3.21, close to the upper limit, suggesting a need for monitoring. Albumin has improved to 4.2 g/dl, indicating good liver function and nutritional status. These markers suggest a balanced metabolic profile, though attention to diet and exercise is advised given your recent smoking history.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {markers.map((marker, index) => (
          <div
            key={index}
            className="bg-[#F5F9FC] rounded-2xl shadow-lg p-4 flex justify-between items-start min-h-24"
          >
            <div>
              <h3 className="font-bold text-2xl text-gray-500">
                {marker.name}
              </h3>
              <p className="italic text-lg text-gray-700">{marker.type}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2">
                <span className="text-sm px-1 py-[1px] rounded-full bg-gray-200 text-gray-700">
                  Lab says: in range
                </span>
                <div className="text-right">
                  <div className="font-semibold text-base text-gray-800">
                    {marker.value}
                  </div>
                  <div className="text-sm text-gray-600">{marker.unit}</div>
                </div>
              </div>

              <div
                className={`mt-1 h-2 rounded-full w-28 ${statusColors[marker.status]}`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
