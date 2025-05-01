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
  const classificationStyles: Record<string, { bg: string; text: string }> = {
    normal: { bg: "bg-green-600", text: "text-green-600" },
    high_borderline: { bg: "bg-yellow-400", text: "text-yellow-400" },
    low_borderline: { bg: "bg-yellow-400", text: "text-yellow-400" },
    high_abnormal: { bg: "bg-[#e85852]", text: "text-[#e85852]" },
    low_abnormal: { bg: "bg-[#e85852]", text: "text-[#e85852]" },
    high_very_abnormal: { bg: "bg-[#9f2b00]", text: "text-[#9f2b00]" },
    low_very_abnormal: { bg: "bg-[#9f2b00]", text: "text-[#9f2b00]" },
  };

  return (
    <div className="mt-10 pt-6">
      <h2 className="text-xl w-full flex justify-center items-center font-bold text-primary">
        🧾 Detailed Parameter Insights
      </h2>
      <small className="text-gray-500 w-full flex justify-center items-center font-light text-sm mb-4">
        Understand what each test means, why it matters, and what to do next.
      </small>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item, index) => {
          const styles = classificationStyles[
            item.parameter_classification
          ] || {
            bg: "bg-gray-300",
            text: "text-gray-600",
          };

          return (
            <div
              key={index}
              className="border border-gray-200 p-6 h-fit rounded-lg shadow-lg bg-white transition-all hover:shadow-xl"
            >
              <div className="flex items-center text-primary font-semibold text-xs gap-1">
                Status:{" "}
                <div className={`h-4 w-4 rounded-full ${styles.bg}`}></div>{" "}
                <span className={`capitalize ${styles.text}`}>
                  {item?.parameter_classification?.replaceAll("_", " ") ||
                    "N/A"}
                </span>
              </div>

              <h2 className="text-xl font-bold text-sky-800 mb-4 flex items-center space-x-2">
                <span>{item.parameter_subg_name || "N/A"}</span>
              </h2>

              <div className="space-y-3 text-gray-800">
                <div>
                  <h3 className="font-semibold text-lg text-slate-700">
                    🔬 What is the Test?
                  </h3>
                  <p className="text-sm text-gray-700">
                    {item.what_is_the_test || "N/A"}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg text-slate-600">
                    🧫 How is it Performed?
                  </h3>
                  <p className="text-sm text-gray-700">
                    {item.how_is_it_performed || "N/A"}
                  </p>
                </div>

                {item.parameter_classification === "normal" ? (
                  item.normal_levels && (
                    <div>
                      <h3 className="font-semibold text-lg text-green-600">
                        📈 Normal Levels
                      </h3>
                      <p className="text-sm text-gray-700">
                        {item.normal_levels}
                      </p>
                    </div>
                  )
                ) : (
                  <>
                    {item.causes_count && (
                      <div>
                        <h3 className="font-semibold text-lg text-red-600">
                          ⚠️ Causes (Count)
                        </h3>
                        <p className="text-sm text-gray-700">
                          {item.causes_count}
                        </p>
                      </div>
                    )}

                    {item.causes_effect && (
                      <div>
                        <h3 className="font-semibold text-lg text-red-600">
                          💥 Causes Effect
                        </h3>
                        <p className="text-sm text-gray-700">
                          {item.causes_effect}
                        </p>
                      </div>
                    )}

                    {item.prevention && (
                      <div>
                        <h3 className="font-semibold text-lg text-yellow-600">
                          🛡️ Prevention
                        </h3>
                        <p className="text-sm text-gray-700">
                          {item.prevention}
                        </p>
                      </div>
                    )}

                    <div>
                      <h3 className="font-semibold text-lg text-teal-600">
                        ✅ Diet - Dos
                      </h3>
                      <p className="text-sm text-gray-700">
                        {item.diet_dos || "N/A"}
                      </p>
                    </div>

                    <div>
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
          );
        })}
      </div>
    </div>
  );
}
