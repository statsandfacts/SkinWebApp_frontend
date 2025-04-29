"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Option {
  label: string;
  value: string;
  is_correct_answer: boolean;
}

interface Question {
  question: string;
  correctAnswer?: string; // optional fallback
  options: Option[];
}

const QuizClient = ({ questions }: { questions: Question[] }) => {
  const [answers, setAnswers] = useState(Array(questions.length).fill(""));
  const router = useRouter();

  const handleOptionChange = (index: number, option: string) => {
    const updated = [...answers];
    updated[index] = option;
    setAnswers(updated);
  };

  const handleSubmit = () => {
    let correct = 0;

    questions.forEach((q, i) => {
      const selected = answers[i];
      const correctOption = q.options.find((opt) => opt.is_correct_answer);
      if (selected === correctOption?.value) {
        correct++;
      }
    });

    const incorrect = questions.length - correct;
    router.push(`/blog/quize/result?correct=${correct}&incorrect=${incorrect}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {questions.map((q, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-lg p-4 mb-6 border border-gray-200"
        >
          <p className="font-semibold text-lg mb-2">
            Q{index + 1}. {q.question}
          </p>
          <div className="space-y-2">
            {q.options.map((option, i) => (
              <label
                key={i}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={option.value}
                  checked={answers[index] === option.value}
                  onChange={() => handleOptionChange(index, option.value)}
                  className="form-radio text-blue-600"
                />
                <span>{option.label}: {option.value}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
      <div className="text-right">
        <button
          onClick={handleSubmit}
          className="bg-primary text-white px-6 py-3 rounded-lg"
        >
          Submit Quiz
        </button>
      </div>
    </div>
  );
};

export default QuizClient;
