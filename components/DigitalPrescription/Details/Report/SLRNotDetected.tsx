"use client";
import React from "react";

type NotDetectedItem = {
  parameter_id: number;
  parameter_name: string;
  type: string;
  value: string;
};

type Props = {
  data: NotDetectedItem[];
};

export default function SLRNotDetected({ data }: Props) {
  if (!data || data.length === 0) return null;

  return (
    <div className="ml-6 mt-6 space-y-6">
      <h2 className="text-xl font-bold text-sky-800">
        🚫 Not Detected Parameters
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {data.map((item, index) => (
          <div
            key={index}
            className="bg-gray-100 p-4 rounded-lg shadow-sm border border-gray-300"
          >
            <p className="text-sm font-semibold text-gray-700">
              {item?.parameter_name}
            </p>
            <p className="text-sm text-sky-700 font-medium">{item?.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
