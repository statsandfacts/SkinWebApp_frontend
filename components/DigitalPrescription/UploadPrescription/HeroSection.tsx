"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const HeroSection = () => {
  // Define animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="relative pt-13 pb-14 w-full h-full flex items-center justify-center">
      {/* Content wrapper */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={textVariants}
        className="absolute inset-0 flex flex-col items-center justify-center text-center z-10"
      >
        <motion.h1
          className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4"
          variants={textVariants}
        >
          Upload Your Prescription
        </motion.h1>
        <motion.p
          className="text-xs md:text-lg px-3 md:px-16 text-white mb-6"
          variants={textVariants}
        >
          Upload your handwritten prescription and choose your preferred options to get started with your digital prescription.
        </motion.p>
      </motion.div>

      {/* Image wrapper */}
      <div className="relative w-full max-h-[24rem] rounded-xl shadow-md overflow-hidden">
        <Image
          loading="lazy"
          src="/images/digitalPrescription/Default_A_healthcare_project_interface_featuring_a_section_whe_1 1 (1).svg"
          className="w-full h-full object-cover"
          alt="prescription image"
          height={100}
          width={100}
        />
        <div className="absolute inset-0 bg-slate-500 opacity-40"></div>
      </div>
    </div>
  );
};

export default HeroSection;
