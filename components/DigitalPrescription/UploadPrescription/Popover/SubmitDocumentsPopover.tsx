"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { resetDetailsAfterSubmit, setStep, setSubmitDocumentsPopoverOpen, setViewImagesModalOpen } from "@/redux/slices/digitalPrescription/stepManagement.slice";
import ShowPopover from "@/components/common/Popover";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/button";
import ViewImagesModal from "./ViewImagesModal";

const SubmitDocumentsPopover: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { isSubmitDocumentsPopoverOpen, singleDocumentDetails } = useSelector(
    (state: RootState) => state.stepManagement
  );

  const CreateCase = () => {
    if (singleDocumentDetails.uploadImages.length <= 0) {
      toast.warning("Please upload image.")
      return;
    }
    const uploadedFiles = singleDocumentDetails.uploadImages.map((image: any) => image.selectedFile);
    console.log("uploadedFiles", uploadedFiles)
    return
    dispatch(setSubmitDocumentsPopoverOpen(false));
    toast.success("All Documents Submitted Successfully.");
    router.push("/upload-prescription/prescriptions");
    dispatch(resetDetailsAfterSubmit());
  };

  const handleViewImages = () => {
    dispatch(setViewImagesModalOpen(true));
  };

  return (
    <>
      <ShowPopover
        onConfirm={CreateCase}
        onClose={() => {
          dispatch(setSubmitDocumentsPopoverOpen(false));
        }}
        isOpen={isSubmitDocumentsPopoverOpen}
        onOpenChange={() => {
          dispatch(setSubmitDocumentsPopoverOpen(false));
        }}
      >
        <div className="flex flex-col items-center gap-4">
          <p className="text-lg text-gray-700 text-center">
            Are you ready to submit your documents?
          </p>
          <div className="w-full bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
            <p className="text-red-700 text-sm">
              Tip: Ensure all required documents have been uploaded correctly
              for a smooth review process.
            </p>
          </div>
          <Button
            color="primary"
            onClick={handleViewImages}
          >
            View Uploaded Images
          </Button>
        </div>
      </ShowPopover>

      <ViewImagesModal />
    </>
  );
};

export default SubmitDocumentsPopover;
