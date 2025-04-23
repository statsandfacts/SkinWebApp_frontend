"use client";

import { getSecurityQuestions } from "@/services/api.digitalPrescription.service";
import React, { useState, useEffect } from "react";
import { useAuthInfo } from "@/hooks/useAuthInfo";
import { Save, Pencil } from "lucide-react";
import { securityAnswer } from "@/services/api.digitalPrescription.service";
import { toast } from "react-toastify";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";

const SecurityQuestion = () => {
  const { userId } = useAuthInfo();

  const [questions, setQuestions] = useState<
    { question_id: number; question: string; answer_hash?: string }[]
  >([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, [userId]);

  const fetchQuestions = async () => {
    if (!userId) {
      setError("User ID is missing.");
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const data = await getSecurityQuestions(userId);
      if (data && data.length > 0) {
        setQuestions(data);
      } else {
        setQuestions([]);
      }
    } catch (error) {
      setError("Failed to load security questions.");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (index: number, value: string) => {
    setQuestions((prev) =>
      prev.map((q, i) => (i === index ? { ...q, answer_hash: value } : q))
    );
  };

  const handleSaveAnswer = async (q: any) => {
    if (q?.is_answer) {
      toast.warning("Working on progress");
      return;
    }
    if (!q.answer_hash) {
      toast.error("Please enter an answer before saving.");
      return;
    }
    securityAnswer({
      user_id: userId,
      question_id: q.question_id,
      answer_hash: q.answer_hash,
    })
      .then((res) => {
        toast.success(`Answer saved successfully!`);
        fetchQuestions();
      })
      .catch((error) => {
        toast.error(
          error?.response?.data?.message ||
            "Failed to save answer. Please try again."
        );
      });
  };

  return (
    <div className="flex justify-center items-center mt-6">
      <div className="flex flex-col justify-center items-center max-w-7xl">
        <h2 className="text-4xl font-semibold mb-4">Security Questions</h2>
        <p className="text-gray-600">
          Answer these security questions to verify your identity.
        </p>

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
                  className="flex mb-4 items-center justify-center"
                >
                  <div className="flex-grow">
                    <div className="flex gap-2 justify-between items-center mb-2">
                      <label className="block font-medium ">
                        {question.question}
                      </label>
                      {!question?.is_answer && (
                        <Button
                          isIconOnly
                          onClick={() => handleSaveAnswer(question)}
                          color={question?.is_answer ? "warning" : "primary"}
                        >
                          {question?.is_answer ? (
                            <>
                              {/* <Pencil size={20} className="text-white" /> */}
                            </>
                          ) : (
                            <Save size={20} className="text-white" />
                          )}
                        </Button>
                      )}
                    </div>

                    <Input
                      type="text"
                      disabled={question?.is_answer}
                      value={
                        question?.is_answer
                          ? "*".repeat(
                              Math.min(
                                10,
                                Math.max(5, question?.answer_hash?.length || 0)
                              )
                            )
                          : question?.answer_hash || ""
                      }
                      onChange={(e) =>
                        handleAnswerChange(index, e.target.value)
                      }
                      placeholder="Enter your answer here"
                    />
                  </div>
                </div>
              ))
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SecurityQuestion;
