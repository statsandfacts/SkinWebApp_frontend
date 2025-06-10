"use client";

import React, { useEffect, useRef, useState } from "react";
import { Loader2, UserPen } from "lucide-react";
import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import SymptomBotRecapModal from "@/app/test-bot/components/SymptomBotRecapModal";
import {
  endChat,
  getFirstQuestion,
  getQuestion,
  goBack,
} from "@/services/api.symptombot.service";
import QuestionRenderer from "./QuestionRenderer";
import { toast } from "react-toastify";
import ExplanationModal from "./ExplanationModal";
import DisclamerModal from "./DisclamerModal";
import MessageModal from "./MessageModal";
import { useDispatch, useSelector } from "react-redux";
import { setMessageModalVisible, setModalVisible, setRedflagQuestion, setSymptHistoryVisible } from "@/redux/slices/symptomBot.slice";
import { RootState } from "@/redux/store";
import { clsx } from "clsx";

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
  previous_question_id?: string | null;
  image_url?: string | null;
  list?: string[] | null;
};

const BotTestPage: React.FC = () => {
  const [ModalViewFor, setModalViewFor] = useState<string>("");
  const { RedflagQuestion } = useSelector(
    (state: RootState) => state.symptomBot
  );

  const dispatch = useDispatch();
  const [Question, setQuestion] = useState<ResponseQuestionType>();
  const [dpuserid, setDpuserid] = useState<string | null>("");
  const [userID, setUserID] = useState<string>("");
  const [QuestionId, setQuestionId] = useState<string>("");
  const [SummaryModal, setSummaryModal] = useState(false);
  const [responseBmiModal, setResponseBmiModal] = useState(false);
  const [disclamerModal, setDisclamerModal] = useState<boolean>(true);
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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
      // //console.log("Axios respones", response);
      //console.log(response);
      setQuestion(response);
      setQuestionId(response.next_question_id as string);
      if (response.recap !== undefined) {
        setSummaryModal(false);
      } else if (response?.message) {
        dispatch(setMessageModalVisible(true));
        setModalViewFor("message");
        setBmiResponse(response?.message as string);
        // setResponseBmiModal(true);
      }
      //console.log("red flag is there or not", response?.red_flag);
      if(response?.red_flag){
        //console.log("Red flag is there");
        dispatch(setRedflagQuestion(true));
      }else{
        //console.log("Red flag is not there");
        dispatch(setRedflagQuestion(false));
      }
    } else {
      count1.current = true;
    }
  };

  const getFirstQuestions = async () => {
    try {
      const response = await getFirstQuestion();
      setQuestion(response);
      setQuestionId(response.next_question_id as string);
    } catch (error) {
      toast.error("Something went wrong !");
    }
  };

  const setOkayAfterRecap = () => {
    setSymptomData({
      user_id: dpuserid || "",
      question_id: "Q38",
      answer: "Okay",
    });
  };

  return (
    <div className={clsx(
        "h-auto min-h-screen pb-20 px-10 flex flex-col justify-center items-center",
        
      )}>
      {/* <div className="fixed top-24 left-4 z-50">
        <Button onPress={() => dispatch(setSymptHistoryVisible(true))}>Symptom History</Button>
      </div> */}
      <>
        <div className="lg:px-28 lg:mx-20 py-6 rounded-lg flex justify-center items-center min-w-full sm:py-4">
          <p></p>
          <p className="font-bold mt-1 text-lg text-center">
            {Question?.question}
          </p>
        </div>
        {Question?.list && (
          <div className="mb-7">
            <ul className="grid grid-cols-2 md:grid-cols-2 gap-y-2 gap-x-8 pl-6 mt-4 max-w-[800px] list-disc">
              {Question?.list.map((item: string, index: number) => (
                <li key={index} className="text-gray-700 font-bold">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
        {Question?.image_url && (
          <div>
            <Image
              src={Question?.image_url || ""}
              alt={"Symptom Image"}
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
            setquestion={setQuestion}
          />
        </div>
      </>
      {Question?.next_available && ( //Create a component for recap
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
              onClick={() => setOkayAfterRecap()}
            >
              Okay
            </Button>
          </div>
        </div>
      )}
      <ExplanationModal />  
      <DisclamerModal open={disclamerModal} closeFunction = {setDisclamerModal}/>
      <MessageModal Question={Question} ModalFor={ModalViewFor} open={responseBmiModal} closeFunction={setResponseBmiModal} setData={setSymptomData} userID={dpuserid}/>

      {/* <SymptomHistoryDrawer /> */}
    </div>
  );
};

export default BotTestPage;
