"use client";
import {
  Apple,
  Activity,
  Dumbbell,
  Sunrise,
  Sparkles,
  HeartPulse,
  SearchCheck,
  ClipboardCheck,
  Target,
} from "lucide-react";
import React from "react";

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
    <div className="ml-6 mt-6 ">
      <h2 className="text-xl w-full flex justify-center items-center font-bold text-primary ">
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
                Icon={Apple}
              />
            )}

            {group.exercise_suggestions && (
              <SLRInsightCard
                title="Exercise Suggestions"
                description={group.exercise_suggestions}
                Icon={Dumbbell}
              />
            )}

            {group.lifestyle_changes && (
              <SLRInsightCard
                title="Lifestyle Changes"
                description={group.lifestyle_changes}
                Icon={HeartPulse}
              />
            )}

            {/* Follow-Up */}
            {/* {group.follow_up && (
              <div>
                <h3 className="text-lg font-semibold">
                  🔍 When to Seek Follow-Up
                </h3>
                <p className="mt-2 text-gray-700">{group.follow_up}</p>
              </div>
            )} */}
            {group.follow_up && (
              <SLRInsightCard
                title="When to Seek Follow-Up"
                description={group.follow_up}
                Icon={SearchCheck}
              />
            )}

            {group.next_steps && (
              <SLRInsightCard
                title="Your Next Steps"
                description={group.next_steps}
                Icon={ClipboardCheck}
              />
            )}

            {group.target_health_goals && (
              <SLRInsightCard
                title="Target Health Goals"
                description={group.target_health_goals}
                Icon={Target}
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
  Icon: React.ElementType;
};

const SLRInsightCard: React.FC<SLRInsightCardProps> = ({
  title,
  description,
  Icon,
}) => {
  return (
    <div className="flex gap-1 flex-col items-center justify-center text-center max-w-xs shadow-md rounded-md p-1 shadow-primary-50">
      <div className="rounded-full bg-blue-100 p-2 w-16 h-16 flex items-center justify-center shadow-md overflow-hidden relative">
        <Icon className="text-orange-400 h-6 w-6" />
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="font-light text-sm text-gray-700 text-left">
        {description}
      </p>
    </div>
  );
};
