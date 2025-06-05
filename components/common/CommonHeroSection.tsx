"use client";
import React from "react";
import { motion } from "framer-motion";

interface CommonHeroSectionProps {
  title: string;
  subtitle: string;
}

const CommonHeroSection: React.FC<CommonHeroSectionProps> = ({
  title,
  subtitle,
}) => {
  return (
    <div className="bg-primary-lite w-full flex justify-center items-center h-56 sm:h-96 rounded-b-[6rem] px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center"
      >
        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="font-bold text-2xl sm:text-4xl md:text-5xl lg:text-6xl w-5/6 sm:w-3/4 mx-auto text-primary"
        >
          {title}
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          className="text-md sm:text-lg md:text-xl lg:text-3xl w-3/4 sm:w-3/6 mx-auto mt-2 sm:mt-4 text-white"
        >
          {subtitle}
        </motion.p>
      </motion.div>
    </div>
  );
};

export default CommonHeroSection;
