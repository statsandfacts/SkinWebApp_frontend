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
    <div className="mt-10 pt-6 space-y-12">
      {data.map((item, index) => (
        <div
          key={index}
          className="border border-gray-200 p-6 rounded-lg shadow-lg bg-white transition-all hover:shadow-xl"
        >
          <h2 className="text-2xl font-bold text-blue-800 mb-4 flex items-center space-x-2">
            <span role="img" aria-label="test">
              🧪
            </span>
            <span>{item.parameter_subg_name || "N/A"}</span>
          </h2>

          <div className="space-y-6 text-gray-800">
            <div className="space-y-2">
              <h3 className="font-semibold text-lg text-blue-600">
                🔬 What is the Test?
              </h3>
              <p className="text-sm text-gray-700">
                {item.what_is_the_test || "N/A"}
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-lg text-green-600">
                🧫 How is it Performed?
              </h3>
              <p className="text-sm text-gray-700">
                {item.how_is_it_performed || "N/A"}
              </p>
            </div>

            {item.parameter_classification === "normal" ? (
              <div className="space-y-2">
                <h3 className="font-semibold text-lg text-orange-600">
                  📈 Normal Levels
                </h3>
                <p className="text-sm text-gray-700">
                  {item.normal_levels || "N/A"}
                </p>
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg text-red-600">
                    ⚠️ Causes (Count)
                  </h3>
                  <p className="text-sm text-gray-700">
                    {item.causes_count || "N/A"}
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-lg text-red-600">
                    💥 Causes Effect
                  </h3>
                  <p className="text-sm text-gray-700">
                    {item.causes_effect || "N/A"}
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-lg text-yellow-600">
                    🛡️ Prevention
                  </h3>
                  <p className="text-sm text-gray-700">
                    {item.prevention || "N/A"}
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-lg text-teal-600">
                    ✅ Diet - Dos
                  </h3>
                  <p className="text-sm text-gray-700">
                    {item.diet_dos || "N/A"}
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-lg text-teal-600">
                    🚫 Diet - Don&apos;ts
                  </h3>
                  <p className="text-sm text-gray-700">
                    {item.diet_donts || "N/A"}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
