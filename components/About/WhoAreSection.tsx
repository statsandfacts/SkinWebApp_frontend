"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const WhoWeAreSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="bg-primary-mute text-black p-10 mt-5 rounded-[50px]"
    >
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-4xl sm:text-5xl font-semibold text-center mb-8 text-primary"
      >
        Who Are We?
      </motion.h1>

      <div className="flex flex-col md:flex-row items-center gap-8">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
          className="w-full md:w-2/3 text-lg leading-relaxed ml-4"
        >
          {[
            "Launched in September 2024, Nextcare.Life is an innovative platform revolutionizing healthcare with AI-driven solutions.",
            "We simplify healthcare by connecting patients, providers, and diagnostic services for seamless care. Patients can digitize prescriptions, decode lab reports with smart insights, and get expert advice via our 5-Minute Clinical Consult. Our Symptom Bot offers instant guidance for informed decisions.",
            "For healthcare providers, we deliver AI-powered tools to enhance diagnosis, streamline prescriptions, and boost patient engagement — all with secure record storage for easy access.",
            "At Nextcare.Life, we are dedicated to building smarter, faster, and safer healthcare for everyone.",
          ].map((text, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: index * 0.3,
              }}
              viewport={{ once: true }}
              className="mt-4 text-xl lg:text-2xl font-light leading-relaxed"
            >
              {text}
            </motion.p>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          viewport={{ once: true }}
          className="w-full md:w-2/6 flex justify-center"
        >
          <Image
            src="/aboutus/whowearenew.png"
            alt="Who We Are"
            width={600}
            height={400}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WhoWeAreSection;
