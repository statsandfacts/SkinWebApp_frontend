"use client";

import { useState } from "react";
import { Button, ButtonGroup } from "@heroui/button";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";

interface Question {
  id: number;
  text: string;
  options: string[];
}

const questions = [
  {
    id: 1,
    text: "Hi! I’m here to assist you with your health concerns. To guide you better, I’ll need some basic information. Would you like to proceed?",
    options: ["Yes", "No"],
  },
  {
    id: 2,
    text: "How old are you?",
    options: [
      "Below 1 year (infant)",
      "1–5 years",
      "6–18 years",
      "19–30 years",
      "31–50 years",
      "51–65 years",
      "Above 65 years",
    ],
  },
  {
    id: 3,
    text: "What is your gender?",
    options: ["Male", "Female", "Non-binary", "Prefer not to say"],
  },
  {
    id: 4,
    text: "Do you have any known medical conditions?",
    options: ["Diabetes", "Hypertension", "Asthma", "None of the above"],
  },
  {
    id: 5,
    text: "Do you smoke or consume alcohol?",
    options: ["Yes", "No"],
  },
  {
    id: 6,
    text: "What symptoms are you currently experiencing?",
    options: [
      "Fever",
      "Cough",
      "Headache",
      "Fatigue",
      "Hypertension",
      "None of the above",
    ],
  },
  {
    id: 7,
    text: "Do you monitor your blood pressure regularly?",
    options: ["Yes", "No"],
  },
  {
    id: 8,
    text: "If yes, what was your last recorded blood pressure reading?",
    options: [
      "Below 120/80",
      "120/80 - 139/89",
      "140/90 - 159/99",
      "160/100 or above",
      "Don't know",
    ],
  },
  {
    id: 9,
    text: "Are you currently taking any medication for hypertension?",
    options: ["Yes", "No"],
  },
  {
    id: 10,
    text: "Based on your responses, it seems like you have Hypertension Stage 2. Please consult a doctor for further guidance.",
    options: ["Understood"],
  },
  {
    id: 11,
    text: "Thank you for providing your information! We will use it to guide you better.",
    options: ["Processed"],
  },
];

export default function HealthBot() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [responses, setResponses] = useState<{ [key: number]: string }>({});

  const handleResponse = (option: string) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [questions[currentStep].id]: option,
    }));
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center p-4 h-[100vh]">
      {currentStep < questions.length - 1 ? (
        <Card className="w-full max-w-md p-4">
          <p className="text-lg font-semibold">{questions[currentStep].text}</p>
          <div className="mt-4 flex flex-col gap-2">
            {questions[currentStep].options.map((option) => (
              <Button
                key={option}
                onClick={() => handleResponse(option)}
                color="primary"
                variant="solid"
              >
                {option}
              </Button>
            ))}
          </div>
        </Card>
      ) : (
        <Card className="w-full max-w-md p-4">
          <p className="text-lg font-semibold">
            🏥 <strong>Health Summary Report</strong> 🏥
          </p>
          <ul className="mt-4 space-y-2">
            <li>
              <strong>🕒 Age Group:</strong> {responses[2] || "Not provided"}
            </li>
            <li>
              <strong>🚻 Gender:</strong> {responses[3] || "Not provided"}
            </li>
            <li>
              <strong>🩺 Medical Conditions:</strong>{" "}
              {responses[4] || "Not provided"}
            </li>
            <li>
              <strong>🚬 Smoking/Alcohol Consumption:</strong>{" "}
              {responses[5] || "Not provided"}
            </li>
            <li>
              <strong>🤒 Symptoms:</strong> {responses[6] || "Not provided"}
            </li>
            <li>
              <strong>📊 Blood Pressure Monitoring:</strong>{" "}
              {responses[7] || "Not provided"}
            </li>
            <li>
              <strong>💓 Last BP Reading:</strong>{" "}
              {responses[8] || "Not provided"}
            </li>
            <li>
              <strong>💊 Hypertension Medication:</strong>{" "}
              {responses[9] || "Not provided"}
            </li>
          </ul>
          <p className="text-lg font-semibold mt-4">
            🔔 <strong>Recommendation:</strong>{" "}
            {responses[10] === "Understood"
              ? "Consult a doctor for further guidance."
              : "Monitor your health regularly."}
          </p>
          <p className="text-lg font-semibold mt-4">
            🏥 Stay healthy and take care! 💙
          </p>
        </Card>
      )}
    </div>
  );
}
