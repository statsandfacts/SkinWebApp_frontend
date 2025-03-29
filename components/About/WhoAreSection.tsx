"use client";
import React from "react";
import Image from "next/image";

const WhoWeAreSection = () => {
  return (
    <div className="bg-primary-mute text-black p-10 mt-5 rounded-[50px]">
      <h1 className="text-5xl font-semibold text-center mb-8">Who Are We?</h1>

      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="md:w-1/2 text-lg leading-relaxed ml-4">
          <p className="text-xl lg:text-2xl font-light leading-relaxed">
            Launched in September 2024, Nextcare.Life is an innovative platform
            revolutionizing healthcare with AI-driven solutions.
          </p>
          <p className="mt-4 text-xl lg:text-2xl font-light leading-relaxed">
            We simplify healthcare by connecting patients, providers, and
            diagnostic services for seamless care. Patients can digitize
            prescriptions, decode lab reports with smart insights, and get
            expert advice via our 5-Minute Clinical Consult. Our Symptom Bot
            offers instant guidance for informed decisions.
          </p>
          <p className="mt-4 text-xl lg:text-2xl font-light leading-relaxed">
            For healthcare providers, we deliver AI-powered tools to enhance
            diagnosis, streamline prescriptions, and boost patient engagement —
            all with secure record storage for easy access.
          </p>
          <p className="mt-4 text-xl lg:text-2xl font-light leading-relaxed">
            At Nextcare.Life, we are dedicated to building smarter, faster, and
            safer healthcare for everyone.
          </p>
        </div>

        <div className="md:w-1/2 flex justify-center">
          <Image
            src="/aboutus/whowearenew.png"
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
