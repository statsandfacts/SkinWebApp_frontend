"use client";
import React from "react";
import Image from "next/image";

const WhoWeAreSection = () => {
  return (
    <div className="bg-[#DCECF6] text-black p-10 rounded-[50px]">
      <h1 className="text-[48px] font-semibold text-center mb-8">
        Who Are We?
      </h1>

      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Left Text Section */}
        <div className="md:w-1/2 text-lg leading-relaxed ml-4">
          <p className="text-[24px] leading-relaxed ml-8">
            Launched in September 2024, Nextcare.Life is an innovative platform
            revolutionizing healthcare with AI-driven solutions.
          </p>
          <p className="mt-4 text-[24px] leading-relaxed ml-8">
            We simplify healthcare by connecting patients, providers, and
            diagnostic services for seamless care. Patients can digitize
            prescriptions, decode lab reports with smart insights, and get
            expert advice via our 5-Minute Clinical Consult. Our Symptom Bot
            offers instant guidance for informed decisions.
          </p>
          <p className="mt-4 text-[24px] leading-relaxed ml-8">
            For healthcare providers, we deliver AI-powered tools to enhance
            diagnosis, streamline prescriptions, and boost patient engagement —
            all with secure record storage for easy access.
          </p>
          <p className="mt-4 text-[24px] leading-relaxed ml-8">
            At Nextcare.Life, we are dedicated to building smarter, faster, and
            safer healthcare for everyone.
          </p>
        </div>
        {/* Right Image Section */}
        <div className="md:w-1/2 flex justify-center">
          <Image
            src="/aboutus/whoweare.png"
            alt="Who We Are"
            width={600}
            height={400}
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default WhoWeAreSection;
