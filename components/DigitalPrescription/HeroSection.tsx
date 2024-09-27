"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { useAuthInfo } from "@/hooks/useAuthInfo";

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: "easeOut",
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

const HeroSection: React.FC = () => {
  const router = useRouter();
  const { userId } = useAuthInfo();

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
        <div>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="text-lg text-gray-600"
          >
            Upload your handwritten prescriptions or test reports, and we will
            convert it into a digital format. Simplify your healthcare
            experience.
          </motion.p>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="text-sm text-gray-500 mt-1"
          >
            Organize your health history by uploading and securely storing all
            your medical records in one place. Gain valuable insights from your
            data and share digitized records seamlessly with your healthcare
            providers.
          </motion.p>
        </div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={buttonVariants}
        >
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
