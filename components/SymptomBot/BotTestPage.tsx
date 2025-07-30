"use client";
import React, { useEffect, useRef, useState } from "react";
import { Bot } from "lucide-react";
import {
  getFirstQuestion,
  getQuestion,
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
import SymptomHistoryDrawer from "./SymptomHistoryDrawer";
import SymptomSlider from "./SymptomSlider";
import MultipleQuestion from "./MultipleQuestion";
import Image from "next/image";
import { Button } from "@heroui/button";
import IntroScreen from "./Introcard";

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
  const [chatHistory, setChatHistory] = useState<any[]>([]);
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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [isAutoScroll, setIsAutoScroll] = useState(true);
  const [showStartScreen, setShowStartScreen] = useState(true);
  const [initialBotQuestion, setInitialBotQuestion] =
    useState<ResponseQuestionType | null>(null);
  const [showIntroCard, setShowIntroCard] = useState(true);
  const [showIntroScreen, setShowIntroScreen] = useState(true);

  const lastMessage = chatHistory[chatHistory.length - 1];
  const isBotMessage = lastMessage?.sender === "bot";

  const buildChatHistoryFromRecap = (response: ResponseQuestionType) => {
    const history: any[] = [];
    if (response?.recap) {
      response.recap.forEach((item: any) => {
        history.push({
          sender: "bot",
          content: item.question,
          question_id: item.question_id,
        });
        history.push({
          sender: "user",
          content: item.answer,
          question_id: item.question_id,
        });
      });
    }
    history.push({
      sender: "bot",
      content: response.question,
      image: response.image_url,
      list: response.list,
      renderQuestion: true,
      question_id: response.next_question_id,
    });
    return history;
  };
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);
  useEffect(() => {
    const storedUserId = localStorage.getItem("dpUserId");
    setDpuserid(storedUserId ? JSON.parse(storedUserId) : "");
    if (multipleQuestionsCompleted) {
      dispatch(setMultipleQuestionsCompleted(true));
    }
    if (symptomData.question_id === "Q1") {
      setShowIntroScreen(false); // 👈 hide intro card after answering Q1
    }

    if (count.current) {
      getQuestions();
    } else {
      count.current = true;
      getFirstQuestions();
    }
  }, [symptomData]);

  useEffect(() => {
    localStorage.removeItem("dpUserId");
    localStorage.removeItem("lastSymptomData");
    localStorage.removeItem("symptomChatHistory");
    const newUserId = Date.now().toString();
    localStorage.setItem("dpUserId", JSON.stringify(newUserId));
    setDpuserid(newUserId);

    count.current = true;
    count1.current = false;

    dispatch(setMultipleQuestions([]));
    dispatch(setMultipleQuestionsCompleted(false));
    dispatch(setSymptomId(null));
    dispatch(setRedFlagQuestion(false));
    dispatch(setCurrentQuestionIndex(0));
    dispatch(setMessageModalVisible(false));
    dispatch(setModalVisible(false));
    dispatch(setSymptomHistoryVisible(false));

    setChatHistory([]);
    setSymptomData({
      user_id: newUserId,
      question_id: "",
      answer: "",
      symptomId: null,
    });

    getFirstQuestions();
  }, []);

  const getQuestions = async () => {
    if (count1.current) {
      const response = await getQuestion(symptomData);
      setQuestion(response);
      setQuestionId(response.next_question_id as string);
      setChatHistory(buildChatHistoryFromRecap(response));

      if (response?.message) {
        dispatch(setMessageModalVisible(true));
        setModalViewFor("message");
      }
      if (response?.symptom_id) {
        dispatch(setSymptomId(response?.symptom_id));
      }
      if (response?.multiple_questions?.length > 0) {
        dispatch(setMultipleQuestions(response.multiple_questions));
        dispatch(setCurrentQuestionIndex(0));
        return;
      }
      dispatch(setMultipleQuestionsCompleted(true));

      dispatch(setRedFlagQuestion(!!response?.red_flag));
    } else {
      count1.current = true;
    }
  };

  const getFirstQuestions = async () => {
    try {
      const response = await getFirstQuestion();
      setQuestion(response);
      setQuestionId(response.next_question_id as string);
      setChatHistory(buildChatHistoryFromRecap(response));
    } catch (error) {
      toast.error("Something went wrong !");
    }
  };

  const setOkayAfterRecap = () => {
    setSymptomData({
      user_id: dpuserid || "",
      question_id: Question?.next_question_id || "",
      answer: "yes",
    });
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 0);
  };

  if (showIntroScreen) {
    return <IntroScreen onStart={() => setShowIntroScreen(false)} />;
  }

  return (
    <div
      className="flex flex-col h-screen max-w-4xl mx-auto bg-white shadow-lg rounded-lg"
      ref={chatContainerRef}
    >
      <div className="flex items-center gap-2 px-6 py-4 shadow-md border-b">
        <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-white border border-gray-200">
          <Image
            src="/symptombot/symp_image.jpg"
            alt="Bot"
            width={100}
            height={70}
            className="object-contain"
          />
        </div>
        <div>
          <p className="text-base font-bold">Dr. Avika</p>
          <p className="text-xs text-green-500">Active now</p>
        </div>
      </div>

      <div className="flex flex-col border border-gray-300 rounded-lg bg-gray-50 overflow-hidden max-h-[75vh] overflow-y-auto p-4 mt-4 h-screen">
        {chatHistory.map((msg, index) => (
          <div key={index} className="flex gap-2 items-start mb-2 ">
            {msg.sender === "bot" && (
              <>
                <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-white border border-gray-200">
                  <Image
                    src="/symptombot/symp_image.jpg"
                    alt="Bot"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
                <div className="bg-blue-200 px-4 py-2 rounded-2xl text-lg text-gray-800 max-w-xs shadow">
                  {typeof msg.content === "string"
                    ? msg.content
                    : Array.isArray(msg.content)
                    ? msg.content.map((q: any, i: number) => (
                        <div key={i}>
                          {q.scenario_title && (
                            <p className="font-semibold">{q.scenario_title}</p>
                          )}
                          {q.scenario_question && <p>{q.scenario_question}</p>}
                          {q.associated_title && (
                            <p className="font-semibold mt-2">
                              {q.associated_title}
                            </p>
                          )}
                          {q.associated_question && (
                            <p>{q.associated_question}</p>
                          )}
                        </div>
                      ))
                    : null}
                  {msg?.list?.length > 0 && <SymptomSlider list={msg.list} />}
                  {msg?.image && (
                    <Image
                      src={msg.image}
                      alt="Symptom"
                      width={300}
                      height={300}
                      className="mt-2 rounded-lg"
                    />
                  )}
                  {index === chatHistory.length - 1 && (
                    <QuestionRenderer
                      setChatHistory={setChatHistory}
                      question={Question}
                      setAnswersField={setSymptomData}
                      userID={dpuserid}
                      setquestion={setQuestion}
                      buildChatHistoryFunction={buildChatHistoryFromRecap}
                    />
                  )}
                </div>
              </>
            )}
            {msg.sender === "user" && (
              <div className="ml-auto">
                <div className="bg-blue-500 text-white px-4 py-2 rounded-2xl max-w-xs shadow text-sm">
                  {typeof msg.content === "object" && msg.content !== null ? (
                    <ul className="list-disc list-inside space-y-1">
                      {Object.entries(msg.content).map(([key, value]) => (
                        <li key={key}>
                          <strong>{key}:</strong>{" "}
                          {typeof value === "string" ||
                          typeof value === "number"
                            ? value
                            : JSON.stringify(value)}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-base">{msg.content}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}

        {multipleQuestions.length > 0 && (
          <MultipleQuestion setSymptomData={setSymptomData} />
        )}

        {Question?.next_available && (
          <div className="mt-6">
            <h2 className="font-bold text-lg mb-2">Your Recap</h2>
            <div className="space-y-4">
              {Question.recap?.map((item: any, index: number) => (
                <div key={index} className="bg-gray-100 p-4 rounded-xl">
                  <p className="font-semibold mb-1">
                    {index + 1}.{" "}
                    {typeof item.question === "string" ? item.question : ""}
                  </p>
                  <div className="text-sm text-gray-700">
                    {typeof item.answer === "string"
                      ? `Ans - ${item.answer}`
                      : Object.entries(item.answer).map(([key, value]) => (
                          <div key={key}>
                            <strong>{key}:</strong> {String(value)}
                          </div>
                        ))}
                  </div>
                </div>
              ))}
            </div>
            <Button
              type="button"
              className="w-full mt-4 bg-primary-lite font-medium"
              onClick={setOkayAfterRecap}
            >
              Okay
            </Button>
          </div>
        )}
      </div>

      <DisclamerModal open={disclamerModal} closeFunction={setDisclamerModal} />
      <MessageModal
        Question={Question}
        ModalFor={ModalViewFor}
        open={responseBmiModal}
        closeFunction={setResponseBmiModal}
        setData={setSymptomData}
        userID={dpuserid}
      />
      <ExplanationModal />
      <SymptomHistoryDrawer drawerFor="faqs" />
    </div>
  );
};

export default BotTestPage;
