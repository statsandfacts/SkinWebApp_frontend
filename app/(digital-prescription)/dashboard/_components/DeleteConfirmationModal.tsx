import { Button } from "@nextui-org/button";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Modal isOpen={isOpen} size="xl" onClose={onClose}>
      <ModalContent>
      <ModalHeader>Confirm Deletion</ModalHeader>
      <ModalBody>
        <p>Are you sure you want to delete this medicine reminder?</p>
      </ModalBody>
      <ModalFooter>
       
        <Button onClick={onClose}>No</Button>
        <Button color="primary" onClick={onConfirm}>Yes</Button>
      </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteConfirmationModal;
