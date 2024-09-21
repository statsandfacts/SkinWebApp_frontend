"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  clearMultiUploadDoc,
  setAfterUploadDocWithType,
  setMultiUploadDoc,
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
    multiUploadedDoc,
  } = useSelector((state: RootState) => state.stepManagement);
  const { userDetails } = useAuthInfo();
  const [loading, setLoading] = useState<boolean>(false);

  const clickToNo = () => {
    if (!uploadImageDetail[0]?.file) {
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

    if (multiUploadedDoc.length > 0) {
      const mergedArray = (
        uploadImageDetail?.map((item) => ({
          ...item,
          report_type: singleDocumentDetails?.selectedSubType || null,
        })) || []
      ).concat(multiUploadedDoc || []);

      console.log("mergedArray", mergedArray)

      mergedArray.forEach((item: any) => {
        formData.append(`files`, item?.file);
        formData.append(`doc_types`, item?.report_type);
      });
    } else {
      formData.append("files", uploadImageDetail[0].file);
      formData.append("doc_types", singleDocumentDetails?.selectedSubType);
    }

    formData.append("phone_no", userDetails?.phone_no);

    setLoading(true);
    uploadImageToAws(formData)
      .then((response) => {
        toast.success("Prescription Image Uploaded Successfully.");
        dispatch(setAfterUploadDocWithType(response.uploaded_files)); //update image details in redux
        dispatch(setUploadMoreReportsPopoverOpen(false));
        dispatch(setSubmitDocumentsPopoverOpen(true));
        dispatch(setUploadedImageDetails([])); // empty image details
        dispatch(clearMultiUploadDoc());
      })
      .catch((error) => {
        toast.error(
          error.response?.data?.detail ||
            "Image Upload Failed, Please Try After Few Seconds."
        );
      })
      .finally(() => setLoading(false));
  };

  const clickToYes = () => {
    dispatch(
      setMultiUploadDoc([
        {
          ...uploadImageDetail[0],
          report_type: singleDocumentDetails?.selectedSubType,
        },
      ])
    ); // store current details use in next step upload multiple
    dispatch(setStep(0));
    dispatch(setUploadMoreReportsPopoverOpen(false));
    dispatch(setUploadedImageDetails([])); // empty current image details
  };

  return (
    <>
      <ShowPopover
        onConfirm={clickToYes}
        onClose={clickToNo}
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
