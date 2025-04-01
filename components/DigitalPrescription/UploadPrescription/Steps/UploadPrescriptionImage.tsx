"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  resetDetailsAfterSubmit,
  setFirstScreenNextPopoverOpen,
  setIsTestReportPopoverOpen,
  setStep,
  setUploadedImageDetails,
  setUploadMoreReportsPopoverOpen,
} from "@/redux/slices/digitalPrescription/stepManagement.slice";
import { motion } from "framer-motion";
import UploadImageComponent from "../Common/UploadImageComponent";
import { Button } from "@nextui-org/button";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import {
  FirstScreenNext,
  FirstScreenNo,
  TestReportPopover,
  UploadMoreReportsPopover,
} from "../Popover";
import { toast } from "react-toastify";
import { useAuthInfo } from "@/hooks/useAuthInfo";
import {
  analyzeHealthReport,
  createCase,
  uploadImageToAws,
} from "@/services/api.digitalPrescription.service";
import { useRouter } from "next/navigation";
import { set } from "lodash";

const UploadDocumentImage: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { singleDocumentDetails, uploadImageDetail } = useSelector(
    (state: RootState) => state.stepManagement
  );
  const { userDetails, userId } = useAuthInfo();
  const [loading, setLoading] = useState<boolean>(false);

  const UploadHealthCampReport = () => {
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
    formData.append("files", uploadImageDetail[0].file);
    formData.append("doc_types", singleDocumentDetails?.selectedSubType);
    formData.append("phone_no", userDetails?.phone_no);
    setLoading(true);
    uploadImageToAws(formData)
      .then((response) => {
        const uploaded_files = response.uploaded_files;
        dispatch(setUploadedImageDetails([]));

        const report_dtls: any = uploaded_files.map((report: any) => ({
          report_type: report.doc_type,
          report_url: report.file_url,
        }));

        createCase({
          patient_user_id: userId,
          prescription_urls: [],
          report_dtls,
        })
          .then((response) => {
            setLoading(false);
            toast.success("Case created successfully.");
            toast.success("Documents Submitted Successfully.");
            router.push("/dashboard");
            dispatch(resetDetailsAfterSubmit());
          })
          .catch((error: any) => {
            setLoading(false);
            toast.error(
              error || "Case Created Failed, Please try After Few Time."
            );
          });
      })
      .catch((error) => {
        setLoading(false);
        toast.error("Image Upload Failed, Please Try After Few Seconds.");
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
          {`Please Upload Your ${singleDocumentDetails.selectedSubType}`}
        </motion.div>

        <div className="mt-6 max-w-lg p-6">
          <UploadImageComponent />
        </div>

        <div className="w-full flex justify-between max-w-lg px-6 sm:px-11 mt-3">
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
              if (!uploadImageDetail[0]?.file) {
                toast.warning("Please select a file to upload.");
                return;
              }
              if (singleDocumentDetails.selectedSubType === "Test Report") {
                dispatch(setUploadMoreReportsPopoverOpen(true));
                
                return;
                
                // if (
              //   singleDocumentDetails.selectedSubType === "Health Camp Report"
              // ) {
              //   UploadHealthCampReport();
              //   return;
              // }
              }
              if (singleDocumentDetails.selectedType === "Prescription") {
                dispatch(setFirstScreenNextPopoverOpen(true));
              } else {
                // dispatch(setUploadMoreReportsPopoverOpen(true));
                UploadHealthCampReport();
              }
            }}
            endContent={<ArrowRightIcon className="w-4 h-4" />}
            isLoading={loading}
          >
            Next
          </Button>
        </div>
      </div>

      <FirstScreenNext />
      <FirstScreenNo />
      <TestReportPopover />
      <UploadMoreReportsPopover />
    </>
  );
};

export default UploadDocumentImage;
