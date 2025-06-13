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
      "Normal": "bg-green-600",
      "Normal weight": "bg-green-600",
      "Normal Blood Pressure": "bg-green-600",
      "Pre-Diabetes": "bg-yellow-500",
      "Elevated Blood Pressure": "bg-yellow-500",
      "Less likely": "bg-yellow-500",
      "Hypertension (Stage 1)": "bg-orange-500",
      "Likely": "bg-orange-600",
      "Hypertension (Stage 2)": "bg-red-400",
      "Diabetes": "bg-red-500",
      "Obesity": "bg-yellow-500",
      "Underweight": "bg-red-600",
      "Most likely": "bg-red-700",
      "Hypertensive Crisis (Immediate medical attention required)": "bg-red-500",
    };

    return (
      categoryMap[category] ||
      "bg-gray-500"
    ) + " px-5 py-1 text-white font-bold rounded-full";
  };

  const renderCategoryWithColor = (category: string, value: any, isMultiple = false) => (
    <div className={`mt-0 ${isMultiple ? "p" : "p-4"} rounded-lg flex ${isMultiple ? "flex-row gap-2" : "flex-col justify-center"} items-center`}>
      <p className={`${isMultiple ? "text-xl" : "text-2xl"} font-bold`}>{value}</p>
      <p className={getCategoryColorClass(category)}>{category}</p>
    </div>
  );

  // RED FLAG MODAL
  if (errorMessageForRedFlag) {
    return (
      <Modal isOpen={messageModalVisible} onClose={handleClose} placement="center">
        <ModalContent className="mx-4 sm:mx-auto sm:max-w-2xl rounded-xl shadow-xl border border-gray-200">
          <ModalHeader>
            <p className="text-2xl font-semibold text-left mb-4 text-red-600">ALERT</p>
          </ModalHeader>
          <ModalBody>
            <div className="px-2 py-6 flex flex-col justify-center items-center w-full">
              <ExclamationTriangleIcon className="w-14 h-13 text-red-600 mt-1" />
              <p className="text-xl font-semibold text-left mb-4 text-red-600">RED FLAG SYMPTOM DETECTED.</p>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button onPress={handleRedirectToBookAppointment} className="w-full bg-red-600 font-medium text-white">Okay</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }

  // MESSAGE IS STRING
  if (typeof Question?.message === "string") {
    return (
      <Modal isOpen={messageModalVisible} onClose={handleClose} placement="center">
        <ModalContent className="mx-4 sm:mx-auto sm:max-w-2xl rounded-xl shadow-xl border border-gray-200">
          <ModalHeader><p className="text-2xl font-semibold text-left mb-4">INFO</p></ModalHeader>
          <ModalBody>
            <div className="px-2 py-6 flex flex-col justify-center items-center w-full">
              <p className="text-xl font-semibold text-left mb-4">{Question.message}</p>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button onPress={() => dispatch(setMessageModalVisible(false))} className="w-full font-medium bg-primary-lite text-white">Okay</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }

  // MESSAGE WITH NO DATA
  if (Question?.message?.data === null) {
    return (
      <Modal isOpen={messageModalVisible} onClose={handleClose} placement="center">
        <ModalContent className="mx-4 sm:mx-auto sm:max-w-2xl rounded-xl shadow-xl border border-gray-200">
          <ModalHeader><p className="text-2xl font-semibold text-left mb-4">{Question?.message?.title}</p></ModalHeader>
          <ModalBody>
            <div className="px-2 py-6 flex flex-col justify-center items-center w-full">
              <p className="text-xl font-semibold text-left mb-4">{Question?.message?.description}</p>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button onPress={() => dispatch(setMessageModalVisible(false))} className="w-full font-medium bg-primary-lite text-white">Okay</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }

  // DATA MODAL (MULTI OR SINGLE)
  const dataArray = Question?.message?.data || [];

  return (
    <Modal isOpen={messageModalVisible} onClose={handleClose} placement="center">
      <ModalContent className="mx-4 sm:mx-auto sm:max-w-2xl rounded-xl shadow-xl border border-gray-200">
        <ModalHeader>{typeof Question?.message?.title === "string" ? Question?.message?.title : "INFO"}</ModalHeader>
        <ModalBody>
          <div className="px-6 py-4 bg-slate-200 rounded-lg flex flex-col justify-center items-center w-full">
            <p className="text-lg font-medium text-center">{Question?.message?.description}</p>
            <div className="flex gap-2 flex-col items-center justify-center mt-4 w-full">
              {dataArray.length > 1 ? (
                dataArray.map((data: any, index: number) => (
                  <div key={index} className="px-3 py-3 bg-slate-300 rounded-lg shadow-sm w-full flex gap-2 items-center justify-center">
                    {data?.field && <p className="text-gray-500 font-bold">{data?.field} - </p>}
                    {renderCategoryWithColor(data?.category, data?.value, true)}
                  </div>
                ))
              ) : (
                renderCategoryWithColor(dataArray[0]?.category, dataArray[0]?.value)
              )}
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button onPress={() => dispatch(setMessageModalVisible(false))} className="w-full bg-primary-lite text-white font-bold">Okay</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
