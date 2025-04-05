"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

const healthCalculators = [
  {
    imageSrc: "/aboutus/bmi.png",
    title: "BMI Calculator",
    description:
      "Calculate your Body Mass Index (BMI) to understand your ideal weight range.",
    link: "/calculator/bmi",
  },
  {
    imageSrc: "/aboutus/bmr.png",
    title: "BMR Calculator",
    description:
      "Estimate your Basal Metabolic Rate (BMR) to know your daily calorie needs.",
    link: "/calculator/bmr",
  },
  {
    imageSrc: "/aboutus/blood-pressure.png",
    title: "Blood Pressure Calculator",
    description:
      "Assess your blood pressure risk and get recommendations for a healthy lifestyle.",
    link: "/calculator/blood-pressure-risk-calculator",
  },
  {
    imageSrc: "/aboutus/dibatis.png",
    title: "Diabetes Risk Calculator",
    description:
      "Evaluate your risk of developing diabetes based on various health factors.",
    link: "/calculator/diabetes-risk-calculator",
  },
  {
    imageSrc: "/aboutus/pregancydue.png",
    title: "Pregnancy Due Date Calculator",
    description:
      "Determine your estimated due date based on your last menstrual period.",
    link: "/calculator/pregnancy-due-date",
  },
];

const ExploreOurHealthCare = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="text-center p-10"
    >
      {/* Animated Title */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-4xl font-bold mb-10"
      >
        Explore Our Health Calculators
      </motion.h1>

      {/* Animated Grid */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-6 justify-center items-center"
      >
        {healthCalculators.slice(0, 3).map((calculator, index) => (
          <HealthCalculatorCard
            key={index}
            description={calculator.description}
            imageSrc={calculator.imageSrc}
            title={calculator.title}
            link={calculator.link}
          />
        ))}
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.2 }}
        className="flex flex-col sm:flex-row justify-center gap-6 mt-7"
      >
        {healthCalculators.slice(3, 5).map((calculator, index) => (
          <HealthCalculatorCard
            key={index}
            description={calculator.description}
            imageSrc={calculator.imageSrc}
            title={calculator.title}
            link={calculator.link}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default ExploreOurHealthCare;

interface CalculatorProps {
  imageSrc: string;
  title: string;
  description: string;
  link: string;
}

const HealthCalculatorCard: React.FC<CalculatorProps> = ({
  imageSrc,
  title,
  description,
  link,
}) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className="flex flex-col items-center"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: true }}
        className="bg-primary-mute p-6 rounded-[30px] flex flex-col items-center text-center w-[320px] h-[250px]"
      >
        <Image
          src={imageSrc}
          alt={title}
          width={80}
          height={80}
          className="mb-1"
        />
        <h2 className="text-xl font-bold">{title}</h2>
        <h3 className="text-lg ">{description}</h3>
      </motion.div>

      {/* Animated Button */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-4"
      >
        <Link
          href={link}
          className="bg-primary-mute text-black font-semibold py-2 px-6 rounded-[30px] w-[250px] h-[50px] mt-2"
        >
          Calculate Now
        </Link>
      </motion.div>
    </motion.div>
  );
};
