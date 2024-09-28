import React from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  setSingleDocumentDetails,
  setStep,
} from "@/redux/slices/digitalPrescription/stepManagement.slice";

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
  | "CSG"
  | "Echo";

const ChoosePrescriptionType: React.FC = () => {
  const dispatch = useDispatch();
  const { singleDocumentDetails } = useSelector(
    (state: RootState) => state.stepManagement
  );

  const handleSelectType = (type: any) => {
    dispatch(setSingleDocumentDetails({ docType: "selectType", data: type }));

    if (["Prescription"].includes(type.label)) {
      dispatch(
        setSingleDocumentDetails({
          docType: "selectSubType",
          data: type.subtypes[0],
        })
      );
      dispatch(setStep(2));
    } else {
      dispatch(setStep(1));
    }
  };

  const types: {
    label: PrescriptionType;
    color: string;
    subtypes: SubType[];
  }[] = [
    { label: "Prescription", color: "bg-blue-600", subtypes: ["Prescription"] },
    {
      label: "Test Report",
      color: "bg-green-600",
      subtypes: ["Test Report", "Health Camp Report"],
    },
    {
      label: "Scan Report",
      color: "bg-orange-500",
      subtypes: ["X-ray", "Ultrasound", "CT Scan", "MRI", "PET Scan"],
    },
    {
      label: "ECG/ECHO Report",
      color: "bg-red-600",
      subtypes: ["CSG", "Echo"],
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center">
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
            ?.subtypes.map((subtype) => (
              <div key={subtype}>{subtype}</div>
            ))}
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
            className={`p-6 rounded-lg cursor-pointer text-white text-center transition-transform duration-300 ease-in-out ${
              singleDocumentDetails.selectedType === type.label
                ? type.color
                : "bg-gray-300"
            }`}
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
    </div>
  );
};

export default ChoosePrescriptionType;
