import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setFirstScreenNextPopoverOpen, setFirstScreenNoPopoverOpen, setStep } from "@/redux/slices/digitalPrescription/stepManagement.slice";
import ShowPopover from "@/components/common/Popover";

const FirstScreenNext: React.FC = () => {
  const dispatch = useDispatch();

  const { isFirstScreenNextPopoverOpen } = useSelector(
    (state: RootState) => state.stepManagement
  );

  return (
    <>
      <ShowPopover
        onConfirm={() => {
          dispatch(setFirstScreenNextPopoverOpen(false));
          dispatch(setStep(3));
        }}
        onClose={() => {
          dispatch(setFirstScreenNextPopoverOpen(false));
          dispatch(setFirstScreenNoPopoverOpen(true));
        }}
        isOpen={isFirstScreenNextPopoverOpen}
        onOpenChange={() => {
          dispatch(setFirstScreenNextPopoverOpen(false));
        }}
      >
        <div className="flex flex-col items-center gap-4">
          <p className="text-lg text-gray-700 text-center">
            Do you want to upload the second page for the same prescription?
          </p>
          <div className="w-full bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
            <p className="text-blue-700 text-sm">
              Tip: If the prescription has multiple pages, it’s recommended to
              upload all pages for better accuracy and faster processing.
            </p>
          </div>
        </div>
      </ShowPopover>
    </>
  );
};

export default FirstScreenNext;
