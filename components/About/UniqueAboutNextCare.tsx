"use client";
import React from "react";
import Image from "next/image";
import { LucideCheckCircle } from "lucide-react";

const UniqueAboutNextCare = () => {
  return (
    <div className="p-10">
      <h1 className="text-5xl font-semibold text-center">
        What’s so unique about Nextcare?
      </h1>

      <div className="flex flex-col md:flex-row items-center gap-4 justify-center md:ml-20 mt-10">
        <div className="w-full flex justify-center items-center md:w-2/6">
          <Image
            src="/aboutus/uniqueaboutnextcare.png"
            alt="Unique About Nextcare"
            width={500}
            height={400}
            className="ml-1"
          />
        </div>
        <div className="text-lg space-y-6 w-full md:w-2/3">
          {[
            {
              text: "Trusted by",
              highlight: "360+ Active Users",
              description:
                "– Building a growing community that relies on us for smarter healthcare solutions.",
            },
            {
              text: "Digitized",
              highlight: "242+ Prescriptions",
              description:
                "– Ensuring accuracy, reducing errors, and improving prescription management.",
            },
            {
              text: "Organized",
              highlight: "20+ Health Camps",
              description:
                "– Bringing healthcare closer to communities with impactful initiatives.",
            },
            {
              highlight: "Fast & Efficient Care",
              description:
                "– With our 5-Minute Clinical Consult and Symptom Bot, we help users get quick medical guidance.",
            },
            {
              highlight: "User-Friendly Platform",
              description:
                "– Simple, intuitive, and designed for everyone — no technical expertise required.",
            },
          ].map(({ text, highlight, description }, index) => (
            <div key={index} className="flex items-center gap-3  mr-10">
              <LucideCheckCircle className="h-10 w-10 text-primary" />
              <p className="text-xl lg:text-2xl font-light leading-relaxed">
                {text && `${text} `} <strong>{highlight}</strong> {description}
              </p>
            </div>
          ))}
        </div>
      </div>
      <h2 className="text-xl lg:text-2xl font-light leading-relaxed text-center mt-10">
        At Nextcare.Life, we are redefining healthcare with innovation,
        accessibility, and trust.
      </h2>
    </div>
  );
};

export default UniqueAboutNextCare;
