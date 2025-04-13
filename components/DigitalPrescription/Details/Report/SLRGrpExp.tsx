import Image from "next/image";
import React from "react";

type Parameter = {
  type: string;
  name: string;
  value: string;
  range: {
    low: string;
    high: string;
  };
  classification: string;
};

type Group = {
  group_name: string;
  group_id: number;
  dtls: Parameter[];
};

type Props = {
  data: Group[];
};

export default function SLRGrpExp({ data }: Props) {
  const groupIcons: { [key: string]: string } = {
    hemogram: "/smartlabreport/haematology.png",
    "lipid profile": "/smartlabreport/lipidprofile.png",
    "liver function": "/smartlabreport/liverfunction.png",
    "metabolic panel": "/smartlabreport/metabolicpanel.png",
    "iron studies": "/smartlabreport/ironstudies.png",
    "hormonal profile test": "/smartlabreport/hormonalprofiletest.png",
    "renal function test": "/smartlabreport/kidneyfunction.png",
    "arterial and venous blood gas analysis":
      "/smartlabreport/arterialandvenousbloodgasanalysis.png",
    "urin analysis": "/smartlabreport/urineanalysis.png",
  };

  console.log("data==============", data);

  return (
    <div className="space-y-10 mt-6">
      {data.map((group, idx) => {
        const groupName = group.group_name.trim().toLowerCase();
        const iconSrc = groupIcons[groupName];

        return (
          <div
            key={idx}
            className="grid grid-cols-12 gap-6 items-start border-b border-gray-300 pb-6"
          >
            {/* Left Side - Group Icon + Name */}
            <div className="col-span-3 flex flex-col items-center border-r border-dashed border-gray-400 pr-4">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center shadow-md overflow-hidden relative">
                {iconSrc && (
                  <Image
                    src={iconSrc}
                    alt={groupName}
                    fill
                    className="object-cover w-full h-full"
                  />
                )}
              </div>
              <p className="mt-2 text-md font-semibold text-orange-600 uppercase text-center">
                {groupName}
              </p>
            </div>

            {/* Right Side - Parameters */}
            <div className="col-span-9 space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Parameters in {groupName}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {group.dtls.map((param, i) => {
                  let borderColor = "border-gray-300";
                  if (param.classification.includes("very_abnormal")) {
                    borderColor = "border-red-600";
                  } else if (param.classification.includes("abnormal")) {
                    borderColor = "border-yellow-400";
                  } else if (param.classification === "normal") {
                    borderColor = "border-green-500";
                  }

                  return (
                    <div
                      key={i}
                      className={`bg-gray-100 p-3 border-l-4 ${borderColor} shadow-sm rounded-lg`}
                    >
                      <p className="text-sm font-semibold text-gray-700">
                        {param.name}
                      </p>
                      <p className="text-sm text-gray-800">
                        <span className="font-semibold">Value:</span>{" "}
                        <span className="text-blue-600">{param.value}</span>
                      </p>
                      <p className="text-sm text-gray-700">
                        Range: {param.range.low}–{param.range.high}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
