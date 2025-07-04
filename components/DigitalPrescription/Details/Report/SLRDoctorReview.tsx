import React, { useMemo } from "react";
import Image from "next/image";
import { useAuthInfo } from "@/hooks/useAuthInfo";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function SLRDoctorReview() {
  const { userDetails } = useAuthInfo();

  const singleReport = useSelector(
    (state: RootState) => state.userDashboard.singleReport
  );

  const score = singleReport.data?.data?.slr_res?.total_health_score ?? 0;

  const radius = 45;
  const circumference = useMemo(() => 2 * Math.PI * radius, []);
  const dashOffset = useMemo(
    () => circumference * (1 - Math.min(Math.max(score, 0), 100) / 100),
    [score, circumference]
  );

  return (
    <>
      <div className="flex items-center justify-between w-full p-3 rounded-2xl shadow-md">
        <div className="flex flex-col">
          <div>
            <span className="font-semibold text-gray-500">Name:</span>{" "}
            <span className="text-blue-600">{userDetails?.name}</span>
          </div>

          <div>
            <span className="font-semibold text-gray-500">Sex:</span>{" "}
            <span className="text-blue-600">{userDetails?.gender}</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Image
            src="/aboutus/swasata.png"
            alt="SS Panda"
            width={60}
            height={60}
            className="rounded-full object-cover"
          />
          <div className="text-xs text-gray-600 text-center">
            <div className="font-medium">SS Panda</div>
            <div className="text-green-600">✔ Reviewed</div>
            <div className="text-gray-400">What is this?</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 md:p-10 rounded-2xl shadow-lg bg-white w-full mt-2">
        {/* Text Content */}
        <div className="text-center md:text-left flex-1">
          <div className="text-xl md:text-2xl font-bold text-gray-800">
            {userDetails?.name}, your health is{" "}
            {score >= 80
              ? "good"
              : score >= 50
              ? "average"
              : "needing attention"}
            .
          </div>
          <div className="text-base md:text-lg text-gray-600 mt-2">
            {score < 100
              ? `Your health score is ${score}%. We have some recommendations for your lifestyle.`
              : "Excellent! You're at peak health."}
          </div>
        </div>

        {/* Circular Progress */}
        <div className="relative w-28 h-28 md:w-32 md:h-32">
          <svg
            className="transform -rotate-90 w-full h-full drop-shadow-md"
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r={radius}
              stroke="#e5e7eb"
              strokeWidth="10"
              fill="none"
            />
            <circle
              cx="50"
              cy="50"
              r={radius}
              stroke="#4ade80"
              strokeWidth="10"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
              style={{ transition: "stroke-dashoffset 0.6s ease" }}
            />
          </svg>

          <div className="absolute inset-3 rounded-full bg-gray-100 shadow-inner flex flex-col items-center justify-center text-green-700 font-semibold">
            <div className="text-sm">Health</div>
            <div className="text-xl md:text-2xl">{score}%</div>
          </div>
        </div>
      </div>
    </>
  );
}
