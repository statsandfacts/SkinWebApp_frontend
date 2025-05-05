"use client";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { useDispatch, useSelector } from "react-redux";
import { setViewPrescriptionDetailsModal } from "@/redux/slices/digitalPrescription/digitalPrescription.slice";

import AddReminderModalFromPrescription from "./AddReminderModelFromPrescription";
import NCTemplate1 from "./DPTemplates/NCTemplate1";
export default function ViewPrescriptionDetailsModal() {
  const dispatch = useDispatch();

  const { isViewPrescriptionDetailsModal } = useSelector(
    (state: any) => state.digitalPrescription
  );

  const onClose = () => {
    dispatch(setViewPrescriptionDetailsModal(false));
  };

  return (
    <>
      <Modal
        size={"5xl"}
        isOpen={isViewPrescriptionDetailsModal}
        onClose={onClose}
      >
        <ModalContent className="mb-[4.5rem]">
          {() => (
            <>
              <ModalHeader className="flex flex-row justify-between items-center gap-1">
                <p>Prescription Details</p>
              </ModalHeader>
              <ModalBody>
                <NCTemplate1 />
              </ModalBody>
              <ModalFooter>
                <p className="text-sky-800 font-bold text-sm">
                  {" "}
                  NextCare.life{" "}
                </p>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <AddReminderModalFromPrescription />
    </>
  );
}
