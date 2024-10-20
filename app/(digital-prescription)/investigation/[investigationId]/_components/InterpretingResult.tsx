import React from "react";

interface InterpretingResultProps {
  interpreting_result: {
    male_low_range?: string;
    male_high_range?: string;
    female_low_range?: string;
    female_high_range?: string;
    child_low_range?: string;
    child_high_range?: string;
    pregnent_women_low_range?: string;
    pregnent_women_high_range?: string;
    high?: string;
    high_range_indication?: string;
    low?: string;
    low_range_indication?: string;
    unit_of_measure?: string;
  };
}

const InterpretingResult: React.FC<InterpretingResultProps> = ({
  interpreting_result,
}) => {
  return (
    <div>
      <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
        Reference Ranges
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        {/* Male Range */}
        <div className="p-4 bg-blue-50 rounded-lg shadow-inner">
          <h4 className="text-lg font-semibold text-gray-700 mb-2">
            Male Range
          </h4>
          <p className="text-gray-600">
            <span className="font-medium">Low: </span>
            {interpreting_result?.male_low_range}{" "}
            {interpreting_result?.unit_of_measure}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">High: </span>
            {interpreting_result?.male_high_range}{" "}
            {interpreting_result?.unit_of_measure}
          </p>
        </div>

        {/* Female Range */}
        <div className="p-4 bg-pink-50 rounded-lg shadow-inner">
          <h4 className="text-lg font-semibold text-gray-700 mb-2">
            Female Range
          </h4>
          <p className="text-gray-600">
            <span className="font-medium">Low: </span>
            {interpreting_result?.female_low_range}{" "}
            {interpreting_result?.unit_of_measure}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">High: </span>
            {interpreting_result?.female_high_range}{" "}
            {interpreting_result?.unit_of_measure}
          </p>
        </div>

        {/* Child Range */}
        <div className="p-4 bg-green-50 rounded-lg shadow-inner">
          <h4 className="text-lg font-semibold text-gray-700 mb-2">
            Child Range
          </h4>
          <p className="text-gray-600">
            <span className="font-medium">Low: </span>
            {interpreting_result?.child_low_range}{" "}
            {interpreting_result?.unit_of_measure}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">High: </span>
            {interpreting_result?.child_high_range}{" "}
            {interpreting_result?.unit_of_measure}
          </p>
        </div>

        {/* Pregnant Women Range */}
        <div className="p-4 bg-yellow-50 rounded-lg shadow-inner">
          <h4 className="text-lg font-semibold text-gray-700 mb-2">
            Pregnant Women Range
          </h4>
          <p className="text-gray-600">
            <span className="font-medium">Low: </span>
            {interpreting_result?.pregnent_women_low_range}{" "}
            {interpreting_result?.unit_of_measure}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">High: </span>
            {interpreting_result?.pregnent_women_high_range}{" "}
            {interpreting_result?.unit_of_measure}
          </p>
        </div>
      </div>

      {/* High/Low Indications */}
      <div className="mt-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
          Indications
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-4 bg-red-50 rounded-lg shadow-inner">
            <h4 className="text-lg font-semibold text-red-600 mb-2">
              High Indication
            </h4>
            <p className="text-gray-600">
              <span className="font-medium">Description: </span>
              {interpreting_result?.high}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Health Risk: </span>
              {interpreting_result?.high_range_indication}
            </p>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg shadow-inner">
            <h4 className="text-lg font-semibold text-blue-600 mb-2">
              Low Indication
            </h4>
            <p className="text-gray-600">
              <span className="font-medium">Description: </span>
              {interpreting_result?.low}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Health Risk: </span>
              {interpreting_result?.low_range_indication}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterpretingResult;
