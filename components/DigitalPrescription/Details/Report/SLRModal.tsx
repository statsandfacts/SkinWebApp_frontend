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
          <p className="text-2xl font-bold text-gray-800 text-primary">
            🧾 Nextcare.Life Smart Lab Report
          </p>
          <p className="text-2xl font-bold text-gray-800 text-primary ml-7">
            Smart Lab Report{" "}
          </p>
          <small className="text-xs font-light ml-7">
            Empowering Health Desicion with clarity and insight
          </small>
        </ModalHeader>
        <ModalBody>
          <div className="space-y-2">
            <div className="flex flex-col justify-center items-center w-full gap-4">
              <div className="flex justify-between items-center w-3/5 shadow-primary-50 shadow-lg p-5 rounded-lg">
                <div className="flex gap-2 items-center">
                  <UserIcon className="h-6 w-6 text-primary" />
                  <p className="text-primary">{userDetails?.name}</p>
                </div>
                <p className="text-primary">Gender: {userDetails?.gender}</p>
              </div>

              <div className=" w-3/5 space-y-2 shadow-primary-50 shadow-lg p-5 rounded-lg">
                <div className="flex justify-between items-center">
                  <div className="flex gap-2 items-center">
                    <BookTextIcon className="h-6 w-6 text-primary" />
                    <p className="text-primary font-medium text-sm">
                      Your Health Summary
                    </p>
                  </div>
                  <p className="text-primary font-medium text-sm">
                    {/* Health Score */}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex gap-2 items-center w-4/5 font-light text-sm text-primary ml-6">
                    *This summary is based only on your blood and urine test
                    results. It does not include findings from X-ray, MRI, CT
                    scan, Stool test, ECG, or EEG. (Warnings)
                  </div>
                  <p></p>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center mt-6 mb-6">
              <p className="text-primary font-medium text-xl mb-4">
                Step-by-Step Lab Report Guide
              </p>

              <div className="relative bg-[#F0F2EE] p-6 rounded-lg w-full max-w-3xl">
                <div className="grid grid-cols-3 gap-6 relative z-10">
                  {/* Row 1 */}
                  <div className="flex flex-col items-center justify-center">
                    <div className="rounded-full border-2 border-primary p-2 bg-white">
                      <span
                        role="img"
                        aria-label="pointer"
                        className="text-3xl"
                      >
                        ☞
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center bg-white rounded-md px-4 py-2 shadow-md text-center font-medium text-sm">
                    Your Health Summary
                  </div>
                  <div className="flex items-center justify-center bg-white rounded-md px-4 py-2 shadow-md text-center font-medium text-sm">
                    Parameters at a glance
                  </div>

                  {/* Row 2 */}
                  <div className="flex items-center justify-center bg-white rounded-md px-4 py-2 shadow-md text-center font-medium text-sm">
                    Educational Insights
                  </div>
                  <div className="flex items-center justify-center bg-white rounded-md px-4 py-2 shadow-md text-center font-medium text-sm">
                    Health Plan & Adjustments
                  </div>
                  <div className="flex items-center justify-center bg-white rounded-md px-4 py-2 shadow-md text-center font-medium text-sm">
                    Detailed Parameter Insights
                  </div>

                  {/* Row 3 */}
                  <div className="flex items-center justify-center bg-white rounded-md px-4 py-2 shadow-md text-center font-medium text-sm">
                    Not detected Parameters
                  </div>
                  <div className="col-span-2 flex items-center justify-center bg-white rounded-md px-4 py-2 shadow-md text-center font-medium text-sm">
                    Your opinion
                  </div>
                </div>
              </div>
            </div>
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
