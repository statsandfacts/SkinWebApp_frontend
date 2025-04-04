import VerifySQ from "@/components/DigitalPrescription/Auth/VerifySQ";
import React from "react";

const ResetPhoneThoughSQ = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-slate-900 text-xl font-bold mt-3">
        Reset Phone Number
      </h1>
      <p className="mt-1 font-light text-sm"> Verify Security Questions </p>
      <VerifySQ />
    </div>
  );
};

export default ResetPhoneThoughSQ;
