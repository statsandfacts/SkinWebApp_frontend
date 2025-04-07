"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const CareerPage = () => {
  const route = useRouter();
  return (
    <div className="flex justify-center items-center relative p-5">
      <div className="relative w-full max-w-4xl">
        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <Image
            src="/homepage/careerpage.png"
            alt="Career Page"
            width={1000}
            height={600}
            className="w-full h-auto"
          />
        </motion.div>

        {/* Button Section */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
          className="absolute bottom-[22%] sm:bottom-[27%] left-[42%] sm:left-1/2 transform -translate-x-1/2 px-4 sm:px-8 py-2 bg-primary text-white font-bold text-xs sm:text-lg rounded-3xl shadow-lg"
          viewport={{ once: true }}
          onClick={() => {
            route.push("/career");
          }}
        >
          Explore the opportunities
        </motion.button>
      </div>
    </div>
  );
};

export default CareerPage;
