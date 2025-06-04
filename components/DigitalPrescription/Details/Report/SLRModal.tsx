"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setViewSmartLabReportModal } from "@/redux/slices/digitalPrescription/digitalPrescription.slice";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/modal";
import {
  SLRDiteAdj,
  SLREduIn,
  SLRGrpExp,
  SLRNotDetected,
  SLRParExp,
} from "./index";
import { useAuthInfo } from "@/hooks/useAuthInfo";
import { BookTextIcon, UserIcon } from "lucide-react";
import SLRFooter from "./SLRFooter";
import Image from "next/image";
import { ArrowRight } from 'lucide-react';
import DoctorReview from "./DoctorReview";

const SLRModal = () => {
  const dispatch = useDispatch();
  const { userDetails } = useAuthInfo();
  const isOpen = useSelector(
    (state: RootState) => state.digitalPrescription.viewSmartLabReportModal
  );
  const { singlePrescriptionDetails } = useSelector(
    (state: any) => state.digitalPrescription
  );

  const slrRes = singlePrescriptionDetails?.slr_res;

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => dispatch(setViewSmartLabReportModal(false))}
      backdrop="blur"
      size="5xl"
      scrollBehavior="inside"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col">
          {/* <div className="flex flex-col items-start ml-2">
            <Image
              src="/logo_with_bg.svg"
              alt="Logo"
              width={100}
              height={500}
            />

            <p className="text-3xl font-bold text-gray-800 text-primary">
              Nextcare.Life
            </p>
            <p className="text-4xl font-bold text-gray-800 text-primary">
              Smart Lab Report
            </p>
            <small className="text-xl font-light text-gray-600">
              Empowering Health Decision with clarity and insight
            </small>
          </div> */}
         
        </ModalHeader>

        <ModalBody>
          <div className="flex flex-col justify-center items-center w-full gap-4">
            <div className="w-full bg-[#75AFD2] shadow-primary-50 shadow-lg p-6 rounded-xl">
              <div className="flex justify-between items-start gap-x-10">
                <div className="flex items-start gap-3">
                <UserIcon className="h-6 w-6 text-primary" />
                  {/* <div className="flex flex-col text-white text-sm font-medium space-y-1">
                    <p>{userDetails?.name}</p>
                    <p>Age: {userDetails?.age}</p>
                    <p>Gender: {userDetails?.gender}</p>
                  </div> */}
                </div>

                <div className="flex flex-col text-white text-sm font-medium space-y-1 text-right">
                  <p>
                    Lab No: {singlePrescriptionDetails?.lab_number || "123456"}
                  </p>
                  <p>
                    Test date:{" "}
                    {singlePrescriptionDetails?.test_date || "03-05-2025"}
                  </p>
                </div>
              </div>
            </div>

            {/* Section: Health Summary and Score */}
            <div className="w-full bg-[#75AFD2] shadow-primary-50 shadow-lg p-6 rounded-xl">
              <div className="flex justify-between items-center mb-2">
                <div className="flex gap-2 items-center">
                  <Image
                    src="/smartlabreports/healthsummery.png"
                    width={100}
                    height={100}
                    alt="Health Summary Icon"
                    className="h-6 w-6 mt-1"
                  />
                  <p className="text-white font-medium text-sm">
                    Your Health Summary
                  </p>
                </div>
                <p className="text-white font-medium text-sm">Health Score</p>
              </div>

              <div className="flex justify-between items-start mt-2">
                <div className="w-4/5 font-light text-sm text-white ml-6">
                  *This summary is based only on your blood and urine test
                  results. It does not include findings from X-ray, MRI, CT
                  scan, Stool test, ECG, or EEG. (Warnings)
                </div>

                <div className="flex flex-col items-center gap-1 mr-4">
                  <p className="text-white text-xs">Score</p>
                  <div className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-white text-white font-semibold">
                    {singlePrescriptionDetails?.health_score ?? "75"}
                  </div>
                </div>
              </div>
            </div>

            {/* Section: Step-by-Step Lab Report Guide */}
            <div className="flex flex-col items-center mt-6 mb-6">
              <p className="text-primary font-medium text-xl mb-4">
                Step-by-Step Lab Report Guide
              </p>

              <div className=" p-6 rounded-lg w-full max-w-2xl">
                <div className="grid grid-cols-3 gap-2 relative z-10">
                  {/* Row 1 */}
                  <div className="flex flex-col items-center justify-center">
                    <Image
                      src="/smartlabreports/hand.png"
                      height={50}
                      width={50}
                      alt="Health Summary Icon"
                    />
                  </div>
                  <div className="flex items-center justify-center bg-[#97D3F9] rounded-full px-4 py-2 shadow-md text-center font-medium text-sm">
                    Your Health Summary
                  </div>
                  <ArrowRight className="h-6 w-6 text-primary" />
                  <div className="flex items-center justify-center bg-[#97D3F9] rounded-full px-4 py-2 shadow-md text-center font-medium text-sm">
                    Parameters at a glance
                  </div>
                  <ArrowRight className="h-6 w-6 text-primary" />
                  {/* Row 2 */}
                  <div className="flex items-center justify-center bg-[#97D3F9] rounded-full px-4 py-2 shadow-md text-center font-medium text-sm">
                    Educational Insights
                  </div>
                  <ArrowRight className="h-6 w-6 text-primary" />
                  <div className="flex items-center justify-center bg-[#97D3F9] rounded-full px-4 py-2 shadow-md text-center font-medium text-sm">
                    Health Plan & Adjustments
                  </div>
                  <ArrowRight className="h-6 w-6 text-primary" />
                  <div className="flex items-center justify-center bg-[#97D3F9] rounded-full px-4 py-2 shadow-md text-center font-medium text-sm">
                    Detailed Parameter Insights
                  </div>
                  <ArrowRight className="h-6 w-6 text-primary" />
                  {/* Row 3 */}
                  <div className="flex items-center justify-center bg-[#97D3F9] rounded-full px-4 py-2 shadow-md text-center font-medium text-sm">
                    Not detected Parameters
                  </div>
                  <ArrowRight className="h-6 w-6 text-primary" />
                  <div className="col-span-2 flex items-center justify-center bg-[#97D3F9] rounded-full px-4 py-2 shadow-md text-center font-medium text-sm">
                    Your opinion
                  </div>
                </div>
              </div>
            </div>

            {/* Further Sections */}
             <DoctorReview/>
            <SLRGrpExp data={slrRes?.grouped_results || []} />
            <SLRParExp data={slrRes?.smartlab_data || []} />
          </div>

          <SLRDiteAdj data={slrRes?.groupwise_data || []} />
          <SLREduIn data={slrRes?.educational_insights || []} />
          <SLRNotDetected data={slrRes?.not_detected_results || []} />
          <SLRFooter />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SLRModal;
