"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { useAuthInfo } from "@/hooks/useAuthInfo";

const textVariants = {
  enter: {
    opacity: 0,
    x: -100, // Start offscreen to the left
  },
  center: {
    opacity: 1,
    x: 0, // Move to center
    transition: {
      duration: 1.5, // Slow movement to center
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    x: 100, // Move offscreen to the right
    transition: {
      duration: 1.5, // Slow movement out
      ease: "easeIn",
    },
  },
};

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1,
      ease: "easeOut",
    },
  },
};

const textItems = [
  {
    id: 1,
    text: "Upload your handwritten prescriptions or test reports, and we'll convert them into a digital format for free. Simplify your healthcare experience!",
  },
  {
    id: 2,
    text: "Organize your health history by uploading and securely storing all your medical records in one place. Gain valuable insights from your data and share digitized records seamlessly with your healthcare providers.",
  },
];

const HeroSection: React.FC = () => {
  const router = useRouter();
  const { userId } = useAuthInfo();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % textItems.length);
    }, 6000); // Change every 6 seconds to allow enough time for slide in, center, and out

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-5 px-2 sm:px-20 py-12">
      <div className="flex flex-col justify-center space-y-6 w-9/12">
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className="text-4xl font-bold text-gray-800"
        >
          Welcome to Your Health Solution
        </motion.h1>

        <div className="relative h-24 lg:h-20 overflow-hidden">
          <AnimatePresence mode="wait"> {/* Replaced exitBeforeEnter with mode="wait" */}
            {textItems.map((item, index) =>
              activeIndex === index ? (
                <motion.p
                  key={item.id}
                  variants={textVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute text-xs lg:text-base text-gray-600 w-full"
                >
                  {item.text}
                </motion.p>
              ) : null
            )}
          </AnimatePresence>
        </div>

        <motion.div initial="hidden" animate="visible" variants={buttonVariants}>
          <Button
            onPress={() => {
              if (userId) {
                router.push("/upload-prescription");
              } else {
                router.push("/auth/sign-up");
              }
            }}
            color="primary"
            size="lg"
          >
            Get Started
          </Button>
        </motion.div>
      </div>

      <motion.div
        className="mt-8 md:mt-0 px-6 md:px-2 flex justify-center"
        initial="hidden"
        animate="visible"
        variants={imageVariants}
      >
        <Image
          src="/digitalPrescription/hero_section.jpg"
          alt="Healthcare Illustration"
          width={600}
          height={500}
          className="rounded-lg"
        />
      </motion.div>
    </div>
  );
};

export default HeroSection;
