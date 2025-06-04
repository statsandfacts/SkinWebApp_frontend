import React from "react";
import { CircleAlert } from "lucide-react";

// Define allowed statuses
type MarkerStatus = "Normal" | "Borderline" | "Abnormal" | "Very abnormal";

// Type for each marker
type Marker = {
  name: string;
  value: string;
  unit: string;
  status: MarkerStatus;
  type: string;
};

// Marker data with typed status
const markers: Marker[] = [
  {
    name: "APOB",
    value: "100",
    unit: "mg/dl",
    status: "Normal",
    type: '"Bad" cholesterol indicator',
  },
  {
    name: "HDL cholesterol",
    value: "38",
    unit: "mg/dl",
    status: "Very abnormal",
    type: '"Good" cholesterol',
  },
  {
    name: "LDL Cholesterol",
    value: "92",
    unit: "mg/dl",
    status: "Normal",
    type: "“Bad” cholesterol ",
  },
  {
    name: "VLDL cholesterol",
    value: "24",
    unit: "mg/dl",
    status: "Normal",
    type: "“Good” cholesterol carrier ",
  },
  {
    name: "Triglycerides",
    value: "100",
    unit: "mg/dl",
    status: "Normal",
    type: "Cardio-metabolic health indicator",
  },
  {
    name: "Total cholesterol",
    value: "154",
    unit: "mg/dl",
    status: "Normal",
    type: "“Good” + “Bad” cholesterol ",
  },
  {
    name: "Total Cholesterol: HDL ratio",
    value: "4.05",
    unit: "mg/dl",
    status: "Normal",
    type: '"Bad" cholesterol indicator',
  },
  {
    name: "Lipo-protein(a)",
    value: "6.2",
    unit: "mg/dl",
    status: "Very abnormal",
    type: "Cardiovascular risk indicator",
  },
];

// Color mapping with strict typing
const statusColors: Record<MarkerStatus, string> = {
  Normal: "bg-green-600",
  Borderline: "bg-yellow-400",
  Abnormal: "bg-orange-400",
  "Very abnormal": "bg-red-500",
};

export default function HeartHealth() {
  return (
    <div className="p-8 max-w-6xl mx-auto font-sans">
      <h1 className="text-2xl font-bold text-center text-blue-900 mb-4 flex items-center justify-center gap-2">
        Heart Health <CircleAlert className="w-5 h-5 text-blue-500" />
      </h1>

      <div className="bg-red-100 p-4 rounded-xl shadow-sm mb-6">
        <h2 className="font-semibold text-blue-800 text-xl">Nextcare says</h2>
        <p className="text-base text-gray-700 mt-1">
          Your heart health biomarkers present a mixed picture. Apolipoprotein B
          (APOB) has worsened to 100 mg/dl, though it remains within the lab
          range. HDL Cholesterol has improved to 38 mg/dl, which is a positive
          trend, yet still on the lower end of the spectrum. LDL Cholesterol has
          worsened to 92 mg/dl but is considered good within the fab range.
          Triglycerides are risen at 122 mg/dl suggesting a fair risk.
          Lipoprotein (a) is out of range. Lifestyle modifications are
          recommended, especially considering your family history of heart
          conditions and recent smoking cessation.
        </p>
      </div>

      <div className="flex justify-center gap-4 text-sm font-medium mb-6">
        <span className="flex items-center gap-2">
          <span className="w-20 h-2 rounded bg-green-600"></span>Normal
        </span>
        <span className="flex items-center gap-2">
          <span className="w-20 h-2 rounded bg-yellow-400"></span>Borderline
        </span>
        <span className="flex items-center gap-2">
          <span className="w-20 h-2 rounded bg-orange-400"></span>Abnormal
        </span>
        <span className="flex items-center gap-2">
          <span className="w-20 h-2 rounded bg-red-500"></span>Very abnormal
        </span>
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
