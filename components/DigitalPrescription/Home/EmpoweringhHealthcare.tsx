"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const EmpoweringHealthcare = () => {
  const details = [
    {
      src: "/homepage/degitalprescription.svg",
      name: "Digitized Prescriptions",
      count: 500,
    },
    {
      src: "/homepage/healthcamp.svg",
      name: "Health Camps",
      count: 20,
    },
    {
      src: "/homepage/activeuser.svg",
      name: "Active Users",
      count: 1200,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="text-center px-4 py-10"
      viewport={{ once: true }}
    >
      {/* Animated Heading */}
      <div className="w-full flex justify-center items-center">
        <motion.h4
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-lg sm:text-xl md:text-2xl w-full sm:w-3/4 font-normal text-secondary text-center"
          viewport={{ once: true }}
        >
          Empowering healthcare with data-driven insights — our journey in
          numbers reflects our commitment to transforming digital healthcare for
          better patient outcomes.
        </motion.h4>
      </div>

      {/* Cards Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="flex flex-wrap justify-center gap-4 sm:gap-8 md:gap-14 lg:gap-20 mt-4 md:mt-10"
        viewport={{ once: true }}
      >
        {details.map((element, index) => (
          <ImageSession
            key={index}
            countNo={element.count}
            name={element.name}
            src={element.src}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default EmpoweringHealthcare;

const ImageSession = ({
  src,
  name,
  countNo,
}: {
  src: string;
  name: string;
  countNo: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-col items-center text-center p-4 sm:p-6 bg-white hover:shadow-sm rounded-lg w-40 sm:w-52 md:w-60"
      viewport={{ once: true }}
    >
      <Image src={src} alt={name} width={80} height={80} className="mb-4" />
      <h2 className="text-3xl font-extrabold text-primary">{countNo}</h2>
      <h3 className="text-lg sm:text-xl font-bold text-secondary-lite">
        {name}
      </h3>
    </motion.div>
  );
};
