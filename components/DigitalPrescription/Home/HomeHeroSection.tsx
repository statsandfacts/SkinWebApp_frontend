"use client";
import React, { FC, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuthInfo } from "@/hooks/useAuthInfo";
import { useRouter } from "next/navigation";
import LoginDrawer from "../Auth/LoginDrawer";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { setLoginModal } from "@/redux/slices/digitalPrescription/auth.slice";

const HomeHeroSection: FC = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { userId }: { userId: string | null } = useAuthInfo();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <div className="bg-primary-lite w-full flex justify-center items-center h-56 sm:h-96 rounded-br-[10rem] sm:rounded-br-[16rem] px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="font-bold text-2xl text-primary sm:text-4xl md:text-5xl lg:text-6xl w-5/6 sm:w-3/4 mx-auto"
          >
            Transforming Healthcare with AI-driven Solutions
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            className="text-md sm:text-lg md:text-xl lg:text-3xl w-3/4 sm:w-3/6 mx-auto mt-2 sm:mt-4 text-secondary"
          >
            Revolutionizing healthcare with digitized prescriptions, smart lab
            reports, and an AI-powered symptom bot.
          </motion.p>

          {isClient && !userId && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
              className="flex justify-center gap-1 sm:gap-4 mt-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary text-white w-24 sm:w-32 py-2 rounded-full text-md sm:text-lg font-semibold shadow-md transition duration-300"
                onClick={() => {
                  router.push("/auth/signup-user");
                }}
              >
                Sign Up
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary text-white w-24 sm:w-32 py-2 rounded-full text-md sm:text-lg font-semibold shadow-md transition duration-300"
                onClick={() => {
                  dispatch(setLoginModal(true));
                }}
              >
                Login
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </div>
      <LoginDrawer />
    </>
  );
};

export default HomeHeroSection;
