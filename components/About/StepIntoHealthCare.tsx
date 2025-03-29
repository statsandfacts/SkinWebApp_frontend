"use client";
import React from "react";
import Image from "next/image";

const StepIntoHealthcare = () => {
  return (
    <div className="text-center p-10">
      <h1 className="text-5xl font-semibold mb-4">
        Step into the future of healthcare today!
      </h1>
      <p className="text-xl text-gray-700 mb-10">
        Explore these new features and experience firsthand how Nextcare.Life is
        revolutionizing digital healthcare, one innovation at a time!
      </p>

      <div className="grid grid-cols-2 gap-8 justify-center items-center mx-auto max-w-5xl">
        {/* First Grid */}
        <div className="bg-[#75AFD2] shadow-lg p-6 rounded-[30px] flex flex-col items-start text-left w-[460px] h-[400px]">
          <Image
            src="/aboutus/prescriptindegitation.png"
            alt="Prescription Digitization"
            width={150}
            height={100}
          />
          <h2 className="text-2xl font-bold mt-4">Prescription Digitization</h2>
          <p className="text-xl font-bold text-gray-600 mt-2">
            Effortlessly convert handwritten prescriptions to digital
            prescriptions accurately in a secured way.
          </p>
        </div>

        {/* Second Grid */}
        <div className="bg-[#75AFD2] shadow-lg p-6 rounded-[30px] flex flex-col items-start text-left w-[460px] h-[400px]">
          <Image
            src="/aboutus/smartlabreport.png"
            alt="Smart Lab Report"
            width={150}
            height={100}
          />
          <h2 className="text-2xl font-bold mt-4">Smart Lab Report</h2>
          <p className="text-xl font-bold text-gray-600 mt-2">
            Our tool interprets lab reports and generates smart summaries based
            on medical conditions, empowering healthcare providers.
          </p>
        </div>

        {/* Third Grid */}
        <div className="bg-[#75AFD2] shadow-lg p-6 rounded-[30px] flex flex-col items-start text-left w-[460px] h-[400px]">
          <Image
            src="/aboutus/symtombot.png"
            alt="Symptom Bot"
            width={150}
            height={100}
          />
          <h2 className="text-2xl font-bold mt-4">Symptom Bot</h2>
          <p className="text-xl font-bold text-gray-600 mt-2">
            The Symptom Bot helps users easily identify potential health
            concerns and confidently suggests seeking medical attention.
          </p>
        </div>

        {/* Fourth Grid */}
        <div className="bg-[#75AFD2] shadow-lg p-6 rounded-[30px] flex flex-col items-start text-left w-[460px] h-[400px]">
          <Image
            src="/aboutus/cinicalconsult.png"
            alt="Clinical Consult"
            width={150}
            height={100}
          />
          <h2 className="text-2xl font-bold mt-4">
            5- Minutes Clinical Consult
          </h2>
          <p className="text-xl font-bold text-gray-600 mt-2">
            Nextcare.Life’s 5-Minute Clinical Consult offers fast medical
            advice, prescriptions, and follow-ups — secure, convenient, and
            confidential.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StepIntoHealthcare;
