"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const fadeInVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: "easeOut" },
  },
};

const hoverVariants = {
  hover: {
    scale: 1.05,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay: 0.3 },
  },
};

const HowToUse: React.FC = () => {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("how-to-use");
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <div
      id="how-to-use"
      className="relative px-4 sm:px-8 py-12 w-full flex flex-col items-center bg-white"
    >
      <motion.h2
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={fadeInVariants}
        className="text-3xl md:text-4xl font-bold text-gray-800 mb-8"
      >
        How to Use
      </motion.h2>
      <div className="flex flex-col md:flex-row gap-10">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          whileHover="hover"
          variants={fadeInVariants}
          className="flex flex-col items-center"
        >
          <div className="relative group">
            <motion.div
              className="absolute top-0 left-0 right-0 h-full bg-slate-300 opacity-40 rounded-lg z-10 cursor-pointer"
              variants={hoverVariants}
            />
            <motion.div
              className="relative rounded-lg z-0"
              variants={hoverVariants}
            >
              <Image
                src="/digitalPrescription/step1.jpg"
                alt="Step 1"
                height={250}
                width={250}
                className="rounded-lg"
              />
            </motion.div>
          </div>
          <motion.p
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={textVariants}
            className="text-base md:text-lg text-gray-600 mt-4"
          >
            Step 1: Upload your prescription.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          whileHover="hover"
          variants={fadeInVariants}
          className="flex flex-col items-center"
        >
          <div className="relative group">
            <motion.div
              className="absolute top-0 left-0 right-0 h-full bg-slate-300 opacity-40 rounded-lg z-10 cursor-pointer"
              variants={hoverVariants}
            />
            <motion.div
              className="relative rounded-lg z-0"
              variants={hoverVariants}
            >
              <Image
                src="/digitalPrescription/step2.jpg"
                alt="Step 2"
                height={250}
                width={250}
                className="rounded-lg"
              />
            </motion.div>
          </div>
          <motion.p
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={textVariants}
            className="text-base md:text-lg text-gray-600 mt-4"
          >
            Step 2:We will work on it.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          whileHover="hover"
          variants={fadeInVariants}
          className="flex flex-col items-center"
        >
          <div className="relative group">
            <motion.div
              className="absolute top-0 left-0 right-0 h-full bg-slate-300 opacity-40 rounded-lg z-10 cursor-pointer"
              variants={hoverVariants} 
            />
            <motion.div
              className="relative rounded-lg z-0"
              variants={hoverVariants}
            >
              <Image
                src="/digitalPrescription/step3.jpg"
                alt="Step 3"
                height={250}
                width={250}
                className="rounded-lg"
              />
            </motion.div>
          </div>
          <motion.p
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={textVariants}
            className="text-base md:text-lg text-gray-600 mt-4"
          >
            Step 3: Receive your digital prescription.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default HowToUse;