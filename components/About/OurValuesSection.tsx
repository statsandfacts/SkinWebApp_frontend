"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const values = [
  {
    src: "/aboutus/innovation.png",
    title: "Innovative",
    desc: ["AI-driven solutions", "for smarter healthcare"],
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
];

const OurValuesSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="text-center p-6 mt-6"
    >
      {/* Title Animation */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-4xl sm:text-5xl font-semibold"
      >
        Our Values
      </motion.h1>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-8">
        {values.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center items-center"
          >
            {/* Animated Icon */}
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              className="bg-primary-mute rounded-full w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center shadow-lg"
            >
              <Image
                src={item.src}
                alt={item.title}
                width={100}
                height={100}
                className="drop-shadow-md"
              />
            </motion.div>

            {/* Title Animation */}
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-2xl sm:text-3xl font-bold mt-4"
            >
              {item.title}
            </motion.h2>

            {/* Description Animation */}
            {item.desc.map((line, i) => (
              <motion.h3
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-lg sm:text-xl font-light text-secondary-lite"
              >
                {line}
              </motion.h3>
            ))}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default OurValuesSection;
