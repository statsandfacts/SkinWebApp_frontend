"use client";
import React from "react";

const AboutHeroSection = () => {
  return (
    <div className="bg-primary-lite w-full flex justify-center items-center h-56 sm:h-96 rounded-b-[6rem]">
      <div>
        <div className="flex w-full justify-center items-center">
          <h1 className="font-bold text-2xl sm:text-4xl md:text-5xl lg:text-6xl w-5/6 sm:w-3/4 text-center">
            Revolutionizing digital healthcare in India using AI
          </h1>
        </div>
        <div className="flex w-full justify-center items-center mt-2 sm:mt-4">
          <p className="text-md sm:text-lg md:text-xl lg:text-3xl w-3/4 sm:w-3/6 text-center text-white">
            Empowering healthcare with smarter solutions for improved health
            outcomes
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutHeroSection;
