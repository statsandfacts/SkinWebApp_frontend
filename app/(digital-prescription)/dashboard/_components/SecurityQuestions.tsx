'use client';
import React, { useState } from 'react';

const SecurityQuestion = () => {
  const questions = [
    "What is the first name of your best friend in high school?",
    "What was the name of your first pet?",
    "What was the first thing you learned to cook?",
    "What was the first film you saw in a theater?",
    "Where did you go the first time you flew on a plane?"
  ];

  const [answers, setAnswers] = useState(Array(5).fill(''));
  const [error, setError] = useState('');

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const answeredCount = answers.filter(answer => answer.trim() !== '').length;
    if (answeredCount < 3) {
        setError('Please provide answers to at least 3 security questions.');
        return;
      }
  
      setError('Your answers have been submitted!');
    };

  return (
    <div className="min-h-screen p-10">
      {/* Header Section */}
      <div className="mb-10">
        <h2 className="text-4xl font-semibold mb-4">Security Questions</h2>
        <p className="text-gray-600">Select a security question or create one of your own. This question will help us verify your identity should you forget your password.</p>
      </div>

      {/* Form Section */}
      <div className="flex flex-col justify-center p-10 ">
        <form onSubmit={handleSubmit}>
          {questions.map((question, index) => (
            <div key={index} className="mb-6">
              <label className="block font-medium mb-2">{question}</label>
              <input
                type="text"
                value={answers[index]}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your answer here"
              />
            </div>
          ))}

          <button 
            type="submit" 
            className="w-full bg-primary-600 text-white px-8 py-4 rounded-md hover:bg-primary-600 "
            
          >
            Submit
          </button>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default SecurityQuestion;
