"use client";
import React from "react";
import Image from "next/image";

const OurValuesSection = () => {
  return (
    <div className="text-center p-6 mt-6">
      <h1 className="text-5xl font-semibold">Our Values</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8">
        {[
          {
            src: "/aboutus/innovation.png",
            title: "Innovative",
            desc: ["AI-driven solution for", "smarter healthcare"],
          },
          {
            src: "/aboutus/reliable (2).png",
            title: "Reliable",
            desc: ["Accurate, secure,", "and trusted care"],
          },
          {
            src: "/aboutus/accesible (2).png",
            title: "Accessible",
            desc: ["Healthcare anytime,", "anywhere"],
          },
          {
            src: "/aboutus/patient-centric.png",
            title: "Patient-Centric",
            desc: ["Your health,", "our priority"],
          },
        ].map((item, index) => (
          <div
            key={index}
            className="flex flex-col justify-center items-center"
          >
            <div className="bg-primary-mute rounded-full w-44 h-44 flex items-center justify-center">
              <Image src={item.src} alt={item.title} width={105} height={105} />
            </div>
            <h2 className="text-4xl font-bold mt-4">{item.title}</h2>
            {item.desc.map((line, i) => (
              <h3 key={i} className="text-2xl font-light text-secondary-lite">
                {line}
              </h3>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurValuesSection;
