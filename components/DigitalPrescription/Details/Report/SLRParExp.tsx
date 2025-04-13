"use client";

import React from "react";

type SmartLabItem = {
  parameter_subg_name: string;
  parameter_classification: string;
  what_is_the_test: string;
  how_is_it_performed: string;
  normal_levels: string;
  causes_count: string;
  causes_effect: string;
  prevention: string;
  diet_dos: string;
  diet_donts: string;
};

type Props = {
  data: SmartLabItem[];
};

export default function SLRParExp({ data }: Props) {
  return (
    <div className="mt-10 border-t border-gray-300 pt-6 space-y-10">
      {data.map((item, index) => (
        <div
          key={index}
          className="border border-gray-200 p-6 rounded-lg shadow-sm bg-white"
        >
          <h2 className="text-lg font-bold text-blue-700 mb-4">
            🧪 {item.parameter_subg_name || "N/A"}
          </h2>

          <div className="grid grid-cols-2 gap-x-4 text-sm">
            {/* Section Labels */}
            <div>
              <p className="font-medium mb-3 text-gray-700">Section</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Classification</li>
                <li>What is the Test?</li>
                <li>How is it Performed?</li>
                <li>Normal Levels</li>
                <li>Causes Count</li>
                <li>Causes Effect</li>
                <li>Prevention</li>
                <li>Diet - Dos</li>
                <li>Diet - Donts</li>
              </ul>
            </div>

            {/* Section Content */}
            <div>
              <p className="font-medium mb-3 text-gray-700">Details</p>
              <ul className="list-disc ml-6 space-y-2 text-gray-800">
                <li>{item.parameter_classification || "N/A"}</li>
                <li>{item.what_is_the_test || "N/A"}</li>
                <li>{item.how_is_it_performed || "N/A"}</li>
                <li>{item.normal_levels || "N/A"}</li>
                <li>{item.causes_count || "N/A"}</li>
                <li>{item.causes_effect || "N/A"}</li>
                <li>{item.prevention || "N/A"}</li>
                <li>{item.diet_dos || "N/A"}</li>
                <li>{item.diet_donts || "N/A"}</li>
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
