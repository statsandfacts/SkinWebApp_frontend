"use client";
import React, { useState } from "react";

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

const InsightSection = ({
  title,
  content,
  className,
}: {
  title: string;
  content?: string;
  className: string;
}) =>
  content ? (
    <div>
      <h3 className={`text-lg font-semibold ${className}`}>{title}</h3>
      <p className="mt-2 whitespace-pre-line text-sm font-light">{content}</p>
    </div>
  ) : null;

export default function SLREduIn({ data }: Props) {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  const toggleExpanded = (index: number) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="ml-6 mt-6">
      <h2 className="text-xl w-full flex justify-center items-center font-bold text-primary">
        🧠 Educational Insights
      </h2>

      {data.map((item, index) => (
        <div
          key={index}
          className="p-4 rounded-md bg-white shadow-sm space-y-2"
        >
          <h1 className="text-lg font-bold text-gray-900 bg-gray-100 inline-block px-3 py-1 rounded-md shadow-sm">
            📂 {item.group_name}
          </h1>

          <InsightSection
            title={`🧪 What Is a ${item.group_name}?`}
            content={item.what_is}
            className="text-blue-800"
          />

          <InsightSection
            title="❤️ Why It Matters"
            content={item.why_it_matters}
            className="text-green-700"
          />

          <div className="relative">
            {/* Show extra content if expanded */}
            {expanded[index] && (
              <>
                <InsightSection
                  title="🧯 Myth Buster"
                  content={item.myth_buster}
                  className="text-purple-700"
                />
                <InsightSection
                  title="🩺 Critical Alert – Seek Medical Attention If:"
                  content={item.critical_alert}
                  className="text-red-600 text-lg"
                />
                <InsightSection
                  title="🔔 Reminders"
                  content={item.reminder}
                  className="text-red-600 text-lg mt-4"
                />
              </>
            )}

            {/* Toggle for more content */}
            {(item.critical_alert || item.reminder) && (
              <button
                onClick={() => toggleExpanded(index)}
                className="text-sky-700 hover:text-sky-800 "
              >
                {expanded[index] ? "Show Less" : "Show More"}
              </button>
            )}
          </div>

          <hr className="border-gray-300 mt-6" />
        </div>
      ))}
    </div>
  );
}
