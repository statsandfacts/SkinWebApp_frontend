"use client";
import React from "react";

// Interface for educational insights
interface EducationalInsight {
  group_name: string;
  what_is: string;
  why_it_matters: string;
  myth_buster: string;
  critical_alert: string;
  reminder: string;
}

type Props = {
  data: EducationalInsight[];
};

export default function SLREduIn({ data }: Props) {
  return (
    <div className="ml-6 mt-6 space-y-10">
      <h2 className="text-2xl text-sky-800 font-bold">
        🧠 Educational Insights
      </h2>

      {data.map((item, index) => (
        <div
          key={index}
          className="p-4 rounded-md bg-white shadow-sm space-y-6"
        >
          <h1 className="text-lg font-bold text-gray-900 bg-gray-100 inline-block px-3 py-1 rounded-md shadow-sm">
            📂 {item.group_name}
          </h1>
          {/* Group Name */}
          <div>
            <h3 className="text-xl font-semibold text-blue-800">
              🧪 What Is a {item.group_name}?
            </h3>
            {item.what_is && (
              <p className="mt-2 whitespace-pre-line">{item.what_is}</p>
            )}
          </div>

          {/* Why It Matters */}
          <div>
            <h3 className="text-xl font-semibold text-green-700">
              ❤️ Why It Matters
            </h3>
            {item.why_it_matters && (
              <p className="mt-2 whitespace-pre-line">{item.why_it_matters}</p>
            )}
          </div>

          {/* Myth Buster */}
          <div>
            <h3 className="text-xl font-semibold text-purple-700">
              🧯 Myth Buster
            </h3>
            {item.myth_buster && (
              <p className="mt-2 whitespace-pre-line">{item.myth_buster}</p>
            )}
          </div>

          {/* Alerts & Notifications */}
          <div>
            <h3 className="text-xl font-semibold text-red-700">
              🚨 Alerts & Notifications
            </h3>

            {/* Critical Alert */}
            <div className="mt-3">
              <h4 className="text-lg font-semibold">
                🩺 Critical Alert – Seek Medical Attention If:
              </h4>
              {item.critical_alert && (
                <p className="mt-1 whitespace-pre-line">
                  {item.critical_alert}
                </p>
              )}
            </div>

            {/* Reminder */}
            <div className="mt-4">
              <h4 className="text-lg font-semibold">🔔 Reminders</h4>
              {item.reminder && (
                <p className="mt-1 whitespace-pre-line">{item.reminder}</p>
              )}
            </div>
          </div>

          <hr className="border-gray-300 mt-6" />
        </div>
      ))}
    </div>
  );
}
