import { Button } from "@heroui/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";

interface DeleteRefillReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteRefillReminderModal: React.FC<DeleteRefillReminderModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  return (
    <Modal isOpen={isOpen} size="xl" onClose={onClose}>
      <ModalContent>
        <ModalHeader>Confirm Refill Reminder Deletion</ModalHeader>
        <ModalBody>
          <p>Are you sure you want to delete this refill reminder?</p>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>No</Button>
          <Button color="primary" onClick={onConfirm}>
            Yes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteRefillReminderModal;
