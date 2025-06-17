"use client";
import React, { useEffect, useState } from "react";
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
  more_q_info: any | null;
  dr_apnt?: boolean | null;
};

type Props = {
  question: QuestionType | undefined;
  setAnswersField: React.Dispatch<React.SetStateAction<any>>;
  userID: any;
  setquestion: React.Dispatch<React.SetStateAction<any>>;
};

const moreDetails = [
  {
    question_number: "Q62A",
    details: {
      header:
        "Duration and onset are critical in identifying the nature of the headache:",
      content: [
        "•	Sudden onset: A thunderclap headache could indicate a subarachnoid hemorrhage or other neurological emergency (stroke, aneurysm). The bot should trigger immediate referral to urgent care.",
        "•	Gradual onset: More likely to be benign conditions like tension-type headaches or migraines.",
      ],
      colors: [
        "text-red-500 font-semibold",
        "text-orange-400 font-semibold",
        "",
        "",
      ],
      images: null,
    },
  },
  {
    question_number: "Q63",
    details: {
      header:
        "The location of the headache provides insight into its possible cause:",
      content: [
        "Unilateral pain: Likely a migraine or cluster headache.",
        "Bilateral pain: Often seen with tension headaches or could indicate systemic issues (e.g., high blood pressure).",
        "Back of the head/neck: Suggests tension-type headaches or pain related to cervical issues.",
        "Forehead/behind the eyes: Common in sinusitis or eye strain.",
      ],
      colors: [
        "text-orange-500",
        "text-blue-500",
        "text-violet-500",
        "text-teal-500",
      ],
      images: [
        "/images/Img_for_symptom_bot_static/headache_images/one_side_unilateral_headache.png",
        "/images/Img_for_symptom_bot_static/headache_images/both_sides_biletral_headache.png",
        "/images/Img_for_symptom_bot_static/headache_images/back_of_head_headache.png",
        "/images/Img_for_symptom_bot_static/headache_images/forehead_headache.png",
      ],
    },
  },
  {
    question_number: "Q64",
    details: {
      header:
        "The quality of pain helps differentiate between various headache types:",
      content: [
        "Throbbing/pulsing: Typical of migraines or vascular headaches.",
        "Dull, aching: Suggests tension-type headaches.",
        "Sharp, stabbing: Could indicate cluster headaches or neuralgia.",
        "Pressure-like/tightening: Common in tension-type headaches.",
      ],
      colors: [
        "text-orange-500",
        "text-blue-500",
        "text-violet-500",
        "text-teal-500",
      ],
      images: null,
    },
  },
  {
    question_number: "Q65",
    details: {
      header:
        "Associated symptoms are key for diagnosing the type of headache:",
      content: [
        "Nausea, vomiting, photophobia, phonophobia, and aura: Strong signs of a migraine.",
        "Neck stiffness and fever: Possible signs of meningitis; requires urgent referral.",
        "Runny nose or nasal congestion: Likely sinusitis.",
        "Eye redness, tearing: Indicative of cluster headaches.",
        "Weakness, slurred speech, confusion: Major red flags for a neurological emergency (stroke or brain tumor).",
      ],
      colors: [
        "text-orange-500",
        "text-blue-500",
        "text-violet-500",
        "text-teal-500",
        "text-cyan-500",
      ],
      images: null,
    },
  },
  {
    question_number: "Q66",
    details: {
      header: "Triggers help further identify the type of headache:",
      content: [
        "Physical activity/exertion: Suggests migraine or exertional headaches.",
        "Stress, emotional strain, sleep disturbances: Common triggers for tension headaches.",
        "Weather changes, hunger, alcohol, specific foods: These are classic migraine triggers.",
      ],
      colors: ["text-orange-500", "text-blue-500", "text-violet-500", "", ""],
      images: null,
    },
  },
  {
    question_number: "Q67",
    details: {
      header:
        "Medical history and red flags provide crucial context for serious conditions:",
      content: [
        "Recent head injury: Could indicate a concussion or subdural hematoma; requires urgent evaluation.",
        "Hypertension: Can lead to a hypertensive crisis, which might present with a headache. Immediate medical evaluation is needed.",
        "Pregnancy/recent childbirth: Could signal preeclampsia, requiring immediate care.",
        "Cancer/immune suppression: May suggest brain metastasis or an infection (e.g., abscess, meningitis).",
        "Stroke/brain aneurysm history: Increased risk of a neurological emergency.",
      ],
      colors: [
        "text-orange-500",
        "text-blue-500",
        "text-violet-500",
        "text-teal-500",
        "text-cyan-500",
      ],
      images: null,
    },
  },
  {
    question_number: "Q68",
    details: {
      header: "",
      content: [
        "Frequent or daily headaches suggest a chronic condition (e.g., chronic migraines or medication overuse headache). This step helps to gauge whether the user requires long-term management or referral to a specialist.",
      ],
      colors: [
        "text-orange-500",
        "text-blue-500",
        "text-violet-500",
        "text-teal-500",
        "text-cyan-500",
      ],
      images: null,
    },
  },
];

const QuestionRenderer: React.FC<Props> = ({
  question,
  setAnswersField,
  userID,
  setquestion,
}) => {
  const QuestionForMoreDetails = [
    "Q62A",
    "Q63",
    "Q64",
    "Q65",
    "Q66",
    "Q67",
    "Q68",
  ];
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

  // Debounce input value
  useEffect(() => {
      setIsLoadingResults(true);

    const handler = setTimeout(() => {
      setDebouncedValue(inputSearchValue);
    }, 300); // 300ms debounce delay

    return () => clearTimeout(handler);
  }, [inputSearchValue]);

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

  const handleonYesNoClick = (options: string) => {
    console.log(options)
    if (options !== null) {
      if(options === "yes" && question?.dr_apnt){
        router.push("/dashboard/appoinment");
        return;
      }
      question?.next_question_id === "Q1" && options === "no"
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
      toast.warn("Field is empty !");
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
      }else{
        setAnswersField({
          user_id: userID || "",
          question_id:
            question?.next_question_id || question?.previous_question_id,
          answer: value,
          symptom_id: symptomId || null,
        });
      }
    }else{
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
      if (value3.fasting !== "" || value3.postprandial !== "" || value3.HbA1c !== "") {
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
    const response = await goBack({ user_id: userID });
    setquestion(response);
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
                        className="py-4 rounded-full"
                        onPress={handleBackClick}
                      >
                        <ArrowLeft size={18} className="text-slate-600" />
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
                      className="py-4 rounded-full"
                      onPress={handleBackClick}
                    >
                      <ArrowLeft size={18} className="text-slate-600" />
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
                      className="py-4 rounded-full"
                      onPress={handleBackClick}
                    >
                      <ArrowLeft size={18} className="text-slate-600" />
                    </Button>
                  </div>
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
                      className="py-4 rounded-full"
                      onPress={handleBackClick}
                    >
                      <ArrowLeft size={18} className="text-slate-600" />
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
                      className="py-4 rounded-full"
                      onPress={handleBackClick}
                    >
                      <ArrowLeft size={18} className="text-slate-600" />
                    </Button>
                  </div>
                </div>
              );

            case "input_text_search":
              return (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={inputSearchValue}
                    placeholder="Search your symptom"
                    className="w-full p-3 pl-6 h-12 border-2 border-primary-lite text-zinc-950 rounded-full mt-2"
                    onChange={(e) => {setInputSearchValue(e.target.value); setIsLoadingResults(true);}} 
                  />

                  {/* Results list */}
                  {(searchResults?.length > 0 || isLoadingResults)&& (
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
                            <div className="font-semibold text-primary-dark">{item.symptom}</div>
                            <div className="text-sm text-gray-500">{item.description}</div>
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
                      className="py-4 rounded-full"
                      onPress={handleBackClick}
                    >
                      <ArrowLeft size={18} className="text-slate-600" />
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
