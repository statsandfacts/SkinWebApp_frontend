import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@nextui-org/button";
import UploadedImages from "./UploadedImages";
import UploadReportsImages from "./UploadReportsImages";
import { createCase } from "@/services/api.digitalPrescription.service";
import { useAuthInfo } from "@/hooks/useAuthInfo";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { clearImages } from "@/redux/slices/digitalPrescription/digitalPrescription.slice";
import { setPrescriptionDetailTab } from "@/redux/slices/digitalPrescription/familyMembers.slice";

interface ChooseReportProps {
  setStep: (step: number) => void;
  step: number;
}

const ChooseReport: React.FC<ChooseReportProps> = ({ setStep, step }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { userId } = useAuthInfo();
  const { uploadImages } = useSelector(
    (state: any) => state.digitalPrescription
  );
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);

  const CreateCase = () => {
    const report_dtls = uploadImages
      .filter((item: any) => item.docType !== "Prescription")
      .flatMap((item: any) =>
        item.images.map((image: any) => ({
          report_url: image,
          report_type: item.docType,
        }))
      );
    const payload = {
      patient_user_id: userId,
      prescription_urls:
        uploadImages.find((item: any) => item.docType === "Prescription")
          ?.images || [],
      report_dtls,
    };

    createCase(payload)
      .then((response) => {
        router.push('/upload-prescription/prescriptions')
        toast.success("Case Created Successfully.");
        dispatch(setPrescriptionDetailTab("Prescriptions"));
        dispatch(clearImages([]));
      })
      .catch((error) => {
        console.log("create case error:-", error.response?.data);
        toast.error(
          error.response.data?.detail ||
            "Case Created Failed, Please Try After Few Seconds."
        );
      });
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        className="w-full min-h-48 max-h-fit flex flex-col"
      >
        {/* <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="text-lg font-semibold mb-4"
      >
        Upload Your Prescription or Test Report
      </motion.header> */}

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="self-center mt-4 flex justify-end w-full"
        >
          <Button
            onClick={() => {
              setIsUploadModalOpen(true);
            }}
            className="bg-sky-900 text-white"
          >
            Upload Prescription
          </Button>
        </motion.div>
        <UploadedImages />
      </motion.div>
      <UploadReportsImages
        isOpen={isUploadModalOpen}
        onClose={() => {
          setIsUploadModalOpen(false);
        }}
      />
    </>
  );
};

export default ChooseReport;
