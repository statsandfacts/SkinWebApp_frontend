import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import ShowPopover from "@/components/common/Popover";
import { setIsTestReportPopoverOpen, setStep, setThirdScreenNextPopoverOpen } from "@/redux/slices/digitalPrescription/stepManagement.slice";

const ThirdScreenNext: React.FC = () => {
  const dispatch = useDispatch();

  const { isThirdScreenNextPopoverOpen } = useSelector(
    (state: RootState) => state.stepManagement
  );

  return (
    <>
      <ShowPopover
        onConfirm={() => {
          dispatch(setThirdScreenNextPopoverOpen(false));
          dispatch(setStep(2));
        }}
        onClose={() => {
          dispatch(setThirdScreenNextPopoverOpen(false));
          dispatch(setIsTestReportPopoverOpen(true));
        }}
        isOpen={isThirdScreenNextPopoverOpen}
        onOpenChange={() => {
          dispatch(setThirdScreenNextPopoverOpen(false));
        }}
      >
        <div className="flex flex-col items-center gap-4">
          <p className="text-lg text-gray-700 text-center">
            Do you want to upload another prescription?
          </p>
          <div className="w-full bg-purple-50 border-l-4 border-purple-500 p-4 rounded-lg">
            <p className="text-purple-700 text-sm">
              Tip: Uploading all prescriptions at once helps keep your records
              organized and allows for faster processing in the future.
            </p>
          </div>
        </div>
      </ShowPopover>
    </>
  );
};

export default ThirdScreenNext;
