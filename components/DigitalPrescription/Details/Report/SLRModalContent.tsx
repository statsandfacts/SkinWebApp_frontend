"use client";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  SLRDiteAdj,
  SLREduIn,
  SLRGrpExp,
  SLRNotDetected,
  SLRParExp,
} from "./index";
import { useAuthInfo } from "@/hooks/useAuthInfo";
import { UserIcon, ArrowRight } from "lucide-react";
import SLRFooter from "./SLRFooter";
import Image from "next/image";

const guideSteps = [
  "Your Health Summary",
  "Parameters at a glance",
  "Educational Insights",
  "Health Plan & Adjustments",
  "Detailed Parameter Insights",
  "Not detected Parameters",
  "Your opinion",
];

const SLRModalContent = () => {
  const { userDetails } = useAuthInfo();
  const { singlePrescriptionDetails } = useSelector(
    (state: RootState) => state.digitalPrescription
  );

  const slrRes = singlePrescriptionDetails?.slr_res;

  return (
    <div className="flex flex-col justify-center items-start w-full gap-4 p-4">
      {/* Header */}
      <div className="flex flex-col items-start">
        <Image src="/logo_with_bg.svg" alt="Logo" width={100} height={500} />
        <p className="text-3xl font-bold text-primary">Nextcare.Life</p>
        <p className="text-4xl font-bold text-primary">Smart Lab Report</p>
        <small className="text-xl font-light text-gray-600">
          Empowering Health Decision with clarity and insight
        </small>
      </div>

      {/* User Details */}
      <div className="w-full bg-[#75AFD2] shadow-primary-50 shadow-lg p-6 rounded-xl">
        <div className="flex justify-between items-start gap-x-10">
          <div className="flex items-start gap-3">
            <UserIcon className="h-6 w-6 text-primary" />
            <div className="flex flex-col text-white text-sm font-medium space-y-1">
              <p>{userDetails?.name}</p>
              <p>Age: {userDetails?.age}</p>
              <p>Gender: {userDetails?.gender}</p>
            </div>
          </div>
          <div className="flex flex-col text-white text-sm font-medium space-y-1 text-right">
            <p>Lab No: {singlePrescriptionDetails?.lab_number || "123456"}</p>
            <p>Test date: {singlePrescriptionDetails?.test_date || "03-05-2025"}</p>
          </div>
        </div>
      </div>

      {/* Health Summary */}
      <div className="w-full bg-[#75AFD2] shadow-primary-50 shadow-lg p-6 rounded-xl">
        <div className="flex justify-between items-center mb-2">
          <div className="flex gap-2 items-center">
            <Image
              src="/smartlabreports/healthsummery.png"
              width={24}
              height={24}
              alt="Health Summary Icon"
              className="mt-1"
            />
            <p className="text-white font-medium text-sm">Your Health Summary</p>
          </div>
          <p className="text-white font-medium text-sm">Health Score</p>
        </div>
        <div className="flex justify-between items-start mt-2">
          <p className="w-4/5 font-light text-sm text-white ml-6">
            *This summary is based only on your blood and urine test results. It does not include findings from X-ray, MRI, CT scan, Stool test, ECG, or EEG.
          </p>
          <div className="flex flex-col items-center gap-1 mr-4">
            <p className="text-white text-xs">Score</p>
            <div className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-white text-white font-semibold">
              {singlePrescriptionDetails?.health_score ?? "75"}
            </div>
          </div>
        </div>
      </div>

      {/* Guide Flow */}
      <div className="flex flex-col items-center my-6 w-full">
        <p className="text-primary font-medium text-xl mb-4">Step-by-Step Lab Report Guide</p>
        <div className="flex flex-wrap justify-center items-center gap-4 max-w-5xl">
          {guideSteps.map((step, index) => (
            <React.Fragment key={index}>
              <div className="bg-[#97D3F9] rounded-full px-4 py-2 shadow-md text-center font-medium text-sm text-primary whitespace-nowrap">
                {step}
              </div>
              {index < guideSteps.length - 1 && (
                <ArrowRight className="h-6 w-6 text-primary" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Dynamic Sections */}
      <SLRGrpExp data={slrRes?.grouped_results || []} />
      <SLRParExp data={slrRes?.smartlab_data || []} />
      <SLRDiteAdj data={slrRes?.groupwise_data || []} />
      <SLREduIn data={slrRes?.educational_insights || []} />
      <SLRNotDetected data={slrRes?.not_detected_results || []} />
      <SLRFooter />
    </div>
  );
};

export default SLRModalContent;
