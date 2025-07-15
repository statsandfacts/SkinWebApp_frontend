"use client";
import React, { useEffect, useState, useRef } from "react";
import { Button } from "@heroui/button";
import ScrollingOptions from "@/components/SymptomBot/ScrollingOptions";
import { ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import {
  endChat,
  goBack,
  handleSearchSymptom,
} from "@/services/api.symptombot.service";
import SymptomBotRecapModal from "@/components/SymptomBot/SymptomBotRecapModal";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  setErrorMessageForRedFlag,
  setExplanationData,
  setMessageModalVisible,
  setModalVisible,
  setSymptomHistoryVisible,
  setSymptomId,
} from "@/redux/slices/symptomBot.slice";
import { Slider } from "@heroui/react";
import { RootState } from "@/redux/store";
import { setMultipleQuestions } from "@/redux/slices/symptomBot.slice";
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
  fields: any | null;
  next_question_id: string | null;
  status: number | null;
  recap?: any | null;
  message?: string | null;
  next_available: boolean | null;
  previous_question_id?: string | null;
  more_q_info: any | null;
  dr_apnt?: boolean | null;
  diagnosis_key?: string | null;
  flow_name?:string|null;
};

type Props = {
  question: QuestionType | undefined;
  setAnswersField: React.Dispatch<React.SetStateAction<any>>;
  userID: any;
  setquestion: React.Dispatch<React.SetStateAction<any>>; 
  
};

const QuestionRenderer: React.FC<Props> = ({
  question,
  setAnswersField,
  userID,
  setquestion,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [inputFieldValue, setInputFieldValue] = useState<
    string | number | null
  >(null);
  const [painLevel, setPainLevel] = useState<number[] | number>(5);
  const [DataforSummaryModal, setDataforSummaryModal] = useState<any | null>(
    null
  );
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
    "HbA1c": string;
  }>({
    "Fasting (FBS)": "",
    "Postprandial (PPBS)": "",
    "HbA1c": "",
  });

  //console.log(question?.next_question_id);
  const { redFlagQuestion, symptomId } = useSelector(
    (state: RootState) => state.symptomBot
  );

  const [inputSearchValue, setInputSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [debouncedValue, setDebouncedValue] = useState("");
  const [isLoadingResults, setIsLoadingResults] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
    const multipleQuestions = useSelector(
      (state: RootState) => state.symptomBot.multipleQuestions
    );
 

  // Debounce input value
  useEffect(() => {
    setIsLoadingResults(true);

    const handler = setTimeout(() => {
      setDebouncedValue(inputSearchValue);
    }, 300); // 300ms debounce delay

    return () => clearTimeout(handler);
  }, [inputSearchValue]);

  useEffect(() => {
    const focusTypes = [
      "input_text",
      "input_number",
      "numeric_input",
      "input_text_search",
      "number",
    ];

    if (focusTypes.includes(question?.type ?? "")) {
      inputRef.current?.focus();
    }
  }, [question?.type]);

  // Fetch search results when debounced input changes
  // useEffect(() => {
  //   if (debouncedValue.trim() === "") {
  //     setSearchResults([]);
  //     return;
  //   }

  //   const fetchResults = async () => {
  //     try {
  //       const response = await handleSearchSymptom(debouncedValue);
  //       //console.log("Search response : ", response);
  //       setSearchResults(response.results || []);
  //     } catch (error) {
  //       console.error("Search API error:", error);
  //       setSearchResults([]);
  //     }
  //   };
  //   fetchResults();
  // }, [debouncedValue]);

  useEffect(() => {
    if (debouncedValue.trim() === "") {
      setSearchResults([]);
      setIsLoadingResults(false);
      return;
    }

    const fetchResults = async () => {
      try {
        setIsLoadingResults(true);
        const response = await handleSearchSymptom(debouncedValue);
        setSearchResults(response.results || []);
      } catch (error) {
        console.error("Search API error:", error);
        setSearchResults([]);
      } finally {
        setIsLoadingResults(false);
      }
    };

    fetchResults();
  }, [debouncedValue]);

  const handleSetExplanationData = () => {
    dispatch(setModalVisible(true));
    dispatch(setExplanationData(question?.more_q_info));
  };

  const handleonYesNoClick = (options: string,) => {
    console.log("yesno optn from question", options);
    if (options !== null) {
      if (options === "yes" && question?.dr_apnt){
        router.push("/dashboard/appoinment");
        return;
      }
      question?.next_question_id === "Q2" && options === "no" && question?.flow_name==="main"
        ? endChatApicall()
        : setAnswersField({
            user_id: userID || "",
            question_id:
              question?.next_question_id || question?.previous_question_id,
            answer: options,
            symptom_id: symptomId || null,
          });
    }
  };
  


  const inputFieldValueSubmit = (data?: any) => {
    //console.log(data);
    if (inputFieldValue || data !== null) {
      setAnswersField({
        user_id: userID || "",
        question_id:
          question?.next_question_id || question?.previous_question_id,
        answer: data ? data : inputFieldValue,
        symptom_id: symptomId || null,
      });
      setInputFieldValue(null);
    } else {
      toast.warn("Field is empty!");
    }
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

  const handleMultipleInputField = (value1: any, value2: any, value3: any) => {
    if (question?.next_question_id === "Q4") {
      if (
        value1.weight !== "" &&
        value1.height_ft !== "" &&
        value1.height_inches !== ""
      ) {
        setAnswersField({
          user_id: userID || "",
          question_id:
            question?.next_question_id || question?.previous_question_id,
          answer: value1,
        });
      } else {
        toast.warn("Enter all fields !");
      }
    } else if (question?.next_question_id === "Q10") {
      if (value2.systolic !== "" && value2.diastolic !== "") {
        setAnswersField({
          user_id: userID || "",
          question_id:
            question?.next_question_id || question?.previous_question_id,
          answer: value2,
        });
      } else {
        toast.warn("Enter all fields !");
      }
    } else if (question?.next_question_id === "Q8") {
      console.log(value3);
      if (
        value3.fasting !== "" ||
        value3.postprandial !== "" ||
        value3.HbA1c !== ""
      ) {
        setAnswersField({
          user_id: userID || "",
          question_id:
            question?.next_question_id || question?.previous_question_id,
          answer: value3,
        });
      } else {
        toast.warn("Enter atleast one field !");
      }
    }
  };

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
        "HbA1c": value,
      }));
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

  const handleSearchFieldData = (data: any) => {
    dispatch(setSymptomId(data.symptom_id));
    setAnswersField({
      // user_id: data?.symptom === "Headache" ? "Q61" : "",
      user_id: userID,
      question_id: question?.next_question_id || question?.previous_question_id,
      answer: data.symptom,
      symptom_id: data.symptom_id,
    });
  };
  
  const handleBackClick = async () => {
    try {
      const response = await goBack({ user_id: userID });
      setquestion(response);
    } catch (error) {
      console.error("Error in handleBackClick:", error);
    }
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
                    <>
                      <Button
                        key={option}
                        variant="ghost"
                        className="border-primary-lite border-2 text-slate-800 font-semibold px-4 py-5 rounded-full"
                        onClick={() => handleonYesNoClick(option)}
                      >
                        {option.toUpperCase()}
                      </Button>
                    </>
                  ))}
                  {question?.next_question_id !== "Q1" && ( 
                    <div>
                      <Button
                        variant="bordered"
                        size={"sm"}
                        className="py-4 rounded-xl"
                        onPress={handleBackClick}
                      >
                        <ArrowLeft size={18} className="text-slate-600" />Back
                      </Button>
                    </div>
                  )}
                </div>
              );

            case "input_text":
            case "input_number":
              return (
                <div className="space-y-2">
                  <input
                    ref={inputRef}
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
                  <div>
                    <Button
                      variant="bordered"
                      size={"sm"}
                      className="py-4 rounded-xl"
                      onPress={handleBackClick}
                    >
                      <ArrowLeft size={18} className="text-slate-600" />Back
                    </Button>
                  </div>
                </div>
              );
            case "input_calendar":
              return (
                <div className="space-y-2">
                  <input
                    ref={inputRef}
                    type="date"
                    value={inputFieldValue === null ? "" : inputFieldValue}
                    placeholder="Select date"
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
                  <div>
                    <Button
                      variant="bordered"
                      size="sm"
                      className="py-4 rounded-xl"
                      onPress={handleBackClick}
                    >
                      <ArrowLeft size={18} className="text-slate-600" />Back
                    </Button>
                  </div>
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
              }

              return (
                <div className="flex flex-col space-y-2">
                  {question.options?.map((option) => (
                    <Button
                      key={option}
                      variant="ghost"
                      className="border-primary-lite border-2 text-slate-800 font-semibold px-4 py-5 rounded-full text-wrap"
                      onClick={() => handleMultipleChoiceClick(option)}
                    >
                      {option}
                    </Button>
                  ))}
                  {question?.more_q_info && (
                    <div className="w-full flex justify-end">
                      <Button
                        variant="light"
                        className="text-primary-lite"
                        onPress={handleSetExplanationData}
                      >
                        What does this mean ?
                      </Button>
                    </div>
                  )}
                  <div>
                    <Button
                      variant="bordered"
                      size={"sm"}
                      className="py-4 rounded-xl"
                      onPress={handleBackClick}
                    >
                      <ArrowLeft size={18} className="text-slate-600" />Back
                    </Button>
                  </div>
                </div>
              );

            case "numeric_input":
              return (
                <div className="flex flex-col space-y-2">
                  {question.fields?.map((field: any, index: number) => (
                    <input
                      ref={inputRef}
                      key={index}
                      type={field.type}
                      placeholder={field.label}
                      className="w-full border-2 py-2 px-4 border-primary-lite text-zinc-950 rounded-full mt-2"
                      onChange={(e) =>
                        handleNumericInputFields(e, field, index)
                      }
                    />
                  ))}
                  <Button
                    variant="ghost"
                    className="border-slate-100 border-2 text-white bg-primary-lite font-semibold px-4 py-2 rounded-full w-full"
                    onClick={() =>
                      handleMultipleInputField(
                        wieghtHeightFieldValue,
                        diabetesFieldValue,
                        diabetesValues
                      )
                    }
                  >
                    Send
                  </Button>
                  <div>
                    <Button
                      variant="bordered"
                      size={"sm"}
                      className="py-4 rounded-xl"
                      onPress={handleBackClick}
                    >
                      <ArrowLeft size={18} className="text-slate-600" />Back
                    </Button>
                  </div>
                </div>
              );

            case "input_slider":
              return (
                <div className="flex flex-col space-y-2">
                  <Slider
                    classNames={{
                      base: "gap-3",
                      filler: "bg-gradient-to-r from-yellow-300 to-red-600",
                      thumb: "bg-red-600 border-white",
                    }}
                    defaultValue={5}
                    label="Define your pain level"
                    maxValue={10}
                    minValue={1}
                    showSteps={true}
                    size="lg"
                    step={1}
                    onChange={(value) => setPainLevel(value)}
                  />
                  <Button
                    variant="ghost"
                    className="border-slate-100 border-2 text-white bg-primary-lite font-semibold px-4 py-2 rounded-full w-full"
                    onPress={() => inputFieldValueSubmit(painLevel)}
                  >
                    Send
                  </Button>
                  <div>
                    <Button
                      variant="bordered"
                      size={"sm"}
                      className="py-4 rounded-xl"
                      onPress={handleBackClick}
                    >
                      <ArrowLeft size={18} className="text-slate-600" />Back
                    </Button>
                  </div>
                </div>
              );

            case "input_text_search":
              return (
                <div className="space-y-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputSearchValue}
                    placeholder="Search your symptom"
                    className="w-full p-3 pl-6 h-12 border-2 border-primary-lite text-zinc-950 rounded-full mt-2"
                    onChange={(e) => {
                      setInputSearchValue(e.target.value);
                      setIsLoadingResults(true);
                    }}
                  />

                  {/* Results list */}
                  {(searchResults?.length > 0 || isLoadingResults) && (
                    <ul className="bg-white border border-slate-200 rounded-md shadow-sm max-h-60 overflow-y-auto mt-2">
                      {isLoadingResults ? (
                        <div className="flex justify-center items-center py-4">
                          <Loader2 className="animate-spin" size={24} />
                        </div>
                      ) : (
                        searchResults.map((item, i) => (
                          <li
                            key={i}
                            className="p-3 hover:bg-slate-100 cursor-pointer"
                            onClick={() => handleSearchFieldData(item)}
                          >
                            <div className="font-semibold text-primary-dark">
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

                  {/* <Button
                    variant="ghost"
                    className="border-slate-100 border-2 text-white bg-primary-lite font-semibold px-4 py-2 rounded-full w-full"
                    onClick={() => inputFieldValueSubmit()}
                  >
                    Send
                  </Button> */}
                  <div>
                    <Button
                      variant="bordered"
                      size={"sm"}
                      className="py-4 rounded-xl"
                      onPress={handleBackClick}
                    >
                      <ArrowLeft size={18} className="text-slate-600" />Back
                    </Button>
                  </div>
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
