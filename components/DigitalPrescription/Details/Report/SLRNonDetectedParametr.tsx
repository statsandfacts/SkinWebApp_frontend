import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

type Result = {
  parameter_name?: string;
  sub_parameter_name?: string;
  value: string;
};

export default function NonDetectedParameter() {
  const results = useSelector(
    (state: RootState) =>
      state.userDashboard.singleReport.data?.data?.slr_res
        ?.not_detected_results as Result[] | undefined
  ) ?? [];

  if (results.length === 0) {
    return <div className="p-6 ml-40">No undetected parameters found.</div>;
  }

  return (
    <div className="p-6 justify-center items-center ml-40">
      <h2 className="text-2xl font-semibold text-center text-primary mb-6">
        Not Detected Parameters
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 justify-items-center">
        {results.map((item, index) => {
          const name = item.parameter_name || item.sub_parameter_name;
          if (!name) return null;
          return (
            <div
              key={index}
              className="bg-blue-100 rounded-2xl shadow-lg w-48 h-32 flex flex-col justify-center items-center"
            >
              <p className="font-bold text-primary text-lg">{name}</p>
              <p className="text-gray-700 text-lg">{item.value}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
