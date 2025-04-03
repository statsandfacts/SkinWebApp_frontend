"use client";

import { getSecurityQuestions } from "@/services/api.digitalPrescription.service";
import React, { useState, useEffect } from "react";
import { useAuthInfo } from "@/hooks/useAuthInfo";
import { Save, Pencil } from "lucide-react";
import { securityAnswer } from "@/services/api.digitalPrescription.service";
import { toast } from "react-toastify";

const SecurityQuestion = () => {
  const [questions, setQuestions] = useState<
    { question_id: number; question: string; answer_hash?: string }[]
  >([]);
  const [editableQuestions, setEditableQuestions] = useState<{
    [key: number]: boolean;
  }>({}); 
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { userId } = useAuthInfo();

  useEffect(() => {
    const fetchQuestions = async () => {
      if (!userId) {
        setError("User ID is missing.");
        setLoading(false);
        return;
      }

      try {
        const data = await getSecurityQuestions(userId);
        console.log("Fetched Questions:", data);

        if (data && data.length > 0) {
          setQuestions(data);
        } else {
          setQuestions([]);
        }
      } catch (error) {
        console.error("Error fetching security questions:", error);
        setError("Failed to load security questions.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [userId]);

  const handleAnswerChange = (index: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [index]: value }));
  };

  const handleSaveAnswer = async (index: number) => {
    if (!answers[index] || answers[index].trim() === "") {
      toast.error("Please enter an answer before saving.");
      return;
    }

    try {
      const payload = {
        user_id: userId,
        question_id: questions[index]?.question_id,
        answer_hash: answers[index] || "",
      };

      console.log("Sending payload:", payload);

      const response = await securityAnswer(payload);
      console.log("Answer saved successfully:", response);

      toast.success(`Answer saved successfully!`);

      // Disable the input field after saving
      setEditableQuestions((prev) => ({ ...prev, [index]: false }));
    } catch (error) {
      console.error("Error saving answer:", error);
      toast.error("Failed to save answer. Please try again.");
    }
  };

  const handleEditClick = (index: number) => {
    setEditableQuestions((prev) => ({ ...prev, [index]: true })); 
  };
  return (
    <div className="min-h-screen p-10">
      {/* Header Section */}
      <div className="mb-10">
        <h2 className="text-4xl font-semibold mb-4">Security Questions</h2>
        <p className="text-gray-600">
          Answer these security questions to verify your identity.
        </p>
      </div>

      {/* Form Section */}
      <div className="flex flex-col justify-center p-10">
        <form>
          {loading ? (
            <p>Loading security questions...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            questions.map((question: any, index: number) => (
              <div
                key={index}
                className="mb-10 flex items-center justify-center"
              >
                <div className="flex-grow">
                  <label className="block font-medium mb-5">
                    {question.question}
                  </label>
                  <input
                    type="text"
                    disabled={!editableQuestions[index]}
                    value={answers[index] || ""}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your answer here"
                  />
                </div>
                {/* Save Icon Button */}
                <button
                  type="button"
                  className="justify-center mb-20 mr-20 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                  onClick={() =>
                    !editableQuestions[index]
                      ? handleEditClick(index)
                      : handleSaveAnswer(index)
                  }
                >
                  {!editableQuestions[index] ? (
                    <Pencil size={20} />
                  ) : (
                    <Save size={20} />
                  )}
                </button>
                {/* <button
                  type="button"
                  className="justify-center mb-20 mr-20 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                  onClick={() => handleSaveAnswer(index)}
                >
                  <Save size={20} />
                </button> */}
              </div>
            ))
          )}
        </form>
      </div>
    </div>
  );
};

export default SecurityQuestion;
