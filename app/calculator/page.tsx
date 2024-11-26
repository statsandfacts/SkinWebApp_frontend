import CustomHeader from "@/components/Header/PublicLayoutHeader";
import Link from "next/link";
import { Scale, FireExtinguisher, HeartPulse, Calendar, Droplet } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Health Calculators",
};

const CalculatorsPage = () => {
  const calculators = [
    {
      icon: <Scale className="text-sky-500 text-4xl mb-4" />,
      title: "BMI Calculator",
      description: "Calculate your Body Mass Index (BMI) to understand your ideal weight range.",
      link: "/calculator/bmi",
    },
    {
      icon: <FireExtinguisher className="text-sky-500 text-4xl mb-4" />,
      title: "BMR Calculator",
      description: "Estimate your Basal Metabolic Rate (BMR) to know your daily calorie needs.",
      link: "/calculator/bmr",
    },
    {
      icon: <HeartPulse className="text-sky-500 text-4xl mb-4" />,
      title: "Blood Pressure Risk",
      description: "Assess your blood pressure risk and get recommendations for a healthy lifestyle.",
      link: "/calculator/blood-pressure-risk-calculator",
    },
    {
      icon: <Calendar className="text-sky-500 text-4xl mb-4" />,
      title: "Pregnancy Due Date",
      description: "Determine your estimated due date based on your last menstrual period.",
      link: "/calculator/pregnancy-due-date",
    },
    {
      icon: <Droplet className="text-sky-500 text-4xl mb-4" />,
      title: "Diabetes Risk Calculator",
      description: "Evaluate your risk of developing diabetes based on various health factors.",
      link: "/calculator/diabetes-risk-calculator",
    },
  ];

  return (
    <div className="p-10 md:px-40">
      <CustomHeader
        header="Health Calculators"
        subHeader="Explore a range of tools designed to provide insights into your health and wellness."
        imageURL="/vector/health_calculators.png"
      />

      <section className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up">
        {calculators.map((calculator, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {calculator.icon}
            <h3 className="text-xl font-semibold text-gray-800">{calculator.title}</h3>
            <p className="text-sm text-gray-600 text-center mt-2">{calculator.description}</p>
            <Link
              href={calculator.link}
              className="text-sky-800 font-semibold hover:text-sky-600 hover:underline mt-2"
            >
              Calculate Now
            </Link>
          </div>
        ))}
      </section>
    </div>
  );
};

export default CalculatorsPage;
