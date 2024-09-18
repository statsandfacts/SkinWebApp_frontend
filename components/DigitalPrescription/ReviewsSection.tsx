"use client";
import React from "react";
import { motion } from "framer-motion";
import ReviewCarousel from "./ReviewCarousel";

const headingVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: "easeOut",
      type: "spring",
      stiffness: 80,
    },
  },
};

const carouselVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: "easeOut",
      delay: 0.5,
    },
  },
};

const Reviews: React.FC = () => {
  return (
    <section
      className="flex flex-col items-center px-2 sm:px-6 md:px-18 xl:px-20 w-full max-md:max-w-full"
      id="product"
    >
      <motion.div
        className="self-center text-center mt-20 text-5xl font-semibold text-gray-800 capitalize max-md:mt-10 max-md:max-w-full max-md:text-4xl"
        initial="hidden"
        animate="visible"
        variants={headingVariants}
      >
        What Users Say
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={carouselVariants}
        className="w-full"
      >
        <ReviewCarousel />
      </motion.div>
    </section>
  );
};

export default Reviews;