import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  setStep,
  setThirdScreenNextPopoverOpen,
} from "@/redux/slices/digitalPrescription/stepManagement.slice";
import { motion } from "framer-motion";
import UploadImageComponent from "../Common/UploadImageComponent";
import { Button } from "@nextui-org/button";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { FirstScreenNo, TestReportPopover } from "../Popover";
import ThirdScreenNext from "../Popover/ThirdScreenNext";

const UploadDocumentsSamePrescription: React.FC = () => {
  const dispatch = useDispatch();
  const { singleDocumentDetails } = useSelector(
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
          {`Please Upload Your ${singleDocumentDetails.selectedType} For Same Prescription.`}
        </motion.div>

        <div className="mt-6 max-w-lg p-6">
          <UploadImageComponent onFileUpload={(selectedFile) => {}} />
        </div>

        <div className="w-full flex justify-between max-w-lg px-6 sm:px-11 mt-3">
          <Button
            variant="flat"
            onClick={() => {
              dispatch(setStep(2));
            }}
            startContent={<ArrowLeftIcon className="w-4 h-4" />}
          >
            Go Back
          </Button>
          <Button
            color="primary"
            variant="solid"
            onClick={() => {
              dispatch(setThirdScreenNextPopoverOpen(true));
            }}
            endContent={<ArrowRightIcon className="w-4 h-4" />}
          >
            Next
          </Button>
        </div>
      </div>

      <ThirdScreenNext />
      <FirstScreenNo />
      <TestReportPopover />
    </>
  );
};

export default UploadDocumentsSamePrescription;