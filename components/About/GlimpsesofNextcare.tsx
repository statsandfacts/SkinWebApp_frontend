"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const imagePaths = [
  "/aboutus/image1nextcare.png",
  "/aboutus/image2nextcare.png",
  "/aboutus/image3nextcare.png",
  "/aboutus/image4nextcare.png",
  "/aboutus/image5nextcare.png",
];

const Glimpsesofnextcare = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="text-center p-10"
    >
      {/* Animated Title */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-4xl font-bold mb-10"
      >
        Glimpses of Life at Nextcare
      </motion.h1>

      {/* Animated Image Grid */}
      <div className="flex justify-center gap-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          transition={{ staggerChildren: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col gap-6"
        >
          {imagePaths.slice(0, 3).map((path, index) => (
            <AnimatedImage key={index} src={path} alt={`Image ${index + 1}`} />
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          transition={{ staggerChildren: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col gap-6 mt-12"
        >
          {imagePaths.slice(3, 5).map((path, index) => (
            <AnimatedImage key={index} src={path} alt={`Image ${index + 4}`} />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Glimpsesofnextcare;

const AnimatedImage = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05 }}
    >
      <Image
        src={src}
        alt={alt}
        width={500}
        height={300}
        className="rounded-lg shadow-lg"
      />
    </motion.div>
  );
};
