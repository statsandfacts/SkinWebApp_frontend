import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  setFirstScreenNextPopoverOpen,
  setStep,
  setUploadMoreReportsPopoverOpen,
} from "@/redux/slices/digitalPrescription/stepManagement.slice";
import { motion } from "framer-motion";
import UploadImageComponent from "../Common/UploadImageComponent";
import { Button } from "@nextui-org/button";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import {
  FirstScreenNext,
  FirstScreenNo,
  TestReportPopover,
  UploadMoreReportsPopover,
} from "../Popover";
import { toast } from "react-toastify";

const UploadDocumentImage: React.FC = () => {
  const dispatch = useDispatch();
  const { singleDocumentDetails, uploadImageDetail } = useSelector(
    (state: RootState) => state.stepManagement
  );

  return (
    <>
      <div className="flex flex-col items-center justify-center mt-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-lg font-semibold capitalize"
        >
          {`Please Upload Your ${singleDocumentDetails.selectedType}`}
        </motion.div>

        <div className="mt-6 max-w-lg p-6">
          <UploadImageComponent />
        </div>

        <div className="w-full flex justify-between max-w-lg px-6 sm:px-11 mt-3">
          <Button
            variant="flat"
            onClick={() => {
              dispatch(setStep(0));
            }}
            startContent={<ArrowLeftIcon className="w-4 h-4" />}
          >
            Go Back
          </Button>
          <Button
            color="primary"
            variant="solid"
            onClick={() => {
              if (!uploadImageDetail?.file) {
                toast.warning("Please select a file to upload.");
                return;
              }
              if (singleDocumentDetails.selectedType === "Prescription") {
                dispatch(setFirstScreenNextPopoverOpen(true));
              } else {
                dispatch(setUploadMoreReportsPopoverOpen(true));
              }
            }}
            endContent={<ArrowRightIcon className="w-4 h-4" />}
          >
            Next
          </Button>
        </div>
      </div>

      <FirstScreenNext />
      <FirstScreenNo />
      <TestReportPopover />
      <UploadMoreReportsPopover />
    </>
  );
};

export default UploadDocumentImage;
