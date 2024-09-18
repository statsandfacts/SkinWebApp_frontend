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

export default function ViewOriginalPrescriptionImage() {
  const dispatch = useDispatch();
  const { isViewImageModal, singlePrescriptionDetails } = useSelector(
    (state: any) => state.digitalPrescription
  );

  const onClose = () => {
    dispatch(setViewOriginalImageModal(false));
  };

  return (
    <Modal
      scrollBehavior="inside"
      size="4xl"
      isOpen={isViewImageModal}
      onClose={onClose}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Prescription Original Image
            </ModalHeader>
            <ModalBody>
              <div >
                <Image
                  alt="Prescription Original"
                  src={'/images/digitalPrescription/WhatsApp Image 2024-08-27 at 11.54.36 PM.jpeg'}
                  width="100%"
                  height="auto"
                />
              </div>
            </ModalBody>
            <ModalFooter></ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
