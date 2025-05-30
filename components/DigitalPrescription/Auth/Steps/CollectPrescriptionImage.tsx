import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { motion } from "framer-motion";
import { Button } from "@heroui/button";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import UploadImageComponent from "../../UploadPrescription/Common/UploadImageComponent";
import {
  setSignUpData,
  setStep as setSignUpStep,
} from "@/redux/slices/digitalPrescription/auth.slice";
import { uploadImageToAws } from "@/services/api.digitalPrescription.service";
import { toast } from "react-toastify";
import {
  setStep,
  setUploadedImageDetails,
} from "@/redux/slices/digitalPrescription/stepManagement.slice";

const CollectPrescriptionImage: React.FC = () => {
  const dispatch = useDispatch();

  const { signUpData } = useSelector((state: RootState) => state.auth);
  const { uploadImageDetail, singleDocumentDetails } = useSelector(
    (state: RootState) => state.stepManagement
  );

  const [loading, setLoading] = useState<boolean>(false);

  const uploadSelectedFile = () => {
    if (!uploadImageDetail[0]?.file) {
      toast.error("Please select a file to upload.");
      return;
    }
    if (!singleDocumentDetails?.selectedSubType) {
      toast.error("Missing document type to upload.");
      return;
    }

    const formData = new FormData();

    formData.append("files", uploadImageDetail[0].file);
    formData.append("doc_types", singleDocumentDetails?.selectedSubType);
    formData.append("phone_no", signUpData.phone_number);

    setLoading(true);
    uploadImageToAws(formData)
      .then((response) => {
        dispatch(setSignUpData({ uploaded_files: response.uploaded_files }));
        toast.success("Prescription Image Uploaded Successfully.");
        dispatch(setSignUpStep(4));
        dispatch(setStep(0)); //for upload image steps empty
        dispatch(setUploadedImageDetails([]));
      })
      .catch((error) => {
        toast.error(
          error.response.data?.detail ||
            "Image Upload Failed, Please Try After Few Seconds."
        );
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center mt-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-lg font-semibold capitalize"
        >
          Please Upload Your Prescription Image
        </motion.div>

        <div className="mt-6 max-w-md p-6">
          <UploadImageComponent isLoading={loading} />
        </div>

        <div className="w-full flex justify-between max-w-lg px-6 mt-3">
          <Button
            variant="flat"
            onClick={() => {
              dispatch(setSignUpStep(1));
            }}
            startContent={<ArrowLeftIcon className="w-4 h-4" />}
          >
            Go Back
          </Button>
          <Button
            color="primary"
            variant="solid"
            onClick={uploadSelectedFile}
            isLoading={loading}
            endContent={<ArrowRightIcon className="w-4 h-4" />}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
};

export default CollectPrescriptionImage;
