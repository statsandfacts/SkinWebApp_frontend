'use client'
import { setIsTestSearchModal } from "@/redux/slices/digitalPrescription/drug.slice";
import { RootState } from "@/redux/store";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { useDispatch, useSelector } from "react-redux";
import SearchMedicinePortal from "../Header/SearchMedicine";
import { useState } from "react";

type SymptomBotRecapModalProps = {
  openModal: boolean;
  onClosefunction: () => void;
  onEndChatOkay?: () => void;
  data?: any[];
  summary?: string;
  showRecap: boolean;
};

export default function SymptomBotRecapModal({
  openModal,
  onClosefunction,
  data,
  summary,
  showRecap,
  onEndChatOkay,
}: SymptomBotRecapModalProps) {
  // console.log("data", data);

  return (
    <>
      <Modal isOpen={openModal} onOpenChange={onClosefunction} size={summary === "Feel free to visit anytime !" ? "md" : "5xl"}>
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
      {showRecap && <div className="w-full flex flex-col gap-1">
        <div className="h-auto overflow-y-auto">
          {data?.map((item, index) => (
            <div key={index} className="flex flex-col gap-2 mb-4">
                <div className="flex">
                 <div className="font-bold mr-3">{index+1+"."+" "}</div>
                 <div className="font-bold ml-1">{item.question}</div>
                </div>
              <div className="text-gray-700 ml-9">
                {" "}
                {typeof item.answer === "string"
                  ? "Ans -  " + item.answer
                  : Object.entries(item.answer).map(
                      ([key, value], subIndex) => (
                        <div key={subIndex} className="flex">
                          <span className="font-semibold">{key}:</span>
                          <span>{String(value)}</span>
                        </div>
                      )
                    )}
              </div>
            </div>
          ))}
        </div>
      </div>}
    </>
  );
}
