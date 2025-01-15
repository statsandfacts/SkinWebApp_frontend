import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { Image } from "@nextui-org/react";
import { setViewOriginalImageModal } from "@/redux/slices/digitalPrescription/digitalPrescription.slice";
import { getFileType } from "@/helper/objectHelper";
import { DocumentIcon } from "@heroicons/react/24/outline";

export default function ViewOriginalPrescriptionImage() {
  const dispatch = useDispatch();
  const { isViewImageModal, singlePrescriptionDetails } = useSelector(
    (state: any) => state.digitalPrescription
  );

  const onClose = () => {
    dispatch(setViewOriginalImageModal(false));
  };

  const documentType = getFileType(
    singlePrescriptionDetails.report_file
      ? singlePrescriptionDetails.report_file
      : singlePrescriptionDetails?.prescription_file
  );

  const fileUrl = singlePrescriptionDetails.report_file
    ? singlePrescriptionDetails.report_file
    : singlePrescriptionDetails?.prescription_file;
  return (
    <Modal
      scrollBehavior="inside"
      size="4xl"
      isOpen={isViewImageModal}
      onClose={onClose}
    >
      <ModalContent className="mb-20">
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1 capitalize">
              {singlePrescriptionDetails?.report_type
                ? singlePrescriptionDetails?.report_type
                : "Prescription"}{" "}
              Original Image
            </ModalHeader>
            <ModalBody>
              <div>
                {documentType === "image" ? (
                  <Image
                    alt="Prescription Original"
                    src={fileUrl}
                    width="100%"
                    height="auto"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-40">
                    <a
                      href={fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sky-800 underline"
                    >
                      <DocumentIcon className="h-6 w-6" />
                      View Report PDF
                    </a>
                  </div>
                )}
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
