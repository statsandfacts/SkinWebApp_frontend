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
    "vitamin profile": "/smartlabreports/group_vitaminsprofile.png",
    "antenatal/prenatal screen":
      "/smartlabreports/group_antenatalprenatalscreen.png",
    "lipid profile": "/smartlabreports/group_lipidprofile.png",
    "liver function test(lft)": "/smartlabreports/group_liverfunction.png",
    "metabolic panel": "/smartlabreports/group_metabolicpanel.png",
    "tumor markers": "/smartlabreports/group_tumormarkers.png",
    "iron studies": "/smartlabreports/group_ironstudies.png",
    "hormonal profile tests": "/smartlabreports/group_hormonalprofiletest.png",
    "renal function test(rft)": "/smartlabreports/group_renalfunction.png",
    "arterial and venous blood gas analysis":
      "/smartlabreports/group_arterialandvenousbloodgasanalysis.png",
    "urine analysis": "/smartlabreports/group_urineanalysis.png",
    "hemogram(cbc)": "/smartlabreports/group_haematology.png",
  };

  return (
    <div className="space-y-10 mt-6">
      <h2 className="text-xl w-full flex justify-center items-center font-bold text-primary">
        📊 Your important parameters at a glance
      </h2>
      {data.map((group, idx) => {
        const groupName = group.group_name.trim().toLowerCase();
        const iconSrc = groupIcons[groupName];

        return (
          <div
            key={idx}
            className="grid grid-cols-12 gap-6 items-start border-b border-gray-300 pb-3"
          >
            {/* Left Side - Group Icon + Name */}
            <div className="col-span-3 flex flex-col justify-center items-center border-r border-dashed border-gray-400 pr-4">
              <div className="w-16 h-16 p-2 rounded-full bg-blue-100 flex items-center justify-center shadow-md overflow-hidden relative">
                {iconSrc && (
                  <Image src={iconSrc} alt={groupName} height={60} width={60} />
                )}
              </div>
              <p className="mt-2 text-md font-semibold text-primary uppercase text-center">
                {groupName}
              </p>
            </div>

            {/* Right Side - Parameters */}
            <div className="col-span-9 space-y-2">
              <h3 className="text-base font-semibold text-gray-800">
                Parameters in {groupName}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {group.dtls.map((param, i) => {
                  let borderColor = "border-gray-300";
                  if (
                    ["high_abnormal", "low_abnormal"].includes(
                      param.classification
                    )
                  ) {
                    borderColor = "border-red-400";
                  } else if (
                    ["high_borderline", "low_borderline"].includes(
                      param.classification
                    )
                  ) {
                    borderColor = "border-yellow-400";
                  } else if (param.classification === "normal") {
                    borderColor = "border-green-500";
                  } else if (
                    ["high_very_abnormal", "low_very_abnormal"].includes(
                      param.classification
                    )
                  ) {
                    borderColor = "border-red-600";
                  }
                  return (
                    <div
                      key={i}
                      className={`bg-gray-100 p-3 border-l-4 ${borderColor} shadow-sm rounded-lg`}
                    >
                      <p className="text-sm font-semibold text-gray-700">
                        {param.name}
                      </p>
                      <p className="text-sm text-slate-800">
                        <span className="font-semibold">Value:</span>{" "}
                        <span className="text-primary font-bold">
                          {param.value}
                        </span>
                      </p>
                      <p className="text-sm font-normal text-slate-700">
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
      <div className="flex justify-center items-center gap-3">
        <div className="font-semibold flex items-center text-green-500 gap-1">
          <div className="h-4 w-4 shadow-sm shadow-green-500 rounded-full bg-green-500"></div>
          Normal
        </div>
        <div className="font-semibold flex items-center text-yellow-500 gap-1">
          <div className="h-4 w-4 shadow-sm shadow-yellow-500 rounded-full bg-yellow-500"></div>
          Borderline (±10%)
        </div>
        <div className="font-semibold flex items-center text-red-500 gap-1">
          <div className="h-4 w-4 shadow-sm shadow-red-500 rounded-full bg-red-500"></div>
          Abnormal (10–20%)
        </div>
        <div className="font-semibold flex items-center text-red-800 gap-1">
          <div className="h-4 w-4 shadow-sm shadow-red-800 rounded-full bg-red-800"></div>
          Very Abnormal (&gt;20%)
        </div>
      </div>
    </div>
  );
}
