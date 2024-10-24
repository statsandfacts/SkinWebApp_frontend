"use client";

import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import {
  CollectPasswordProcess2,
  CollectPhone,
  CollectSignUpData,
} from "./Steps";

const StepManagementSignUpProcess2 = () => {
  const { signUpProcess2Step } = useSelector((state: RootState) => state.auth);

  const returnSteps = (signUpProcess2Step: number) => {
    switch (signUpProcess2Step) {
      case 0:
        return <CollectPhone />;
      case 1:
        return <CollectSignUpData />;
      case 2:
        return <CollectPasswordProcess2 />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center w-full md:w-96 min-h-screen max-h-fit">
        {returnSteps(signUpProcess2Step)}
      </div>
    </div>
  );
};

export default StepManagementSignUpProcess2;
