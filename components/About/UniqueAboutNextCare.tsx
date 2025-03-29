"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { LucideCheckCircle } from "lucide-react";

const UniqueAboutNextCare = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="p-10"
    >
      {/* Animated Title */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-4xl sm:text-5xl font-semibold text-center"
      >
        What’s so unique about Nextcare?
      </motion.h1>

      <div className="flex flex-col md:flex-row items-center gap-4 justify-center md:ml-20 mt-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          viewport={{ once: true }}
          className="w-full flex justify-center items-center md:w-2/6"
        >
          <Image
            src="/aboutus/uniqueaboutnextcare.png"
            alt="Unique About Nextcare"
            width={500}
            height={400}
            className="ml-1"
          />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.3 }}
          className="text-lg space-y-6 w-full md:w-2/3"
        >
          {[
            {
              text: "Trusted by",
              highlight: "360+ Active Users",
              description:
                "– Building a growing community that relies on us for smarter healthcare solutions.",
            },
            {
              text: "Digitized",
              highlight: "242+ Prescriptions",
              description:
                "– Ensuring accuracy, reducing errors, and improving prescription management.",
            },
            {
              text: "Organized",
              highlight: "20+ Health Camps",
              description:
                "– Bringing healthcare closer to communities with impactful initiatives.",
            },
            {
              highlight: "Fast & Efficient Care",
              description:
                "– With our 5-Minute Clinical Consult and Symptom Bot, we help users get quick medical guidance.",
            },
            {
              highlight: "User-Friendly Platform",
              description:
                "– Simple, intuitive, and designed for everyone — no technical expertise required.",
            },
          ].map(({ text, highlight, description }, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex items-center gap-3  mr-10"
            >
              <LucideCheckCircle className="h-10 w-10 text-primary" />
              <p className="text-xl lg:text-2xl font-light leading-relaxed">
                {text && `${text} `} <strong>{highlight}</strong> {description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Animated Footer Text */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
        viewport={{ once: true }}
        className="text-xl lg:text-2xl font-light leading-relaxed text-center mt-10"
      >
        At Nextcare.Life, we are redefining healthcare with innovation,
        accessibility, and trust.
      </motion.h2>
    </motion.div>
  );
};

export default UniqueAboutNextCare;
