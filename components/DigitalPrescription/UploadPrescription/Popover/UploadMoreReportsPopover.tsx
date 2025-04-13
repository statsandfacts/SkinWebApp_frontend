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
import {
  digitizeSmartLabReport,
  uploadImageToAws,
} from "@/services/api.digitalPrescription.service";

const UploadMoreReportsPopover: React.FC = () => {
  const dispatch = useDispatch();

  const {
    isUploadMoreReportsPopoverOpen,
    uploadImageDetail,
    singleDocumentDetails,
    multiUploadedDoc,
  } = useSelector((state: RootState) => state.stepManagement);
  const { userDetails, userId } = useAuthInfo();
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

      mergedArray.forEach((item: any) => {
        formData.append(`files`, item?.file);
        formData.append(`doc_types`, item?.report_type);
      });
    } else {
      const aws_f_name =
        singleDocumentDetails?.selectedSubType === "Test Report"
          ? "digital-report"
          : "prescription-test-upload";
      formData.append("f_name", aws_f_name);
      formData.append("files", uploadImageDetail[0].file);
      formData.append("doc_types", singleDocumentDetails?.selectedSubType);
    }

    formData.append("phone_no", userDetails?.phone_no);
    setLoading(true);
    uploadImageToAws(formData)
      .then((response) => {
        if (singleDocumentDetails?.selectedSubType === "Test Report") {
          setLoading(false);
          dispatch(setUploadMoreReportsPopoverOpen(false));
          dispatch(setUploadedImageDetails([]));
          dispatch(clearMultiUploadDoc());

          toast.success(
            "Once your report is digitized, you will be notified via email."
          );
          digitizeSmartLabReport({
            user_id: userId,
            url: response.uploaded_files[0]?.file_url,
            report_type: singleDocumentDetails?.selectedSubType,
          })
            .then((res) => {
              toast.success("Report digitized successfully");
            })
            .catch((ed) => {
              toast.error(
                ed.response?.data?.detail ||
                  "Digitization failed. Please try again later."
              );
            });
          return;
        } else {
          toast.success("Prescription Image Uploaded Successfully.");
          dispatch(setAfterUploadDocWithType(response.uploaded_files)); //update image details in redux
        }
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
    dispatch(setStep(3));
    dispatch(setUploadMoreReportsPopoverOpen(false));
    dispatch(setUploadedImageDetails([])); // empty current image details
  };

  return (
    <>
      <ShowPopover
        fromActKey="Test Report"
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
