"use client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import {
  setMultipleQuestions,
  setMultipleQuestionsCompleted,
} from "@/redux/slices/symptomBot.slice";
import QuestionRenderer from "./QuestionRenderer";
import { useAuthInfo } from "@/hooks/useAuthInfo";
import { getQuestion, goBack } from "@/services/api.symptombot.service";

interface MultipleQuestionProps {
  setSymptomData: (data: any) => void;
}

export default function MultipleQuestion({
  setSymptomData,
}: MultipleQuestionProps) {
  const dispatch = useDispatch();

  const multipleQuestions = useSelector(
    (state: RootState) => state.symptomBot.multipleQuestions
  );
  const userId = useAuthInfo();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleAnswer = (answer: string, index: number) => {
    console.log("mlqa");
    const currentQuestion = multipleQuestions[index];

    const payload = {
      user_id: userId?.userId,
      question_id: currentQuestion.id,
      answer: answer,
    };

    // This triggers BotTestPage's useEffect
    setSymptomData(payload);

    // Advance the index locally for the UI
    if (
      index === currentQuestionIndex &&
      index < multipleQuestions.length - 1
    ) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }

    if (index === multipleQuestions.length - 1) {
      console.log("All multiple questions answered!");
    }
  };

  // ✅ Go back to the previous question
  const handleBackClick = async () => {
    try {
      const response = await goBack({ user_id: userId?.userId });

      if (response?.multiple_questions) {
        dispatch(setMultipleQuestions(response.multiple_questions));
      }

      if (currentQuestionIndex > 0) {
        setCurrentQuestionIndex((prev) => prev - 1);
      }

      console.log("API response for goBack:", response);
    } catch (error) {
      console.error("Error in handleBackClick:", error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      {multipleQuestions.map((question: any, index: number) => (
        <div
          key={question.id}
          className={`border p-4 rounded shadow ${
            index <= currentQuestionIndex
              ? "bg-white"
              : "bg-gray-200 opacity-50 pointer-events-none"
          }`}
        >
          <p className="mb-4 font-semibold">{question.associated_symptom}</p>
          <p className="mb-4 font-semibold">{question.scenario}</p>
          <p className="mb-4 font-semibold">Bot {question.question}</p>

          <QuestionRenderer
            question={question}
            setAnswersField={(answerData: any) => {
              handleAnswer(answerData.answer, index);
            }}
            userID={userId}
            setquestion={() => {}} // Optional
          />
        </div>
      ))}
    </div>
  );
}
