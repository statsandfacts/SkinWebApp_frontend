"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const features = [
  {
    image: "/homepage/aipowerd.png",
    title: "AI-Powered",
    subtitle: "Enhancing healthcare with intelligent, data-driven insights.",
  },
  {
    image: "/homepage/cdssintegration.png",
    title: "CDSS Integration",
    subtitle:
      "Providing decision support for accurate diagnostics and treatments.",
  },
  {
    image: "/homepage/digitalhealtcare.png",
    title: "Digital Healthcare",
    subtitle: "Streamlining patient care through digital innovations.",
  },
];

const WhyChooseNextcare = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="text-center p-10"
      viewport={{ once: true }}
    >
      {/* Heading Section */}
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="text-5xl font-bold text-[#025687]"
        viewport={{ once: true }}
      >
        WHY CHOOSE NEXTCARE.LIFE
      </motion.h1>
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        className="text-2xl font-normal mt-4"
        viewport={{ once: true }}
      >
        Empowering healthcare with AI, CDSS, and digital solutions —
      </motion.h1>
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
        className="text-2xl font-normal"
        viewport={{ once: true }}
      >
        Ensuring smarter decisions, safer treatments, and better outcomes.
      </motion.h1>

      {/* Button */}
      {/* <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-6 px-6 py-2 text-white text-xl bg-[#025687] rounded-lg"
      >
        Know More
      </motion.button> */}

      {/* Grid Section */}
      <div className="flex flex-wrap justify-center items-center gap-6 mt-10">
        {features.map((element, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
              delay: 0.4 + index * 0.2,
            }}
            className="w-full sm:w-[371px] h-[312px] bg-primary-lite p-6 rounded-2xl shadow-lg relative flex flex-col justify-between"
            viewport={{ once: true }}
          >
            <div className="absolute top-4 left-4 w-16 h-16 bg-cyan-200 rounded-full flex items-center justify-center">
              <Image
                src={element.image}
                alt={element.title}
                width={40}
                height={40}
              />
            </div>
            <div className="mt-20 text-left">
              <h1 className="text-xl font-bold text-black">{element.title}</h1>
              <h3 className="text-base text-black mt-2">{element.subtitle}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default WhyChooseNextcare;
