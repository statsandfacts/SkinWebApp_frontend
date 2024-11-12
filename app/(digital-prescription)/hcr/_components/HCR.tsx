"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import UploadImageComponent from "@/components/DigitalPrescription/UploadPrescription/Common/UploadImageComponent";
import { Button } from "@nextui-org/button";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { toast } from "react-toastify";
import {
  analyzeHealthReport,
  uploadImageToAws,
} from "@/services/api.digitalPrescription.service";
import { setUploadedImageDetails } from "@/redux/slices/digitalPrescription/stepManagement.slice";
import dayjs from "dayjs";
import { setUser } from "@/redux/slices/digitalPrescription/auth.slice";

const HCR = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { uploadImageDetail } = useSelector(
    (state: RootState) => state.stepManagement
  );
  const [loading, setLoading] = useState<boolean>(false);

  const UploadHCR = () => {
    if (!uploadImageDetail[0]?.file) {
      toast.warning("Please select test report file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("files", uploadImageDetail[0].file);
    formData.append("phone_no", dayjs().format("YYYY-MM-DD"));
    formData.append("doc_types", "Health Camp Report");

    setLoading(true);
    uploadImageToAws(formData)
      .then((response) => {
        const uploaded_files = response.uploaded_files;
        dispatch(setUploadedImageDetails([]));

        toast.promise(
          new Promise((resolve, reject) => {
            analyzeHealthReport({
              report_url: uploaded_files[0].file_url,
            })
              .then((response) => {
                resolve(response);
                router.push("/dashboard");
                dispatch(
                  setUser({
                    userId: response.user_id,
                    sessionId: new Date().getTime().toString(),
                  })
                );
              })
              .catch((error) => {
                reject(error);
              });
          }),
          {
            pending: "Analyzing health report...",
            success: "Health report analyzed successfully!",
            error: {
              render({ data }: { data: any }) {
                if (data && typeof data === "object" && "message" in data) {
                  return (data as { message: string }).message;
                }
                return "Analyze Health Report Failed, Please try after some time.";
              },
            },
          }
        );
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
    <div className="flex flex-col items-center justify-center mt-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-lg font-semibold capitalize"
      >
        {`Please Upload Your Health Camp Report`}
      </motion.div>

      <div className="mt-6 max-w-lg p-6">
        <UploadImageComponent />
      </div>

      <div className="w-full flex justify-between max-w-lg px-6 sm:px-11 mt-3">
        <Button
          variant="flat"
          onClick={() => {
            router.back();
          }}
          startContent={<ArrowLeftIcon className="w-4 h-4" />}
        >
          Go Back
        </Button>
        <Button
          color="primary"
          variant="solid"
          onClick={UploadHCR}
          endContent={<ArrowRightIcon className="w-4 h-4" />}
          isLoading={loading}
        >
          Upload
        </Button>
      </div>
      <div className="text-xs text-sky-700 mt-12 mb-2 text-center font-semibold bg-yellow-100 py-1 px-3 rounded-md shadow-md">
        <p>This option should only be used by NextCare.Life Team.</p>
      </div>
    </div>
  );
};

export default HCR;
