"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const questions = [
  {
    question: "What is the capital of India?",
    options: ["Mumbai", "Delhi", "Chennai", "Kolkata"],
    correctAnswer: "Delhi",
  },
  {
    question: "What is the chemical symbol for water?",
    options: ["O2", "H2O", "CO2", "HO2"],
    correctAnswer: "H2O",
  },
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    correctAnswer: "JavaScript",
  },
  {
    question: "Who is the founder of Microsoft?",
    options: ["Steve Jobs", "Elon Musk", "Bill Gates", "Mark Zuckerberg"],
    correctAnswer: "Bill Gates",
  },
  {
    question: "What is the largest planet in our solar system?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Jupiter",
  },
  {
    question: "Which country is known as the Land of the Rising Sun?",
    options: ["India", "China", "Japan", "Thailand"],
    correctAnswer: "Japan",
  },
  {
    question: "Which organ purifies our blood?",
    options: ["Heart", "Liver", "Kidney", "Lungs"],
    correctAnswer: "Kidney",
  },
  {
    question: "Which of the following is not a programming language?",
    options: ["HTML", "Python", "Java", "C++"],
    correctAnswer: "HTML",
  },
  {
    question: "How many continents are there on Earth?",
    options: ["5", "6", "7", "8"],
    correctAnswer: "7",
  },
  {
    question: "What gas do plants absorb from the atmosphere?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
    correctAnswer: "Carbon Dioxide",
  },
];

const QuizClient = () => {
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
      if (answers[i] === q.correctAnswer) correct++;
    });

    const incorrect = questions.length - correct;

    
    router.push(`/quize/result?correct=${correct}&incorrect=${incorrect}`);
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
              <label key={i} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={option}
                  checked={answers[index] === option}
                  onChange={() => handleOptionChange(index, option)}
                  className="form-radio text-blue-600"
                />
                <span>{option}</span>
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
