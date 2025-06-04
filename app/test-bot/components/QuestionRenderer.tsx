"use client";
import React, { useState } from "react";
import { Button } from "@heroui/button";
import ScrollingOptions from "@/app/test-bot/components/ScrollingOptions";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { endChat } from "@/services/api.symptombot.service";
import SymptomBotRecapModal from "@/app/test-bot/components/SymptomBotRecapModal";
import { useRouter } from "next/navigation";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/dropdown";
import { useDispatch } from "react-redux";
import { setExplanationData, setExplanationModal } from "@/redux/slices/symptomBot.slice";
import Image from "next/image";

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

const moreDetails = [
  {
    question_number: "Q62A",
    details: {
      header: "Duration and onset are critical in identifying the nature of the headache:",
      content: ["•	Sudden onset: A thunderclap headache could indicate a subarachnoid hemorrhage or other neurological emergency (stroke, aneurysm). The bot should trigger immediate referral to urgent care.", 
        "•	Gradual onset: More likely to be benign conditions like tension-type headaches or migraines."
      ],
      colors: ["text-red-500 font-semibold", "text-orange-400 font-semibold", "", ""],
      images: null
    },
  },
  {
    question_number: "Q63",
    details: {
      header: "The location of the headache provides insight into its possible cause:",
      content: ["Unilateral pain: Likely a migraine or cluster headache.", 
        "Bilateral pain: Often seen with tension headaches or could indicate systemic issues (e.g., high blood pressure).", 
        "Back of the head/neck: Suggests tension-type headaches or pain related to cervical issues.", 
        "Forehead/behind the eyes: Common in sinusitis or eye strain."
      ],
      colors: ["text-orange-500", "text-blue-500", "text-violet-500", "text-teal-500"],
      images: ["/images/Img_for_symptom_bot_static/headache_images/Headache.png", "/images/Img_for_symptom_bot_static/headache_images/Symptom Bot images (2).png", "/images/Img_for_symptom_bot_static/headache_images/Symptom Bot images.png", "/images/Img_for_symptom_bot_static/headache_images/Symptom Bot images (1).png"]
    },
  },
  {
    question_number: "Q64",
    details: {
      header: "The quality of pain helps differentiate between various headache types:",
      content: ["Throbbing/pulsing: Typical of migraines or vascular headaches.", 
        "Dull, aching: Suggests tension-type headaches.", 
        "Sharp, stabbing: Could indicate cluster headaches or neuralgia.", 
        "Pressure-like/tightening: Common in tension-type headaches."
      ],
      colors: ["text-orange-500", "text-blue-500", "text-violet-500", "text-teal-500"],
      images: null
    },
  },
  {
    question_number: "Q65",
    details: {
      header: "Associated symptoms are key for diagnosing the type of headache:",
      content: ["Nausea, vomiting, photophobia, phonophobia, and aura: Strong signs of a migraine.", 
        "Neck stiffness and fever: Possible signs of meningitis; requires urgent referral.", 
        "Runny nose or nasal congestion: Likely sinusitis.", 
        "Eye redness, tearing: Indicative of cluster headaches.",
        "Weakness, slurred speech, confusion: Major red flags for a neurological emergency (stroke or brain tumor)."
      ],
      colors: ["text-orange-500", "text-blue-500", "text-violet-500", "text-teal-500", "text-cyan-500"],
      images: null
    },
  },
  {
    question_number: "Q66",
    details: {
      header: "Triggers help further identify the type of headache:",
      content: ["Physical activity/exertion: Suggests migraine or exertional headaches.", 
        "Stress, emotional strain, sleep disturbances: Common triggers for tension headaches.", 
        "Weather changes, hunger, alcohol, specific foods: These are classic migraine triggers.", 
      ],
      colors: ["text-orange-500", "text-blue-500", "text-violet-500", "", ""],
      images: null
    },
  },
  {
    question_number: "Q67",
    details: {
      header: "Medical history and red flags provide crucial context for serious conditions:",
      content: ["Recent head injury: Could indicate a concussion or subdural hematoma; requires urgent evaluation.", 
        "Hypertension: Can lead to a hypertensive crisis, which might present with a headache. Immediate medical evaluation is needed.", 
        "Pregnancy/recent childbirth: Could signal preeclampsia, requiring immediate care.", 
        "Cancer/immune suppression: May suggest brain metastasis or an infection (e.g., abscess, meningitis).",
        "Stroke/brain aneurysm history: Increased risk of a neurological emergency."
      ],
      colors: ["text-orange-500", "text-blue-500", "text-violet-500", "text-teal-500", "text-cyan-500"],
      images: null
    },
  },
  {
    question_number: "Q68",
    details: {
      header: "",
      content: ["Frequent or daily headaches suggest a chronic condition (e.g., chronic migraines or medication overuse headache). This step helps to gauge whether the user requires long-term management or referral to a specialist."],
      colors: ["text-orange-500", "text-blue-500", "text-violet-500", "text-teal-500", "text-cyan-500"],
      images: null
    },
  },

]

const QuestionRenderer: React.FC<Props> = ({
  question,
  setAnswersField,
  userID
}) => {
  const QuestionForMoreDetails = ["Q62A", "Q63", "Q64", "Q65", "Q66", "Q67", "Q68"]
  const router = useRouter();
  const dispatch = useDispatch();
  const [inputFieldValue, setInputFieldValue] = useState<string | number | null>(null);
  const [DataforSummaryModal, setDataforSummaryModal] = useState<any | null>(null);
  const [summaryData, setSummaryData] = useState<any>("");
  const [explanationContent, setExplanationContent] = useState<any>();
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
  }>({
    "Fasting (FBS)": "",
    "Postprandial (PPBS)": "",
  });

  console.log(question?.next_question_id);

  const handleSetExplanationData = () => {
    dispatch(setExplanationModal(true));
    moreDetails.map((data, index) => {
      if(data.question_number === question?.next_question_id){
        // console.log(data.details);
        dispatch(setExplanationData(data.details)) ;
      }
    })
  }

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

  const handleMultipleInputField = (value1: any, value2: any, value3: any) => {
    if(question?.next_question_id === "Q4"){
      if (
        value1.weight !== "" &&
        value1.height_ft !== "" &&
        value1.height_inches !== ""
      ) {
        setAnswersField({
          user_id: userID || "",
          question_id: question?.next_question_id,
          answer: value1,
        });
      } else {
        toast.warn("Enter all fields !");
      }
    } else if(question?.next_question_id === "Q10"){
        if(value2.systolic !== "" && value2.diastolic !== ""){
          setAnswersField({
            user_id: userID || "",
            question_id: question?.next_question_id,
            answer: value2,
          });
        }
    } else if(question?.next_question_id === "Q8"){
      if(value3.fasting !== "" || value3.postprandial !== ""){
        setAnswersField({
          user_id: userID || "",
          question_id: question?.next_question_id,
          answer: value3,
        });
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
    } else if (field.label === "Systolic"){
      setDiabetesFieldValue((prev: any) => ({
        ...prev,
        systolic: value
      }))
    } else if (field.label === "Diastolic"){
      setDiabetesFieldValue((prev: any) => ({
        ...prev,
        diastolic: value
      }))
    } else if (field.label === "Fasting (FBS)"){
      setDiabetesValues((prev: any) => ({
        ...prev,
        "Fasting (FBS)": value
      }))
    } else if (field.label === "Postprandial (PPBS)"){
      setDiabetesValues((prev: any) => ({
        ...prev,
        "Postprandial (PPBS)": value
      }))
    }
  }

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
                  {/* {question.next_question_id === "Q61" && 
                    <div className="w-full flex justify-end">
                      <Button variant="light" className="text-primary-lite" onPress={handleSetExplanationData}>What does this mean ?</Button>
                    </div>
                  } */}
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
                  {question?.next_question_id && QuestionForMoreDetails.includes(question?.next_question_id) && 
                    <div className="w-full flex justify-end">
                      <Button variant="light" className="text-primary-lite" onPress={handleSetExplanationData}>What does this mean ?</Button>
                    </div>
                  }
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
                      onChange={(e) => handleNumericInputFields(e, field, index)}
                    />
                  ))}
                  <Button
                    variant="ghost"
                    className="border-slate-100 border-2 text-white bg-primary-lite font-semibold px-4 py-2 rounded-full w-full"
                    onClick={() => handleMultipleInputField(wieghtHeightFieldValue, diabetesFieldValue, diabetesValues)}
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
