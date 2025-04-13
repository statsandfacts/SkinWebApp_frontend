"use client";

import React, { useEffect, useRef, useState } from "react";
import { ChatBubbleLeftIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { UserPen } from "lucide-react";
import { Button } from "@nextui-org/button";
import { Axios } from "axios";
import Image from "next/image";
import SymptomBotRecapModal from "@/components/modal/SymptomBotRecapModal";
import { motion } from "framer-motion";
import ScrollingOptions  from "@/components/SymptomBot/ScrollingOptions";
import { Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { baseUrl } from "@/services/api.digitalPrescription.service";

type QuestionType = {
  question: string;
  type: "yesno" | "input_number" | "multiple_choice" | "input_text" | "numeric_input";
  options?: string[];
  next: string | { yes: string; no: string | null };
};

type ResponseQuestionType = {
  question: string;
  type: "yesno" | "input_number" | "multiple_choice" | "input_text" | "numeric_input" | "info";
  options: string[] | null;
  next: string | { yes: string; no: string | null };
  fields: any | null;
  next_question_id: string | null;
  status: number | null;
  recap?: any | null;
  message?: string | null;
};

const data: Record<string, QuestionType> = {
  Q1: {
    question: "Hi! I’m here to asask you a few questions?",
    type: "yesno",
    next: {
      yes: "Q2",
      no: null,
    },
  },
  Q2: {
    question: "To begin, could you tell me your age?",
    type: "input_number",
    next: "Q3",
  },
  Q3: {
    question: "Could you please tell me your gender?",
    type: "multiple_choice",
    options: ["Male", "Female", "Other", "Prefer not to say"],
    next: "Q4",
  },
};

const BotTestPage: React.FC = () => {
  const [Question, setQuestion] = useState<ResponseQuestionType>();
  const [QuestionId, setQuestionId] = useState<string>("");
  const [recapModal, setRecapModal] = useState(true);
  const [responseBmiModal, setResponseBmiModal] = useState(false);
  const [recapData, setRecapData] = useState<any>([]);
  const [inputFieldValue, setInputFieldValue] = useState<string>("");
  const [symptomData, setSymptomData] = useState<{
    user_id: string;
    question_id: string;
    answer: string | string[];
  }>({
    user_id: "",
    question_id: "",
    answer: "",
  });
  const [WieghtHeightFieldValue, setWieghtHeightFieldValue] = useState<{
    weight: string;
    height_ft: string;
    height_inches: string;
  }>({
    weight: "",
    height_ft: "",
    height_inches: "",
  });
  const count = useRef(false);
  const count1 = useRef(false);
  const [dpuserid, setDpuserid] = useState<string | null>(null);
  const [bmiResponse, setBmiResponse] = useState<string>("");
  const [onErrorEmptyValue, setOnErrorEmptyValue] = useState(false);

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

  const endChatApicall = async() => {
    const storedUserId = localStorage.getItem("dpUserId");
        const response = await fetch( `${baseUrl}symptom/chat/end_and_summarize`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: storedUserId
        }),
      }
    );
    const data = await response.json();
    console.log("Response for Resume: ", data);
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("dpUserId");
      console.log("Stored User ID: ", storedUserId);
      setDpuserid(storedUserId);
    }
  }, [symptomData]);

  const getQuestions = async () => {
    const response = await fetch(
      `${baseUrl}symptom/answer`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(symptomData),
      }
    );
    const data = await response.json();
    console.log("Response: ", data);
    setInputFieldValue("");
    if(count1.current){
      setQuestion(data);
      setQuestionId(data.next_question_id as string);
      // if(data.message !== undefined) {
      //   setBmiResponse(data.message as string);
      //   setResponseBmiModal(true)
      // }
      if(data.recap !== undefined) {
        setRecapModal(true);
        setRecapData(data.recap as any);
        // console.log("Recap: ", data.recap);
      }else if(data.message !== undefined) {
        setBmiResponse(data.message as string);
        setResponseBmiModal(true)
      }
    }else{
      count1.current = true;
    }
  };

  const getFirstQuestions = async () => {
    const response = await fetch(
      `${baseUrl}symptom/start`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    setQuestion(data);
    setQuestionId(data.next_question_id as string);
  };

  useEffect(() => {
    console.log(count.current)
    if(count.current){
      getQuestions();
    }else{
      count.current = true;

    }
  }, [symptomData]);

  useEffect(() => {
    const storedUserId = localStorage.getItem("dpuserid");
    setDpuserid(storedUserId);
    getFirstQuestions();
  }, []);

  const handleYesNoClick = (answer: "yes" | "no") => {
    const storedUserId = localStorage.getItem("dpUserId");

    if(answer === null) {
      setOnErrorEmptyValue(true);
    }else{
      setSymptomData({
        user_id: storedUserId !== null ? storedUserId : "",
        question_id: QuestionId,
        answer: answer,
      });
      setOnErrorEmptyValue(false);
    }
  };

  const handleInputSubmit = (value: string | number) => {
    if(value === null || value === "") {
      setOnErrorEmptyValue(true);
    }else{
      setSymptomData({
        user_id: dpuserid !== null ? dpuserid : "",
        question_id: QuestionId,
        answer: value as string,
      });
      // setInputFieldValue("");
      setOnErrorEmptyValue(false);
    }

  };

  const handleMultipleChoiceClick = (option: string) => {
    setSymptomData({
      user_id: dpuserid !== null ? dpuserid : "",
      question_id: QuestionId,
      answer: option,
    });
  };

  const setMultipleFieldAnswers = (value: string[]) => {
    console.log(value);
    setSymptomData({
      user_id: dpuserid !== null ? dpuserid : "",
      question_id: QuestionId,
      answer: value,
    });
  }

  const recapCloseModal = () => {
    setRecapModal(false);
  }

  const handleEndChatClick = () => {
    endChatApicall();
  }

  const setInfoResponse = () => {
    setSymptomData({
      user_id: dpuserid !== null ? dpuserid : "",
      question_id: QuestionId,
      answer: "Okay",
    });
  }

  const setImageUrl = () => {
    if(Question?.next_question_id === "Q4") {
      return "/images/Img_for_symptom_bot_static/Question_3-removebg-preview.png"
    }else if(Question?.next_question_id === "Q5") {
      return "/images/Img_for_symptom_bot_static/Question_4-removebg-preview.png"
    }else if(Question?.next_question_id === "Q28") {
      return "/images/Img_for_symptom_bot_static/Question_28-removebg-preview.png"
    }else if(Question?.next_question_id === "Q29") {
      return "/images/Img_for_symptom_bot_static/Question_29-removebg-preview.png"
    }else if(Question?.next_question_id === "Q32") {
      return "/images/Img_for_symptom_bot_static/Question_32-removebg-preview.png"
    }else if(Question?.next_question_id === "Q52") {
      return "/images/Img_for_symptom_bot_static/Question_52-removebg-preview.png"
    }else{
      return "0";
    }
  }

  const renderQuestion = () => {
    if (!Question) return null;

    switch (Question?.type) {
      case "yesno":
        return (
          <div className="flex flex-col space-y-2">
            {/* <p className="text-lg font-semibold">{questionData.question}</p> */}
            <Button
              variant="ghost"
              className="border-primary-lite border-2 text-slate-800 font-semibold px-4 py-5 rounded-full hover:bg-primary-lite"
              onClick={() => handleYesNoClick("yes")}
            >
              Yes
            </Button>
            <Button
              variant="ghost"
              className="border-primary-lite border-2 text-slate-800 font-semibold px-4 py-5 rounded-full "
              onClick={() => handleYesNoClick("no")}
            >
              No
            </Button>
          </div>
        );

      case "input_text":
        return (
          <div className="space-y-2">
            <input
              type="text"
              value={inputFieldValue}
              placeholder="Enter your response"
              className="w-full p-3 pl-6 h-12 border-2 border-primary-lite text-zinc-950 rounded-full mt-2"
              onChange={(e) => setInputFieldValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleInputSubmit(inputFieldValue);
                }
              }}
            />
            <Button
              // key={option}
              variant="ghost"
              className="border-slate-100 border-2 text-white bg-primary-lite font-semibold px-4 py-2 rounded-full w-full"
              onClick={() => handleInputSubmit(inputFieldValue)}
            >
              Send
            </Button>
          </div>
        );

      case "input_number":
        return (
          <div className="space-y-2">
            <input
              type="number"
              value={inputFieldValue}
              placeholder="Enter your response"
              className="w-full p-3 pl-6 h-12 border-2 border-primary-lite text-zinc-950 rounded-full mt-2"
              onChange={(e) => setInputFieldValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleInputSubmit(inputFieldValue);
                }
              }}
            />
            <Button
              // key={option}
              variant="ghost"
              className="border-slate-100 border-2 text-white bg-primary-lite font-semibold px-4 py-2 rounded-full w-full"
              onClick={() => handleInputSubmit(inputFieldValue)}
            >
              Send
            </Button>
          </div>
        );

      case "multiple_choice":
        return (
          Question.next_question_id !== "Q42" ? 
          <div className="flex flex-col space-y-2">
            {Question.options?.map((option) => (
              <Button
                key={option}
                variant="ghost"
                className="border-primary-lite border-2 text-slate-800 font-semibold px-4 py-5 rounded-full "
                onClick={() => handleMultipleChoiceClick(option)}
              >
                {option}
              </Button>
              
            ))}
          </div>:
          <>
            {/* <div className="overflow-hidden w-full">
              <motion.div
                className="flex space-x-4"
                animate={{ x: ["0%", "-100%"] }}
                transition={{
                  repeat: Infinity,
                  duration: 10,
                  ease: "linear",
                }}
                whileHover={{ x: 0 }} // Stops the animation on hover
                onHoverStart={() => setIsHovered(true)} // Custom hover state
                onHoverEnd={() => setIsHovered(false)} // Custom hover state
              >
                {Question.options?.map((option, index) => (
                  <motion.div
                    key={index}
                    className="flex-shrink-0 rounded-lg min-w-[150px] text-center"
                  >
                    <Button
                      key={option}
                      variant="ghost"
                      className="border-primary-lite border-2 text-slate-800 font-semibold px-4 py-5 rounded-full "
                      onClick={() => handleMultipleChoiceClick(option)}
                    >
                      {option}
                    </Button>
                  </motion.div>
                ))}
              </motion.div>
            </div> */}
            <ScrollingOptions   Question={{ ...Question, options: Question.options || [] }} 
            handleMultipleChoiceClick={handleMultipleChoiceClick}  />
            <Button
              variant="ghost"
              className="border-primary-lite border-2 text-white bg-red-700 font-semibold px-4 py-5 mt-5 rounded-full w-full"
              onClick={() => handleEndChatClick()}
            >
              End Chat
            </Button>
          </>
        );

      case "numeric_input":
        return (
          <div className="flex flex-col space-y-2">
            {Question.fields?.map((option: any, index: number) => (
              <input
                type={option.type}
                key={index}
                placeholder={option.label}
                className="w-full border-2 p-2 border-primary-lite text-zinc-950 rounded-full mt-2"
                onChange={(e) => {
                  const { value } = e.target;
                  if(option.label === "Weight (kg)") {
                    setWieghtHeightFieldValue((prev) => ({ ...prev, weight: value }));
                  }else if(option.label === "Height (ft)") {
                    setWieghtHeightFieldValue((prev) => ({ ...prev, height_ft: value }));
                  }else if(option.label === "Height (inches)") {
                    setWieghtHeightFieldValue((prev) => ({ ...prev, height_inches: value }));
                  }
                }}
              />
            ))}
            <Button
              variant="ghost"
              className="border-slate-100 border-2 text-white bg-primary-lite font-semibold px-4 py-2 rounded-full w-full"
              onClick={() => setMultipleFieldAnswers(WieghtHeightFieldValue as any)}
            >
              Send
            </Button>
          </div>
        );

        case "info":
          return (
            <div className="flex flex-col space-y-2">
              <Button
                variant="ghost"
                className="border-slate-100 border-2 text-white bg-primary-lite font-semibold px-4 py-2 rounded-full w-full"
                onClick={() => setInfoResponse()}
              >
                Okay
              </Button>
            </div>
          );

      default:
        return null;
    }
  };

  return (
    <div className="h-screen pb-20 px-10 flex flex-col justify-center items-center">
        {/* {!recapModal &&  */}
        <>
            <div className="px-28 mx-20 py-6 rounded-lg flex justify-center items-center min-w-full">
              {/* <BotMessageSquare className="h-8 w-8 text-black mr-5" /> */}
              <p className="font-bold mt-1 text-lg text-center">{Question?.question}</p>
            </div>
            {setImageUrl() as string !== "0" && <div>
              <Image
                src={setImageUrl() as string}
                alt={setImageUrl() as string !== "0" ? "Question Image" : ""}
                width={300} 
                height={300} 
              />
            </div>}
            <div className="px-48 w-2/3">
              <div className="py-3 ">{renderQuestion()}</div>
              {/* {onErrorEmptyValue && (
                <p className="text-red-500 text-sm">This field is required</p>
              )} */}
            </div>
          </>
        {/* // } */}
        {
          bmiResponse !== null && (
            <Modal isOpen={responseBmiModal} onClose={() => setResponseBmiModal(false)}>
              <ModalContent>
                <ModalHeader>
                  {Question?.next_question_id === "Q5" ? "BMI Check" : "INFO"}
                </ModalHeader>
                <ModalBody>
                  <div className="px-2 py-6 rounded-lg flex justify-center items-center min-w-full">
                    <p className="font-bold text-lg text-center">{bmiResponse}</p>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button onClick={() => {setResponseBmiModal(false); setRecapModal(false);}} className="w-full bg-primary-lite font-medium">Okay</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          )
        }

        {Question?.next_question_id === "Q38" && 
          <>
          <div>
            <SymptomBotRecapModal
              openModal={recapModal}
              onClosefunction={recapCloseModal}
              data={recapData} 
            />
            <div>
              <Button className="w-full bg-primary-lite font-medium" onClick={() => {setRecapModal(false);}}>
                Okay
              </Button>
            </div>
          </div>
          </>
        }


    </div>
  );
};

export default BotTestPage;


