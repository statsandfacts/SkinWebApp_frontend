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
        return <></>;
    }
  };

  return (
    <>
      <div className="flex items-center justify-center w-full min-h-screen max-h-fit">
        {returnSteps(signUpProcess2Step)}
      </div>
    </>
  );
};

export default StepManagementSignUpProcess2;
