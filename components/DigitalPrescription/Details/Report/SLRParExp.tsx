"use client";
import React, { useState } from "react";
import Image from "next/image";
import { CheckCircle } from "lucide-react";


type SmartLabItem = {
  parameter_subg_name: string;
  parameter_classification: string;
  what_is_the_test: string;
  how_is_it_performed: string;
  normal_levels: string;
  causes_count: string;
  causes_effect: string;
  prevention: string;
  diet_dos: string;
  diet_donts: string;
};

type Props = {
  data: SmartLabItem[];
};

export default function SLRParExp({ data }: Props) {
  const classificationStyles: Record<string, { bg: string; text: string }> = {
    normal: { bg: "bg-green-600", text: "text-green-600" },
    high_borderline: { bg: "bg-yellow-400", text: "text-yellow-400" },
    low_borderline: { bg: "bg-yellow-400", text: "text-yellow-400" },
    high_abnormal: { bg: "bg-[#e85852]", text: "text-[#e85852]" },
    low_abnormal: { bg: "bg-[#e85852]", text: "text-[#e85852]" },
    high_very_abnormal: { bg: "bg-[#9f2b00]", text: "text-[#9f2b00]" },
    low_very_abnormal: { bg: "bg-[#9f2b00]", text: "text-[#9f2b00]" },
  };

  return (
    <div className="pt-4 px-4 md:px-10">
      <h2 className="text-3xl font-extrabold text-center text-primary mb-1">
         Detailed Parameter Insights
      </h2>
      <p className="text-xl text-center text-gray-500 mb-10">
        Understand what each test means, why it matters, and what to do next.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((item, index) => {
          const styles = classificationStyles[
            item.parameter_classification
          ] || {
            bg: "bg-gray-300",
            text: "text-gray-600",
          };

          return (
            <div
              key={index}
              className="border border-gray-200 p-6 rounded-xl shadow-md bg-white hover:shadow-lg transition-all duration-300"
            >

              {/* Parameter Name */}
              <h3 className="text-lg font-bold text-sky-800 mb-4">
                {item.parameter_subg_name || "Unknown Parameter"}
              </h3>
              {/* Status */}
              <div className="flex items-center text-lg font-medium text-primary gap-2 mb-2">
                <span>Status:</span>
                <span className={`h-3 w-3 rounded-full ${styles.bg}`}></span>
                <span className={`capitalize ${styles.text}`}>
                  {item?.parameter_classification?.replaceAll("_", " ") ||
                    "N/A"}
                </span>
              </div>

              

              {/* Section Blocks */}
              <Sections item={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Sections({ item }: { item: SmartLabItem }) {
  const [showAll, setShowAll] = useState(false);

  const sections = [
    {
      icon: "/smartlabreports/whatisthetest.png",
      title: "What is the Test?",
      content: item.what_is_the_test,
    },
    {
      icon: "/smartlabreports/howisitperformed.png",
      title: "How is it Performed?",
      content: item.how_is_it_performed,
    },
    item.parameter_classification === "normal" &&
      item.normal_levels && {
        icon: <CheckCircle className="text-green-600 w-5 h-5 " />, 
        title: "Normal Levels",
        content: item.normal_levels,
      },
    item.causes_count && {
      icon: "/smartlabreports/causes.png",
      title: "Causes (Count)",
      content: item.causes_count,
    },
    item.causes_effect && {
      icon: "/smartlabreports/effects.png",
      title: "Causes Effect",
      content: item.causes_effect,
    },
    item.prevention && {
      icon: "/smartlabreports/prevention.png",
      title: "Prevention",
      content: item.prevention,
    },
    {
      icon: "/smartlabreports/diet-dos.png",
      title: "Diet - Dos",
      content: item.diet_dos,
    },
    {
      icon: "/smartlabreports/dont-dos.png",
      title: "Diet - Don'ts",
      content: item.diet_donts,
    },
  ].filter(Boolean);

  return (
    <div className="space-y-4 text-gray-700 text-sm leading-relaxed">
      {/* Render the first 3 sections by default */}
      {sections.slice(0, 2).map((section: any, index: number) => (
        <Section key={index} content={section.content} title={section?.title} icon={section?.icon}/>
      ))}

      {/* Conditionally render remaining sections if "View More" is clicked */}
      {showAll &&
        sections
          .slice(2)
          .map((section: any, index: number) => (
            <Section
              key={index + 2}
              content={section.content}
              title={section?.title}
              icon={section?.icon}
            />
          ))}

      {/* Toggle Button for additional sections */}
      {sections.length > 2 && (
        <button
          onClick={() => setShowAll((prev) => !prev)}
          className="text-sky-700 hover:underline mt-4"
        >
          {showAll ? "Show Less" : "View More"}
        </button>
      )}
    </div>
  );
}

// Reusable Section Component
function Section({
  title,
  content,
  icon,
}: {
  title: string;
  content: string;
  icon?: string | React.ReactNode;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const truncateContent = content ? content.length > 80 : false;
  const displayedContent =
    isExpanded || !truncateContent ? content : content.slice(0, 80) + "...";

  const hasDisplayContent = !!displayedContent?.trim();

  return (
    <>
      {hasDisplayContent && (
        <div className={`border-l-4 border-slate-200 pl-3 py-2 rounded-md bg-blue-50`}>
          {/* Only render icon + title if content exists */}
          <div className="flex items-center mb-1 gap-2">
            {typeof icon === "string" ? (
              <Image src={icon} alt={title} width={30} height={30} />
            ) : (
              icon
            )}
            <h4 className="font-semibold text-lg text-slate-700">{title}</h4>
          </div>

          <p className="text-gray-700 text-sm">
            <span
              className={`${isExpanded ? "cursor-default" : "cursor-pointer"}`}
              onClick={() => setIsExpanded((prev) => !prev)}
            >
              {displayedContent}
            </span>
          </p>
        </div>
      )}
    </>
  );
}
