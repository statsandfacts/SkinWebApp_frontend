import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/modal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setTermConditionModal } from "@/redux/slices/digitalPrescription/auth.slice";
import { TermsDP } from "@/components/Policy/TermAndCondition";

export default function TermsAndConditionsModal() {
  const { isTermConditionOpen } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(setTermConditionModal(false));
  };

  return (
    <>
      <Modal size={"2xl"} isOpen={isTermConditionOpen} onClose={onClose}>
        <ModalContent className="mb-20">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Terms And Conditions
              </ModalHeader>
              <ModalBody className="overflow-y-auto max-h-unit-96">
                <TermsDP />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
