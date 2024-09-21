"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  setAfterUploadDocWithType,
  setStep,
  setSubmitDocumentsPopoverOpen,
  setUploadedImageDetails,
  setUploadMoreReportsPopoverOpen,
} from "@/redux/slices/digitalPrescription/stepManagement.slice";
import ShowPopover from "@/components/common/Popover";
import SubmitDocumentsPopover from "./SubmitDocumentsPopover";
import { useAuthInfo } from "@/hooks/useAuthInfo";
import { toast } from "react-toastify";
import { uploadImageToAws } from "@/services/api.digitalPrescription.service";

const UploadMoreReportsPopover: React.FC = () => {
  const dispatch = useDispatch();

  const {
    isUploadMoreReportsPopoverOpen,
    uploadImageDetail,
    singleDocumentDetails,
  } = useSelector((state: RootState) => state.stepManagement);
  const { userDetails } = useAuthInfo();
  const [loading, setLoading] = useState<boolean>(false);

  const clockToNo = () => {
    if (!uploadImageDetail?.file) {
      toast.warning("Please select test report file to upload.");
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
    const formData = new FormData();

    formData.append("files", uploadImageDetail.file);
    formData.append("doc_types", singleDocumentDetails?.selectedSubType);
    formData.append("phone_no", userDetails?.phone_no);

    setLoading(true);
    uploadImageToAws(formData)
      .then((response) => {
        toast.success("Prescription Image Uploaded Successfully.");
        dispatch(setAfterUploadDocWithType(response.uploaded_files)); //update image details in redux
        dispatch(setUploadMoreReportsPopoverOpen(false));
        dispatch(setSubmitDocumentsPopoverOpen(true));
        dispatch(setUploadedImageDetails({ file: null, imageUrl: "" })); // empty image details
      })
      .catch((error) => {
        toast.error(
          error.response?.data?.detail ||
            "Image Upload Failed, Please Try After Few Seconds."
        );
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <ShowPopover
        onConfirm={() => {
          dispatch(setStep(0));
          dispatch(setUploadMoreReportsPopoverOpen(false));
        }}
        onClose={clockToNo}
        closeButtonLoading={loading}
        isOpen={isUploadMoreReportsPopoverOpen}
        onOpenChange={() => {
          dispatch(setUploadMoreReportsPopoverOpen(false));
        }}
      >
        <div className="flex flex-col items-center gap-4">
          <p className="text-lg text-gray-700 text-center">
            Do you want to upload more report?
          </p>
          <div className="w-full bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
            <p className="text-green-700 text-sm">
              Tip: Uploading all relevant reports helps in providing complete
              medical data for accurate diagnosis and treatment recommendations.
            </p>
          </div>
        </div>
      </ShowPopover>

      <SubmitDocumentsPopover />
    </>
  );
};

export default UploadMoreReportsPopover;
