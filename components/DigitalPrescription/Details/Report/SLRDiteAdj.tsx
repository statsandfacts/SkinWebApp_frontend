"use client";
import React from "react";
import Image from "next/image";

type GroupData = {
  group_name: string;
  dietary_adjustments: string;
  exercise_suggestions: string;
  lifestyle_changes: string;
  follow_up: string;
  next_steps: string;
  target_health_goals: string;
};

type Props = {
  data: GroupData[];
};

export default function SLRDiteAdj({ data }: Props) {
  return (
    <div className="ml-6 mt-6">
      <h2 className="text-xl w-full flex justify-center items-center font-bold text-primary">
        🥑 Health Plan & Adjustments
      </h2>
      {data.map((group, index) => (
        <div key={index} className="space-y-6 mb-3">
          <h1 className="text-lg font-bold text-gray-900 bg-gray-100 inline-block px-3 py-1 rounded-md shadow-sm">
            📂 {group.group_name}
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {group.dietary_adjustments && (
              <SLRInsightCard
                title="Dietary Adjustments"
                description={group.dietary_adjustments}
                imagePath="/smartlabreports/dietaryadjustments.png"
              />
            )}

            {group.exercise_suggestions && (
              <SLRInsightCard
                title="Exercise Suggestions"
                description={group.exercise_suggestions}
                imagePath="/smartlabreports/exercisesuggestions.png"
              />
            )}

            {group.lifestyle_changes && (
              <SLRInsightCard
                title="Lifestyle Changes"
                description={group.lifestyle_changes}
                imagePath="/smartlabreports/lifestylechanges.png"
              />
            )}

            {group.follow_up && (
              <SLRInsightCard
                title="When to Seek Follow-Up"
                description={group.follow_up}
                imagePath="/smartlabreports/whentoseekfollow-up.png"
              />
            )}

            {group.next_steps && (
              <SLRInsightCard
                title="Your Next Steps"
                description={group.next_steps}
                imagePath="/smartlabreports/yournextsteps.png"
              />
            )}

            {group.target_health_goals && (
              <SLRInsightCard
                title="Target Health Goals"
                description={group.target_health_goals}
                imagePath="/smartlabreports/targethealthgoals.png"
              />
            )}
          </div>
          <hr className="border-gray-300 mt-6" />
        </div>
      ))}
    </div>
  );
}

type SLRInsightCardProps = {
  title: string;
  description: string;
  Icon?: React.ElementType;
  imagePath?: string;
};

const SLRInsightCard: React.FC<SLRInsightCardProps> = ({
  title,
  description,
  Icon,
  imagePath,
}) => {
  return (
    <div className="flex gap-1 flex-col items-center justify-center text-center max-w-xs shadow-md rounded-md p-1 shadow-primary-50">
      <div className="rounded-full bg-blue-100 p-2 w-16 h-16 flex items-center justify-center shadow-md overflow-hidden relative">
        {imagePath ? (
          <Image
            src={imagePath}
            alt={title}
            width={200}
            height={200}
            className="object-contain"
          />
        ) : (
          Icon && <Icon className="text-orange-400 h-6 w-6" />
        )}
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="font-light text-sm text-gray-700 text-left">{description}</p>
    </div>
  );
};
