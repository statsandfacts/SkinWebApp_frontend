"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const MobileApp = () => {
  // Feature data
  const features = [
    {
      image: "/homepage/easeofuse.png",
      title: "Ease of Use",
      subtitle:
        "Nextcare.life offers a simple and intuitive interface for seamless navigation.",
    },
    {
      image: "/homepage/prescriptiondegitiation.png",
      title: "Prescription Digitization",
      subtitle:
        "Digitize and manage prescriptions securely and accurately with ease.",
    },
    {
      image: "/homepage/smartlabreportmobile.png",
      title: "Smart Lab Report",
      subtitle:
        "Get instant insights and smart summaries from your lab reports for better health decisions.",
    },
    {
      image: "/homepage/symptombotmocile.png",
      title: "Ease of Use",
      subtitle:
        "Nextcare.life offers a simple and intuitive interface for seamless navigation.",
    },
    {
      image: "/homepage/cinicalconsultantmobile.png",
      title: "Ease of Use",
      subtitle:
        "Nextcare.life offers a simple and intuitive interface for seamless navigation.",
    },
  ];

  return (
    <motion.div
      className="flex flex-col lg:flex-row items-center justify-center max-w-7xl p-6 lg:p-10"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      {/* Left Side - Mobile App Image */}
      <motion.div
        className="flex-1 flex justify-center"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <Image
          src="/homepage/mobileapp.png"
          alt="Mobile App"
          width={400}
          height={600}
          className="w-3/4 lg:w-auto"
        />
      </motion.div>

      {/* Right Side - Features */}
      <motion.div
        className="flex-1 lg:ml-10"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h1 className="text-2xl lg:text-3xl font-bold text-primary text-center">
          Nextcare.life is available for everyone on Mobile
        </h1>
        <ul className="space-y-4 mt-6">
          {features.map((feature, index) => (
            <motion.li
              key={index}
              className="flex items-center gap-4 lg:gap-6 mt-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 p-3 lg:w-16 lg:h-16 bg-[#B7DEF6] flex items-center justify-center rounded-full">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  width={40}
                  height={40}
                />
              </div>
              <div>
                <h2 className="text-lg lg:text-xl font-bold">
                  {feature.title}
                </h2>
                <p className="text-sm lg:text-lg">{feature.subtitle}</p>
              </div>
            </motion.li>
          ))}
        </ul>
        {/* New Heading */}
        <h2 className="text-2xl lg:text-3xl font-bold text-[#025687] text-center mt-10">
          Download the App for Free
        </h2>

        {/* Image Row for App Download */}
        <div className="flex justify-center gap-4 mt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Image
              src="/homepage/playstore.png"
              alt="Google Play Store"
              width={150}
              height={50}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Image
              src="/homepage/apploplaystore.png"
              alt="Apple App Store"
              width={150}
              height={50}
            />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MobileApp;
