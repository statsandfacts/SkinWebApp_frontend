import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { Image } from "@nextui-org/react";
import { setViewOriginalImageModal } from "@/redux/slices/digitalPrescription/digitalPrescription.slice";
import { getFileType } from "@/helper/objectHelper";
import {
  DocumentIcon,
  EnvelopeIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";

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

  // Share via Email
  const shareViaEmail = () => {
    const subject = encodeURIComponent("Prescription Image");
    const body = encodeURIComponent(
      `Here is the ${
        singlePrescriptionDetails?.report_type
          ? singlePrescriptionDetails?.report_type
          : "Prescription"
      } image: ${fileUrl}`
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  // Share via WhatsApp
  const shareViaWhatsApp = () => {
    const message = encodeURIComponent(
      `Here is the ${
        singlePrescriptionDetails?.report_type
          ? singlePrescriptionDetails?.report_type
          : "Prescription"
      } image: ${fileUrl}`
    );
    window.open(`https://wa.me/?text=${message}`, "_blank");
  };

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
            {/* Modal Header with Share Icons */}
            <ModalHeader className="flex justify-between items-center capitalize">
              <span>
                {singlePrescriptionDetails?.report_type
                  ? singlePrescriptionDetails?.report_type
                  : "Prescription"}{" "}
                Original Image
              </span>

              {/* Share Buttons */}
              <div className="flex gap-3">
                {/* Email Share */}
                <button
                  onClick={shareViaEmail}
                  className="p-2 rounded-md hover:bg-gray-200 transition"
                  title="Share via Email"
                >
                  <EnvelopeIcon className="h-6 w-6 text-blue-600" />
                </button>

                {/* WhatsApp Share */}
                <button
                  onClick={shareViaWhatsApp}
                  className="p-2 rounded-md hover:bg-gray-200 transition"
                  title="Share via WhatsApp"
                >
                  <ShareIcon className="h-6 w-6 text-green-600" />
                </button>
              </div>
            </ModalHeader>

            {/* Modal Body */}
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
