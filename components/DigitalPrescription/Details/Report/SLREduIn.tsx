"use client";
import React, { useState } from "react";
import Image from "next/image";

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
  imagePath,
}: {
  title: string;
  content?: string;
  className: string;
  imagePath?: string;
}) =>
  content ? (
    <div className="flex items-start gap-2">
      {/* Render image if imagePath is provided */}
      {imagePath && (
        <Image
          src={imagePath}
          alt={title}
          width={40}
          height={40}
          className="mb-4"
        />
      )}
      <div>
        <h3 className={`text-lg font-semibold ${className}`}>{title}</h3>
        <p className="mt-2 whitespace-pre-line text-xl font-light  ">
          {content}
        </p>
      </div>
    </div>
  ) : null;

export default function SLREduIn({ data }: Props) {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  const groupImages: { [key: string]: string } = {
    Hemogram: "/smartlabreports/haemogram.png",
    "Lipid Profile": "/smartlabreports/lipidprofilenew.png",
    "Renal Function Test": "/smartlabreports/kidneyfunctionnew.png",
    "Liver Function Test": "/smartlabreports/liverfunctionnew.png",
    "Vitamins and Nutritional Profile": "/smartlabreports/vitaminsprofile.png",
    "Urine Analysis Profile": "/smartlabreports/urineanalysisnew.png",
    "Hormone Profile in a Male": "/smartlabreports/hermonalmale.png",
    "Hormone Profile in a Female": "/smartlabreports/hermonalfemail.png",
  };
  


  const toggleExpanded = (index: number) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="ml-6 mt-6">
      <h2 className="text-2xl w-full flex justify-center items-center font-bold text-primary">
       Educational Insights
      </h2>

      {data.map((item, index) => (
        <div
          key={index}
          className="p-4 rounded-md bg-white shadow-sm space-y-2"
        >
          {/* <h1 className="text-lg font-bold text-gray-900 bg-gray-100 inline-block px-3 py-1 rounded-md shadow-sm">
            {item.group_name}
          </h1> */}
          <div className="flex items-center gap-2 px-3 py-1 ">
  <Image
    src={groupImages[item.group_name] || "/smartlabreports/default-group.png"}
    alt={item.group_name}
    width={32}
    height={32}
    className="rounded-md"
  />
  <h1 className="text-lg font-bold text-gray-900">
    {item.group_name}
  </h1>
</div>


          {/* Use images in InsightSection */}
          <InsightSection
            title={`What Is a ${item.group_name}?`}
            content={item.what_is}
            className="text-blue-800 text-5xl font-bold"
            imagePath="/smartlabreports/whatishaemogram.png" // Example image path
          />

          <InsightSection
            title="Why It Matters"
            content={item.why_it_matters}
            className="text-green-700 text-xl"
            imagePath="/smartlabreports/whyItmatters.png" // Example image path
          />

          <div className="relative">
            {/* Show extra content if expanded */}
            {expanded[index] && (
              <>
                <InsightSection
                  title="Myth Buster"
                  content={item.myth_buster}
                  className="text-purple-700 text-xl"
                  imagePath="/smartlabreports/mythbuster.png" // Example image path
                />
                <InsightSection
                  title="Critical Alert – Seek Medical Attention If:"
                  content={item.critical_alert}
                  className="text-red-600 text-xl"
                  imagePath="/smartlabreports/whatishaemogram.png" // Example image path
                />
                <InsightSection
                  title="Reminders"
                  content={item.reminder}
                  className="text-sky-700 text-xl mt-4 " 
                  imagePath="/smartlabreports/reminders.png" // Example image path
                />
              </>
            )}

            {/* Toggle for more content */}
            {(item.critical_alert || item.reminder) && (
              <button
                onClick={() => toggleExpanded(index)}
                className="text-sky-700 hover:text-sky-800"
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
