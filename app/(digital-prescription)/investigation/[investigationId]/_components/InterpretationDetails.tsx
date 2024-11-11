import React from "react";
import {
  ArrowDown,
  ArrowUp,
  User,
  Users,
  Baby,
  AlertTriangle,
  CheckCircle,
  Heart,
} from "lucide-react";

type InterpretationDetailsProps = {
  interpretationData?: InterpretationData | null;
};

const InterpretationDetails: React.FC<InterpretationDetailsProps> = ({
  interpretationData,
}) => {
  if (!interpretationData) {
    return (
      <p className="text-center text-gray-600">
        No interpretation data available.
      </p>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {interpretationData.interpretation_dtls.map((item, index) => (
        <div
          key={index}
          className="bg-white shadow-lg rounded-lg p-3 hover:scale-105 cursor-pointer transform transition-transform hover:shadow-xl"
        >
          <h2 className="text-2xl font-semibold mb-2 text-sky-800">
            {item?.name}
          </h2>

          <div className="space-y-2 text-sm text-gray-700">
            {/* Low Range */}
            <p className="flex items-center">
              <strong className="mr-1 text-red-500">Low:</strong>
              {item.interpreting_result?.low ? (
                <span className="text-red-500 flex items-center">
                  <ArrowDown className="mr-1" /> {item.interpreting_result.low}
                </span>
              ) : (
                ""
              )}
            </p>

            {/* High Range */}
            <p className="flex items-center">
              <strong className="mr-1 text-orange-500">High:</strong>
              {item.interpreting_result?.high ? (
                <span className="text-orange-500 flex items-center">
                  <ArrowUp className="mr-1" /> {item.interpreting_result.high}
                </span>
              ) : (
                ""
              )}
            </p>

            {/* Male Range */}
            <p className="flex items-center text-blue-500">
              <User />
              <strong className="mx-1">Male Range:</strong>{" "}
              {item.interpreting_result?.male_low_range ?? ""} -{" "}
              {item.interpreting_result?.male_high_range ?? ""}{" "}
              {item.interpreting_result?.unit_of_measure}
            </p>

            {/* Female Range */}
            <p className="flex items-center text-pink-500">
              <Users />
              <strong className="mx-1">Female Range:</strong>{" "}
              {item.interpreting_result?.female_low_range ?? ""} -{" "}
              {item.interpreting_result?.female_high_range ?? ""}{" "}
              {item.interpreting_result?.unit_of_measure}
            </p>

            {/* Child Range */}
            <p className="flex items-center text-yellow-500">
              <Baby />
              <strong className="mx-1">Child Range:</strong>{" "}
              {item.interpreting_result?.child_low_range ?? ""} -{" "}
              {item.interpreting_result?.child_high_range ?? ""}{" "}
              {item.interpreting_result?.unit_of_measure}
            </p>

            {/* Pregnant Women Range */}
            <p className="flex items-center text-purple-500">
              <Heart />
              <strong className="mx-1">Pregnant Women Range:</strong>{" "}
              {item.interpreting_result?.pregnent_women_low_range ?? ""} -{" "}
              {item.interpreting_result?.pregnent_women_high_range ?? ""}{" "}
              {item.interpreting_result?.unit_of_measure}
            </p>

            {/* High Range Indication Block */}
            <div className="mt-4 p-4 bg-green-100 border-l-8 border-green-500 text-green-800 rounded-lg flex items-start">
              <CheckCircle className="mr-3 text-green-600 w-5 h-5" />
              <div>
                <strong>High Range Indication:</strong>{" "}
                <p>{item.interpreting_result?.high_range_indication || ""}</p>
              </div>
            </div>

            {/* Low Range Indication Block */}
            <div className="mt-4 p-4 bg-red-100 border-l-8 border-red-500 text-red-800 rounded-lg flex items-start">
              <AlertTriangle className="mr-3 text-red-600 w-5 h-5" />
              <div>
                <strong>Low Range Indication:</strong>{" "}
                <p>{item.interpreting_result?.low_range_indication || ""}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InterpretationDetails;
