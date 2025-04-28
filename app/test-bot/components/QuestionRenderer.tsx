"use client";
import React, { useState } from "react";
import { Button } from "@nextui-org/button";
import ScrollingOptions from "@/app/test-bot/components/ScrollingOptions";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { endChat } from "@/services/api.symptombot.service";
import SymptomBotRecapModal from "@/app/test-bot/components/SymptomBotRecapModal";
import { useRouter } from "next/navigation";

type QuestionType = {
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

type Props = {
  question: QuestionType | undefined;
  setAnswersField: React.Dispatch<React.SetStateAction<any>>;
  userID: any;
};

const QuestionRenderer: React.FC<Props> = ({
  question,
  setAnswersField,
  userID
}) => {
  const router = useRouter();
  const [inputFieldValue, setInputFieldValue] = useState<string | number | null>(null);
  const [DataforSummaryModal, setDataforSummaryModal] = useState<any | null>(null);
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

  const handleonYesNoClick = (options: string) => {
    if (options !== null) {
      question?.next_question_id === "Q1" && options === "no"
        ? endChatApicall()
        : setAnswersField({
            user_id: userID || "",
            question_id: question?.next_question_id,
            answer: options,
          });
    }
  };

  const inputFieldValueSubmit = () => {
    if (inputFieldValue !== null) {
      setAnswersField({
        user_id: userID || "",
        question_id: question?.next_question_id,
        answer: inputFieldValue,
      });
      setInputFieldValue(null);
    } else {
      toast.warn("Field is empty !");
    }
  };

  const handleMultipleChoiceClick = (value: string | number) => {
    if (value !== null) {
      setAnswersField({
        user_id: userID || "",
        question_id: question?.next_question_id,
        answer: value,
      });
    }
  };

  const handleMultipleInputField = (value: any) => {
    if (
      value.weight !== "" &&
      value.height_ft !== "" &&
      value.height_inches !== ""
    ) {
      setAnswersField({
        user_id: userID || "",
        question_id: question?.next_question_id,
        answer: value,
      });
    } else {
      toast.warn("Enter all fields !");
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

  if (question === undefined) {
    return (
      <div className="w-full flex justify-center items-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  } else {
    return (
      <>
        {/* Question rendering block */}
        {(() => {
          switch (question?.type) {
            case "yesno":
              return (
                <div className="flex flex-col space-y-2">
                  {["yes", "no"].map((option) => (
                    <Button
                      key={option}
                      variant="ghost"
                      className="border-primary-lite border-2 text-slate-800 font-semibold px-4 py-5 rounded-full"
                      onClick={() => handleonYesNoClick(option)}
                    >
                      {option.toUpperCase()}
                    </Button>
                  ))}
                </div>
              );

            case "input_text":
            case "input_number":
              return (
                <div className="space-y-2">
                  <input
                    type={question.type === "input_number" ? "number" : "text"}
                    value={inputFieldValue === null ? "" : inputFieldValue}
                    placeholder="Enter your response"
                    className="w-full p-3 pl-6 h-12 border-2 border-primary-lite text-zinc-950 rounded-full mt-2"
                    onChange={(e) => setInputFieldValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") inputFieldValueSubmit();
                    }}
                  />
                  <Button
                    variant="ghost"
                    className="border-slate-100 border-2 text-white bg-primary-lite font-semibold px-4 py-2 rounded-full w-full"
                    onClick={() => inputFieldValueSubmit()}
                  >
                    Send
                  </Button>
                </div>
              );

            case "multiple_choice":
              if (question.next_question_id === "Q42") {
                return (
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
                      onClick={endChatApicall}
                    >
                      End Chat
                    </Button>
                  </div>
                );
              }

              return (
                <div className="flex flex-col space-y-2">
                  {question.options?.map((option) => (
                    <Button
                      key={option}
                      variant="ghost"
                      className="border-primary-lite border-2 text-slate-800 font-semibold px-4 py-5 rounded-full"
                      onClick={() => handleMultipleChoiceClick(option)}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              );

            case "numeric_input":
              return (
                <div className="flex flex-col space-y-2">
                  {question.fields?.map((field: any, index: number) => (
                    <input
                      key={index}
                      type={field.type}
                      placeholder={field.label}
                      className="w-full border-2 py-2 px-4 border-primary-lite text-zinc-950 rounded-full mt-2"
                      onChange={(e) => {
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
                        }
                      }}
                    />
                  ))}
                  <Button
                    variant="ghost"
                    className="border-slate-100 border-2 text-white bg-primary-lite font-semibold px-4 py-2 rounded-full w-full"
                    onClick={() => handleMultipleInputField(wieghtHeightFieldValue)}
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
                    onClick={() => handleonYesNoClick("Okay")}
                    value={"Okay"}
                  >
                    Okay
                  </Button>
                </div>
              );

            default:
              return null;
          }
        })()}

        {/* ✅ Modal rendering here */}
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
  }
};

export default QuestionRenderer;
