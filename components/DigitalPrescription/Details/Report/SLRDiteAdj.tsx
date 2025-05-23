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

const groupImages: { [key: string]: string } = {
  Hemogram: "/smartlabreports/group_haemogram.png",
  "Lipid Profile": "/smartlabreports/group_lipidprofile.png",
  "Renal Function Test": "/smartlabreports/group_renalfunction.png",
  "Liver Function Test": "/smartlabreports/group_liverfunction.png",
  "Vitamins and Nutritional Profile": "/smartlabreports/group_vitaminsprofile.png",
  "Urine Analysis Profile": "/smartlabreports/group_urineanalysis.png",
  "Hormone Profile in a Male": "/smartlabreports/group_hermonalprofilemale.png",
  "Hormone Profile in a Female": "/smartlabreports/group_hermonalprofilefemail.png",
};

export default function SLRDiteAdj({ data }: Props) {
  return (
    <div className="ml-6 mt-6">
      <h2 className="text-xl w-full flex justify-center items-center font-bold text-primary">
        Health Plan & Adjustments
      </h2>
      {data.map((group, index) => (
        <div key={index} className="space-y-6 mb-3">
          <div className="flex items-center gap-2">
            <Image
              src={
                groupImages[group.group_name] ||
                "/smartlabreports/default-group.png"
              }
              alt={group.group_name}
              width={32}
              height={32}
              className="rounded-md"
            />
            <h1 className="text-lg font-bold text-gray-900  ">
              {group.group_name}
            </h1>
          </div>

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
  imagePath?: string;
};

const SLRInsightCard: React.FC<SLRInsightCardProps> = ({
  title,
  description,
  imagePath,
}) => {
  return (
    <div className="flex gap-1 flex-col items-center justify-start text-center max-w-xs shadow-md rounded-md p-1 shadow-primary-50">
      {description && (
        <>
          <div className="rounded-full bg-primary-lite p-2 w-16 h-16 flex items-center justify-center shadow-md shadow-primary-lite overflow-hidden relative">
            {imagePath && (
              <Image
                src={imagePath}
                alt={title}
                width={200}
                height={200}
                className="object-contain"
              />
            )}
          </div>
          <h3 className="text-lg font-semibold text-primary">{title}</h3>
        </>
      )}
      <p className="font-light text-sm text-gray-700 text-center">
        {description}
      </p>
    </div>
  );
};
