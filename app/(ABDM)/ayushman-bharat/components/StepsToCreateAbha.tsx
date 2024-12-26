"use client";
import React from "react";
import Image from "next/image";
import { IdCardIcon } from "lucide-react";

const StepsToCreateAbha: React.FC = () => {
  return (
    <section className="mt-10 transform hover:scale-[1.02] animate-slide-up transition-transform duration-300 ease-in-out flex flex-col md:flex-row items-center">
      <div className="w-full md:w-1/2 mb-6 md:mb-0">
        <h2 className="text-3xl font-extrabold text-sky-800">
          Steps to Create ABHA Card
        </h2>
        <ol className="mt-4 text-lg text-sky-700 list-decimal space-y-2 pl-6">
          <li>
            Go to the official ABHA website and click &apos;Create ABHA number&apos;.
          </li>
          <li>
            Choose to use either your Aadhaar card or driver&apos;s license, then
            click &apos;Next&apos;.
          </li>
          <li>
            Enter your Aadhaar or license number, whichever you picked. Read the
            declaration carefully.
          </li>
          <li>
            Select &apos;I agree&apos; to the declaration and enter the one-time passcode
            sent to your registered mobile number.
          </li>
          <li>
            Click &apos;Submit&apos;. This will successfully create your ABHA identity
            card.
          </li>
        </ol>
        <button
          className="inline-flex items-center px-8 py-4 bg-white text-sky-600 font-bold text-xl rounded-lg shadow-lg hover:bg-sky-100 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
          onClick={() => window.scrollTo({ top: 180, behavior: "smooth" })}
        >
          <IdCardIcon className="mr-3 h-6 w-6" />
          Create ABHA
        </button>
      </div>
      <div className="w-full md:w-1/2 md:flex md:justify-end">
        <Image
          src="/digitalPrescription/abha_create_steps.jpg"
          alt="Steps to Create ABHA Card"
          className="rounded-lg shadow-md"
          width={450}
          height={450}
          priority
        />
      </div>
    </section>
  );
};

export default StepsToCreateAbha;
