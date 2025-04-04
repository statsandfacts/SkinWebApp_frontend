"use client";
import { RootState } from "@/redux/store";
import {
  getSecurityQuestions,
  verifySecurityAnswer,
} from "@/services/api.digitalPrescription.service";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { ShieldCheck, ShieldX } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const VerifySQ = () => {
  const router = useRouter();
  const [questions, setQuestions] = useState<any>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { securityQuestions } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!securityQuestions?.phone_email) {
      router.push("/auth/reset-password/email-phone");
      return;
    }
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const data = await getSecurityQuestions(null, "8249378573");
      if (Array.isArray(data) && data.length > 0) {
        const mappedData = data.map((item) => ({
          ...item,
          isVerified: false,
          sAns: "",
        }));
        setQuestions(mappedData);
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
    setQuestions((prev: any) =>
      prev.map((q: any, i: number) => (i === index ? { ...q, sAns: value } : q))
    );
  };

  const handleSaveAnswer = (q: any, i: number) => {
    if (!q.sAns) {
      toast.error("Please enter an answer");
      return;
    }
    if (q.isVerified) {
      toast.warning("Answer already verified");
      return;
    }

    verifySecurityAnswer({
      answer: q.sAns,
      question_id: q.question_id,
      phone_no: securityQuestions?.phone_email,
    })
      .then((res) => {
        toast.success("Answer verified successfully");
        setQuestions((prev: any) =>
          prev.map((question: any, index: number) =>
            index === i ? { ...question, isVerified: true } : question
          )
        );
      })
      .catch((error) => {
        const errMsg =
          error?.response?.data?.detail || "Failed to verify answer";
        toast.error(errMsg);
      });
  };

  const ProcessedNext = () => {
    const allVerified = questions.every((q: any) => q.isVerified);
    if (allVerified) {
      router.push("/auth/reset-password");
    } else {
      toast.error("Please verify all answers before proceeding");
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-center p-10">
        {loading ? (
          <p>Loading security questions...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          questions.map((question: any, index: number) => (
            <div key={index} className="flex mb-4 items-center justify-center">
              <div className="flex-grow">
                <div className="flex gap-2 justify-between items-center mb-2">
                  <label className="block font-medium ">
                    {question.question}
                  </label>
                  <Button
                    isIconOnly
                    onClick={() => handleSaveAnswer(question, index)}
                    color={question?.isVerified ? "success" : "danger"}
                  >
                    {question?.isVerified ? (
                      <ShieldCheck className="text-white" />
                    ) : (
                      <ShieldX className="text-white" />
                    )}
                  </Button>
                </div>

                <Input
                  type="text"
                  disabled={question?.isVerified}
                  value={question?.sAns || ""}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                  placeholder="Enter your answer here"
                />
              </div>
            </div>
          ))
        )}

        <Button color="primary" onClick={ProcessedNext}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default VerifySQ;
