"use client";
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@heroui/button";
import ScrollingOptions from "@/components/SymptomBot/ScrollingOptions";
import { Slider } from "@heroui/react";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  endChat,
  endChatOnly,
  goBack,
  handleSearchSymptom,
  forceSkipToQ10A,
} from "@/services/api.symptombot.service";
import SymptomBotRecapModal from "@/components/SymptomBot/SymptomBotRecapModal";
import { toast } from "react-toastify";
import {
  setSymptomId,
  setErrorMessageForRedFlag,
  setMessageModalVisible,
  setExplanationData,
  setModalVisible,
  setSymptomHistoryVisible,
} from "@/redux/slices/symptomBot.slice";
import { useRouter } from "next/navigation";

import { skip } from "node:test";

type QuestionType = {
  question: string;
  type:
    | "yesno"
    | "input_number"
    | "multiple_choice"
    | "input_text"
    | "numeric_input"
    | "input_slider"
    | "input_text_search"
    | "info"
    | "input_calendar";
  options: string[] | null;
  next: string | { yes: string; no: string | null };
  fields: { label: string; type: string }[] | null;
  next_question_id: string | null;
  status: number | null;
  recap?: any | null;
  message?: string | null;
  next_available: boolean | null;
  previous_question_id?: string | null;
  more_q_info: any | null;
  dr_apnt?: boolean | null;
  diagnosis_key?: string | null;
  flow_name?: string | null;
  skip?: boolean;
};
// Define the structure based on your API response
export type ResponseQuestionType = {
  question: string;
  type: string;
  options?: string[];
  next?: string;
  recap: {
    question: string;
    answer: string;
    question_id: string;
  }[];
  image_url?: string | null;
  list?: any[];
  next_question_id?: string;
};

type Props = {
  question: QuestionType | undefined;
  setAnswersField: React.Dispatch<React.SetStateAction<any>>;
  userID: any;
  setquestion: React.Dispatch<React.SetStateAction<any>>;

  buildChatHistoryFunction: any;
  setchatHistory: React.Dispatch<React.SetStateAction<any[]>>;
  scrollToBottom?: () => void; // Optional prop for scrolling
};

const QuestionRenderer: React.FC<Props> = ({
  question,
  setAnswersField,
  userID,
  setquestion,
  buildChatHistoryFunction,
  setchatHistory,
  scrollToBottom = () => {}, // Default to a no-op if not provided
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  // const [chatHistory, setChatHistory] = useState<any[]>([]);
  const [summaryData, setSummaryData] = useState<any>("");
  const [wieghtHeightFieldValue, setWieghtHeightFieldValue] = useState<{
    weight: string;
    height_ft: string;
    height_inches: string;
  }>({
    weight: "",
    height_ft: "",
    height_inches: "",
  });
  const [DataforSummaryModal, setDataforSummaryModal] = useState<any | null>(
    null
  );

  const [diabetesFieldValue, setDiabetesFieldValue] = useState<{
    systolic: string;
    diastolic: string;
  }>({
    systolic: "",
    diastolic: "",
  });

  const [diabetesValues, setDiabetesValues] = useState<{
    "Fasting (FBS)": string;
    "Postprandial (PPBS)": string;
    HbA1c: string;
  }>({
    "Fasting (FBS)": "",
    "Postprandial (PPBS)": "",
    HbA1c: "",
  });

  const { redFlagQuestion, symptomId } = useSelector(
    (state: RootState) => state.symptomBot
  );

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [inputFieldValue, setInputFieldValue] = useState<string>("");
  const [painLevel, setPainLevel] = useState<number>(5);
  const [numericInputs, setNumericInputs] = useState<Record<string, string>>(
    {}
  );
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [debouncedValue, setDebouncedValue] = useState<string>("");
  const [isLoadingResults, setIsLoadingResults] = useState<boolean>(false);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(inputFieldValue), 300);
    return () => clearTimeout(handler);
  }, [inputFieldValue]);

  useEffect(() => {
    if (!debouncedValue.trim()) return;

    const fetchSearchResults = async () => {
      setIsLoadingResults(true);
      try {
        const res = await handleSearchSymptom(debouncedValue);
        setSearchResults(res.results || []);
      } catch (error) {
        console.error("Search failed", error);
      } finally {
        setIsLoadingResults(false);
      }
    };

    fetchSearchResults();
  }, [debouncedValue]);

  const sendUserResponse = async (answer: any) => {
    if (
      answer === "no" &&
      question?.next_question_id === "Q1" &&
      question?.flow_name === "main"
    ) {
      await endChatOnly({ user_id: userID });
      router.push("/");
      return;
    }

    if (answer === "yes" && question?.dr_apnt) {
      router.push("/dashboard/appoinment");
      return;
    }

    if (redFlagQuestion && answer !== "None of the above") {
      dispatch(setMessageModalVisible(true));
      dispatch(setErrorMessageForRedFlag(true));
    }

    const handleNumericInputFields = (e: any, field: any, index: number) => {
      const { value } = e.target;
      if (field.label === "Weight (kg)") {
        setWieghtHeightFieldValue((prev: any) => ({
          ...prev,
          weight: value,
        }));
      } else if (field.label === "Height (ft)") {
        setWieghtHeightFieldValue((prev: any) => ({
          ...prev,
          height_ft: value,
        }));
      } else if (field.label === "Height (inches)") {
        setWieghtHeightFieldValue((prev: any) => ({
          ...prev,
          height_inches: value,
        }));
      } else if (field.label === "Systolic") {
        setDiabetesFieldValue((prev: any) => ({
          ...prev,
          systolic: value,
        }));
      } else if (field.label === "Diastolic") {
        setDiabetesFieldValue((prev: any) => ({
          ...prev,
          diastolic: value,
        }));
      } else if (field.label === "Fasting (FBS)") {
        setDiabetesValues((prev: any) => ({
          ...prev,
          "Fasting (FBS)": value,
        }));
      } else if (field.label === "Postprandial (PPBS)") {
        setDiabetesValues((prev: any) => ({
          ...prev,
          "Postprandial (PPBS)": value,
        }));
      } else if (field.label === "HbA1c") {
        setDiabetesValues((prev: any) => ({
          ...prev,
          HbA1c: value,
        }));
      }
    };
    setAnswersField({
      user_id: userID,
      question_id: question?.next_question_id || question?.previous_question_id,
      answer,
      symptom_id: symptomId || null,
    });
  };

  const handleMultipleChoiceClick = (value: string | number) => {
    if (redFlagQuestion) {
      if (value !== "None of the above") {
        dispatch(setMessageModalVisible(true));
        dispatch(setErrorMessageForRedFlag(true));
        setAnswersField({
          user_id: userID || "",
          question_id:
            question?.next_question_id || question?.previous_question_id,
          answer: value,
          symptom_id: symptomId || null,
        });
      } else {
        setAnswersField({
          user_id: userID || "",
          question_id:
            question?.next_question_id || question?.previous_question_id,
          answer: value,
          symptom_id: symptomId || null,
        });
      }
    } else {
      if (value !== null) {
        setAnswersField({
          user_id: userID || "",
          question_id:
            question?.next_question_id || question?.previous_question_id,
          answer: value,
          symptom_id: symptomId || null,
        });
      }
    }
  };

  const handleNumericSubmit = () => {
    if (Object.values(numericInputs).every((v) => v !== "")) {
      sendUserResponse(numericInputs);
    } else {
      toast.warn("Please fill all required fields.");
    }
  };

  const handleSearchResultSelect = (item: any) => {
    dispatch(setSymptomId(item.symptom_id));
    sendUserResponse(item.symptom);
  };

  const handleBackClick = async () => {
    try {
      const response = await goBack({ user_id: userID });

      // Set new question
      setquestion(response);
      console.log("response", response);

      // Build chat history from the response
      console.log("res", response);
      setchatHistory(buildChatHistoryFunction(response));
    } catch (err) {
      console.error("Go back failed:", err);
    }
  };

  const handleForceSkip = async () => {
    try {
      const payload = {
        user_id: userID || "",
        question_id:
          question?.next_question_id ?? question?.previous_question_id ?? "",
        answer: "skip",
        symptom_id: symptomId || 0,
      };

      const response = await forceSkipToQ10A(payload);

      // Set new question
      setquestion(response);

      setchatHistory(buildChatHistoryFunction(response));

      // Set symptom ID if provided
      if (response.symptom_id) {
        dispatch(setSymptomId(response.symptom_id));
      }
    } catch (err) {
      console.error("Force skip failed:", err);
    }
  };

  const endChatApicall = async () => {
    const response = await endChat({
      user_id: userID,
    });
    if (response) {
      setDataforSummaryModal(response);
      setSummaryData(response.summary as string);
    }
  };

  const handleCloseSummaryModal = () => {
    setDataforSummaryModal(null);
  };

  const confirmEndChat = () => {
    setSummaryData(null);
    router.push("/");
    setDataforSummaryModal(null);
  };
  const handleExplanation = () => {
    if (question?.more_q_info) {
      dispatch(setModalVisible(true));
      dispatch(setExplanationData(question.more_q_info));
    }
  };

  if (!question) {
    return (
      <div className="w-full flex justify-center items-center py-8">
        <Loader2 className="animate-spin text-gray-400 w-6 h-6" />
      </div>
    );
  }

  let questionContent: JSX.Element | null = null;
  switch (question.type) {
    case "yesno":
      questionContent = (
        <div className="flex flex-col gap-3 mt-4">
          {["Yes", "No"].map((opt) => (
            <button
              key={opt}
              onClick={() => sendUserResponse(opt.toLowerCase())}
              className="flex justify-between items-center bg-white border border-blue-200 text-blue-700 px-4 py-2 rounded-lg shadow-sm hover:bg-blue-50 transition"
            >
              {opt}
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          ))}
          {question.skip && (
            <Button
              variant="ghost"
              className="w-full rounded-2xl border border-black-500 text-black-600 mt-1 bg-green-500"
              onClick={handleForceSkip}
            >
              Skip to Symptom
            </Button>
          )}

          {question?.next_question_id !== "Q1" && (
            <button
              onClick={handleBackClick}
              className="flex items-center justify-center gap-2 text-slate-600 text-sm  hover:underline border border-gray-300 px-4 py-2 rounded-2xl transition bg-blue-50"
            >
              <ArrowLeft size={16} /> Back
            </button>
          )}
        </div>
      );
      break;

    case "multiple_choice":
      if (question.next_question_id === "Q42") {
        questionContent = (
          <div>
            <ScrollingOptions
              Question={{
                ...question,
                options: question.options || [],
              }}
              handleMultipleChoiceClick={handleMultipleChoiceClick}
            />
            <Button
              variant="ghost"
              className="border-primary-lite border-2 text-white bg-red-700 font-semibold px-4 py-5 mt-5 rounded-full w-full"
              onPress={endChatApicall}
            >
              End Chat
            </Button>
            <Button
              variant="bordered"
              className="border-primary-lite border-2 font-semibold px-4 py-5 mt-1 rounded-full w-full"
              onPress={() => dispatch(setSymptomHistoryVisible(true))}
            >
              {`FAQ's`}
            </Button>
          </div>
        );
      } else {
        questionContent = (
          <div className="flex flex-col gap-2 w-full max-w-sm bg-blue-50 p-4 rounded-xl">
            {question.options?.map((opt) => (
              <button
                key={opt}
                onClick={() => sendUserResponse(opt)}
                className="flex justify-between items-center bg-white text-blue-600 px-4 py-2 rounded-md shadow-sm hover:bg-blue-100 transition"
              >
                <span>{opt}</span>
                <span className="text-blue-500">{">"}</span>
              </button>
            ))}

            {question.more_q_info && (
              <button
                onClick={handleExplanation}
                className="text-sm text-blue-600 mt-2 underline hover:text-blue-800"
              >
                What does this mean?
              </button>
            )}

            <button
              onClick={handleBackClick}
              className="flex items-center justify-center gap-1 text-sm text-gray-600 mt-3 border border-gray-300 px-4 py-2 rounded-full hover:bg-gray-100 transition"
            >
              <ArrowLeft size={16} /> Back
            </button>
          </div>
        );
      }
      break;

    case "input_text":
      questionContent = (
        <div className="w-full max-w-xs ml-auto space-y-3">
          <input
            ref={inputRef}
            type="text"
            className="w-full p-3 border border-gray-300 rounded-full"
            value={inputFieldValue}
            onChange={(e) => setInputFieldValue(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && sendUserResponse(inputFieldValue)
            }
          />
          <Button
            className="bg-blue-500 text-white w-full rounded-full"
            onClick={() => sendUserResponse(inputFieldValue)}
          >
            Send
          </Button>

          {question.skip && (
            <Button
              variant="ghost"
              className="w-full rounded-2xl border border-black-500 text-black-600 mt-1 bg-green-500"
              onClick={handleForceSkip}
            >
              Skip to Symptom
            </Button>
          )}

          <Button
            variant="bordered"
            size="sm"
            className="w-full rounded-full border border-black-300"
            onClick={handleBackClick}
          >
            <ArrowLeft size={18} className="text-slate-600 " />{" "}
            <h1 className="text-black-400">Back</h1>
          </Button>
        </div>
      );
      break;

    case "input_number":
    case "input_calendar":
      questionContent = (
        <div className="w-full max-w-xs ml-auto space-y-3">
          <input
            ref={inputRef}
            type={
              question.type === "input_calendar"
                ? "date"
                : question.type === "input_number"
                ? "number"
                : "text"
            }
            className="w-full p-3 border border-gray-300 rounded-full"
            value={inputFieldValue}
            onChange={(e) => setInputFieldValue(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && sendUserResponse(inputFieldValue)
            }
          />
          <Button
            className="bg-blue-500 text-white w-full rounded-full"
            onClick={() => sendUserResponse(inputFieldValue)}
          >
            Send
          </Button>
          <Button
            variant="bordered"
            size="sm"
            className="w-full rounded-full"
            onClick={handleBackClick}
          >
            <ArrowLeft size={18} className="text-slate-600" /> Back
          </Button>
        </div>
      );
      break;

    case "numeric_input":
      questionContent = (
        <div className="space-y-3 w-full max-w-xs ml-auto">
          {question.fields?.map((field) => (
            <input
              key={field.label}
              type={field.type}
              placeholder={field.label}
              className="w-full p-3 border border-gray-300 rounded-full"
              onChange={(e) =>
                setNumericInputs((prev) => ({
                  ...prev,
                  [field.label]: e.target.value,
                }))
              }
            />
          ))}
          <Button
            className="bg-blue-500 text-white w-full rounded-full"
            onClick={handleNumericSubmit}
          >
            Submit
          </Button>
          {question.skip && (
            <Button
              variant="ghost"
              className="w-full rounded-2xl border border-black-500 text-black-600 mt-1 bg-green-500"
              onClick={handleForceSkip}
            >
              Skip to Symptom
            </Button>
          )}
          <Button
            variant="bordered"
            size="sm"
            className="w-full rounded-2xl border border-black-300 border-black-700"
            onClick={handleBackClick}
          >
            <ArrowLeft size={18} className="text-slate-600" /> Back
          </Button>
        </div>
      );
      break;

    case "input_slider":
      questionContent = (
        <div className="w-full max-w-xs ml-auto space-y-3">
          <div className="flex justify-between px-1 text-sm text-gray-600">
            {[...Array(10)].map((_, i) => (
              <span key={i}>{i + 1}</span>
            ))}
          </div>
          <Slider
            classNames={{
              base: "gap-3",
              filler: "bg-gradient-to-r from-yellow-300 to-red-600",
              thumb: "bg-red-600 border-white",
            }}
            defaultValue={5}
            minValue={1}
            maxValue={10}
            showSteps={true}
            size="lg"
            step={1}
            onChange={(val) => setPainLevel(Array.isArray(val) ? val[0] : val)}
          />
          <Button
            variant="ghost"
            className="border-slate-100 border-2 text-white bg-primary-lite font-semibold px-4 py-2 rounded-full w-full"
            onClick={() => sendUserResponse(painLevel)}
          >
            Send
          </Button>
          <Button
            variant="bordered"
            size="sm"
            className="w-full rounded-full"
            onClick={handleBackClick}
          >
            <ArrowLeft size={18} className="text-slate-600" /> Back
          </Button>
        </div>
      );
      break;

    case "input_text_search":
      questionContent = (
        <div className="w-full max-w-xs ml-auto space-y-3">
          <input
            type="text"
            placeholder="Search your symptom"
            className="w-full p-3 border border-gray-300 rounded-full"
            value={inputFieldValue}
            onChange={(e) => setInputFieldValue(e.target.value)}
          />
          {(searchResults.length > 0 || isLoadingResults) && (
            <ul className="bg-white border border-slate-200 rounded-md shadow max-h-60 overflow-y-auto mt-2">
              {isLoadingResults ? (
                <div className="flex justify-center py-4">
                  <Loader2 className="animate-spin" size={24} />
                </div>
              ) : (
                searchResults.map((item, i) => (
                  <li
                    key={i}
                    className="p-3 hover:bg-slate-100 cursor-pointer"
                    onClick={() => handleSearchResultSelect(item)}
                  >
                    <div className="font-semibold text-blue-700">
                      {item.symptom}
                    </div>
                    <div className="text-sm text-gray-500">
                      {item.description}
                    </div>
                  </li>
                ))
              )}
            </ul>
          )}
          <Button
            variant="bordered"
            size="sm"
            className="w-full rounded-full"
            onClick={handleBackClick}
          >
            <ArrowLeft size={18} className="text-slate-600" /> Back
          </Button>
        </div>
      );
      break;

    case "info":
      questionContent = (
        <div className="flex justify-end">
          <Button
            className="bg-blue-500 text-white px-5 py-2 rounded-full shadow"
            onClick={() => sendUserResponse("Okay")}
          >
            Okay
          </Button>
        </div>
      );
      break;

    default:
      questionContent = null;
      break;
  }

  return (
    <>
      {question && (
        <div key={question.question} className="flex flex-col gap-2">
          {/* ✅ Render the question text here */}
          {/* <div className="bg-blue-100 text-black p-3 rounded-lg max-w-md">
          {question.question}
        </div> */}

          {/* 🔁 Render the dynamic question content */}
          {questionContent}
        </div>
      )}
      {DataforSummaryModal && (
        <SymptomBotRecapModal
          openModal={DataforSummaryModal !== null}
          onClosefunction={handleCloseSummaryModal}
          summary={DataforSummaryModal.summary}
          onEndChatOkay={confirmEndChat}
        />
      )}
    </>
  );
};

export default QuestionRenderer;
