import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  setReuploadModal,
  setSingleCaseDetails,
  setSinglePrescriptionDetails,
} from "@/redux/slices/digitalPrescription/digitalPrescription.slice";
import UploadImageComponent from "../UploadPrescription/Common/UploadImageComponent";
import { setUploadedImageDetails } from "@/redux/slices/digitalPrescription/stepManagement.slice";
import { toast } from "react-toastify";
import { useAuthInfo } from "@/hooks/useAuthInfo";
import {
  updateCase,
  updatePrescription,
  uploadImageToAws,
} from "@/services/api.digitalPrescription.service";
import { fetchPatientDashboard } from "@/redux/slices/digitalPrescription/userDashboard.slice";
import { AppDispatch } from "@/redux/store";

export default function ReUploadImageModal() {
  const dispatch = useDispatch<AppDispatch>();
  const { userDetails, userId } = useAuthInfo();
  const { isReuploadModal, singlePrescriptionDetails, singleCaseDetails } =
    useSelector((state: any) => state.digitalPrescription);
  const { uploadImageDetail } = useSelector(
    (state: any) => state.stepManagement
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onClose = () => {
    setIsLoading(false);
    dispatch(setUploadedImageDetails([]));
    dispatch(setSinglePrescriptionDetails({}));
    dispatch(setSingleCaseDetails({}));
    dispatch(setReuploadModal(false));
  };

  const ReUploadImage = () => {
    if (!uploadImageDetail[0]?.file) {
      toast.warning("Please select test report file to upload.");
      return;
    }
    if (!userDetails?.phone_no) {
      toast.warning("Phone number is missing.");
      return;
    }
    const doc_types = singlePrescriptionDetails?.report_type
      ? singlePrescriptionDetails?.report_type
      : "Prescription";

    const formData = new FormData();
    formData.append("files", uploadImageDetail[0].file);
    formData.append("doc_types", doc_types);
    formData.append("phone_no", userDetails?.phone_no);
    setIsLoading(true);
    toast.info("Uploading Document...");
    uploadImageToAws(formData)
      .then((response) => {
        const uploaded_files = response.uploaded_files;
        updatePrescription({
          prescription_id: singlePrescriptionDetails?.prescription_id,
          prescription_file: uploaded_files[0]?.file_url,
        })
          .then((res) => {
            updateCase({
              case_id: singleCaseDetails?.case_id,
              status: "In progress",
              reason: "",
            })
              .then((response) => {
                toast.success("Document Reuploaded Successfully.");
                dispatch(fetchPatientDashboard(userId));
                onClose();
              })
              .catch((error) => {
                setIsLoading(false);
                toast.error(
                  "Update case status failed, Please Try After Few Minutes."
                );
              });
          })
          .catch((error) => {
            setIsLoading(false);
            toast.error(
              "Update prescription file failed, Please Try After Few Minutes."
            );
          });
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error("Image Upload Failed, Please Try After Few Minutes.");
      });
  };

  return (
    <Modal
      scrollBehavior="inside"
      size="xl"
      isOpen={isReuploadModal}
      onClose={onClose}
    >
      <ModalContent className="mb-20">
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">Reupload</ModalHeader>
            <ModalBody>
              <div>
                <div>
                  <UploadImageComponent />
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button
                color="primary"
                isLoading={isLoading}
                onPress={ReUploadImage}
              >
                Re-upload
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
