"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import ViewMoreTeamDrawer from "./ViewMoreTeamDrawer";

const teamMembers = [
  {
    imageSrc: "/aboutus/dr.sir.png",
    name: "Col (Dr) Surendra Ramamurthy",
    degree: "(MBBS, MD, DNB, FICS)",
    role: "Chief Medical Officer & Founding Member",
    isViewMore: true,
  },
  {
    imageSrc: "/aboutus/ceo.png",
    name: "Sidharth Mohanty",
    role: "Co-founder & CEO",
    isViewMore: false,
  },
  {
    imageSrc: "/aboutus/kanha.png",
    name: "Kanha Kumar Khatua",
    role: "SDE & Founding Member",
    isViewMore: false,
  },
  {
    imageSrc: "/aboutus/swasata.png",
    name: "Shaswata Shrinivas Panda",
    role: "Lead Pharmacist",
    isViewMore: false,
  },
  {
    imageSrc: "/aboutus/ayushman.png",
    name: "Ayusman Bibhuprasad",
    role: "UX Designer & QA Engineer",
    isViewMore: false,
  },
  {
    imageSrc: "/aboutus/piyush-backend.png",
    name: "Piyush Prateem",
    role: "Backend Developer",
    isViewMore: false,
  },
  {
    imageSrc: "/aboutus/guru-fronted.png",
    name: "Guruprasad Rana",
    role: "Frontend Developer",
    isViewMore: false,
  },
  {
    imageSrc: "/aboutus/subash-qa.png",
    name: "Subas Lenka",
    role: "QA and Database professional",
    isViewMore: false,
  },
  {
    imageSrc: "/aboutus/amiya-backend.png",
    name: "Amiya Ranjan Padhi",
    role: "Backend Developer",
    isViewMore: false,
  },
  {
    imageSrc: "/aboutus/dknextcare.png",
    name: "Dyutikrushna Dhal",
    role: "Frontend Developer",
    isViewMore: false,
  },
];

const MeetTheTeam = () => {
  const [viewMore, setViewMore] = useState<boolean>(false);
  const [viewMoreTeamName, setViewMoreTeamName] = useState<string>("");
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-center px-6 py-12 md:px-12"
      >
        {/* Animated Title */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold mb-4 text-primary"
        >
          Meet The Team
        </motion.h1>

        {/* Animated Subtitle */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          viewport={{ once: true }}
          className="text-lg md:text-xl font-light mb-10 max-w-3xl mx-auto"
        >
          Meet our experts, dedicated to excelling in diverse healthcare
          solutions and services.
        </motion.h3>

        {/* Team Grid with Staggered Animation */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 10px 20px rgba(0,0,0,0.15)",
              }}
              whileTap={{ scale: 0.98 }}
              className="flex flex-col items-center text-center bg-white p-6 rounded-xl shadow-md transition-transform"
            >
              {/* Image Animation */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Image
                  src={member.imageSrc}
                  alt={member.name}
                  width={150}
                  height={150}
                  className="rounded-full object-cover mb-4"
                />
              </motion.div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                {member.name}
              </h2>
              {member?.degree && (
                <p className="text-base md:text-lg font-light text-gray-600">
                  {member?.degree}
                </p>
              )}
              <h3 className="text-base md:text-lg font-light text-gray-600">
                {member.role}
              </h3>

              {member.isViewMore && (
                <button
                  onClick={() => {
                    setViewMoreTeamName(member.name);
                    setViewMore(true);
                  }}
                  className="mt-2 px-4 py-1 text-sm bg-primary text-white rounded-full hover:bg-primary-dark transition"
                >
                  Meet the Visionary
                </button>
              )}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <ViewMoreTeamDrawer
        viewMore={viewMore}
        viewMoreTeamName={viewMoreTeamName}
        onClose={() => setViewMore(false)}
      />
    </>
  );
};

export default MeetTheTeam;
