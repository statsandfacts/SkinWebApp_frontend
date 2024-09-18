import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  setStep,
  setSubmitDocumentsPopoverOpen,
  setUploadMoreReportsPopoverOpen,
} from "@/redux/slices/digitalPrescription/stepManagement.slice";
import ShowPopover from "@/components/common/Popover";
import SubmitDocumentsPopover from "./SubmitDocumentsPopover";

const UploadMoreReportsPopover: React.FC = () => {
  const dispatch = useDispatch();

  const { isUploadMoreReportsPopoverOpen } = useSelector(
    (state: RootState) => state.stepManagement
  );

  return (
    <>
      <ShowPopover
        onConfirm={() => {
          dispatch(setStep(0));
          dispatch(setUploadMoreReportsPopoverOpen(false));
        }}
        onClose={() => {
          dispatch(setUploadMoreReportsPopoverOpen(false));
          dispatch(setSubmitDocumentsPopoverOpen(true)); 
        }}
        isOpen={isUploadMoreReportsPopoverOpen}
        onOpenChange={() => {
          dispatch(setUploadMoreReportsPopoverOpen(false));
        }}
      >
        <div className="flex flex-col items-center gap-4">
          <p className="text-lg text-gray-700 text-center">
            Do you want to upload more report?
          </p>
          <div className="w-full bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
            <p className="text-green-700 text-sm">
              Tip: Uploading all relevant reports helps in providing complete
              medical data for accurate diagnosis and treatment recommendations.
            </p>
          </div>
        </div>
      </ShowPopover>

      <SubmitDocumentsPopover />
    </>
  );
};

export default UploadMoreReportsPopover;
