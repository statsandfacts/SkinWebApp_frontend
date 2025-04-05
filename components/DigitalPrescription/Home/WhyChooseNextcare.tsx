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
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="text-5xl font-bold text-[#025687]"
      >
        WHY CHOOSE NEXTCARE.LIFE
      </motion.h1>
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        className="text-2xl font-normal mt-4"
      >
        Empowering healthcare with AI, CDSS, and digital solutions —
      </motion.h1>
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
        className="text-2xl font-normal"
      >
        Ensuring smarter decisions, safer treatments, and better outcomes.
      </motion.h1>

      {/* Feature Grid */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        transition={{ staggerChildren: 0.3 }}
        className="flex flex-wrap justify-center items-center gap-6 mt-10"
        viewport={{ once: true }}
      >
        {features.map((element, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-[371px] h-[312px] bg-primary-lite p-6 rounded-2xl shadow-lg relative"
          >
            {/* Animated Icon */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true }}
              className="absolute top-4 left-[33%] w-28 h-28 bg-cyan-200 rounded-full flex items-center justify-center"
            >
              <Image
                src={element.image}
                alt={element.title}
                width={40}
                height={40}
              />
            </motion.div>

            {/* Title & Subtitle */}
            <div className="mt-32 text-left">
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
                className="text-xl font-bold text-black"
                viewport={{ once: true }}
              >
                {element.title}
              </motion.h1>
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
                className="text-base text-black mt-2"
                viewport={{ once: true }}
              >
                {element.subtitle}
              </motion.h3>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default WhyChooseNextcare;
