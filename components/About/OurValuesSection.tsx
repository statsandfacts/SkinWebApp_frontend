"use client";
import React from "react";
import Image from "next/image";

const OurValuesSection = () => {
  return (
    <div className="text-center p-6">
      <h1 className="text-4xl font-bold mb-6">Our Values</h1>
      <div className="flex justify-center gap-20 m-10">
        <div className="text-center">
          <Image
            src="/aboutus/innovative.png"
            alt="Innovative"
            width={160}
            height={160}
            className="mx-auto"
          />
          <h2 className="text-2xl font-semibold mt-4">Innovative</h2>
          <h3 className="text-xl text-gray-600">AI-driven solution for</h3>
          <h3 className="text-xl text-gray-600">smarter healthcare</h3>
        </div>
        <div className="text-center">
          <Image
            src="/aboutus/reliable.png"
            alt="Reliable"
            width={160}
            height={160}
            className="mx-auto"
          />
          <h2 className="text-2xl font-semibold mt-4">Reliable</h2>
          {/* <h4 className="text-xl text-gray-600">Accurate, secure, and trusted care</h4> */}
          <h3 className="text-xl text-gray-600">Accurate, secure,</h3>
          <h3 className="text-xl text-gray-600">and trusted care</h3>
        </div>
        <div className="text-center">
          <Image
            src="/aboutus/accesible.png"
            alt="Accessible"
            width={160}
            height={160}
            className="mx-auto"
          />
          <h2 className="text-2xl font-semibold mt-4">Accessible</h2>
          {/* <h4 className="text-xl text-gray-600">Healthcare anytime, anywhere</h4> */}
          <h3 className="text-xl text-gray-600">Healthcare anytime,</h3>
          <h3 className="text-xl text-gray-600"> anywhere</h3>
        </div>
        <div className="text-center">
          <Image
            src="/aboutus/paitaincentric.png"
            alt="Patient-Centric"
            width={160}
            height={160}
            className="mx-auto"
          />
          <h2 className="text-2xl font-semibold mt-4">Patient-Centric</h2>
          {/* <h4 className="text-xl text-gray-600">Your health, our priority</h4> */}
          <h3 className="text-xl text-gray-600">Your health,</h3>
          <h3 className="text-xl text-gray-600"> our priority</h3>
        </div>
      </div>
    </div>
  );
};

export default OurValuesSection;
