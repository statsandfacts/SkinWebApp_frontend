"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const SupportedBySection = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="text-center p-10"
    >
      {/* Section Heading */}
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="text-3xl font-bold text-secondary-lite mb-6"
      >
        Supported by leading government initiatives and innovation hubs
      </motion.h2>

      {/* Logos Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        className="flex flex-wrap items-center justify-center gap-10 mt-10"
      >
        {/* Logo 1 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
          className="w-32 h-32 flex justify-center items-center"
        >
          <Image
            src="/digitalPrescription/dst-logo.png"
            alt="Logo 1"
            width={120}
            height={120}
            className="object-contain"
          />
        </motion.div>

        {/* Logo 2 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
          className="w-32 h-32 flex justify-center items-center"
        >
          <Image
            src="/digitalPrescription/dst-nidhi.png"
            alt="Logo 2"
            width={120}
            height={120}
            className="object-contain"
          />
        </motion.div>

        {/* Logo 3 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 1 }}
          className="w-32 h-32 flex justify-center items-center"
        >
          <Image
            src="/digitalPrescription/startup_odisha.png"
            alt="Logo 3"
            width={120}
            height={120}
            className="object-contain"
          />
        </motion.div>

        {/* Logo 4 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 1.2 }}
          className="w-32 h-32 flex justify-center items-center"
        >
          <Image
            src="/digitalPrescription/kiit-tbi.png"
            alt="Logo 4"
            width={120}
            height={120}
            className="object-contain"
          />
        </motion.div>

        {/* Logo 5 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 1.4 }}
          className="w-36 h-36 flex justify-center items-center"
        >
          <Image
            src="/digitalPrescription/startup-india.png"
            alt="Logo 5"
            width={180}
            height={180}
            className="object-contain"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default SupportedBySection;
