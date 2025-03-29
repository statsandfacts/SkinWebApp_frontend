"use client";
import React from "react";
import Image from "next/image";

const StepIntoHealthcare = () => {
  const features = [
    {
      src: "/aboutus/prescriptiondegitation.png",
      title: "Prescription Digitization",
      desc: "Effortlessly convert handwritten prescriptions to digital prescriptions accurately in a secured way.",
    },
    {
      src: "/aboutus/smartlabreportnew.png",
      title: "Smart Lab Report",
      desc: "Our tool interprets lab reports and generates smart summaries based on medical conditions, empowering healthcare providers.",
    },
    {
      src: "/aboutus/symtombotnew.png",
      title: "Symptom Bot",
      desc: "The Symptom Bot helps users easily identify potential health concerns and confidently suggests seeking medical attention.",
    },
    {
      src: "/aboutus/cinicalconsultnew.png",
      title: "5-Minutes Clinical Consult",
      desc: "Nextcare.Life’s 5-Minute Clinical Consult offers fast medical advice, prescriptions, and follow-ups — secure, convenient, and confidential.",
    },
  ];

  return (
    <div className="text-center px-6 py-10 md:px-12">
      <h1 className="text-3xl md:text-5xl font-semibold mb-6">
        Step into the future of healthcare today!
      </h1>

      <p className="text-lg md:text-xl text-gray-700 mx-auto max-w-3xl mb-8">
        Explore these new features and experience firsthand how Nextcare.Life is
        revolutionizing digital healthcare, one innovation at a time!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 max-w-6xl mx-auto">
        {features.map((item, index) => (
          <div
            key={index}
            className="bg-primary-lite shadow-lg p-6 md:p-8 rounded-2xl flex flex-col items-center text-center md:items-start md:text-left w-full"
          >
            <div className="bg-primary-mute rounded-full w-28 h-28 flex items-center justify-center">
              <Image src={item.src} alt={item.title} width={70} height={70} />
            </div>

            <h2 className="text-xl md:text-2xl font-bold mt-4">{item.title}</h2>

            <p className="text-base md:text-lg text-gray-700 mt-2">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepIntoHealthcare;
