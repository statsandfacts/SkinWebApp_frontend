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
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import {
  AlertTriangle,
  FileText,
  Clock,
  Stethoscope,
  CircleCheckBig,
  Brain,
} from "lucide-react";

import { Typewriter } from "./Typewriter";


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
  interface Tip {
  title: string;
  description: string;
  color: string;
}

interface Condition {
  title: string;
  description: string;
  data: Tip[];
}

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
      categoryMap[category] + " px-5 py-1 text-black font-bold rounded-full"
    );
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
        <p
          className={`${
            isMultiple ? "text-xl" : "text-2xl"
          } font-bold text-black`}
        >
          {value}
        </p>
        <p className={getCategoryColorClass(category)}>{category}</p>
      </div>
    );
  };

  // RED FLAG MODAL
  if (Question?.message?.category) {
    return (
      <Modal
        isOpen={messageModalVisible}
        onClose={handleClose}
        placement="center"
      >
        <ModalContent className="mx-4 sm:mx-auto sm:max-w-2xl rounded-xl shadow-xl border border-gray-200">
          <ModalHeader>
            <p className="text-2xl font-semibold text-left mb-4 text-red-600">
              {Question?.message?.title || "ALERT"}
            </p>
          </ModalHeader>
          <ModalBody>
            <div className="px-2 py-6 flex flex-col justify-center items-center w-full">
              <ExclamationTriangleIcon className="w-14 h-13 text-red-600 mt-1" />
              {Array.isArray(Question?.message?.data) &&
              Question?.message?.data?.length > 0 ? (
                Question.message.data.map((item: any, index: number) => (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center"
                  >
                    {item.title && (
                      <p className="text-xl font-semibold text-center mb-2 text-red-600">
                        {item.title}
                      </p>
                    )}
                    {item.data && (
                      <p className="text-base text-center text-gray-700">
                        {item.data}
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-base text-center text-gray-700">
                  Please consult a doctor immediately for further evaluation.
                </p>
              )}
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
      <ModalContent className="mx-4 sm:mx-auto sm:max-w-2xl max-h-[90vh] overflow-auto rounded-xl shadow-xl border border-gray-200">
        <ModalHeader>
          {typeof Question?.message?.title === "string"
            ? Question?.message?.title
            : "INFO"}
        </ModalHeader>
        <ModalBody>
          <div className="px-6 py-4 bg-slate-200 rounded-lg flex flex-col justify-center items-center w-full">
            <p className="text-lg font-medium items-center text-start">
              {Question?.message?.description}
            </p>

            <div className="flex gap-2 flex-col items-center justify-center mt-4 w-full">
              {Array.isArray(Question?.message?.data) &&
              Question.message.data.length > 1 &&
              Question.message.title != "Provisional Diagnosis" &&
              Question.message.title != "Suggested Action & Triage Plan"
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
                      {data.title && (
                        <div
                          key={index}
                          className="px-3 py-0 w-full flex flex-col gap-1 items-start justify-start"
                        >
                          <p className={`${data.color} font-bold`}>
                            {data.title}
                          </p>
                          {data.description && (
                            <p className="text-gray-600">{data.description}</p>
                          )}
                          {data.data && (
                            <p className="text-black-600 font-bold">
                              {data.data}
                            </p>
                          )}
                        </div>
                      )}

                      {data?.category && data?.value != null && (
                        <div className=" py-0 px-1  flex items-center justify-center gap-1">
                          <span className=" text-white text-sm font-semibold px-0 py-1 rounded-full">
                            {renderCategoryWithColor(
                              data?.category,
                              data?.value,
                              true
                            )}
                          </span>
                        </div>
                      )}
                      {data?.category && data?.value === null && (
                        <div className=" py-0 px-1  flex items-center justify-center gap-1">
                          <span className=" text-white text-sm font-semibold px-0 py-1 rounded-full">
                            {renderCategoryWithColor(
                              data?.category,
                              data?.value,
                              true
                            )}
                          </span>
                        </div>
                      )}
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
                              {/* <p>
                                {data.title}
                                {data.description}
                                {data.data}
                              </p> */}
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

            {Question?.message?.title === "Suggested Action & Triage Plan" && (
              <div className="space-y-4">
                {Question.message.data?.map(
                  (
                    data: {
                      title: string;
                      data: string;
                      more_info?: string;
                      color: string;
                    },
                    index: number
                  ) => (
                    <div
                      key={index}
                      className={`
                     w-full p-4 rounded-2xl border 
                    ${
                      index === 0
                        ? "bg-blue-50 border-blue-300"
                        : "bg-green-50 border-green-300"
                    }
            flex flex-col gap-4
          `}
                    >
                      {/* Outer header */}
                      <div className="flex items-center gap-3 w-full">
                        <div
                          className={`
                flex items-center justify-center w-10 h-10 rounded-full
                ${index === 0 ? "bg-blue-500" : "bg-green-500"}
                text-white text-xl
              `}
                        >
                          {index === 0 ? <Brain /> : <AlertTriangle />}
                        </div>
                        <div className="flex flex-col">
                          <p className="text-lg font-bold text-black">
                            {data.title}
                          </p>
                          <span
                            className={`
                  mt-1 px-2 py-1 rounded-full text-xs font-medium
                  ${
                    index === 0
                      ? "bg-blue-100 text-blue-600"
                      : "bg-green-100 text-green-600"
                  }
                `}
                          >
                            {index === 0
                              ? "Diagnostic Recommendation"
                              : "Priority Assessment"}
                          </span>
                        </div>
                      </div>

                      {/* Inner card */}
                      <div
                        className={`
              w-full p-4 rounded-xl border
              ${
                index === 0
                  ? "bg-blue-100 border-blue-200"
                  : "bg-green-100 border-green-200"
              }
              flex flex-col gap-2 w-full
            `}
                      >
                        <div className="flex items-center gap-2 w-full">
                          <span
                            className={`text-xl ${
                              index === 0 ? "text-blue-600" : "text-green-600"
                            }`}
                          >
                            {index === 0 ? <Stethoscope /> : <Clock />}
                          </span>
                          <p className="font-bold text-black">{data.data}</p>
                        </div>
                        {data.more_info && (
                          <p className="text-sky-600 text-base italic">
                           {data.more_info}
                          </p>
                        )}
                        {/* {data.more_info} */}
                      </div>
                    </div>
                  )
                )}
              </div>
            )}

           {Question?.message?.title === "Management Recommendations" && (
  <div className="space-y-6">
    {/* Main title and description */}
    <div>
      <h2 className="text-2xl font-bold text-[#0D1B39]">{Question.message.title}</h2>
      <p className="text-gray-700 mt-1 text-sm">{Question.message.description}</p>
    </div>

    {/* Loop through each condition block */}
    {Question.message.data?.map((condition: Condition, index: number) => (
      <div
        key={index}
        className="p-5 rounded-2xl border border-gray-200 bg-white shadow-sm space-y-4"
      >
        {/* Condition title and summary description */}
        <div>
          <h3 className="text-lg font-semibold text-black">{condition.title}</h3>
          <p className="text-gray-600 text-sm">{condition.description}</p>
        </div>

        {/* Loop through tips */}
        <div className="space-y-3 border-l-4 border-gray-200 pl-4">
          {condition.data?.map((tip: Tip, tipIndex: number) => (
            <div key={tipIndex}>
              <p className={`font-semibold ${tip.color}`}>{tip.title}</p>
              <p className="text-sm text-gray-800">{tip.description}</p>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
)}


            {Question?.message?.title === "Provisional Diagnosis" && (
              <div className="space-y-4">
                {/* DATA BOXES */}
                {Question.message.data?.map(
                  (
                    item: {
                      title: string;
                      description: string;
                      data: string;
                      more_info?: string;
                      color: string;
                    },
                    index: number
                  ) => {
                    const bgColor =
                      index === 0
                        ? "bg-orange-50 ring-orange-200"
                        : "bg-sky-50 ring-sky-200";
                    const iconColor =
                      index === 0 ? "bg-orange-500" : "bg-sky-500";
                    const icon = index === 0 ? <FileText /> : <Clock />;

                    return (
                      <div
                        key={index}
                        className={`rounded-3xl p-5 shadow-lg ring-1  border border-black ${bgColor} hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02] transform transition `}
                      >
                        {/* HEADER */}
                        <div className="flex items-start gap-3 mb-2">
                          <div
                            className={`w-12 h-12 flex items-center justify-center rounded-2xl text-white ${iconColor}`}
                          >
                            <span>{icon}</span>
                          </div>
                          <div>
                            <h3
                              className={`flex items-center text-lg font-bold ${item.color}`}
                            >
                              {item.title}
                              <CircleCheckBig className="ml-2 h-5 w-5 text-success" />
                            </h3>

                            <p className="text-sm text-gray-700 mt-2 font-bold ">
                              {item.description}
                            </p>
                          </div>
                        </div>

                        {/* DATA BOX */}
                        <div className="bg-gray-100 rounded-3xl p-3 shadow-inner">
                          <p className="text-lg font-bold text-black-600 items-center text-center">
                            {item.data}
                          </p>
                          {item.more_info && (
                            <p className="text-sky-600 text-base italic">
                              {item.more_info}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  }
                )}

                {/* DISCLAIMER */}
                <div className="flex gap-3 items-start p-4 border border-red-500 rounded-lg bg-red-50">
                  <AlertTriangle
                    size={28}
                    className="text-red-600 flex-shrink-0 mt-1"
                  />
                  <div>
                    <p className="text-sm text-red-600 font-semibold">
                      DISCLAIMER
                    </p>
                    <p className="text-xs text-gray-700">
                      This is a system-generated preliminary report. It suggests
                      possible conditions based on the symptoms provided but is
                      not a substitute for professional medical advice or
                      diagnosis. Always consult a doctor for a confirmed
                      diagnosis.
                    </p>
                  </div>
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
