"use client";

import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import {
  CollectPassword,
  CollectPhone,
  CollectPrescriptionImage,
  CollectSignUpData,
} from "./Steps";

const StepManagement = () => {
  const { step } = useSelector((state: RootState) => state.auth);

  const returnSteps = (step: number) => {
    switch (step) {
      case 0:
        return <CollectPhone />;
      case 1:
        return <CollectPrescriptionImage />;
      case 2:
        return <CollectSignUpData />;
      case 3:
        return <CollectPassword />;
      default:
        return <></>;
    }
  };

  return (
    <>
      <div className="flex items-center justify-center w-full min-h-screen max-h-fit">
        {returnSteps(step)}
      </div>
    </>
  );
};

export default StepManagement;
