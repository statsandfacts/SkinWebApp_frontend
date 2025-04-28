"use client";

import React, { useEffect, useRef, useState } from "react";
import { Loader2, UserPen } from "lucide-react";
import { Button } from "@heroui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import SymptomBotRecapModal from "@/app/test-bot/components/SymptomBotRecapModal";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody
} from "@heroui/modal";
import {
  endChat,
  getFirstQuestion,
  getQuestion,
} from "@/services/api.symptombot.service";
import QuestionRenderer from "./QuestionRenderer";
import { toast } from "react-toastify";
import { baseUrl } from "@/services/api.digitalPrescription.service";

type QuestionType = {
  question: string;
  type:
    | "yesno"
    | "input_number"
    | "multiple_choice"
    | "input_text"
    | "numeric_input";
  options?: string[];
  next: string | { yes: string; no: string | null };
};

type ResponseQuestionType = {
  question: string;
  type:
    | "yesno"
    | "input_number"
    | "multiple_choice"
    | "input_text"
    | "numeric_input"
    | "info";
  options: string[] | null;
  next: string | { yes: string; no: string | null };
  fields: any | null;
  next_question_id: string | null;
  status: number | null;
  recap?: any | null;
  message?: string | null;
  next_available: boolean | null;
};

const BotTestPage: React.FC = () => {
  const router = useRouter();
  const [Question, setQuestion] = useState<ResponseQuestionType>();
  const [dpuserid, setDpuserid] = useState<string | null>("");
  const [QuestionId, setQuestionId] = useState<string>("");
  const [SummaryModal, setSummaryModal] = useState(false);
  const [summaryData, setSummaryData] = useState<string>("");
  const [responseBmiModal, setResponseBmiModal] = useState(false);
  // const [loading, setloading] = useState<boolean>(false);
  const [symptomData, setSymptomData] = useState<{
    user_id: string;
    question_id: string;
    answer: string | string[] | number;
  }>({
    user_id: "",
    question_id: "",
    answer: "",
  });

  const count = useRef(false);
  const count1 = useRef(false);
  const [bmiResponse, setBmiResponse] = useState<string>("");

  // const onContinueWithSessionID = async() => {
  //   const storedUserId = localStorage.getItem("dpUserId");
  //   const response = await fetch(
  // `${baseUrl}symptom/resume?user_id=${storedUserId}`,
  //     {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );
  //   const data = await response.json();
  //   // console.log("Response for Resume: ", data);

  // }

  // onContinueWithSessionID();

  const endChatApicall = async () => {
    // setloading(true);
    const { data } = await endChat({
      user_id: dpuserid,
    });
    // setloading(false);
    setSummaryModal(true);
    setSummaryData(data.summary as string);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("dpUserId");
      setDpuserid(storedUserId ? JSON.parse(storedUserId) : "");
    }
    if (count.current) {
      getQuestions();
    } else {
      count.current = true;
      getFirstQuestions();
    }
  }, [symptomData]);

  const getQuestions = async () => {
    if (count1.current) {
      // setloading(true);
      const response = await getQuestion(symptomData);
      // console.log("Axios respones", response);
      setQuestion(response);
      setQuestionId(response.next_question_id as string);
      if (response.recap !== undefined) {
        setSummaryModal(false);
      } else if (response.message !== undefined) {
        setBmiResponse(response.message as string);
        setResponseBmiModal(true);
      }
      // setloading(false);
    } else {
      count1.current = true;
    }
  };

  const getFirstQuestions = async () => {
    // setloading(true);
    try {
      const response = await getFirstQuestion();
      setQuestion(response);
      setQuestionId(response.next_question_id as string);
    } catch (error) {
      toast.error("Something went wrong !");
    } finally {
      // setloading(false);
    }
  };

  // const handleYesNoClick = (answer: "yes" | "no") => {
  //   // console.log(answer);
  //   if (answer === null) {
  //     setOnErrorEmptyValue(true);
  //   } else {
  //     QuestionId === "Q1" && answer === "no" ? (setSummaryModal(true),
  //      setSummaryData("Feel free to visit anytime !")
  //     ) : (
  //       setSymptomData({
  //         user_id: dpuserid || "",
  //         question_id: QuestionId,
  //         answer: answer,
  //       })
  //     )
  //     setOnErrorEmptyValue(false);
  //   }
  // };

  const recapCloseModal = () => {
    setSummaryModal(false);
    QuestionId === "Q1" && endChatApicall();
  };

  // const handleEndChatClick = () => {
  //   endChatApicall();
  // };

  const setOkayAfterRecap = () => {
    setSymptomData({
      user_id: dpuserid || "",
      question_id: "Q38",
      answer: "Okay",
    });
  };

  // const handleOkayOnEndChatClick = () => {
  //   router.push("/");
  //   setSummaryModal(false);
  // };

  const setImageUrl = () => {
    if (Question?.next_question_id === "Q4") {
      return "/images/Img_for_symptom_bot_static/Question_3-removebg-preview.png";
    } else if (Question?.next_question_id === "Q5") {
      return "/images/Img_for_symptom_bot_static/Question_4-removebg-preview.png";
    } else if (Question?.next_question_id === "Q28") {
      return "/images/Img_for_symptom_bot_static/Question_28-removebg-preview.png";
    } else if (Question?.next_question_id === "Q29") {
      return "/images/Img_for_symptom_bot_static/Question_29-removebg-preview.png";
    } else if (Question?.next_question_id === "Q32") {
      return "/images/Img_for_symptom_bot_static/Question_32-removebg-preview.png";
    } else if (Question?.next_question_id === "Q52") {
      return "/images/Img_for_symptom_bot_static/Question_52-removebg-preview.png";
    } else {
      return "0";
    }
  };

  return (
    <div className="h-auto min-h-screen pb-20 px-10  flex flex-col justify-center items-center">
      <>
        <div className="lg:px-28 lg:mx-20 py-6 rounded-lg flex justify-center items-center min-w-full sm:py-4">
          <p className="font-bold mt-1 text-lg text-center">
            {Question?.question}
          </p>
        </div>
        {(setImageUrl() as string) !== "0" && (
          <div>
            <Image
              src={setImageUrl() as string}
              alt={(setImageUrl() as string) !== "0" ? "Question Image" : ""}
              width={350}
              height={350}
            />
          </div>
        )}
        <div className="lg:px-96 lg:w-5/6 w-80">
          <QuestionRenderer
            question={Question}
            setAnswersField={setSymptomData}
            userID={dpuserid}
          />
        </div>
      </>
      {bmiResponse !== null && (
        <Modal
          isOpen={responseBmiModal}
          onClose={() => setResponseBmiModal(false)}
          placement="center"
        >
          <ModalContent className="mx-4 sm:mx-auto sm:max-w-md">
            <ModalHeader>
              {Question?.next_question_id === "Q5" ? "BMI Check" : "INFO"}
            </ModalHeader>
            <ModalBody>
              <div className="px-2 py-6 rounded-lg flex justify-center items-center min-w-full">
                <p className="font-bold text-lg text-center">{bmiResponse}</p>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                onClick={() => {
                  setResponseBmiModal(false);
                  setSummaryModal(false);
                }}
                className="w-full bg-primary-lite font-medium"
              >
                Okay
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
      {Question?.next_available && (
        <div className="lg:px-48 ">
          <div className="flex justify-between items-center">
            <p className="font-bold mb-6 text-xl">Your Recap</p>
            <Button className="bg-primary-lite px-6 py-2 rounded-full">
              <UserPen />
            </Button>
          </div>
          <div className="w-full flex flex-col gap-1">
            <div className="h-auto overflow-y-auto">
              {Question.recap?.map((item: any, index: number) => (
                <div key={index} className="flex flex-col gap-2 mb-4">
                  <div className="flex">
                    <div className="font-bold mr-3">
                      {index + 1 + "." + " "}
                    </div>
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
          </div>
          <div>
            <Button
              className="w-full mt-5 bg-primary-lite font-medium"
              onClick={() => setOkayAfterRecap()}>Okay</Button>
          </div>
        </div>
      )}
      {/* {SummaryModal && (
        <SymptomBotRecapModal
          openModal={SummaryModal}
          onClosefunction={recapCloseModal}
          summary={summaryData}
          onEndChatOkay={handleOkayOnEndChatClick}
        />
      )} */}
    </div>
  );
};

export default BotTestPage;
