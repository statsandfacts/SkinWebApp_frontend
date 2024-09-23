import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import ShowPopover from "@/components/common/Popover";
import {
  clearMultiUploadDoc,
  setAfterUploadDocWithType,
  setFirstScreenNextPopoverOpen,
  setFirstScreenNoPopoverOpen,
  setIsTestReportPopoverOpen,
  setStep,
  setThirdScreenNextPopoverOpen,
  setUploadedImageDetails,
} from "@/redux/slices/digitalPrescription/stepManagement.slice";
import { toast } from "react-toastify";
// @ts-ignore
import mergeImages from "merge-images";
import { useAuthInfo } from "@/hooks/useAuthInfo";
import { uploadImageToAws } from "@/services/api.digitalPrescription.service";
import { mergeImagesHelper } from "@/utils/mergeImagesHelper";

interface ImageObject {
  src: string;
  height: number;
  width: number;
}

const ThirdScreenNext: React.FC = () => {
  const dispatch = useDispatch();

  const {
    isThirdScreenNextPopoverOpen,
    multiUploadedDoc,
    uploadImageDetail,
    singleDocumentDetails,
  } = useSelector((state: RootState) => state.stepManagement);
  const { userDetails } = useAuthInfo();
  const [loading, setLoading] = useState<boolean>(false);

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

      const mergedImageArray = [...multiUploadedDoc, ...uploadImageDetail].map(
        (detail) => detail.file
      );

      const { file, base64 } = await mergeImagesHelper(mergedImageArray);

      const formData = new FormData();

      formData.append("files", file);
      formData.append("doc_types", singleDocumentDetails?.selectedSubType);
      formData.append("phone_no", userDetails?.phone_no);
      setLoading(true);
      uploadImageToAws(formData)
        .then((response) => {
          toast.success("Prescription Image Uploaded Successfully.");
          dispatch(setAfterUploadDocWithType(response.uploaded_files)); //update image details in redux
          dispatch(setThirdScreenNextPopoverOpen(false));
          dispatch(setIsTestReportPopoverOpen(true));
          dispatch(setUploadedImageDetails([])); // empty image details
          dispatch(clearMultiUploadDoc()); //clear multiple documents managed array
        })
        .catch((error) => {
          toast.error(
            error.response.data?.detail ||
              "Image Upload Failed, Please Try After Few Seconds."
          );
        })
        .finally(() => setLoading(false));
    } catch (error: any) {
      toast.error(error.message || "Image merge failed.");
    }
  };

  return (
    <>
      <ShowPopover
        onConfirm={() => {
          toast.warning("Working Under Progress .....");
          // dispatch(setThirdScreenNextPopoverOpen(false));
          // dispatch(setStep(2));
        }}
        closeButtonLoading={loading}
        onClose={clickToNo}
        isOpen={isThirdScreenNextPopoverOpen}
        onOpenChange={() => {
          dispatch(setThirdScreenNextPopoverOpen(false));
        }}
      >
        <div className="flex flex-col items-center gap-4">
          <p className="text-lg text-gray-700 text-center">
            Do you want to upload another prescription?
          </p>
          <div className="w-full bg-purple-50 border-l-4 border-purple-500 p-4 rounded-lg">
            <p className="text-purple-700 text-sm">
              Tip: Uploading all prescriptions at once helps keep your records
              organized and allows for faster processing in the future.
            </p>
          </div>
        </div>
      </ShowPopover>
    </>
  );
};

export default ThirdScreenNext;
