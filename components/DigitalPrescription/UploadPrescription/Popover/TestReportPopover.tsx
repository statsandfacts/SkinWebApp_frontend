import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setIsTestReportPopoverOpen, setStep, setSubmitDocumentsPopoverOpen } from "@/redux/slices/digitalPrescription/stepManagement.slice";
import ShowPopover from "@/components/common/Popover";
import SubmitDocumentsPopover from "./SubmitDocumentsPopover";

const TestReportPopover: React.FC = () => {
  const dispatch = useDispatch();

  const { isTestReportPopoverOpen } = useSelector(
    (state: RootState) => state.stepManagement
  );

  return (
    <>
      <ShowPopover
        onConfirm={() => {
          dispatch(setStep(0));
          dispatch(setIsTestReportPopoverOpen(false));
        }}
        onClose={() => {
          dispatch(setIsTestReportPopoverOpen(false));
          dispatch(setSubmitDocumentsPopoverOpen(true)); 
        }}
        isOpen={isTestReportPopoverOpen}
        onOpenChange={() => {
          dispatch(setIsTestReportPopoverOpen(false));
        }}
      >
        <div className="flex flex-col items-center gap-4">
          <p className="text-lg text-gray-700 text-center">
            Do you want to upload any test report?
          </p>
          <div className="w-full bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
            <p className="text-green-700 text-sm">
              Tip: You can upload your test reports along with prescriptions for
              better record-keeping.
            </p>
          </div>
        </div>
      </ShowPopover>

      <SubmitDocumentsPopover />
    </>
  );
};

export default TestReportPopover;
