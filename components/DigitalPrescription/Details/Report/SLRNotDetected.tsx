"use client";
import React, { useState } from "react";

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
  const [showAll, setShowAll] = useState(false);

  if (!data || data.length === 0) return null;

  const displayedData = showAll ? data : data.slice(0, 6);

  return (
    <div className="w-full flex justify-center">
  <div className="ml-6 mt-6 space-y-4 max-w-2xl w-full">
    <h2 className="text-xl font-bold text-sky-800 text-center">
      Not Detected Parameters
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 shadow-sm">
      {displayedData.map((item, index) => (
        <div
          key={item.parameter_id}
          className="bg-sky-100 p-4 rounded-lg shadow-sm border border-gray-300"
        >
          <p className="text-sm font-semibold text-gray-700">
            {item.parameter_name}
          </p>
          <p className="text-sm text-sky-700 font-medium">{item.value}</p>
        </div>
      ))}
    </div>

    {data.length > 6 && (
      <div className="w-full flex justify-end">
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-sm text-sky-700 font-medium hover:underline"
        >
          {showAll ? "View Less" : "View All"}
        </button>
      </div>
    )}
  </div>
</div>

  );
}
