"use client";
import React from "react";

const SymptomBotDtls = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-8">
      <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-700">
        🤖 Interactive Symptoms Bot
      </h1>
      <p className="text-xl text-gray-600 font-medium">
        Smarter Conversations. Better Health.
      </p>

      <p className="text-md text-gray-700 max-w-2xl mx-auto">
        Meet your soon-to-launch digital health assistant — <br />
        an intelligent, conversational bot designed to understand your symptoms
        and guide you toward better decisions.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 text-left">
        <div className="flex items-start space-x-3 bg-blue-50 p-4 rounded-xl shadow-sm">
          <span className="text-2xl">💬</span>
          <p className="font-semibold text-blue-900">
            Conversational Interface
          </p>
        </div>
        <div className="flex items-start space-x-3 bg-green-50 p-4 rounded-xl shadow-sm">
          <span className="text-2xl">🧠</span>
          <p className="font-semibold text-green-900">Smart Symptom Checker</p>
        </div>
        <div className="flex items-start space-x-3 bg-yellow-50 p-4 rounded-xl shadow-sm">
          <span className="text-2xl">📚</span>
          <p className="font-semibold text-yellow-700">
            Guided, User-Friendly Flow
          </p>
        </div>
        <div className="flex items-start space-x-3 bg-purple-50 p-4 rounded-xl shadow-sm">
          <span className="text-2xl">⚙</span>
          <p className="font-semibold text-purple-900">
            AI-Powered, Personalized Responses
          </p>
        </div>
      </div>

      <div className="pt-8">
        <p className="text-lg font-semibold text-red-600 animate-pulse">
          🛠 In Progress – Launching Soon!
        </p>
        <p className="text-gray-600">
          We’re building something powerful — a smart, empathetic health
          companion that’s always ready to talk.
          <br />
          <span className="font-medium text-gray-800">
            Stay tuned — the future of self-assessment is just around the
            corner!
          </span>
        </p>
      </div>
    </div>
  );
};

export default SymptomBotDtls;
