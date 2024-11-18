"use client";
import Image from "next/image";
import React from "react";

interface SafetyAdviceProps {
  safetyAdvice: any;
}

export const SafetyAdvice: React.FC<SafetyAdviceProps> = ({ safetyAdvice }) => {
  return (
    <div>
      <h1 className="text-xl font-bold text-sky-700 mb-2 border-b pb-2 border-sky-500">
        Safety advice
      </h1>
      <div className="flex flex-col gap-3">
        <div>
          <div className="flex gap-3">
            <Image
              alt="alcohol image"
              height={30}
              width={30}
              src={"/safety/alcohol.png"}
            />
            <div className="flex justify-center items-center gap-3">
              <p className="text-sky-900 text-sm font-semibold">Alcohol</p>
              <div
                className={`text-gray-600 text-xs font-normal w-fit ${
                  safetyAdvice?.alcoholInteraction === "UNSAFE"
                    ? "bg-red-100"
                    : safetyAdvice?.alcoholInteraction === "SAFE"
                    ? "bg-green-100"
                    : "bg-blue-100"
                } px-2 py-1 rounded-2xl`}
              >
                {safetyAdvice?.alcoholInteraction || "N/A"}
              </div>
            </div>
          </div>
          <p className="text-slate-600 text-sm font-normal ml-3">
            {safetyAdvice?.AlcoholDetails || "N/A"}
          </p>
        </div>

        <div>
          <div className="flex gap-3">
            <Image
              alt="alcohol image"
              height={30}
              width={30}
              src={"/safety/pregnancy.png"}
            />
            <div className="flex justify-center items-center gap-3">
              <p className="text-sky-900 text-sm font-semibold">Pregnancy</p>
              <div
                className={`text-gray-600 text-xs font-normal w-fit ${
                  safetyAdvice?.pregnancyInteraction === "UNSAFE"
                    ? "bg-red-100"
                    : safetyAdvice?.pregnancyInteraction === "SAFE"
                    ? "bg-green-100"
                    : "bg-blue-100"
                } px-2 py-1 rounded-2xl`}
              >
                {safetyAdvice?.pregnancyInteraction || "N/A"}
              </div>
            </div>
          </div>
          <p className="text-slate-600 text-sm font-normal ml-3">
            {safetyAdvice?.PregnencyDetails || "N/A"}
          </p>
        </div>

        <div>
          <div className="flex gap-3">
            <Image
              alt="alcohol image"
              height={30}
              width={30}
              src={"/safety/lactation.png"}
            />
            <div className="flex justify-center items-center gap-3">
              <p className="text-sky-900 text-sm font-semibold">
                Breast feeding
              </p>
              <div
                className={`text-gray-600 text-xs font-normal w-fit ${
                  safetyAdvice?.lactationInteraction === "UNSAFE"
                    ? "bg-red-100"
                    : safetyAdvice?.lactationInteraction === "SAFE"
                    ? "bg-green-100"
                    : "bg-blue-100"
                } px-2 py-1 rounded-2xl`}
              >
                {safetyAdvice?.lactationInteraction || "N/A"}
              </div>
            </div>
          </div>
          <p className="text-slate-600 text-sm font-normal ml-3">
            {safetyAdvice?.BreastfeedingDetails || "N/A"}
          </p>
        </div>

        <div>
          <div className="flex gap-3">
            <Image
              alt="alcohol image"
              height={30}
              width={30}
              src={"/safety/driving.png"}
            />
            <div className="flex justify-center items-center gap-3">
              <p className="text-sky-900 text-sm font-semibold">Driving</p>
              <div
                className={`text-gray-600 text-xs font-normal w-fit ${
                  safetyAdvice?.drivingInteraction === "UNSAFE"
                    ? "bg-red-100"
                    : safetyAdvice?.drivingInteraction === "SAFE"
                    ? "bg-green-100"
                    : "bg-blue-100"
                } px-2 py-1 rounded-2xl`}
              >
                {safetyAdvice?.drivingInteraction || "N/A"}
              </div>
            </div>
          </div>
          <p className="text-slate-600 text-sm font-normal ml-3">
            {safetyAdvice?.DrivingDetails || "N/A"}
          </p>
        </div>

        <div>
          <div className="flex gap-3">
            <Image
              alt="alcohol image"
              height={30}
              width={30}
              src={"/safety/kidney.png"}
            />
            <div className="flex justify-center items-center gap-3">
              <p className="text-sky-900 text-sm font-semibold">Kidney</p>
              <div
                className={`text-gray-600 text-xs font-normal w-fit ${
                  safetyAdvice?.kidneyInteraction === "UNSAFE"
                    ? "bg-red-100"
                    : safetyAdvice?.kidneyInteraction === "SAFE"
                    ? "bg-green-100"
                    : "bg-blue-100"
                } px-2 py-1 rounded-2xl`}
              >
                {safetyAdvice?.kidneyInteraction || "N/A"}
              </div>
            </div>
          </div>
          <p className="text-slate-600 text-sm font-normal ml-3">
            {safetyAdvice?.KidneyDetails || "N/A"}
          </p>
        </div>

        <div>
          <div className="flex gap-3">
            <Image
              alt="alcohol image"
              height={30}
              width={30}
              src={"/safety/liver.png"}
            />
            <div className="flex justify-center items-center gap-3">
              <p className="text-sky-900 text-sm font-semibold">Liver</p>
              <div
                className={`text-gray-600 text-xs font-normal w-fit ${
                  safetyAdvice?.liverInteraction === "UNSAFE"
                    ? "bg-red-100"
                    : safetyAdvice?.liverInteraction === "SAFE"
                    ? "bg-green-100"
                    : "bg-blue-100"
                } px-2 py-1 rounded-2xl`}
              >
                {safetyAdvice?.liverInteraction || "N/A"}
              </div>
            </div>
          </div>
          <p className="text-slate-600 text-sm font-normal ml-3">
            {safetyAdvice?.LiverDetails || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};
