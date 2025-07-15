"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";

type SymptomBotRecapModalProps = {
  openModal: boolean;
  onClosefunction: () => void;
  onEndChatOkay?: () => void;
  summary?: string | Record<string, any>;
};

export default function SymptomBotRecapModal({
  openModal,
  onClosefunction,
  summary,
  onEndChatOkay,
}: SymptomBotRecapModalProps) {
  return (
    <>
      <Modal
        isOpen={openModal}
        onOpenChange={onClosefunction}
        size={summary === "Feel free to visit anytime !" ? "md" : "5xl"}
        placement="center"
      >
        <ModalContent className="mb-20 h-auto w-50">
          <ModalHeader className="flex flex-col gap-1 text-green-400 text-xl font-bold">
            {summary === "Feel free to visit anytime !"
              ? "Info"
              : "Your Summary"}
          </ModalHeader>
          <ModalBody className="flex flex-col overflow-y-auto max-h-96 justify-center items-center text-center">
            <div className="space-y-2">
              {typeof summary === "object" && summary !== null ? (
                Object.entries(summary).map(([key, value]) => (
                  <div key={key} className="flex items-start gap-x-2">
                    <span className="font-semibold capitalize">
                      {key.replace(/_/g, " ")}:
                    </span>
                    <span>{value !== null ? String(value) : "-"}</span>
                  </div>
                ))
              ) : (
                <p>{summary}</p>
              )}
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
