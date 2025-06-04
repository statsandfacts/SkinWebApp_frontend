import React from 'react';
import { CircleAlert } from "lucide-react";

// Step 1: Define allowed status values
type MarkerStatus = "Normal" | "Borderline" | "Abnormal" | "Very abnormal";

// Step 2: Define marker type
type Marker = {
  name: string;
  value: string;
  unit: string;
  status: MarkerStatus;
  type: string;
};

// Step 3: Typed marker data
const markers: Marker[] = [
  {
    name: "Morning Cortisol",
    value: "24.5",
    unit: "mg/dl",
    status: "Borderline",
    type: 'Stress response indicator',
  },
  {
    name: "Total Testosterone ",
    value: "210",
    unit: "mg/dl",
    status: "Very abnormal",
    type: 'Vital for reproductive and metabolic health',
  },
  {
    name: "TSH",
    value: "0.2",
    unit: "mg/dl",
    status: "Very abnormal",
    type: 'Metabolism regulator',
  },
  {
    name: "Fasting Insulin",
    value: "18",
    unit: "mg/dl",
    status: "Abnormal",
    type: 'Marker for insulin sensitivity',
  },
];

// Step 4: Type-safe status color mapping
const statusColors: Record<MarkerStatus, string> = {
  Normal: "bg-green-600",
  Borderline: "bg-yellow-400",
  Abnormal: "bg-orange-400",
  "Very abnormal": "bg-red-500",
};

export default function HormonalHealth() {
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold text-center text-blue-900 mb-4 flex items-center justify-center gap-2">
        Hormonal Health <CircleAlert className="w-5 h-5 text-blue-700" />
      </h1>

      <div className="bg-red-100 p-4 rounded-2xl shadow text-gray-800 border border-red-200">
        <p><span className="font-bold text-blue-800 text-lg">Nextcare says</span></p>
        <p className="mt-1 text-base">
          Your hormonal profile reflects areas of imbalance that may affect your metabolism, mood, energy levels, and reproductive health. Cortisol (8 am) is elevated at 24.5 µg/dL, indicating potential stress or disrupted circadian rhythm. TSH is slightly low at 0.2 µIU/mL, which could point to an overactive thyroid (hyperthyroidism). On the other hand, Testosterone (total) is low at 210 ng/dL, suggesting reduced anabolic or sexual hormone activity, which may affect muscle mass, mood, or energy. Your Insulin (fasting) level is borderline high at 18 µIU/mL, hinting at early insulin resistance. These patterns indicate a need for deeper endocrine assessment and lifestyle changes to support hormonal regulation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {markers.map((marker, index) => (
          <div
            key={index}
            className="bg-[#F5F9FC] rounded-2xl shadow-lg p-4 flex justify-between items-start min-h-24"
          >
            <div>
              <h3 className="font-bold text-2xl text-gray-500">{marker.name}</h3>
              <p className="italic text-lg text-gray-700">{marker.type}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2">
                <span className="text-sm px-1 py-[1px] rounded-full bg-gray-200 text-gray-700">
                  Lab says: in range
                </span>
                <div className="text-right">
                  <div className="font-semibold text-base text-gray-800">{marker.value}</div>
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
