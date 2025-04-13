"use client";
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
      <h2 className="text-3xl font-bold text-gray-900 mb-6">
        🥑 Health Plan & Adjustments
      </h2>
      {data.map((group, index) => (
        <div key={index} className="space-y-6 mb-3">
          <h1 className="text-lg font-bold text-gray-900 bg-gray-100 inline-block px-3 py-1 rounded-md shadow-sm">
            📂 {group.group_name}
          </h1>
          {/* Dietary Adjustments */}
          {group.dietary_adjustments && (
            <div>
              <h3 className="text-lg font-semibold">🥗 Dietary Adjustments</h3>
              <p className="mt-2 text-gray-700">{group.dietary_adjustments}</p>
            </div>
          )}

          {/* Exercise Suggestions */}
          {group.exercise_suggestions && (
            <div>
              <h3 className="text-lg font-semibold">🏃 Exercise Suggestions</h3>
              <p className="mt-2 text-gray-700">{group.exercise_suggestions}</p>
            </div>
          )}

          {/* Lifestyle Changes */}
          {group.lifestyle_changes && (
            <div>
              <h3 className="text-lg font-semibold">🌿 Lifestyle Changes</h3>
              <p className="mt-2 text-gray-700">{group.lifestyle_changes}</p>
            </div>
          )}

          {/* Follow-Up */}
          {group.follow_up && (
            <div>
              <h3 className="text-lg font-semibold">
                🔍 When to Seek Follow-Up
              </h3>
              <p className="mt-2 text-gray-700">{group.follow_up}</p>
            </div>
          )}

          {/* Next Steps and Health Goals */}
          {(group.next_steps || group.target_health_goals) && (
            <div className="space-y-4">
              {group.next_steps && (
                <div>
                  <h3 className="text-lg font-semibold">📋 Your Next Steps</h3>
                  <p className="mt-2 text-gray-700">{group.next_steps}</p>
                </div>
              )}
              {group.target_health_goals && (
                <div>
                  <h3 className="text-lg font-semibold">
                    🎯 Target Health Goals
                  </h3>
                  <p className="mt-2 text-gray-700">
                    {group.target_health_goals}
                  </p>
                </div>
              )}
            </div>
          )}
          <hr className="border-gray-300 mt-6" />
        </div>
      ))}
    </div>
  );
}
