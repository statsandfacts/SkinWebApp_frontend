"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const imageVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
  hover: {
    y: -10, // Moves the image up when hovered
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

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

const headingVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: "easeOut",
    },
  },
};

const PrescriptionComparison: React.FC = () => {
  return (
    <div className="bg-gray-50 py-11 px-6 md:px-20 rounded-lg">
      {/* Heading Section */}
      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={headingVariants}
        className="text-3xl font-bold text-center text-slate-800 mb-10"
      >
        Handwritten vs. Digital Prescriptions
      </motion.h2>

      <div className="flex max-w-[75rem] flex-col md:flex-row items-center gap-6 justify-between">
        {/* Handwritten Prescription Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          whileHover="hover" // Add hover effect
          viewport={{ once: true }}
          variants={imageVariants}
          className="flex flex-col items-center w-full md:w-1/2"
        >
          <Image
            src="/digitalPrescription/handwritten_prescription.jpg"
            alt="Handwritten Prescription"
            width={400}
            height={400}
            className="rounded-lg"
          />
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={textVariants}
            className="text-lg text-gray-600 mt-4 text-center"
          >
            Handwritten prescriptions can be unclear and difficult to read,
            increasing the chances of errors.
          </motion.p>
        </motion.div>

        {/* Digital Prescription Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          whileHover="hover" // Add hover effect
          viewport={{ once: true }}
          variants={imageVariants}
          className="flex flex-col items-center w-full md:w-1/2 mt-10 md:mt-0"
        >
          <Image
            src="/digitalPrescription/digital_prescription.jpg"
            alt="Digital Prescription"
            width={400}
            height={400}
            className="rounded-lg"
          />
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={textVariants}
            className="text-lg text-gray-600 mt-4 text-center"
          >
            Digital prescriptions are clear, accurate, and can be easily shared
            with pharmacies, reducing errors.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default PrescriptionComparison;