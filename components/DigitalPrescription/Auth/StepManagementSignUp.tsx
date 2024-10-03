"use client";

import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import {
  CollectPassword,
  CollectPhone,
  CollectPrescriptionImage,
  CollectSignUpData,
} from "./Steps";
import ChoosePrescriptionType from "../UploadPrescription/Steps/ChoosePrescriptionType";
import ChoosePrescSubType from "../UploadPrescription/Steps/ChoosePrescSubType";

const StepManagement = () => {
  const { step } = useSelector((state: RootState) => state.auth);

  const returnSteps = (step: number) => {
    switch (step) {
      case 0:
        return <CollectPhone />;
      case 1:
        return <ChoosePrescriptionType />;
      case 2:
        return <ChoosePrescSubType />;
      case 3:
        return <CollectPrescriptionImage />;
      case 4:
        return <CollectSignUpData />;
      case 5:
        return <CollectPassword />;
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center justify-center w-full md:w-96 min-h-screen max-h-fit">
      {returnSteps(step)}
    </div>
  );
};

export default StepManagement;
