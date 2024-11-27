"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  resetDetailsAfterSubmit,
  setStep,
  setSubmitDocumentsPopoverOpen,
  setViewImagesModalOpen,
} from "@/redux/slices/digitalPrescription/stepManagement.slice";
import ShowPopover from "@/components/common/Popover";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/button";
import ViewImagesModal from "./ViewImagesModal";
import { useAuthInfo } from "@/hooks/useAuthInfo";
import { createCase } from "@/services/api.digitalPrescription.service";

const SubmitDocumentsPopover: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { userId } = useAuthInfo();
  const { isSubmitDocumentsPopoverOpen, afterUploadedDocDataWithType } =
    useSelector((state: RootState) => state.stepManagement);
  const [loading, setLoading] = useState<boolean>(false);

  const CreateCase = () => {
    if (afterUploadedDocDataWithType.length <= 0) {
      toast.warning("Please upload documents.");
      return;
    }
    const prescription_urls = afterUploadedDocDataWithType
      .filter(
        (doc: { file_url: string; doc_type: string }) =>
          doc.doc_type === "Prescription"
      )
      .map((doc: { file_url: string; doc_type: string }) => doc.file_url);
    const report_dtls = afterUploadedDocDataWithType
      .filter(
        (doc: { file_url: string; doc_type: string }) =>
          doc.doc_type !== "Prescription"
      )
      .map((doc: { file_url: string; doc_type: string }) => ({
        report_url: doc.file_url,
        report_type: doc.doc_type,
      }));

    setLoading(true);
    createCase({
      patient_user_id: userId,
      prescription_urls,
      report_dtls,
    })
      .then((response) => {
        toast.success("All Documents Submitted Successfully.");
        dispatch(setSubmitDocumentsPopoverOpen(false));
        router.push("/dashboard");
        dispatch(resetDetailsAfterSubmit());
      })
      .catch((error: any) => {
        toast.error(error || "Case Created Failed, Please try After Few Time.");
      })
      .finally(() => setLoading(false));
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
        isCloseButton={false}
        confirmButtonLoading={loading}
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
          <Button color="primary" onClick={handleViewImages}>
            View Uploaded Images
          </Button>
        </div>
      </ShowPopover>

      <ViewImagesModal />
    </>
  );
};

export default SubmitDocumentsPopover;
