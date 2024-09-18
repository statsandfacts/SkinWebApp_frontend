import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  setFirstScreenNoPopoverOpen,
  setIsTestReportPopoverOpen,
} from "@/redux/slices/digitalPrescription/stepManagement.slice";
import ShowPopover from "@/components/common/Popover";

const FirstScreenNo: React.FC = () => {
  const dispatch = useDispatch();

  const { isFirstScreenNoPopoverOpen } = useSelector(
    (state: RootState) => state.stepManagement
  );

  return (
    <>
      <ShowPopover
        onConfirm={() => {}}
        onClose={() => {
          dispatch(setFirstScreenNoPopoverOpen(false));
          dispatch(setIsTestReportPopoverOpen(true));
        }}
        isOpen={isFirstScreenNoPopoverOpen}
        onOpenChange={() => {
          dispatch(setFirstScreenNoPopoverOpen(false));
        }}
      >
        <div className="flex flex-col items-center gap-4">
          <p className="text-lg text-gray-700 text-center">
            Do you want to upload another prescription?
          </p>
          <div className="w-full bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
            <p className="text-blue-700 text-sm">
              Tip: If you have multiple prescriptions, you can upload them all
              here for better management.
            </p>
          </div>
        </div>
      </ShowPopover>
    </>
  );
};

export default FirstScreenNo;
