"use client";
import React from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

interface RightImageComponentProps {
  imageSrc: string;
  title: string;
  description: string;
  features: { title: string; color: string }[];
  action: string;
}

const RightImageComponent = ({
  imageSrc,
  title,
  description,
  features,
  action,
}: RightImageComponentProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-col sm:flex-row items-center justify-center p-10 max-w-7xl"
      viewport={{ once: true }}
    >
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="ml-5 w-full sm:w-1/2"
        viewport={{ once: true }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          className="text-4xl sm:text-5xl font-bold text-primary text-center sm:text-left"
          viewport={{ once: true }}
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
          className="text-2xl text-gray-700 mt-4 text-center sm:text-left"
          viewport={{ once: true }}
        >
          {description}
        </motion.p>

        <motion.ul
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
          className="mt-6 space-y-2 text-xl text-center sm:text-left"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 1 }}
              className={`flex items-center gap-2`}
              viewport={{ once: true }}
            >
              <span
                style={{
                  borderColor: feature.color,
                  backgroundColor: feature.color,
                }}
                className={`w-6 h-6 rounded-full border flex justify-center items-center`}
              >
                <Check className="w-5 h-5 text-white" />
              </span>

              <span className="text-xl" style={{ color: feature.color }}>
                {feature.title}
              </span>
            </motion.li>
          ))}
        </motion.ul>

        {/* <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 w-[137px] h-[35px] text-[18px] font-normal text-white bg-primary rounded-lg"
        >
          EXPLORE
        </motion.button> */}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="w-full sm:w-1/2"
        viewport={{ once: true }}
      >
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          whileHover={{
            scale: 1.05,
          }}
          className="rounded-lg overflow-hidden"
        >
          <Image src={imageSrc} alt={title} width={700} height={500} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default RightImageComponent;
