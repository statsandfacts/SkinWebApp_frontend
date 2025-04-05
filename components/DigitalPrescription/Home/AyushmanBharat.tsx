"use client";
import React from "react";
import { motion } from "framer-motion"; // Import Framer Motion
import LeftImageComponent from "./LeftImageComponent";

const AyushmanBharat = () => {
  // Steps for creating an ABHA ID card
  const features = [
    {
      title: "Go to the official ABHA website and click 'Create ABHA number'.",
      color: "black",
    },
    {
      title:
        "Choose to use either your Aadhaar card or driver's license, then click 'Next'.",
      color: "black",
    },
    {
      title:
        "Enter your Aadhaar or license number, whichever you picked. Read the declaration carefully.",
      color: "black",
    },
    {
      title:
        "Select 'I agree' to the declaration and enter the one-time passcode sent to your registered mobile number.",
      color: "black",
    },
    {
      title:
        "Click 'Submit'. This will successfully create your ABHA identity card.",
      color: "black",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Main Heading with Animation */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="text-4xl font-bold text-center text-primary"
      >
        Ayushman Bharat Digital Mission (ABDM)
      </motion.h1>

      {/* Animated LeftImageComponent */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
      >
        <LeftImageComponent
          action="abdm"
          imageSrc="/homepage/ayushmanbharat.png"
          title="How to create ABHA card or Health ID Card?"
          description="The process for registering an ABHA ID is quite simple. Here are the steps required to create an ABHA ID card:"
          features={features}
        />
      </motion.div>
    </motion.div>
  );
};

export default AyushmanBharat;
