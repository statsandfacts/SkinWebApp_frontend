"use client";

import {
  setErrorMessageForRedFlag,
  setMessageModalVisible,
} from "@/redux/slices/symptomBot.slice";
import { RootState } from "@/redux/store";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { AlertTriangle } from "lucide-react";
import { message } from "antd";

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
  const { messageModalVisible, errorMessageForRedFlag } = useSelector(
    (state: RootState) => state.symptomBot
  );

  const [accepted, setAccepted] = useState(false);
  const [accepted1, setAccepted1] = useState(false);
  const router = useRouter();

  const handleRedirectToBookAppointment = () => {
    closeFunction(false);
    dispatch(setErrorMessageForRedFlag(false));
    dispatch(setMessageModalVisible(false));
    // router.push("/dashboard/appoinment");
    // setData({
    //   user_id: userID || "",
    //   question_id: Question?.next_question_id || Question?.previous_question_id,
    //   answer: "ok",
    // });
  };

  const handleClose = () => {
    dispatch(setMessageModalVisible(false));
    dispatch(setErrorMessageForRedFlag(false));
  };

  if (!Question?.message && !errorMessageForRedFlag) return null;

  const getCategoryColorClass = (category: string) => {
    const categoryMap: Record<string, string> = {
      Normal: "bg-green-600",
      "Normal weight": "bg-green-600",
      Overweight: "bg-red-400",
      "Normal Blood Pressure": "bg-green-600",
      "Pre-Diabetes": "bg-yellow-500",
      "Elevated Blood Pressure": "bg-yellow-500",
      "Less likely": "bg-yellow-500",
      "Hypertension (Stage 1)": "bg-orange-500",
      Likely: "bg-orange-600",
      "Hypertension (Stage 2)": "bg-red-400",
      Diabetes: "bg-red-500",
      Obesity: "bg-yellow-500",
      Underweight: "bg-red-600",
      "Most likely": "bg-red-700",
      "Hypertensive Crisis (Immediate medical attention required)":
        "bg-red-500",
    };

     return (
      categoryMap[category] ||
      "bg-gray-500"
    ) + " px-5 py-1 text-white font-bold rounded-full";
  };


  const renderCategoryWithColor = (
    category: string,
    value: any,
    isMultiple = false
  ) => {
    console.log(category);
    return (
      <div
        className={`mt-0 ${isMultiple ? "p-1" : "p-0"} rounded-lg flex ${
          isMultiple ? "flex-row gap-2" : "flex-col justify-center"
        } items-center`}
      >
        <p className={`${isMultiple ? "text-xl" : "text-2xl"} font-bold text-black`}>
          {value}
        </p>
        <p className={getCategoryColorClass(category)}>{category}</p>
      </div>
    );
  };

  // RED FLAG MODAL
  if (errorMessageForRedFlag) {
    return (
      <Modal
        isOpen={messageModalVisible}
        onClose={handleClose}
        placement="center"
      >
        <ModalContent className="mx-4 sm:mx-auto sm:max-w-2xl rounded-xl shadow-xl border border-gray-200">
          <ModalHeader>
            <p className="text-2xl font-semibold text-left mb-4 text-red-600">
              ALERT
            </p>
          </ModalHeader>
          <ModalBody>
            <div className="px-2 py-6 flex flex-col justify-center items-center w-full">
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

  // MESSAGE IS STRING
  if (typeof Question?.message === "string") {
    return (
      <Modal
        isOpen={messageModalVisible}
        onClose={handleClose}
        placement="center"
      >
        <ModalContent className="mx-4 sm:mx-auto sm:max-w-2xl rounded-xl shadow-xl border border-gray-200">
          <ModalHeader>
            <p className="text-2xl font-semibold text-left mb-4">INFO</p>
          </ModalHeader>
          <ModalBody>
            <div className="px-2 py-6 flex flex-col justify-center items-center w-full">
              <p className="text-xl font-semibold text-left mb-4">
                {Question.message}
              </p>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              onPress={() => dispatch(setMessageModalVisible(false))}
              className="w-full font-medium bg-primary-lite text-white"
            >
              close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }

  if (
    typeof Question?.message === "string" ||
    Array.isArray(Question?.message)
  ) {
    return (
      <Modal
        isOpen={messageModalVisible}
        onClose={handleClose}
        placement="center"
      >
        <ModalContent className="mx-4 sm:mx-auto sm:max-w-2xl rounded-xl shadow-xl border border-gray-200">
          <ModalHeader>
            <p className="text-2xl font-semibold text-left ">INFO</p>
          </ModalHeader>
          <ModalBody>
            <div className="px-2 py-6 flex flex-col justify-center items-center w-full space-y-3">
              {Array.isArray(Question.message) ? (
                Question.message.map((msg: string, index: number) => (
                  <p
                    key={index}
                    className="text-left w-full text-base font-bold sm:text-lg "
                  >
                    • {msg}
                  </p>
                ))
              ) : (
                <p className="text-xl font-bold text-left text-black">
                  {Question.message}
                </p>
              )}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              onPress={() => dispatch(setMessageModalVisible(false))}
              className="w-full font-medium bg-primary-lite text-white mb-2"
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }

  // MESSAGE WITH NO DATA
  if (Question?.message?.data === null) {
    return (
      <Modal
        isOpen={messageModalVisible}
        onClose={handleClose}
        placement="center"
      >
        <ModalContent className="mx-4 sm:mx-auto sm:max-w-2xl rounded-xl shadow-xl border border-gray-200">
          <ModalHeader>
            <p className="text-2xl font-semibold text-left mb-4">
              {Question?.message?.title}
            </p>
          </ModalHeader>
          <ModalBody>
            <div className="px-2 py-6 flex flex-col justify-center items-center w-full">
              <p className="text-xl font-semibold text-left mb-4">
                {Question?.message?.description}
              </p>
            </div>
          </ModalBody>
          <ModalFooter> 
            <Button
              onPress={() => dispatch(setMessageModalVisible(false))}
              className="w-full font-medium bg-primary-lite text-white"
            >
              Okay
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }

  // DATA MODAL (MULTI OR SINGLE)
  const dataArray = Question?.message?.data || [];
  console.log("Question Dtaa : ", Question?.message);

  return (
    <Modal
      isOpen={messageModalVisible}
      onClose={handleClose}
      placement="center"
    >
      <ModalContent className="mx-4 sm:mx-auto sm:max-w-2xl rounded-xl shadow-xl border border-gray-200">
        <ModalHeader>
          {typeof Question?.message?.title === "string"
            ? Question?.message?.title
            : "INFO"}
        </ModalHeader>
        <ModalBody>
          <div className="px-6 py-4 bg-slate-200 rounded-lg flex flex-col justify-center items-center w-full">
            <p className="text-lg font-medium text-center">
              {Question?.message?.description}
            </p>

            <div className="flex gap-2 flex-col items-center justify-center mt-4 w-full">
              {Array.isArray(Question?.message?.data) &&
              Question.message.data.length > 1
                ? Question.message.data.map((data: any, index: number) => (
                    <div
                      key={index}
                      className="px-3 py-0 w-full flex gap-2 items-center justify-center"
                    >
                      {data?.field && (
                        <p className="text-gray-500 font-bold">
                          {data.field} -{" "}
                        </p>
                      )}

                      {data?.category &&
                        (data?.value != null && (
                          <div className=" py-0 px-1  flex items-center justify-center gap-1">
                           
                            <span className=" text-white text-sm font-semibold px-0 py-1 rounded-full">
                              {renderCategoryWithColor(
                                data?.category,
                                data?.value,
                                true
                              )}
                            </span>
                          </div>
                        ))}
                        {data?.category &&
                        (data?.value === null && (
                          <div className=" py-0 px-1  flex items-center justify-center gap-1">
                           
                            <span className=" text-white text-sm font-semibold px-0 py-1 rounded-full">
                              {renderCategoryWithColor(
                                data?.category,
                                data?.value,
                                true
                              )}
                            </span>
                          </div>
                        ))}
                      {data?.data && (
                        <div className="space-y-6">
                          {Array.isArray(data.data) ? (
                            data.data.map((item: any, i: number) => (
                              <div
                                key={i}
                                className="bg-blue-50 shadow-md rounded-2xl p-6 border border-blue-200"
                              >
                                {/* Title */}
                                <h2 className="text-xl font-bold text-blue-800 mb-2">
                                  {item.title}
                                </h2>

                                {/* Description */}
                                <p className="text-md font-semibold text-gray-700 mb-2">
                                  {item.description}
                                </p>

                                {/* Data */}
                                <p className="text-base text-gray-600 whitespace-pre-line">
                                  {item.data}
                                </p>
                              </div>
                            ))
                          ) : (
                            <div className="text-gray-700 whitespace-pre-line text-xl font-bold">
                              <p>
                                {data.title}
                                {data.description}
                                {data.data}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))
                : renderCategoryWithColor(
                    dataArray[0]?.category,
                    dataArray[0]?.value,
                    false
                  )}
            </div>

            {Question?.message?.title === "Provisional Diagnosis" && (
              <div className="flex gap-4 mt-5 items-center p-4 border-red-600 border-2 rounded-lg">
                <AlertTriangle size={60} className="text-red-600" />
                <div>
                  <p className="text-sm text-red-600 font-medium">DISCLAIMER</p>
                  <p className="text-gray-600 text-xs">
                    This is an AI-generated preliminary report. It suggests
                    possible conditions based on the symptoms provided but is
                    not a substitute for professional medical advice or
                    diagnosis. Always consult a doctor for a confirmed
                    diagnosis.
                  </p>
                </div>
              </div>
            )}
          </div>
        </ModalBody>

        <ModalFooter>
          <Button
            onPress={() => dispatch(setMessageModalVisible(false))}
            className="w-full bg-primary-lite text-white font-bold"
          >
            Okay
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
