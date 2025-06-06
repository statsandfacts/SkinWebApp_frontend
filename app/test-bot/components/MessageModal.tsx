"use client";

import {
  setErrorMessageForRedFlag,
  setMessageModalVisible,
  setModalVisible,
} from "@/redux/slices/symptomBot.slice";
import { RootState } from "@/redux/store";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Checkbox,
} from "@heroui/react";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FamilyMembersState } from "@/redux/slices/digitalPrescription/familyMembers.slice";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";

export default function MessageModal({
  Question,
  ModalFor,
  open,
  closeFunction,
  setData,
  userID,
}: {
  Question: any;
  open: boolean;
  ModalFor: string;
  closeFunction: React.Dispatch<React.SetStateAction<boolean>>;
  setData: any;
  userID: any;
}) {
  const dispatch = useDispatch();
  const {
    isModalOpen,
    ExplanationData,
    RedflagQuestion,
    messageModalVisible,
    errorMessageForRedFlag,
  } = useSelector((state: RootState) => state.symptomBot);

  const [accepted, setAccepted] = useState(false);
  const [accepted1, setAccepted1] = useState(false);
  const router = useRouter();

  const handleRedirectToBookAppointment = () => {
    //console.log("Question data : ", Question);
    closeFunction(false);
    dispatch(setErrorMessageForRedFlag(false));
    dispatch(setMessageModalVisible(false));
    router.push("/dashboard/appoinment");
    // setData({
    //   user_id: userID || "",
    //   question_id:
    //     Question?.next_question_id || Question?.previous_question_id,
    //   answer: "ok",
    // });
  };

  const handleClose = () => {
    dispatch(setMessageModalVisible(false));
    dispatch(setErrorMessageForRedFlag(false));
  }

  //console.log("RedflagQuestion data : ", errorMessageForRedFlag);

  if (errorMessageForRedFlag) {
    return (
      <Modal
        isOpen={messageModalVisible}
        onClose={handleClose}
        placement="center"
      >
        {/* <ModalContent className="mx-4 sm:mx-auto sm:max-w-md"> */}
        <ModalContent className="mx-4 sm:mx-auto sm:max-w-2xl rounded-xl shadow-xl border border-gray-200">
          <ModalHeader>
            <p className="text-2xl font-semibold text-left mb-4 text-red-600">
              ALERT
            </p>
          </ModalHeader>
          <ModalBody>
            <div className="px-2 py-6 rounded-lg flex flex-col justify-center items-center min-w-full">
              <ExclamationTriangleIcon className="w-14 h-13 text-red-600 mt-1" />
              <p className="text-xl font-semibold text-left mb-4 text-red-600">
                RED FLAG SYMPTOM DETECTED.
              </p>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button
              onPress={handleRedirectToBookAppointment}
              className="w-full bg-red-600 font-medium text-white"
            >
              Okay
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }

  return (
    <>
      <Modal
        isOpen={messageModalVisible}
        onClose={() => dispatch(setMessageModalVisible(false))}
        placement="center"
      >
        {/* <ModalContent className="mx-4 sm:mx-auto sm:max-w-md"> */}
        <ModalContent className="mx-4 sm:mx-auto sm:max-w-2xl rounded-xl shadow-xl border border-gray-200">
          <ModalHeader>
            {Question?.next_question_id === "Q5" ? "BMI Check" : "INFO"}
          </ModalHeader>
          <ModalBody>
            <div
              className={
                Question?.next_question_id === "Q5"
                  ? "px-2 py-6 rounded-lg flex flex-col justify-center items-center min-w-full"
                  : "px-6 py-8 rounded-lg bg-gray-200 flex flex-col justify-center items-start w-full"
              }
            >
              {(() => {
                // Check if message has bullet points
                const hasBullets = Question?.message?.includes("•");

                if (hasBullets) {
                  const [headerPart, ...conditionPart] = Question.message
                    .trim()
                    .split("\n");
                  const bulletPoints = conditionPart
                    .filter((line: string) => line.trim().startsWith("•"))
                    .map((line: string) => line.replace(/^•\s*/, ""));

                  return (
                    <>
                      <p className="text-xl font-semibold text-left mb-4 text-gray-600">
                        {headerPart.trim()}
                      </p>
                      <div className="mt-2 space-y-2">
                        {bulletPoints.map((point: any, index: number) => (
                          <div
                            key={index}
                            className="flex space-x-2 items-center"
                          >
                            <CheckCircleIcon className="w-5 h-5 text-green-600 mt-1" />
                            <span className="text-base text-gray-900 leading-relaxed font-semibold">
                              {point}
                            </span>
                          </div>
                        ))}
                      </div>
                    </>
                  );
                } else {
                  // //console.log("Question data : ", Array.isArray(Question?.message));
                  // //console.log("Question data : ", Question?.message.map((item: string) => //console.log(item)));

                  return (Array.isArray(Question?.message) ? (
                    <ul className="list-disc list-inside text-left">
                      {Question?.message.map((item: string, index: number) => (
                        <li key={index} className="text-black font-semibold">
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    (() => {
                      const match =
                        Question?.message?.match(/^(.*)\((.*)\)\.?$/);
                      if (!match) {
                        return (
                          <p className="font-bold text-lg text-center">
                            {Question?.message}
                          </p>
                        );
                      }

                      const [_, scoreText, category] = match;
                      let colorClass = "";

                      switch (category.toLowerCase()) {
                        case "normal weight":
                          colorClass = "text-green-600";
                          break;
                        case "overweight":
                        case "immediate medical attention required":
                          colorClass = "text-red-600";
                          break;
                        case "obesity":
                        case "underweight":
                          colorClass = "text-orange-500";
                          break;
                        default:
                          colorClass = "text-red-500";
                      }

                      return (
                        <p className="font-bold text-lg text-center">
                          {scoreText}(
                          <span className={colorClass}> {category} </span>)
                        </p>
                      );
                    })()
                  ))
                }
              })()}
            </div>
          </ModalBody>

          <ModalFooter>
            <Button
              onPress={() => dispatch(setMessageModalVisible(false))}
              className="w-full bg-primary-lite font-medium"
            >
              Okay
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
