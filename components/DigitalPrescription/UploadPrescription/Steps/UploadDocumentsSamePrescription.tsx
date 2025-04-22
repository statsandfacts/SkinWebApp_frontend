import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  clearMorePrescriptionImages,
  clearMultiUploadDoc,
  resetDetailsAfterSubmit,
  setStep,
  setThirdScreenNextPopoverOpen,
  setUploadedImageDetails,
} from "@/redux/slices/digitalPrescription/stepManagement.slice";
import { motion } from "framer-motion";
import UploadImageComponent from "../Common/UploadImageComponent";
import { Button } from "@heroui/button";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { FirstScreenNo, TestReportPopover } from "../Popover";
import ThirdScreenNext from "../Popover/ThirdScreenNext";
import { toast } from "react-toastify";
import { useAuthInfo } from "@/hooks/useAuthInfo";
import {
  createCase,
  uploadImageToAws,
} from "@/services/api.digitalPrescription.service";
import { mergeImagesHelper } from "@/utils/mergeImagesHelper";
import { useRouter } from "next/navigation";
import { setIsRedeemDiscount } from "@/redux/slices/digitalPrescription/auth.slice";
import RedeemDiscountModal from "../../RedeemDiscountModal";

const UploadDocumentsSamePrescription: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { singleDocumentDetails, uploadImageDetail, multiUploadedDoc } =
    useSelector((state: RootState) => state.stepManagement);
  const { userDetails, userId } = useAuthInfo();

  const [loading, setLoading] = useState<boolean>(false);
  const { pharmacyUserId } = useSelector((state: any) => state.auth);

  const clickToNo = async () => {
    try {
      if (!uploadImageDetail[0]?.file) {
        toast.warning("Please select a file to upload.");
        return;
      }
      if (!userDetails?.phone_no) {
        toast.warning("Phone number is missing.");
        return;
      }
      if (!singleDocumentDetails?.selectedSubType) {
        toast.warning("Please select document type.");
        return;
      }

      setLoading(true);
      const mergedImageArray = [...multiUploadedDoc, ...uploadImageDetail].map(
        (detail) => detail.file
      );
      const { file, base64 } = await mergeImagesHelper(mergedImageArray);

      const formData = new FormData();
      formData.append("files", file);
      formData.append("doc_types", singleDocumentDetails?.selectedSubType);

      formData.append("phone_no", userDetails?.phone_no);

      uploadImageToAws(formData)
        .then((response) => {
          toast.success("Prescription Image Uploaded Successfully.");
          const uploaded_files = response.uploaded_files;
          dispatch(setThirdScreenNextPopoverOpen(false));
          dispatch(setUploadedImageDetails([])); // empty image details
          dispatch(clearMultiUploadDoc()); //clear multiple documents managed array
          dispatch(clearMorePrescriptionImages()); //clear multiple prescription images

          CreateCase([uploaded_files[0]?.file_url]);
        })
        .catch((error) => {
          setLoading(false);
          toast.error(
            error.response.data?.detail ||
              "Image Upload Failed, Please Try After Few Seconds."
          );
        });
    } catch (error: any) {
      toast.error(error.message || "Image merge failed.");
    }
  };

  const CreateCase = (prescription_urls: any) => {
    createCase({
      patient_user_id: userId,
      prescription_urls,
      report_dtls: [],
    })
      .then((response) => {
        setLoading(false);
        toast.success("Documents Submitted Successfully.");
        if (pharmacyUserId) {
          dispatch(setIsRedeemDiscount(true));
        }
        router.push("/dashboard");
        dispatch(resetDetailsAfterSubmit());
      })
      .catch((error: any) => {
        setLoading(false);
        toast.error(error || "Case Created Failed, Please try After Few Time.");
      });
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
          {`Please Upload Your ${singleDocumentDetails.selectedType} For Same Prescription.`}
        </motion.div>

        <div className="mt-6 max-w-lg p-6">
          <UploadImageComponent />
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
            isLoading={loading}
            onClick={() => {
              // if (uploadImageDetail.length <= 0 && !uploadImageDetail[0]?.file) {
              //   toast.warning("Please select a file to upload.");
              //   return;
              // }
              // dispatch(setThirdScreenNextPopoverOpen(true));
              clickToNo();
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
      <RedeemDiscountModal />
    </>
  );
};

export default UploadDocumentsSamePrescription;
