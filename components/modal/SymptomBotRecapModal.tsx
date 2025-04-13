'use client'
import { setIsTestSearchModal } from "@/redux/slices/digitalPrescription/drug.slice";
import { RootState } from "@/redux/store";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import SearchMedicinePortal from "../Header/SearchMedicine";
import { useState } from "react";

type SymptomBotRecapModalProps = {
  openModal: boolean;
  onClosefunction: () => void;
  data: any[];
};

export default function SymptomBotRecapModal({
  openModal,
  onClosefunction,
  data,
}: SymptomBotRecapModalProps) {
  // console.log("data", data);

  return (
    <>
      <Modal isOpen={openModal} onOpenChange={onClosefunction} className="">
        <ModalContent className="mb-20 ">
              <ModalHeader className="flex flex-col gap-1">
                Response Recap
              </ModalHeader>
              <ModalBody className="flex flex-col overflow-y-auto max-h-96">
                <div className="h-72">
                    {data.map((item, index) => (
                      <div key={index} className="flex flex-col gap-2 mb-4">
                        <div className="font-bold">{item.question}</div>
                        <div className="text-gray-700"> {typeof item.answer === "string" ? (
                      item.answer
                    ) : (
                      Object.entries(item.answer).map(([key, value], subIndex) => (
                        <div key={subIndex} className="flex flex-col">
                          <span className="font-semibold">{key}:</span>
                          <span>{String(value)}</span>
                        </div>
                      ))
                    )}</div>
                      </div>
                    ))}
                </div>
              </ModalBody>
              <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
      {/* <div className="w-full flex flex-col gap-1">
        <div className="h-72">
          {data.map((item, index) => (
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
      </div> */}
    </>
  );
}
