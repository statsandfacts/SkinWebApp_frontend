"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Loader2,
  UserPen,
  CircleChevronRight,
  CircleChevronLeft,
} from "lucide-react";
import { ArrowLeft, Bot, CheckCircle2 } from "lucide-react";
import { Button } from "@heroui/button";
import Image from "next/image";
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
import {
  setMessageModalVisible,
  setModalVisible,
  setRedFlagQuestion,
  setSymptomHistoryVisible,
  setSymptomId,
  setMultipleQuestions,
  setMultipleQuestionsCompleted,
  setCurrentQuestionIndex,
} from "@/redux/slices/symptomBot.slice";
import { RootState } from "@/redux/store";
import { clsx } from "clsx";
import SymptomHistoryDrawer from "./SymptomHistoryDrawer";
import SymptomSlider from "./SymptomSlider";
import MultipleQuestion from "./MultipleQuestion";

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
  more_q_info: any | null;
  multiple_questions?: [];
};

const BotTestPage: React.FC = () => {
  const [ModalViewFor, setModalViewFor] = useState<string>("");
  const { redFlagQuestion, consecutiveQuestions } = useSelector(
    (state: RootState) => state.symptomBot
  );

  const multipleQuestions = useSelector(
    (state: RootState) => state.symptomBot.multipleQuestions
  );

  const multipleQuestionsCompleted = useSelector(
    (state: RootState) => state.symptomBot.multipleQuestionsCompleted
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
    symptomId?: number | null;
  }>({
    user_id: "",
    question_id: "",
    answer: "",
    symptomId: null,
  });

  const count = useRef(false);
  const count1 = useRef(false);
  const [bmiResponse, setBmiResponse] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const itemsPerSlide = 2;
  const autoSlideInterval = 5000;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("dpUserId");
      setDpuserid(storedUserId ? JSON.parse(storedUserId) : "");
    }
    if (multipleQuestionsCompleted) {
      dispatch(setMultipleQuestionsCompleted(true));
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
      const response = await getQuestion(symptomData);
      console.log("symdata", symptomData);

      setQuestion(response);
      setQuestionId(response.next_question_id as string);

      if (response.recap !== undefined) {
        setSummaryModal(false);
      } else if (response?.message) {
        dispatch(setMessageModalVisible(true));
        setModalViewFor("message");
        // setBmiResponse(response?.message as string);
        // setResponseBmiModal(true);
      }

      if (response?.symptom_id) {
        dispatch(setSymptomId(response?.symptom_id));
      }

      if (response?.multiple_questions) {
        console.log("multipleQuestion", response.multiple_questions);
        dispatch(setMultipleQuestions(response.multiple_questions));
      } else {
        dispatch(setMultipleQuestions([])); // clear if not present
      }
      if (response?.multiple_questions?.length > 0) {
        // 👇 New batch of multiple questions — restart flow
        dispatch(setMultipleQuestions(response.multiple_questions));
        console.log(setCurrentQuestionIndex);
        setCurrentQuestionIndex(0);
        return;
      }
      dispatch(setMultipleQuestionsCompleted(true));
      if (response?.red_flag) {
        dispatch(setRedFlagQuestion(true));
      } else {
        dispatch(setRedFlagQuestion(false));
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

  // const setOkayAfterRecap = () => {
  //   console.log("Question Data : ", Question);
  //   setSymptomData({
  //     user_id: dpuserid || "",
  //     question_id: Question?.next_question_id || "",
  //     answer: "Okay",
  //   });
  // };

  const setOkayAfterRecap = () => {
    console.log("Question Data : ", Question);

    setSymptomData({
      user_id: dpuserid || "",
      question_id: Question?.next_question_id || "",
      answer: "",
    });

    // Delay scroll until after render cycle
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 0);
  };

  const visibleList =
    Question?.list?.slice(currentIndex, currentIndex + itemsPerSlide) || [];

  return (
    <div
      className={clsx(
        "h-auto min-h-screen pb-20 px-10 flex flex-col justify-center items-center"
      )}
    >
      <>
        <div className="lg:px-28 lg:mx-20 py-6 rounded-lg flex justify-center items-center min-w-full sm:py-4">
          {/* <p></p> */}
          {/* <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-4 shadow-lg">
            <Bot className="w-8 h-8 text-white" />
          </div>
          <h1 className="mb-8 ml-7 font-bold text-lg"> Dr.Bot:-</h1>
          <p className="font-bold mt-1 text-lg text-center">
            {Question?.question}
          </p> */}
          <div className="flex flex-col items-center justify-center text-center">
            {/* Bot Icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-2 shadow-lg">
              <Bot className="w-8 h-8 text-white" />
            </div>

            {/* Dr.Bot Label - force align left */}
            <div className="w-full px-4">
              <h1 className="font-bold text-lg mb-1 text-left">Dr.Bot:-</h1>
            </div>

            {/* Question */}
            {Array.isArray(Question?.question) ? (
              Question?.question.map((q: any, index: number) => (
                <div
                  key={index}
                  className="mb-4 text-left w-full px-4 space-y-4"
                >
                  {/* Scenario Block */}
                  {(q.scenario_title || q.scenario_question) && (
                    <div className="bg-pink-200 p-4 rounded-xl">
                      {q.scenario_title && (
                        <h2 className="font-semibold text-[#4C1D95] mb-1">
                          {q.scenario_title}
                        </h2>
                      )}
                      {q.scenario_question && (
                        <p className="text-lg font-bold text-[#334155]">
                          {q.scenario_question}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Associated Block */}
                  {(q.associated_title || q.associated_question) && (
                    <div className="bg-blue-200 p-4 rounded-xl">
                      {q.associated_title && (
                        <h3 className="font-semibold text-[#4C1D95] mb-1">
                          {q.associated_title}
                        </h3>
                      )}
                      {q.associated_question && (
                        <p className="text-lg font-bold text-[#334155]">
                          {q.associated_question}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))
            ) : typeof Question?.question === "string" ? (
              <p className="font-bold mt-1 text-lg text-center">
                {Question?.question}
              </p>
            ) : null}
          </div>
        </div>
        {/* <div className="h-10 bg-black w-96"></div> */}
        {Question?.list && Question.list.length > 0 && (
          <SymptomSlider list={Question.list} />
        )}
        {/* <div className="h-10 bg-gray-500 w-96"></div> */}

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
        {/* {multipleQuestions.length > 0 && <MultipleQuestion />}

        <div className="lg:px-96 lg:w-5/6 w-80">
          <QuestionRenderer
            question={Question}
            setAnswersField={setSymptomData}
            userID={dpuserid}
            setquestion={setQuestion}
          />
        </div> */}
        {multipleQuestions.length > 0 ? (
          // Multiple question flow is active
          <MultipleQuestion setSymptomData={setSymptomData} />
        ) : (
          // Single question flow is active
          <div className="lg:px-96 lg:w-5/6 w-80">
            <QuestionRenderer
              question={Question}
              setAnswersField={setSymptomData}
              userID={dpuserid}
              setquestion={setQuestion}
            />
          </div>
        )}
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
              type="button"
              className="w-full mt-5 bg-primary-lite font-medium"
              onClick={() => setOkayAfterRecap()}
            >
              Okay
            </Button>
          </div>
        </div>
      )}
      <ExplanationModal />
      <DisclamerModal open={disclamerModal} closeFunction={setDisclamerModal} />
      <MessageModal
        Question={Question}
        ModalFor={ModalViewFor}
        open={responseBmiModal}
        closeFunction={setResponseBmiModal}
        setData={setSymptomData}
        userID={dpuserid}
      />
      <SymptomHistoryDrawer drawerFor={"faqs"} />
    </div>
  );
};

export default BotTestPage;
