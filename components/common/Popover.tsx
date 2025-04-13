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
  fromActKey?: string;
  modalTitle?: string;
  onConfirm?: () => void;
  onClose?: () => void;
  confirmButtonLabel?: string;
  closeButtonLabel?: string;
  confirmButtonLoading?: boolean;
  closeButtonLoading?: boolean;
  children: ReactNode;
  isOpen: boolean;
  onOpenChange: () => void;
  isCloseButton?: boolean;
  isConfirmButton?: boolean;
}

const ShowPopover: React.FC<ShowPopoverProps> = ({
  fromActKey,
  modalTitle,
  onConfirm,
  onClose,
  confirmButtonLabel = "Yes",
  closeButtonLabel = "No",
  confirmButtonLoading = false,
  closeButtonLoading = false,
  isCloseButton = true,
  isConfirmButton = true,
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
              {fromActKey === "Test Report" ? (
                <>
                  <Button
                    color="danger"
                    variant="light"
                    isLoading={confirmButtonLoading}
                    onPress={onConfirm}
                  >
                    {confirmButtonLabel}
                  </Button>
                  <Button
                    color="primary"
                    isLoading={closeButtonLoading}
                    onPress={onClose}
                  >
                    {closeButtonLabel}
                  </Button>
                </>
              ) : (
                <>
                  {isCloseButton && (
                    <Button
                      color="danger"
                      isLoading={closeButtonLoading}
                      variant="light"
                      onPress={onClose}
                    >
                      {closeButtonLabel}
                    </Button>
                  )}

                  {isConfirmButton && (
                    <Button
                      color="primary"
                      isLoading={confirmButtonLoading}
                      onPress={onConfirm}
                    >
                      {confirmButtonLabel}
                    </Button>
                  )}
                </>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ShowPopover;
