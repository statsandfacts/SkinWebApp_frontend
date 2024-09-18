import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { motion } from "framer-motion";
import { Button } from "@nextui-org/button";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import UploadImageComponent from "../../UploadPrescription/Common/UploadImageComponent";
import { setSignUpData, setStep } from "@/redux/slices/digitalPrescription/auth.slice";
import { uploadImageToAws } from "@/services/api.digitalPrescription.service";
import { toast } from "react-toastify";

const CollectPrescriptionImage: React.FC = () => {
  const dispatch = useDispatch();

  const { signUpData } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState<boolean>(false);

  const uploadSelectedFile = (selectedFile: any) => {
    const formData = new FormData();
    formData.append("files", selectedFile);
    formData.append("doc_types", "prescription");
    formData.append("phone_no", signUpData.phone_number);

    setLoading(true);
    uploadImageToAws(formData)
      .then((response) => {
        dispatch(setSignUpData({uploaded_files: response.uploaded_files}))
        toast.success("Prescription Image Uploaded Successfully.");
      })
      .catch((error) => {
        toast.error(
          error.response.data?.detail ||
            "Image Uploaded Failed, Please Try After Few Seconds."
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
          <UploadImageComponent
            onFileUpload={(selectedFile, imageUrl) => {
              uploadSelectedFile(selectedFile);
            }}
            isLoading={loading}
          />
        </div>

        <div className="w-full flex justify-between max-w-lg px-6 mt-3">
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
              dispatch(setStep(2));
            }}
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
