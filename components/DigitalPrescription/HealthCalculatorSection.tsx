"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  ChevronRight,
  Droplet,
  FireExtinguisher,
  HeartPulse,
  Scale,
} from "lucide-react";
import Link from "next/link";

const calculators = [
  {
    icon: <Scale className="text-sky-500 text-4xl mb-2" />,
    title: "BMI Calculator",
    description:
      "Calculate your Body Mass Index (BMI) to understand your ideal weight range.",
    link: "/calculator/bmi",
  },
  {
    icon: <FireExtinguisher className="text-sky-500 text-4xl mb-2" />,
    title: "BMR Calculator",
    description:
      "Estimate your Basal Metabolic Rate (BMR) to know your daily calorie needs.",
    link: "/calculator/bmr",
  },
  {
    icon: <HeartPulse className="text-sky-500 text-4xl mb-2" />,
    title: "Blood Pressure Risk",
    description:
      "Assess your blood pressure risk and get recommendations for a healthy lifestyle.",
    link: "/calculator/blood-pressure-risk-calculator",
  },
  {
    icon: <Calendar className="text-sky-500 text-4xl mb-2" />,
    title: "Pregnancy Due Date",
    description:
      "Determine your estimated due date based on your last menstrual period.",
    link: "/calculator/pregnancy-due-date",
  },
  {
    icon: <Droplet className="text-sky-500 text-4xl mb-2" />,
    title: "Diabetes Risk Calculator",
    description:
      "Evaluate your risk of developing diabetes based on various health factors.",
    link: "/calculator/diabetes-risk-calculator",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.2,
      duration: 0.8,
      ease: "easeOut",
    },
  }),
  hover: {
    scale: 1.05,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const HealthCalculatorSection: React.FC = () => {
  return (
    <section className="mt-10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row gap-3">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={textVariants}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Explore Your Health Calculators
          </h2>
          <p className="text-gray-600 mb-4">
            Take control of your health by using our simple and effective
            calculators.
          </p>
          <Link
            href={`/calculator`}
            className="text-sky-800 flex items-center w-fit text-sm md:text-lg transition ease-in-out duration-200 hover:translate-x-1 hover:text-sky-700"
          >
            View All
            <div>
              <ChevronRight className="w-6 h-6 text-sky-800 transition-transform duration-200 ease-in-out hover:translate-x-1" />
            </div>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {calculators.map((calculator, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true }}
              custom={index}
              variants={cardVariants}
              className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-2">
                <div>{calculator.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold mt-2">
                    {calculator.title}
                  </h3>
                  <p className="text-gray-500 text-sm text-left mb-2">
                    {calculator.description}
                  </p>
                </div>
                <Link
                  href={calculator.link}
                  passHref
                  className="text-sky-500 hover:underline font-medium"
                >
                  <ChevronRight className="w-10 h-10 text-sky-800 transition-transform duration-200 ease-in-out hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HealthCalculatorSection;
