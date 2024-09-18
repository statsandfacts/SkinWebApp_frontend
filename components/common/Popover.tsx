import React, { ReactNode } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

interface ShowPopoverProps {
  modalTitle?: string;
  onConfirm: () => void;
  onClose: () => void;
  confirmButtonLabel?: string;
  closeButtonLabel?: string;
  children: ReactNode;
  isOpen: boolean;
  onOpenChange: () => void;
}

const ShowPopover: React.FC<ShowPopoverProps> = ({
  modalTitle,
  onConfirm,
  onClose,
  confirmButtonLabel = "Yes",
  closeButtonLabel = "No",
  children,
  isOpen,
  onOpenChange,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable={false}
      isKeyboardDismissDisabled={true}
    >
      <ModalContent className="mb-[5rem]">
        {() => (
          <>
            {modalTitle && (
              <ModalHeader className="flex flex-col gap-1">
                {modalTitle}
              </ModalHeader>
            )}

            <ModalBody>{children}</ModalBody>
            <ModalFooter className="flex justify-end">
              <Button color="danger" variant="light" onPress={onClose}>
                {closeButtonLabel}
              </Button>
              <Button color="primary" onPress={onConfirm}>
                {confirmButtonLabel}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ShowPopover;
