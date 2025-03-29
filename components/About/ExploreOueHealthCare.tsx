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
    title: "Calorie Calculator",
    description:
      "Estimate your daily calorie needs based on activity level and goals.",
    link: "/calculator/bmr",
  },
  {
    imageSrc: "/aboutus/blood-pressure.png",
    title: "Heart Health Check",
    description:
      "Evaluate your heart health risk based on key indicators and lifestyle.",
    link: "/calculator/blood-pressure-risk-calculator",
  },
  {
    imageSrc: "/aboutus/dibatis.png",
    title: "Blood Pressure Monitor",
    description: "Track and analyze your blood pressure readings over time.",
    link: "/calculator/pregnancy-due-date",
  },
  {
    imageSrc: "/aboutus/pregancydue.png",
    title: "Pregnancy Due Date",
    description:
      "Predict your baby’s due date based on your last menstrual period.",
    link: "/calculator/diabetes-risk-calculator",
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
        className="grid grid-cols-3 gap-6 justify-center items-center"
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
        className="flex justify-center gap-6 mt-7"
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
          width={60}
          height={60}
          className="mb-4"
        />
        <h2 className="text-xl font-bold">{title}</h2>
        <h3 className="text-lg mt-2">{description}</h3>
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
