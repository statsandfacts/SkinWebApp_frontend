"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  setAfterUploadDocWithType,
  setFirstScreenNextPopoverOpen,
  setFirstScreenNoPopoverOpen,
  setStep,
  setUploadedImageDetails,
} from "@/redux/slices/digitalPrescription/stepManagement.slice";
import ShowPopover from "@/components/common/Popover";
import { toast } from "react-toastify";
import { uploadImageToAws } from "@/services/api.digitalPrescription.service";
import { useAuthInfo } from "@/hooks/useAuthInfo";

const FirstScreenNext: React.FC = () => {
  const dispatch = useDispatch();

  const { isFirstScreenNextPopoverOpen, uploadImageDetail, singleDocumentDetails } = useSelector(
    (state: RootState) => state.stepManagement
  );
  const { userDetails } = useAuthInfo();
  const [loading, setLoading] = useState<boolean>(false);

  const clockToNo = () => {
    if (!uploadImageDetail?.file) {
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
    const formData = new FormData();

    formData.append("files", uploadImageDetail.file);
    formData.append("doc_types", singleDocumentDetails?.selectedSubType);
    formData.append("phone_no", userDetails?.phone_no);

    uploadImageToAws(formData)
      .then((response) => {
        toast.success("Prescription Image Uploaded Successfully.");
        dispatch(setAfterUploadDocWithType(response.uploaded_files)); //update image details in redux
        dispatch(setFirstScreenNextPopoverOpen(false));
        dispatch(setFirstScreenNoPopoverOpen(true));
        dispatch(setUploadedImageDetails({ file: null, imageUrl: "" })); // empty image details
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
      <ShowPopover
        onConfirm={() => {
          dispatch(setFirstScreenNextPopoverOpen(false));
          dispatch(setStep(3));
        }}
        onClose={clockToNo}
        isOpen={isFirstScreenNextPopoverOpen}
        onOpenChange={() => {
          dispatch(setFirstScreenNextPopoverOpen(false));
        }}
      >
        <div className="flex flex-col items-center gap-4">
          <p className="text-lg text-gray-700 text-center">
            Do you want to upload the second page for the same prescription?
          </p>
          <div className="w-full bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
            <p className="text-blue-700 text-sm">
              Tip: If the prescription has multiple pages, it’s recommended to
              upload all pages for better accuracy and faster processing.
            </p>
          </div>
        </div>
      </ShowPopover>
    </>
  );
};

export default FirstScreenNext;
