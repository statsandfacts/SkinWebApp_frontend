"use client";
import { motion } from "framer-motion";
import Image from "next/image";

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

const SupportSection = () => {
  return (
    <div className="px-6 md:px-20 rounded-lg w-full">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={textVariants}
        className="flex flex-col items-center space-x-4 mt-6 bg-gray-50 py-4"
      >
        <p className="text-sm md:text-base font-semibold text-gray-600">
          Supported by Department of Science & Technology (DST)
        </p>
        <div className="flex gap-5">
          <Image
            src="/digitalPrescription/dst-logo.png"
            alt="DST NIDHI PRAYAS Logo"
            width={150}
            height={100}
            className="object-contain"
          />
          <Image
            src="/digitalPrescription/dst-nidhi.png"
            alt="DST NIDHI PRAYAS Logo"
            width={80}
            height={80}
            className="object-contain"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default SupportSection;
