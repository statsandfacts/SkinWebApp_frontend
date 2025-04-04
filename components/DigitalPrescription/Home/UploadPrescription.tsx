"use client";
import React, { FC } from "react";
import { motion } from "framer-motion";
import { useAuthInfo } from "@/hooks/useAuthInfo";
import LoginDrawer from "../Auth/LoginDrawer";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { setLoginModal } from "@/redux/slices/digitalPrescription/auth.slice";
import { useRouter } from "next/navigation";

const UploadPrescription: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { userId }: { userId: string | null } = useAuthInfo();
  const handleUploadClick = () => {
    if (!userId) {
      dispatch(setLoginModal(true));
    } else {
      router.push("/upload-prescription");
    }
  };

  return (
    <>
      <motion.div
        className="text-center px-4 py-10 sm:px-6 md:px-8 lg:px-12"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <motion.h1
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-primary"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Welcome to the Future Of Care
        </motion.h1>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-primary text-white text-lg sm:text-xl md:text-2xl font-medium py-2 px-4 sm:py-3 sm:px-6 rounded-full shadow-md transition duration-300"
          onClick={handleUploadClick}
        >
          Upload a Hand-Written Prescription Now
        </motion.button>
      </motion.div>
      <LoginDrawer />
    </>
  );
};

export default UploadPrescription;
