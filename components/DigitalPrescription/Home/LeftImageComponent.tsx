"use client";
import React from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface LeftImageComponentProps {
  imageSrc: string;
  title: string;
  description: string;
  features: { title: string; color: string }[];
  action: string;
}

const LeftImageComponent = ({
  imageSrc,
  title,
  description,
  features,
  action,
}: LeftImageComponentProps) => {
  const router = useRouter();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-col sm:flex-row items-center justify-center p-10 max-w-7xl"
      viewport={{ once: true }}
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="w-full sm:w-1/2"
        viewport={{ once: true }}
      >
        <Image src={imageSrc} alt={title} width={700} height={500} />

        {action === "abdm" && (
          <div className="flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className=" px-6 py-2 text-lg font-normal text-white bg-[#8476AF] shadow-md rounded-lg"
              onClick={() => router.push("/ayushman-bharat")}
            >
              CREATE ABHA
            </motion.button>
          </div>
        )}
      </motion.div>

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
          className="text-4xl sm:text-5xl font-bold text-primary text-center"
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
                  borderColor: action === "abdm" ? "#53eafd" : feature.color,
                  backgroundColor:
                    action === "abdm" ? "#53eafd" : feature.color,
                }}
                className={`w-6 h-6 rounded-full border flex justify-center items-center`}
              >
                {action === "abdm" ? (
                  <span className="text-sm p-2 text-white">{index + 1}</span>
                ) : (
                  <Check className="w-5 h-5 text-white" />
                )}
              </span>

              <span
                className="text-xl font-light"
                style={{ color: feature.color }}
              >
                {feature.title}
              </span>
            </motion.li>
          ))}
        </motion.ul>

        {/* {action !== "abdm" && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 w-36 h-9 text-lg font-normal text-white bg-primary rounded-lg"
          >
            EXPLORE
          </motion.button>
        )} */}
      </motion.div>
    </motion.div>
  );
};

export default LeftImageComponent;
