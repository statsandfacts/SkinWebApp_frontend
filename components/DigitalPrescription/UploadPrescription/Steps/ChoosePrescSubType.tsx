import React from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  setSingleDocumentDetails,
  setStep,
} from "@/redux/slices/digitalPrescription/stepManagement.slice";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/button";
import { setStep as setSignUpStep } from "@/redux/slices/digitalPrescription/auth.slice";

const ChoosePrescSubType: React.FC = () => {
  const dispatch = useDispatch();

  const { singleDocumentDetails } = useSelector(
    (state: RootState) => state.stepManagement
  );

  const handleSelectSubType = (subType: string) => {
    dispatch(
      setSingleDocumentDetails({ docType: "selectedSubType", data: subType })
    );
    dispatch(setStep(2));
    dispatch(setSignUpStep(3));
  };

  return (
    <div className="flex flex-col items-center w-full justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mt-4 text-lg font-semibold"
      >
        {singleDocumentDetails.selectedSubType
          ? `Selected Sub-Type: ${singleDocumentDetails.selectedSubType}`
          : "Please select a sub-type"}
      </motion.div>

      <motion.div
        className="flex flex-col flex-wrap gap-4 w-full max-w-lg p-4 mt-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
      >
        {singleDocumentDetails.subTypes.map((subType: string) => (
          <motion.div
            key={subType}
            className={`p-4 rounded-lg cursor-pointer text-white text-center transition-transform duration-300 ease-in-out ${
              singleDocumentDetails.selectedSubType === subType
                ? "bg-blue-600"
                : "bg-gray-300"
            }`}
            onClick={() => handleSelectSubType(subType)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {subType}
          </motion.div>
        ))}
      </motion.div>

      <div className="w-full max-w-lg p-4">
        <Button
          variant="flat"
          onClick={() => {
            dispatch(setStep(0));
            dispatch(setSignUpStep(1));
          }}
          startContent={<ArrowLeftIcon className="w-4 h-4" />}
        >
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default ChoosePrescSubType;
