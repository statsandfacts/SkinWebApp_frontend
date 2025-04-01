"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { COMMON } from "@/config/const";

const WhatUserSay = () => {
  return (
    <motion.div
      className="p-10  max-w-7xl"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <motion.h2
        className="text-3xl font-bold text-black text-start mb-8"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        What Our Users have to say
      </motion.h2>

      {/* 4 Grid Layout */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
      >
        {COMMON.DIGITAL_PRESCRIPTION_SLIDER_ITEMS.map((user, index) => (
          <motion.div
            key={index}
            className=" bg-primary p-4 rounded-lg shadow-lg text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            viewport={{ once: true }}
            whileHover={{
              scale: 1.05,
              y: -5,
              boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
            }}
          >
            {/* User Image */}
            <div className="h-24 w-24">
              <Image
                src={user.image}
                alt={user.name}
                width={100}
                height={100}
                className="rounded-full h-24"
              />
            </div>

            {/* User Name */}
            <h3 className="text-lg font-bold mt-2">{user.name}</h3>

            {/* Testimonial */}
            <p className="text-sm mt-2">{user.comment}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default WhatUserSay;
