import React from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  setSingleDocumentDetails,
  setStep,
} from "@/redux/slices/digitalPrescription/stepManagement.slice";
import { setStep as setSignUpStep } from "@/redux/slices/digitalPrescription/auth.slice";
import { Button } from "@nextui-org/button";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useAuthInfo } from "@/hooks/useAuthInfo";
import { useRouter } from "next/navigation";

type PrescriptionType =
  | "Prescription"
  | "Test Report"
  | "Scan Report"
  | "ECG/ECHO Report";

type SubType =
  | "Prescription"
  | "Test Report"
  | "Health Camp Report"
  | "X-ray"
  | "Ultrasound"
  | "CT Scan"
  | "MRI"
  | "PET Scan"
  | "ECG"
  | "Echo";

const ChoosePrescriptionType: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { singleDocumentDetails } = useSelector(
    (state: RootState) => state.stepManagement
  );
  const { userId } = useAuthInfo();

  const handleSelectType = (type: any) => {
    dispatch(setSingleDocumentDetails({ docType: "selectType", data: type }));
    dispatch(
      setSingleDocumentDetails({
        docType: "selectSubType",
        data: type.subtypes[0],
      })
    );

    if (["Prescription"].includes(type.label)) {
      dispatch(setStep(2));
      dispatch(setSignUpStep(3));
    } else {
      dispatch(setStep(1));
      dispatch(setSignUpStep(2));
    }
  };

  const types: {
    label: PrescriptionType;
    color: string;
    h_color: string;
    subtypes: SubType[];
  }[] = [
    {
      label: "Prescription",
      color: "bg-green-300",
      h_color: "bg-green-600",
      subtypes: ["Prescription"],
    },
    {
      label: "Test Report",
      color: "bg-blue-300",
      h_color: "bg-blue-600",
      subtypes: ["Test Report", "Health Camp Report"],
    },
    {
      label: "Scan Report",
      color: "bg-orange-300",
      h_color: "bg-orange-600",
      subtypes: ["X-ray", "Ultrasound", "CT Scan", "MRI", "PET Scan"],
    },
    {
      label: "ECG/ECHO Report",
      color: "bg-red-300",
      h_color: "bg-red-600",
      subtypes: ["ECG", "Echo"],
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mt-4 text-lg font-semibold"
      >
        {singleDocumentDetails.selectedType
          ? `Selected Type: ${singleDocumentDetails.selectedType}`
          : "Please select a type"}
      </motion.div>

      {singleDocumentDetails.selectedType && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-2 text-sm text-gray-400 flex gap-2"
        >
          {types
            .find((type) => type.label === singleDocumentDetails.selectedType)
            ?.subtypes.join(", ")}
        </motion.div>
      )}

      <motion.div
        className="flex flex-col gap-4 w-full max-w-lg p-4 mt-6"
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
        {types.map((type) => (
          <motion.div
            key={type.label}
            className={`p-6 rounded-lg cursor-pointer text-white text-center transition-transform duration-300 ease-in-out hover:bg-opacity-80 
              ${
                singleDocumentDetails.selectedType === type.label
                  ? type.h_color
                  : type.color
              }
              `}
            onClick={() => handleSelectType(type)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {type.label}
          </motion.div>
        ))}
      </motion.div>

      <div className="w-full max-w-lg p-4">
        <Button
          variant="flat"
          onClick={() => {
            if (userId) {
              router.back();
            } else {
              dispatch(setSignUpStep(0));
            }
          }}
          startContent={<ArrowLeftIcon className="w-4 h-4" />}
        >
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default ChoosePrescriptionType;
