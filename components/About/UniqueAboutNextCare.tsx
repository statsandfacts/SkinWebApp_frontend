"use client";
import React from "react";
import Image from "next/image";

const UniqueAboutNextCare = () => {
  return (
    <div className="text-black p-10">
      {/* Centered heading */}
      <h1 className="text-5xl font-semibold text-center mb-10">
        What’s so unique about Nextcare?
      </h1>

      {/* Image on left, text on right */}
      <div className="flex items-center gap-10 justify-between">
        <Image
          src="/aboutus/uniqueaboutnextcare.png"
          alt="Unique About Nextcare"
          width={500}
          height={400}
          className="ml-1"
        />
        <div className="text-lg space-y-6 max-w-[700px]">
          <div className="flex items-center gap-3 text-2xl font-normal">
            <Image
              src="/aboutus/icon.png"
              alt="Check Icon"
              width={24}
              height={24}
            />
            <p>
              Trusted by <strong>1200+ Active Users</strong> – Building a
              growing community that relies on us for smarter healthcare
              solutions.
            </p>
          </div>
          <div className="flex items-center gap-3 text-2xl font-normal">
            <Image
              src="/aboutus/icon.png"
              alt="Check Icon"
              width={24}
              height={24}
            />
            <p>
              Digitized <strong>500+ Prescriptions</strong> – Ensuring accuracy,
              reducing errors, and improving prescription management.
            </p>
          </div>
          <div className="flex items-center gap-3 text-2xl font-normal">
            <Image
              src="/aboutus/icon.png"
              alt="Check Icon"
              width={24}
              height={24}
            />
            <p>
              Organized <strong>20+ Health Camps</strong> – Bringing healthcare
              closer to communities with impactful initiatives.
            </p>
          </div>
          <div className="flex items-center gap-3 text-2xl font-normal">
            <Image
              src="/aboutus/icon.png"
              alt="Check Icon"
              width={24}
              height={24}
            />
            <p>
              <strong>Fast & Efficient Care</strong> – With our 5-Minute
              Clinical Consult and Symptom Bot, we help users get quick medical
              guidance.
            </p>
          </div>
          <div className="flex items-center gap-3 text-2xl font-normal">
            <Image
              src="/aboutus/icon.png"
              alt="Check Icon"
              width={24}
              height={24}
            />
            <p>
              <strong>User-Friendly Platform</strong> – Simple, intuitive, and
              designed for everyone — no technical expertise required.
            </p>
          </div>
        </div>
      </div>
      <h2 className="text-2xl font-semibold text-center mb-10 mt-2">
        At Nextcare.Life, we are redefining healthcare with innovation,
        accessibility, and trust.
      </h2>
    </div>
  );
};

export default UniqueAboutNextCare;
