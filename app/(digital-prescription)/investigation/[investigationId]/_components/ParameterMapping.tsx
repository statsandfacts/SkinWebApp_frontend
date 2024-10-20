"use client";

import React from "react";
import MapInvestigationData from "./MapInvestigationData";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const ParameterMapping: React.FC = () => {
  const { subGroupData } = useSelector(
    (state: RootState) => state.drugs
  );

  return (
    <div>
      <div className="flex min-h-screen bg-gray-50 p-6">
        <MapInvestigationData data={subGroupData} />
      </div>
    </div>
  );
};

export default ParameterMapping;
