'use client'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

type SymptomBotRecapModalProps = {
  openModal: boolean;
  onClosefunction: () => void;
  onEndChatOkay?: () => void;
  summary?: string;
};

export default function SymptomBotRecapModal({
  openModal,
  onClosefunction,
  summary,
  onEndChatOkay,
}: SymptomBotRecapModalProps) {

  return (
    <>
      <Modal isOpen={openModal} onOpenChange={onClosefunction} size={summary === "Feel free to visit anytime !" ? "md" : "5xl"} placement="center">
        <ModalContent className="mb-20 h-auto">
              <ModalHeader className="flex flex-col gap-1">
              {summary === "Feel free to visit anytime !" ? "Info" : "Your Summary"}
              </ModalHeader>
              <ModalBody className="flex flex-col overflow-y-auto max-h-96">
                <div className="">
                  {summary}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button onClick={onEndChatOkay} className="bg-primary-lite w-full">
                  Okay
                </Button>
              </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
